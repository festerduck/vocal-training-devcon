import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function CreateCourse() {
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
            <h2 className="text-xl font-semibold mb-2">Course Schedule</h2>
            <p className="text-gray-600">
              Decide on the timeframe covered in the course. Whether it's a specific historical period, from the topics you've entered.{" "}
              <Link href="#" className="text-blue-500">
                Like this Example
              </Link>
            </p>
          </div>

          {/* Learning Sections */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Learning 3</h3>
                <Button variant="outline" size="sm">
                  Save Schedule
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">Setting Learning Objectives</span>
                  <span className="text-sm text-gray-500">Module 1</span>
                </div>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Select content and settings time for learning"
                />
              </div>
            </div>

            {/* Learning Items */}
            <div className="space-y-4">
              {/* Learning 1 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span>⋮⋮</span>
                    <span className="font-medium">Learning 1</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Delete</Button>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">💡</span>
                    <span className="font-medium">Identifying Your Niche</span>
                    <span className="text-sm text-gray-500">Module 1</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    We'll delve into finding your area of expertise and how to translate it into a teachable course.
                  </p>
                  <div className="text-sm text-gray-500">
                    Timeframe: March 12, 09:40 - 11:30am
                  </div>
                </div>
              </div>

              {/* Learning 2 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                {/* Similar structure to Learning 1 */}
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