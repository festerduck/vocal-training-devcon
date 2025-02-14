"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Lesson {
    id: number;
    title: string;
    duration: string;
}

interface CourseFormProps {
    initialData?: {
        title: string;
        description: string;
        duration: string;
        lessons: Lesson[];
    };
    isEditing?: boolean;
}

export function CourseForm({ initialData, isEditing = false }: CourseFormProps) {
    const [isLessonFormOpen, setIsLessonFormOpen] = useState(false);
    const [lessons, setLessons] = useState<Lesson[]>(initialData?.lessons || []);

    const defaultValues = {
        title: initialData?.title || "",
        description: initialData?.description || "",
        duration: initialData?.duration || "",
        lessons: lessons,
    };

    const handleAddLesson = (newLesson: Omit<Lesson, "id">) => {
        const lesson = {
            ...newLesson,
            id: lessons.length + 1, // Simple ID generation
        };
        setLessons([...lessons, lesson]);
        setIsLessonFormOpen(false);
    };

    return (
        <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
                <TabsTrigger value="details">Course Details</TabsTrigger>
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 max-w-2xl">
                    <div>
                        <label className="block text-sm font-medium mb-2">Course Title</label>
                        <Input defaultValue={defaultValues.title} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea defaultValue={defaultValues.description} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Duration</label>
                        <Input defaultValue={defaultValues.duration} />
                    </div>
                    <Button>{isEditing ? "Save Changes" : "Create Course"}</Button>
                </div>
            </TabsContent>

            <TabsContent value="lessons" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
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
                    {defaultValues.lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="flex items-center justify-between p-4 bg-white border rounded-lg"
                        >
                            <div>
                                <h3 className="font-medium">{lesson.title}</h3>
                                <p className="text-sm text-gray-600">Duration: {lesson.duration}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}

function LessonForm({ onSubmit }: { onSubmit: (lesson: Omit<Lesson, "id">) => void }) {
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, duration });
        setTitle("");
        setDuration("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-2">Lesson Title</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    placeholder="e.g., 30 minutes"
                />
            </div>
            <Button type="submit">Add Lesson</Button>
        </form>
    );
} 