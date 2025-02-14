import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "@/app/components/CourseForm";

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
    // Mock data - replace with actual data fetching
    const course = {
        id: params.courseId,
        title: "Vocal Training Basics",
        description: "Learn the fundamentals of vocal training.",
        duration: "8 weeks",
        lessons: [
            { id: 1, title: "Introduction to Breathing", duration: "15:00" },
            { id: 2, title: "Vocal Warm-ups", duration: "20:00" },
        ],
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <Link href="/courses" className="flex items-center text-sm text-gray-600 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Courses
                </Link>
                <h1 className="text-2xl font-bold">Edit Course</h1>
            </div>

            <CourseForm initialData={course} isEditing />
        </div>
    );
} 