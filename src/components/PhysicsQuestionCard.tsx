'use client';

import React from 'react';
import { Question } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhysicsQuestionCardProps {
  question: Question;
  index: number;
  total: number;
  answer: string;
  flagged: boolean;
  onAnswerChange: (answer: string) => void;
  onFlagToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function PhysicsQuestionCard({
  question,
  index,
  total,
  answer,
  flagged,
  onAnswerChange,
  onFlagToggle,
  onPrevious,
  onNext,
  isFirst,
  isLast
}: PhysicsQuestionCardProps) {
  return (
    <div className="flex-1 flex flex-col justify-between bg-card-bg border border-surface-border rounded-xl p-6 sm:p-8 shadow-soft min-h-[400px]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-secondary">
            Question {index + 1} of {total}
          </span>
          <span className="text-xs text-secondary font-medium">
            {question.marks} Points • {question.topic}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl font-bold leading-relaxed text-foreground">
          {question.questionText}
        </h2>

        {/* MCQ Option Radio Group (No more short answers as requested by user) */}
        {question.options && (
          <div className="space-y-3 pt-4">
            {question.options.map((opt, oIdx) => {
              const letter = String.fromCharCode(65 + oIdx); // A, B, C, D
              const isSelected = answer === letter;
              return (
                <button
                  key={opt}
                  onClick={() => onAnswerChange(letter)}
                  className={`w-full flex items-center gap-4 p-4 border rounded-lg text-left transition-all-200 group cursor-pointer focus-ring ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-surface-border bg-card-bg hover:bg-surface'
                  }`}
                  type="button"
                >
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-surface-border text-secondary group-hover:text-foreground'
                  }`}>
                    {letter}
                  </span>
                  <span className={`text-base ${isSelected ? 'font-medium text-primary' : 'text-foreground'}`}>
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Previous/Next and Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-surface-border/50 pt-6 mt-8">
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            disabled={isFirst}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-semibold transition-all-200 cursor-pointer shadow-soft ${
              isFirst
                ? 'border-surface-border bg-surface text-secondary cursor-not-allowed'
                : 'border-surface-border bg-card-bg hover:bg-surface text-foreground'
            }`}
            type="button"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onNext}
            disabled={isLast}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-semibold transition-all-200 cursor-pointer shadow-soft ${
              isLast
                ? 'border-surface-border bg-surface text-secondary cursor-not-allowed'
                : 'border-surface-border bg-card-bg hover:bg-surface text-foreground'
            }`}
            type="button"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onFlagToggle}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all-200 cursor-pointer shadow-soft ${
            flagged
              ? 'bg-warning-bg text-warning border-warning-border'
              : 'bg-card-bg hover:bg-surface text-secondary border-surface-border'
          }`}
          type="button"
        >
          {flagged ? 'Flagged for Review' : 'Flag Question'}
        </button>
      </div>
    </div>
  );
}
