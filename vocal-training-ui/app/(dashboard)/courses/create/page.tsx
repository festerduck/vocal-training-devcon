"use client"

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "@/app/components/CourseForm";

export default function CreateCoursePage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <Link href="/courses" className="flex items-center text-sm text-gray-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>
        <h1 className="text-2xl font-bold">Create Course</h1>
      </div>

      <CourseForm />
    </div>
  );
} 