'use client';

import React from 'react';

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  totalQuestions: number;
  attemptedCount: number;
  flaggedCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmSubmitModal({
  isOpen,
  totalQuestions,
  attemptedCount,
  flaggedCount,
  onCancel,
  onConfirm
}: ConfirmSubmitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-surface-border max-w-md w-full p-6 sm:p-8 rounded-xl shadow-2xl space-y-5 animate-in zoom-in duration-200">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold tracking-tight">Submit Physics Exam?</h2>
          <p className="text-sm text-secondary">
            Review your response checklist before finalized submission. No adjustments are permitted post-submission.
          </p>
        </div>

        <div className="p-4 bg-surface border border-surface-border rounded-lg text-xs space-y-2 text-secondary font-medium">
          <div className="flex justify-between">
            <span>Total Questions:</span>
            <span className="font-bold text-foreground">{totalQuestions}</span>
          </div>
          <div className="flex justify-between">
            <span>Attempted Answers:</span>
            <span className="font-bold text-primary">{attemptedCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Flagged Questions:</span>
            <span className="font-bold text-warning">{flaggedCount}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-surface-border bg-card-bg hover:bg-surface font-semibold rounded-lg transition-all-200 cursor-pointer"
            type="button"
          >
            Back to Exam
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-success hover:bg-success/90 text-primary-foreground font-bold rounded-lg transition-all-200 cursor-pointer shadow-soft"
            type="button"
          >
            Confirm Submission
          </button>
        </div>
      </div>
    </div>
  );
}
