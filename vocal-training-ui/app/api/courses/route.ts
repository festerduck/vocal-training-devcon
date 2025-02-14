import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'instructor') {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseName, courseDescription, lessons, courseInstructorId } = await req.json();

    const course = await prisma.course.create({
      data: {
        courseName,
        courseDescription,
        courseInstructorId,
        courseLessons: {
          create: lessons.map((lesson: any) => ({
            lessonName: lesson.lessonName || "",
            lessonDescription: lesson.lessonDescription || "",
            practiceGuide: lesson.practiceGuide || null,
            video: null,
            audio: null
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

    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 