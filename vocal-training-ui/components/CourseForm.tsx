"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Lesson {
  lessonId: string;
  lessonName: string;
  lessonDescription: string;
  practiceGuide: string | null;
  video?: any;
  audio?: any;
  courseId: string;
}

interface Course {
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseLessons: Lesson[];
}

interface CourseFormProps {
  course?: Course;
  instructorId: string;
}

export function CourseForm({ course, instructorId }: CourseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLessonFormOpen, setIsLessonFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseName: course?.courseName || "",
    courseDescription: course?.courseDescription || "",
    lessons: course?.courseLessons || []
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLesson = (newLesson: Omit<Lesson, "lessonId" | "courseId">) => {
    setFormData(prev => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          lessonId: Math.random().toString(36).substr(2, 9),
          courseId: course?.courseId || '',
          ...newLesson,
          practiceGuide: newLesson.practiceGuide || null
        }
      ]
    }));
    setIsLessonFormOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const url = course 
        ? `/api/courses/${course.courseId}`
        : '/api/courses';

      const response = await fetch(url, {
        method: course ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          courseInstructorId: instructorId
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      router.push('/courses');
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/courses" className="text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-semibold">
            {course ? 'Edit Course' : 'Create New Course'}
          </h1>
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Saving...' : (course ? 'Save Changes' : 'Create Course')}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Course Title</label>
              <Input
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                name="courseDescription"
                value={formData.courseDescription}
                onChange={handleInputChange}
                placeholder="Describe your course content and objectives"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lessons" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Course Lessons</h2>
            <Button onClick={() => setIsLessonFormOpen(true)}>Add Lesson</Button>
          </div>

          <Dialog open={isLessonFormOpen} onOpenChange={setIsLessonFormOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lesson</DialogTitle>
              </DialogHeader>
              <LessonForm onSubmit={handleAddLesson} />
            </DialogContent>
          </Dialog>

          <div className="space-y-4">
            {formData.lessons.map((lesson) => (
              <div
                key={lesson.lessonId}
                className="flex items-center justify-between p-4 bg-white border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{lesson.lessonName}</h3>
                  <p className="text-sm text-gray-600">Duration: {lesson.practiceGuide}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        lessons: prev.lessons.filter(l => l.lessonId !== lesson.lessonId)
                      }));
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LessonForm({ onSubmit }: { onSubmit: (lesson: Omit<Lesson, "lessonId" | "courseId">) => void }) {
  const [formData, setFormData] = useState({
    lessonName: "",
    lessonDescription: "",
    practiceGuide: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      lessonName: "",
      lessonDescription: "",
      practiceGuide: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Lesson Title</label>
        <Input
          value={formData.lessonName}
          onChange={(e) => setFormData(prev => ({ ...prev, lessonName: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          value={formData.lessonDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, lessonDescription: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Duration</label>
        <Input
          value={formData.practiceGuide}
          onChange={(e) => setFormData(prev => ({ ...prev, practiceGuide: e.target.value }))}
          required
          placeholder="e.g., 30 minutes"
        />
      </div>
      <Button type="submit">Add Lesson</Button>
    </form>
  );
} 