'use client';

import React from 'react';
import { Submission } from '../types';
import { GraduationCap, Check, X, Minus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface SubmissionSummaryProps {
  submission: Submission;
  correctCount: number;
  incorrectCount: number;
  notAttemptedCount: number;
}

export default function SubmissionSummary({
  submission,
  correctCount,
  incorrectCount,
  notAttemptedCount
}: SubmissionSummaryProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (submission.percentage / 100) * circumference;

  const getFeedbackMessage = (pct: number) => {
    if (pct >= 90) return 'Outstanding! You have demonstrated absolute command of this topic.';
    if (pct >= 75) return 'Great job, keep it up! Standard proficiency achieved.';
    if (pct >= 50) return 'Passing score achieved. Review your incorrect answers to improve concepts.';
    return 'Revision required. Schedule a follow-up assessment with your educator.';
  };

  return (
    <div className="bg-card-bg border border-surface-border rounded-xl p-8 sm:p-10 shadow-soft text-center space-y-6">
      <div className="space-y-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Class {submission.classLevel} Physics</h1>
        <p className="text-sm text-secondary">
          Assessment Completed: {new Date(submission.submittedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      {/* SVG Score Donut */}
      <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-surface-border"
            strokeWidth={10}
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-primary transition-all duration-1000 ease-out"
            strokeWidth={10}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-3xl font-extrabold tracking-tight">{submission.percentage}%</span>
          <p className="text-[10px] uppercase text-secondary font-bold tracking-wider">Score</p>
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight">
          {submission.percentage >= 75 ? 'Great job, keep it up!' : 'Review and Re-attempt'}
        </h2>
        <p className="text-sm text-secondary max-w-md mx-auto">
          {getFeedbackMessage(submission.percentage)}
        </p>
      </div>

      {/* Status Metric Blocks */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-border/50">
        <div className="p-4 bg-surface border border-surface-border rounded-lg text-center space-y-1">
          <div className="w-6 h-6 mx-auto rounded-full bg-success-bg text-success flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-2xl font-extrabold text-foreground">{correctCount}</span>
          <p className="text-[10px] text-secondary uppercase font-bold tracking-wider">Correct</p>
        </div>

        <div className="p-4 bg-surface border border-surface-border rounded-lg text-center space-y-1">
          <div className="w-6 h-6 mx-auto rounded-full bg-error-bg text-error flex items-center justify-center">
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-2xl font-extrabold text-foreground">{incorrectCount}</span>
          <p className="text-[10px] text-secondary uppercase font-bold tracking-wider">Incorrect</p>
        </div>

        <div className="p-4 bg-surface border border-surface-border rounded-lg text-center space-y-1">
          <div className="w-6 h-6 mx-auto rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-2xl font-extrabold text-foreground">{notAttemptedCount}</span>
          <p className="text-[10px] text-secondary uppercase font-bold tracking-wider">Unattempted</p>
        </div>
      </div>

      {submission.warningsCount > 0 && (
        <div className="p-3.5 bg-error-bg/60 border border-error-border rounded-lg text-xs text-error font-medium flex items-center justify-center gap-2">
          ⚠️ Suspicious behavior record: {submission.warningsCount} exam infractions were logged during this session.
        </div>
      )}

      <div className="flex gap-4 pt-4">
        {/* Redesigned to redirect students directly to the dedicated review webpage as requested */}
        <Link
          href={`/student/review/${submission.id}`}
          className="flex-1 py-3 border border-surface-border bg-card-bg hover:bg-surface font-semibold rounded-lg transition-all-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-soft text-sm text-foreground hover:text-primary"
        >
          <span>Review Answers</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
        
        <Link
          href="/student/dashboard"
          className="flex-1 py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg transition-all-200 cursor-pointer flex items-center justify-center shadow-soft text-sm"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
