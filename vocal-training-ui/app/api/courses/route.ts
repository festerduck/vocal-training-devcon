import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user?.instructor?.instructorId) {
      return NextResponse.json(
        { message: "Unauthorized: Instructor access required" },
        { status: 401 }
      );
    }

    const {
      courseName,
      courseDescription,
      tags,
      lessons
    } = await req.json();

    const course = await prisma.course.create({
      data: {
        courseName,
        courseDescription,
        courseInstructorId: user.instructor.instructorId,
        courseLessons: {
          create: lessons.map((lesson: any) => ({
            lessonName: lesson.title,
            lessonDescription: lesson.description,
            practiceGuide: lesson.duration
          }))
        }
      },
      include: {
        courseLessons: true,
        courseInstructor: {
          include: {
            user: true
          }
        }
      }
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Course creation error:", error);
    return NextResponse.json(
      { message: "Error creating course" },
      { status: 500 }
    );
  }
} 