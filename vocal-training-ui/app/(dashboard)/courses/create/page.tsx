"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { X } from "lucide-react";

export default function CreateCourse() {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [lessons, setLessons] = useState<{ title: string; description: string; duration: string }[]>([]);

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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/courses" className="text-gray-500 hover:text-gray-700">
              <span className="flex items-center">
                ← <span className="ml-1">Back</span>
              </span>
            </Link>
            <h1 className="text-2xl font-semibold">Create Course</h1>
            <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">Draft</span>
          </div>
          <div className="text-sm text-gray-500">
            <span>Dashboard</span> / <span>My Course</span> / <span>Create Course</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Save Update</Button>
          <Button>Publish Course</Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          Plan Course
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          Create Your Content
        </Button>
        <Button variant="default" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          Course Schedule
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          Pricing Plan
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          Course Website
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          Create Quiz
        </Button>
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

          {/* Course Form */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              {/* Course Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Course Title</label>
                <Input placeholder="Enter course title" className="w-full" />
              </div>

              {/* Course Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Course Description</label>
                <Textarea
                  placeholder="Describe your course content and learning objectives"
                  className="w-full min-h-[100px]"
                />
              </div>

              {/* Tags */}
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

              {/* Lesson Plans */}
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

          <Calendar />
        </div>
      </div>
    </div>
  );
} 