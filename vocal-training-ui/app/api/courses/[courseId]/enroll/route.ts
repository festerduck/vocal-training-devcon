import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user?.student?.studentId) {
      return NextResponse.json(
        { message: "Only students can enroll in courses" },
        { status: 401 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: user.student.studentId,
          courseId: params.courseId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "Already enrolled in this course" },
        { status: 400 }
      );
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: user.student.studentId,
        courseId: params.courseId,
        progressCompletion: "0", // Initial progress
      },
      include: {
        course: true,
      },
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { message: "Error enrolling in course" },
      { status: 500 }
    );
  }
} 