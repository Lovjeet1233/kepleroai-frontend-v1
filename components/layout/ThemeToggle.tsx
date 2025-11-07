'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-accent hover:scale-105 transition-all duration-200 group shadow-sm"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for light mode */}
      <Sun 
        className={`w-5 h-5 absolute transition-all duration-300 ${
          theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100 text-orange-500' 
            : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      
      {/* Moon icon for dark mode */}
      <Moon 
        className={`w-5 h-5 absolute transition-all duration-300 ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100 text-indigo-400' 
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      
      {/* Optional: Visual indicator */}
      <span className="sr-only">
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}

