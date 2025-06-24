
import React from 'react';
import { format, startOfYear, endOfYear, eachMonthOfInterval, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday } from 'date-fns';
import { CalendarEvent } from '@/types/calendar';

interface YearViewProps {
  year: Date;
  events: CalendarEvent[];
}

export const YearView: React.FC<YearViewProps> = ({ year, events }) => {
  const yearStart = startOfYear(year);
  const yearEnd = endOfYear(year);
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const renderMonth = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startingDayOfWeek = getDay(monthStart);
    const emptyCells = Array.from({ length: startingDayOfWeek }, (_, i) => i);

    return (
      <div key={month.toISOString()} className="bg-white rounded border">
        {/* Month header */}
        <div className="text-center font-medium text-gray-700 py-2 bg-gray-50 rounded-t">
          {format(month, 'MMMM')}
        </div>
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-xs text-gray-500 border-b">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="p-1 text-center font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells for days before month starts */}
          {emptyCells.map(index => (
            <div key={`empty-${index}`} className="h-6 text-xs text-gray-300 p-1"></div>
          ))}
          
          {/* Days of the month */}
          {daysInMonth.map(date => {
            const dateEvents = getEventsForDate(date);
            const hasEvents = dateEvents.length > 0;
            
            return (
              <div
                key={date.toISOString()}
                className={`h-6 text-xs p-1 text-center border-r border-b border-gray-100 ${
                  isToday(date) 
                    ? 'bg-blue-100 text-blue-800 font-bold' 
                    : hasEvents 
                    ? 'bg-green-50 text-green-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {format(date, 'd')}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-4 gap-4">
        {months.map(renderMonth)}
      </div>
    </div>
  );
};
