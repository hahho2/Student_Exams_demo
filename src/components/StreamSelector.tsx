'use client';

import React from 'react';
import { Stream } from '../types';
import { Activity, Cpu, ArrowLeft, ArrowRight } from 'lucide-react';

interface StreamSelectorProps {
  selectedClass: string;
  selectedStream: Stream;
  onSelectStream: (stream: Stream) => void;
  onBack: () => void;
  onProceed: () => void;
}

export default function StreamSelector({
  selectedClass,
  selectedStream,
  onSelectStream,
  onBack,
  onProceed
}: StreamSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Select Physics Stream</h1>
        <p className="text-sm text-secondary">
          Specialized syllabi apply for Class {selectedClass} Medical and Non-Medical tracks.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelectStream('medical')}
          className={`flex flex-col items-center justify-center p-6 border rounded-lg bg-card-bg hover:bg-surface text-foreground shadow-soft transition-all-200 group text-center cursor-pointer focus-ring ${
            selectedStream === 'medical'
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-surface-border hover:border-primary/30'
          }`}
          type="button"
        >
          <Activity className={`w-8 h-8 mb-3 transition-all-200 ${
            selectedStream === 'medical' ? 'text-primary' : 'text-secondary group-hover:text-primary'
          }`} />
          <span className="text-lg font-bold">Medical Stream</span>
          <span className="text-xs text-secondary mt-1">Oscillations, Waves & Thermal Focus</span>
        </button>

        <button
          onClick={() => onSelectStream('non_medical')}
          className={`flex flex-col items-center justify-center p-6 border rounded-lg bg-card-bg hover:bg-surface text-foreground shadow-soft transition-all-200 group text-center cursor-pointer focus-ring ${
            selectedStream === 'non_medical'
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-surface-border hover:border-primary/30'
          }`}
          type="button"
        >
          <Cpu className={`w-8 h-8 mb-3 transition-all-200 ${
            selectedStream === 'non_medical' ? 'text-primary' : 'text-secondary group-hover:text-primary'
          }`} />
          <span className="text-lg font-bold">Non-Medical Stream</span>
          <span className="text-xs text-secondary mt-1">Kinematics, Rotational & Solids Focus</span>
        </button>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-secondary hover:text-foreground cursor-pointer"
          type="button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Class</span>
        </button>

        <button
          onClick={onProceed}
          disabled={!selectedStream}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all-200 cursor-pointer ${
            selectedStream
              ? 'bg-primary hover:bg-primary-hover text-primary-foreground shadow-soft'
              : 'bg-surface text-secondary cursor-not-allowed border border-surface-border'
          }`}
          type="button"
        >
          <span>Enter Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
