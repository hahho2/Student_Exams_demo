'use client';

import React from 'react';
import { Exam } from '../types';
import Link from 'next/link';
import { Clock, ArrowUpRight } from 'lucide-react';

interface PendingExamCardProps {
  exam: Exam;
}

export default function PendingExamCard({ exam }: PendingExamCardProps) {
  return (
    <div className="flex flex-col justify-between p-6 bg-card-bg border border-surface-border rounded-xl shadow-soft hover:border-primary/30 transition-all-200 relative group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary">
            <Clock className="w-3 h-3" />
            <span>{exam.durationMinutes} Minutes</span>
          </span>
          <span className="text-xs text-secondary font-medium">Unit Test</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold group-hover:text-primary transition-all-200 line-clamp-1">
            Class {exam.classLevel} Physics: {exam.topic}
          </h3>
          <p className="text-sm text-secondary line-clamp-1">{exam.title}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-surface-border/50">
        <span className="text-xs text-secondary">
          Topic: <span className="font-medium text-foreground">{exam.topic}</span>
        </span>
        
        <Link
          href={`/student/exam/${exam.id}`}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-semibold rounded-md shadow-soft cursor-pointer transition-all-200"
        >
          <span>Start Exam</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
