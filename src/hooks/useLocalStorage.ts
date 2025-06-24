
import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/types/calendar';

const LOCAL_STORAGE_KEY = 'calendar-custom-events';

export const useLocalStorageEvents = () => {
  const [customEvents, setCustomEvents] = useState<CalendarEvent[]>([]);

  // Load events from localStorage on component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsedEvents = JSON.parse(stored);
        setCustomEvents(parsedEvents);
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
    }
  }, []);

  // Save events to localStorage whenever customEvents changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customEvents));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [customEvents]);

  const addEvent = (event: CalendarEvent) => {
    setCustomEvents(prev => [...prev, event]);
  };

  const removeEvent = (eventId: string) => {
    setCustomEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return {
    customEvents,
    addEvent,
    removeEvent
  };
};
