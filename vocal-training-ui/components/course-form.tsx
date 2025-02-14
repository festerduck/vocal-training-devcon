"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Course, Lesson } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface CourseFormProps {
  course?: Course & {
    courseLessons: Lesson[];
  };
  instructorId: string;
}

export function CourseForm({ course, instructorId }: CourseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    courseName: course?.courseName || "",
    courseDescription: course?.courseDescription || "",
    lessons: course?.courseLessons || [{ 
      lessonName: "",
      lessonDescription: "",
      practiceGuide: "",
      video: null,
      audio: null
    }]
  });

  const steps = [
    { id: 'plan', title: 'Plan Course' },
    { id: 'content', title: 'Create Your Content' },
    { id: 'schedule', title: 'Course Schedule' },
    { id: 'pricing', title: 'Pricing Plan' },
    { id: 'website', title: 'Course Website' },
    { id: 'quiz', title: 'Create Quiz' }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLessonChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newLessons = [...prev.lessons];
      newLessons[index] = {
        ...newLessons[index],
        [field]: value,
      };
      return {
        ...prev,
        lessons: newLessons,
      };
    });
  };

  const addLesson = () => {
    setFormData((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          lessonName: "",
          lessonDescription: "",
          practiceGuide: "",
          video: null,
          audio: null
        },
      ],
    }));
  };

  const removeLesson = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = course 
        ? `/api/courses/${course.courseId}`
        : '/api/courses';
      
      const response = await fetch(endpoint, {
        method: course ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          courseInstructorId: instructorId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save course');
      }

      toast.success(course ? 'Course updated successfully' : 'Course created successfully');
      router.push('/courses');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error saving course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/courses" className="text-gray-500 hover:text-gray-700">
              <span className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </span>
            </Link>
            <h1 className="text-2xl font-semibold">
              {course ? 'Edit Course' : 'Create Course'}
            </h1>
            <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
              Draft
            </span>
          </div>
          <div className="text-sm text-gray-500">
            <span>Dashboard</span> / <span>My Course</span> / <span>{course ? 'Edit' : 'Create'} Course</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" disabled={isLoading}>
            Save Draft
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Course'}
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={currentStep === index ? "default" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => setCurrentStep(index)}
            type="button"
          >
            <div className={`w-2 h-2 rounded-full ${
              currentStep === index ? "bg-blue-500" : "bg-gray-400"
            }`}></div>
            {step.title}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Course Details</h2>
            <p className="text-gray-600">
              Fill in the basic information about your course to get started.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course Name</label>
                  <Input
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="Enter course name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Course Description</label>
                  <Textarea
                    name="courseDescription"
                    value={formData.courseDescription}
                    onChange={handleInputChange}
                    placeholder="Enter course description"
                    required
                  />
                </div>
              </div>

              {/* Lessons Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Lessons</h3>
                  <Button
                    type="button"
                    onClick={addLesson}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.lessons.map((lesson, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Lesson {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeLesson(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Lesson Name</label>
                          <Input
                            value={lesson.lessonName}
                            onChange={(e) => handleLessonChange(index, 'lessonName', e.target.value)}
                            placeholder="Enter lesson name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Lesson Description</label>
                          <Textarea
                            value={lesson.lessonDescription}
                            onChange={(e) => handleLessonChange(index, 'lessonDescription', e.target.value)}
                            placeholder="Enter lesson description"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Practice Guide</label>
                          <Input
                            value={lesson.practiceGuide || ''}
                            onChange={(e) => handleLessonChange(index, 'practiceGuide', e.target.value)}
                            placeholder="Enter practice guide"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80">
          <div className="bg-white p-4 rounded-lg border mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded">Course</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Digital</span>
            </div>
            <h3 className="text-lg font-semibold mb-4">Create Compelling Course Content</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Level</span>
                <span>Beginner to Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Format</span>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
} 