import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical, Users, Clock } from "lucide-react";

export default function CoursesPage() {
  // Mock data - replace with actual data fetching
  const courses = [
    {
      id: 1,
      title: "Vocal Training Basics",
      status: "Published",
      students: 24,
      duration: "8 weeks",
      lastUpdated: "2024-03-15",
      thumbnail: "/course-1.jpg"
    },
    {
      id: 2,
      title: "Advanced Vocal Techniques",
      status: "Draft",
      students: 0,
      duration: "12 weeks",
      lastUpdated: "2024-03-14",
      thumbnail: "/course-2.jpg"
    },
    // Add more courses as needed
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Published Courses</h1>
          <p className="text-gray-600">Manage and create your vocal training courses</p>
        </div>
        <Link href="/courses/create">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Course
          </Button>
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
            {/* Course Thumbnail */}
            <div className="relative h-48 bg-gray-100 rounded-t-lg">
              {course.thumbnail && (
                // Note: Add actual images and configure next.config.js for domains
                <div className="absolute inset-0 bg-gray-200 rounded-t-lg" />
              )}
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="icon" className="bg-white/90 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className={`px-3 py-1 rounded-full text-sm ${course.status === 'Published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                  }`}>
                  {course.status}
                </span>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/courses/${course.id}`} className="hover:text-primary">
                  {course.title}
                </Link>
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                </span>
                <Link href={`/courses/${course.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    Edit Course
                  </Button>
                </Link>
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
          <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-4">Create your first vocal training course</p>
          <Link href="/courses/create">
            <Button>Create New Course</Button>
          </Link>
        </div>
      )}
    </div>
  );
} 