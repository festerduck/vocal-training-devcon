'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function EnrollButton({ courseId }: { courseId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEnroll = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      router.refresh();
    } catch (error: any) {
      setError(error.message);
      console.error("Enrollment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="default" 
      size="sm"
      onClick={handleEnroll}
      disabled={isLoading}
    >
      {isLoading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  );
} 