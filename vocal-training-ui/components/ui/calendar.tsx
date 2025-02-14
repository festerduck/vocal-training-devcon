'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

export function Calendar() {
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">March 2024</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
          <div key={day} className="text-center text-gray-500 text-xs p-2">
            {day}
          </div>
        ))}
        {/* Generate calendar days */}
        {Array.from({ length: 35 }, (_, i) => (
          <div
            key={i}
            className={`text-center p-2 rounded-md hover:bg-gray-100 cursor-pointer
              ${i === 11 || i === 12 ? 'bg-blue-50 text-blue-600' : ''}
            `}
          >
            {i - 3}
          </div>
        ))}
      </div>
    </div>
  );
} 