import React, { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, getDay, addYears, subYears } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalendarEvent, CalendarEventProps } from '@/types/calendar';
import { EventDisplay } from './EventDisplay';
import { YearView } from './YearView';
import { MonthYearFilter } from './MonthYearFilter';
import { EventForm } from './EventForm';
import { useLocalStorageEvents } from '@/hooks/useLocalStorage';
import { DarkModeToggle } from './DarkModeToggle';

interface CalendarProps {
  events: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  
  const { customEvents, addEvent } = useLocalStorageEvents();

  // Combine default events with custom events from localStorage
  const allEvents = useMemo(() => [...events, ...customEvents], [events, customEvents]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayOfWeek = getDay(monthStart);
  const emptyCells = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subYears(prev, 1) : addYears(prev, 1));
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'month' ? 'year' : 'month');
  };

  const handleFilterDateChange = (date: Date) => {
    setCurrentDate(date);
    setViewMode('month');
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsEventFormOpen(true);
  };

  const handleAddEvent = (event: CalendarEvent) => {
    addEvent(event);
  };

  const getEventsForDate = (date: Date) => {
    return allEvents.filter(event => isSameDay(new Date(event.date), date));
  };

  const hasConflicts = (dateEvents: CalendarEvent[]) => {
    if (dateEvents.length <= 1) return false;
    
    const sortedEvents = dateEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const currentEnd = calculateEndTime(sortedEvents[i].startTime, sortedEvents[i].duration);
      const nextStart = sortedEvents[i + 1].startTime;
      
      if (currentEnd > nextStart) {
        return true;
      }
    }
    return false;
  };

  const calculateEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMins = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  if (viewMode === 'year') {
    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* Year View Header with filter on left and dark mode toggle on right */}
        <div className="flex items-center justify-between mb-6 px-6">
          <MonthYearFilter currentDate={currentDate} onDateChange={handleFilterDateChange} />
          <DarkModeToggle />
        </div>

        {/* Centered Year Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigateYear('prev')}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={toggleViewMode}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[120px]"
          >
            {format(currentDate, 'yyyy')}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigateYear('next')}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <YearView year={currentDate} events={allEvents} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Calendar Header with filter on left and dark mode toggle on right */}
      <div className="flex items-center justify-between mb-6">
        <MonthYearFilter currentDate={currentDate} onDateChange={handleFilterDateChange} />
        <DarkModeToggle />
      </div>

      {/* Centered Month Navigation */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigateMonth('prev')}
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline"
          onClick={toggleViewMode}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[150px]"
        >
          {format(currentDate, 'MMMM yyyy')}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigateMonth('next')}
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {emptyCells.map(index => (
          <div key={`empty-${index}`} className="min-h-24 bg-gray-50 dark:bg-gray-700"></div>
        ))}
        
        {/* Days of the month */}
        {daysInMonth.map(date => {
          const dateEvents = getEventsForDate(date);
          const hasEventConflicts = hasConflicts(dateEvents);
          
          return (
            <div
              key={date.toISOString()}
              className={`min-h-24 border border-gray-200 dark:border-gray-600 p-1 relative cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                isToday(date) 
                  ? 'bg-blue-50 dark:bg-blue-900 border-blue-300 dark:border-blue-600' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => handleDateClick(date)}
            >
              {/* Date number and add button */}
              <div className="flex justify-between items-start mb-1">
                <div className={`text-sm font-medium ${
                  isToday(date) 
                    ? 'text-blue-600 dark:text-blue-400 font-bold' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {format(date, 'd')}
                </div>
                <Plus className="h-3 w-3 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Events - Show ALL events instead of limiting to 2 */}
              <div className="space-y-1">
                {dateEvents.map((event, index) => (
                  <EventDisplay 
                    key={`${event.id}-${index}`} 
                    event={event} 
                    hasConflict={hasEventConflicts}
                  />
                ))}
              </div>
              
              {/* Conflict indicator */}
              {hasEventConflicts && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" 
                     title="Time conflicts detected"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Event Form Modal */}
      <EventForm
        isOpen={isEventFormOpen}
        onClose={() => setIsEventFormOpen(false)}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default Calendar;
