"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseEditProps {
  params: {
    courseId: string;
  };
}

export default function EditCourse({ params }: CourseEditProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseDescription: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [lessons, setLessons] = useState<{ title: string; description: string; duration: string }[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${params.courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course");
        
        const course = await response.json();
        setCourseData({
          courseName: course.courseName,
          courseDescription: course.courseDescription,
        });
        
        // Transform lessons data
        setLessons(
          course.courseLessons.map((lesson: any) => ({
            title: lesson.lessonName,
            description: lesson.lessonDescription,
            duration: lesson.practiceGuide || "",
          }))
        );
      } catch (error) {
        setError("Failed to load course data");
      }
    };

    fetchCourse();
  }, [params.courseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addLesson = () => {
    setLessons([...lessons, { title: "", description: "", duration: "" }]);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/courses/${params.courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...courseData,
          tags,
          lessons
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/courses" className="text-gray-500 hover:text-gray-700">
              <span className="flex items-center">
                ← <span className="ml-1">Back</span>
              </span>
            </Link>
            <h1 className="text-2xl font-semibold">Edit Course</h1>
          </div>
        </div>
        <Button 
          onClick={handleUpdate} 
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Course'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Course Title</label>
            <Input
              name="courseName"
              value={courseData.courseName}
              onChange={handleInputChange}
              placeholder="Enter course title"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Course Description</label>
            <Textarea
              name="courseDescription"
              value={courseData.courseDescription}
              onChange={handleInputChange}
              placeholder="Describe your course content and learning objectives"
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <Input
              placeholder="Add tags (press Enter)"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Lesson Plans</label>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <Input
                    placeholder="Lesson Title"
                    className="mb-2"
                    value={lesson.title}
                    onChange={(e) => {
                      const newLessons = [...lessons];
                      newLessons[index].title = e.target.value;
                      setLessons(newLessons);
                    }}
                  />
                  <Textarea
                    placeholder="Lesson Description"
                    className="mb-2"
                    value={lesson.description}
                    onChange={(e) => {
                      const newLessons = [...lessons];
                      newLessons[index].description = e.target.value;
                      setLessons(newLessons);
                    }}
                  />
                  <Input
                    placeholder="Duration (e.g., 1 hour)"
                    value={lesson.duration}
                    onChange={(e) => {
                      const newLessons = [...lessons];
                      newLessons[index].duration = e.target.value;
                      setLessons(newLessons);
                    }}
                  />
                </div>
              ))}
              <Button
                variant="outline"
                type="button"
                onClick={addLesson}
                className="w-full"
              >
                Add Lesson
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 