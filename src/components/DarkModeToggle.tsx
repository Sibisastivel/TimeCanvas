
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border dark:border-gray-700">
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
};
