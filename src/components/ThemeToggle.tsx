'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-lg border border-surface-border bg-card-bg hover:bg-surface text-secondary hover:text-foreground shadow-soft transition-all-200 cursor-pointer"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {theme === 'light' ? (
          <Moon className="w-5 h-5 animate-in fade-in zoom-in spin-in-45 duration-300" />
        ) : (
          <Sun className="w-5 h-5 animate-in fade-in zoom-in spin-in-45 duration-300 text-amber-400" />
        )}
      </div>
    </button>
  );
}
