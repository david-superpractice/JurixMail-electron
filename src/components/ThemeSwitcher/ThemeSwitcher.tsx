import { useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ThemeSwitcherProps {
  onChange: (theme: 'light' | 'dark') => void;
}

export function ThemeSwitcher({ onChange }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    onChange(newTheme);
  };

  return (
    <div className="flex space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        onClick={() => handleThemeChange('light')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
          theme === 'light' 
            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <SunIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Light</span>
      </button>

      <button
        onClick={() => handleThemeChange('dark')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
          theme === 'dark' 
            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <MoonIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Dark</span>
      </button>
    </div>
  );
}