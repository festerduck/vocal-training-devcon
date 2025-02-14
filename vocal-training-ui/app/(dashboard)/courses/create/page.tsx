import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { CourseForm } from "@/components/CourseForm";

export default async function CreateCoursePage() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'instructor') {
    redirect('/login');
  }

  if (!user.instructor) {
    redirect('/courses');
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <CourseForm instructorId={user.instructor.instructorId} />
    </div>
  );
} 