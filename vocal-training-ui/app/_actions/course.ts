'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function createCourse(data: {
  courseName: string;
  courseDescription: string;
  lessons: any[];
  courseInstructorId: string;
}) {
  try {
    const course = await prisma.course.create({
      data: {
        courseName: data.courseName,
        courseDescription: data.courseDescription,
        courseInstructorId: data.courseInstructorId,
        courseLessons: {
          create: data.lessons.map((lesson) => ({
            lessonName: lesson.lessonName || "",
            lessonDescription: lesson.lessonDescription || "",
            practiceGuide: lesson.practiceGuide || null,
            video: lesson.video || Prisma.JsonNull,
            audio: lesson.audio || Prisma.JsonNull
          }))
        }
      }
    });

    revalidatePath('/courses');
    return { data: course };
  } catch (error) {
    console.error("[COURSE_CREATE]", error);
    return { error: "Failed to create course" };
  }
}

export async function updateCourse(courseId: string, data: {
  courseName: string;
  courseDescription: string;
  lessons: any[];
  courseInstructorId: string;
}) {
  try {
    const course = await prisma.course.update({
      where: { courseId },
      data: {
        courseName: data.courseName,
        courseDescription: data.courseDescription,
        courseLessons: {
          deleteMany: {},
          create: data.lessons.map((lesson) => ({
            lessonName: lesson.lessonName || "",
            lessonDescription: lesson.lessonDescription || "",
            practiceGuide: lesson.practiceGuide || null,
            video: lesson.video || Prisma.JsonNull,
            audio: lesson.audio || Prisma.JsonNull
          }))
        }
      }
    });

    revalidatePath('/courses');
    return { data: course };
  } catch (error) {
    console.error("[COURSE_UPDATE]", error);
    return { error: "Failed to update course" };
  }
} 