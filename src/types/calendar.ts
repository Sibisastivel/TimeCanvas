
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // HH:MM format
  duration: number; // in minutes
  category: 'work' | 'personal' | 'meeting';
  description?: string;
}

export interface CalendarEventProps {
  event: CalendarEvent;
  hasConflict: boolean;
}
