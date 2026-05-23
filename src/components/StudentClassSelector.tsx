'use client';

import React from 'react';
import { ClassLevel } from '../types';
import { GraduationCap } from 'lucide-react';

interface StudentClassSelectorProps {
  onSelectClass: (level: ClassLevel) => void;
}

export default function StudentClassSelector({ onSelectClass }: StudentClassSelectorProps) {
  const classes: ClassLevel[] = ['9', '10', '11', '12'];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Select Your Class</h1>
        <p className="text-sm text-secondary">
          Choose your grade level to load matching physics curriculum and assessments.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {classes.map((level) => (
          <button
            key={level}
            onClick={() => onSelectClass(level)}
            className="flex flex-col items-center justify-center p-6 border border-surface-border rounded-lg bg-card-bg hover:bg-surface text-foreground shadow-soft hover:border-primary/30 transition-all-200 group text-center cursor-pointer focus-ring"
            type="button"
          >
            <GraduationCap className="w-8 h-8 text-secondary group-hover:text-primary transition-all-200 mb-3" />
            <span className="text-lg font-bold">Class {level}</span>
            <span className="text-xs text-secondary mt-1">
              {level === '9' || level === '10' ? 'General Physics' : 'Stream Specialization'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
