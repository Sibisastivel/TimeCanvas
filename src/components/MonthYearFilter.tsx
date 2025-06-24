
import React from 'react';
import { format } from 'date-fns';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MonthYearFilterProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const MonthYearFilter: React.FC<MonthYearFilterProps> = ({ currentDate, onDateChange }) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate years from current year - 10 to current year + 10
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(currentYear, parseInt(monthIndex), 1);
    onDateChange(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(parseInt(year), currentMonth, 1);
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700">
      <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      
      <Select value={currentMonth.toString()} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-32 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 dark:border-gray-700">
          {months.map((month, index) => (
            <SelectItem key={index} value={index.toString()} className="dark:text-gray-200 dark:hover:bg-gray-700">
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentYear.toString()} onValueChange={handleYearChange}>
        <SelectTrigger className="w-20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 dark:border-gray-700 max-h-60">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()} className="dark:text-gray-200 dark:hover:bg-gray-700">
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
