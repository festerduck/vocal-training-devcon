"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CourseForm } from "@/components/CourseForm";

interface CourseEditPageProps {
  params: {
    courseId: string;
  };
}

async function getCourse(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        courseId: courseId,
      },
      include: {
        courseLessons: true,
        courseInstructor: {
          include: {
            user: true,
          },
        },
      },
    });
    return course;
  } catch (error) {
    console.error("Error fetching course:", error);
    return null;
  }
}

export default async function EditCoursePage({ params }: CourseEditPageProps) {
  const user = await getCurrentUser();
  const course = await getCourse(params.courseId);

  if (!user || user.role !== 'instructor') {
    redirect('/login');
  }

  if (!course) {
    redirect('/courses');
  }

  // Verify the instructor owns this course
  if (course.courseInstructorId !== user.instructor?.instructorId) {
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