
import React from 'react';
import Calendar from '@/components/Calendar';
import eventsData from '@/data/events.json';
import { CalendarEvent } from '@/types/calendar';

const Index = () => {
  // Type assertion to ensure our JSON data matches the CalendarEvent interface
  const events: CalendarEvent[] = eventsData as CalendarEvent[];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/timecanvas-logo.jpg" 
              alt="TimeCanvas Logo" 
              className="w-12 h-12 rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                TimeCanvas
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                Where dates meet design
              </p>
            </div>
          </div>
        </div>

        <Calendar events={events} />
        
        {/* Event Legend */}
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Event Categories</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 dark:bg-blue-800 border border-blue-200 dark:border-blue-600 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 dark:bg-green-800 border border-green-200 dark:border-green-600 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Personal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 dark:bg-purple-800 border border-purple-200 dark:border-purple-600 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Meeting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Conflict Indicator</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Events with time conflicts are highlighted in red/orange colors
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
