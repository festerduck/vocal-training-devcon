import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        courseId: params.courseId,
      },
      include: {
        courseLessons: true,
        courseInstructor: {
          include: {
            user: true,
          },
        },
        studentEnrolled: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { message: "Error fetching course" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user?.instructor?.instructorId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { courseId: params.courseId },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    if (course.courseInstructorId !== user.instructor.instructorId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      courseName,
      courseDescription,
      lessons
    } = await req.json();

    const updatedCourse = await prisma.course.update({
      where: { courseId: params.courseId },
      data: {
        courseName,
        courseDescription,
        courseLessons: {
          deleteMany: {},
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

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { message: "Error updating course" },
      { status: 500 }
    );
  }
} 