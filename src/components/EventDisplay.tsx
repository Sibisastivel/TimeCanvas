
import React from 'react';
import { CalendarEvent } from '@/types/calendar';

interface EventDisplayProps {
  event: CalendarEvent;
  hasConflict: boolean;
}

export const EventDisplay: React.FC<EventDisplayProps> = ({ event, hasConflict }) => {
  const getEventColor = (category: string, hasConflict: boolean) => {
    const baseColors = {
      work: 'bg-blue-100 text-blue-800 border-blue-200',
      personal: 'bg-green-100 text-green-800 border-green-200',
      meeting: 'bg-purple-100 text-purple-800 border-purple-200',
      default: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    const conflictColors = {
      work: 'bg-red-100 text-red-800 border-red-300',
      personal: 'bg-orange-100 text-orange-800 border-orange-300',
      meeting: 'bg-pink-100 text-pink-800 border-pink-300',
      default: 'bg-red-100 text-red-800 border-red-300'
    };
    
    if (hasConflict) {
      return conflictColors[category as keyof typeof conflictColors] || conflictColors.default;
    }
    
    return baseColors[category as keyof typeof baseColors] || baseColors.default;
  };

  return (
    <div 
      className={`text-xs p-1 rounded border truncate ${getEventColor(event.category, hasConflict)}`}
      title={`${event.title} - ${event.startTime} (${event.duration}min)${hasConflict ? ' - CONFLICT!' : ''}`}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-xs opacity-75">{event.startTime}</div>
    </div>
  );
};
