'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface WarningModalProps {
  isOpen: boolean;
  warningsCount: number;
  message: string;
  onAcknowledge: () => void;
}

export default function WarningModal({
  isOpen,
  warningsCount,
  message,
  onAcknowledge
}: WarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card-bg border border-error-border max-w-md w-full p-6 sm:p-8 rounded-xl shadow-2xl text-center space-y-5 animate-in zoom-in duration-200">
        <div className="mx-auto h-14 w-14 rounded-full bg-error-bg text-error flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-error">Testing Protocol Alert</h2>
          <p className="text-sm text-secondary leading-relaxed">
            {message}
          </p>
        </div>

        <div className="py-2.5 px-4 bg-error-bg text-error border border-error-border rounded-lg text-sm font-semibold">
          Warning {warningsCount} of 3. Next alert triggers auto-submit.
        </div>

        <button
          onClick={onAcknowledge}
          className="w-full py-3 bg-foreground text-background font-bold rounded-lg transition-all-200 cursor-pointer shadow-soft hover:opacity-90"
          type="button"
        >
          Acknowledge and Resume
        </button>
      </div>
    </div>
  );
}
