import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical, Users, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

async function getCourses(instructorId: string | null = null) {
  try {
    const courses = await prisma.course.findMany({
      where: instructorId ? {
        courseInstructorId: instructorId
      } : undefined,
      include: {
        courseInstructor: {
          include: {
            user: true
          }
        },
        studentEnrolled: true,
        courseLessons: true
      }
    });
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default async function CoursesPage() {
  const user = await getCurrentUser();
  const courses = await getCourses(
    user?.instructor?.instructorId || null
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Courses</h1>
          <p className="text-gray-600">
            {user?.role === 'instructor' 
              ? 'Manage and create your vocal training courses'
              : 'Browse available vocal training courses'
            }
          </p>
        </div>
        {user?.role === 'instructor' && (
          <Link href="/courses/create">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Course
            </Button>
          </Link>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div key={course.courseId} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
            {/* Course Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/courses/${course.courseId}`} className="hover:text-primary">
                  {course.courseName}
                </Link>
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {course.courseDescription}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.studentEnrolled.length} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.courseLessons.length} lessons</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  By {course.courseInstructor.user.fullName}
                </span>
                {user?.role === 'instructor' && course.courseInstructorId === user.instructor?.instructorId && (
                  <Link href={`/courses/${course.courseId}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit Course
                    </Button>
                  </Link>
                )}
                {user?.role === 'student' && (
                  <Button variant="default" size="sm">
                    Enroll Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <PlusCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">No courses available</h3>
          {user?.role === 'instructor' ? (
            <>
              <p className="text-gray-600 mb-4">Create your first vocal training course</p>
              <Link href="/courses/create">
                <Button>Create New Course</Button>
              </Link>
            </>
          ) : (
            <p className="text-gray-600 mb-4">Check back later for new courses</p>
          )}
        </div>
      )}
    </div>
  );
} 