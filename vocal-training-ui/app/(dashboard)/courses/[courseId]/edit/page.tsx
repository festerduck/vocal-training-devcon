

import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CourseForm } from "@/components/CourseForm";
import { use } from "react";

interface Props {
  params: {
    courseId: string;
  };
}

export default async function EditCoursePage({ params }: Props) {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'instructor') {
    redirect('/login');
  }

  if (!user.instructor) {
    redirect('/courses');
  }

  const course = await prisma.course.findUnique({
    where: { courseId: params.courseId },
    include: {
      courseLessons: true,
      courseInstructor: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!course) {
    redirect('/courses');
  }

  // Verify the instructor owns this course
  if (course.courseInstructorId !== user.instructor.instructorId) {
    redirect('/courses');
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <CourseForm 
        course={course}
        instructorId={user.instructor.instructorId}
      />
    </div>
  );
} 