'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ClassLevel, Stream } from '../../../types';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../../../components/ThemeToggle';
import StudentClassSelector from '../../../components/StudentClassSelector';
import StreamSelector from '../../../components/StreamSelector';

export default function SelectClassPage() {
  const { setClassAndStream, logout, isMounted } = useAuth();
  const [selectedClass, setSelectedClass] = useState<ClassLevel | null>(null);
  const [selectedStream, setSelectedStream] = useState<Stream>(null);

  if (!isMounted) return null;

  const handleClassSelect = (cl: ClassLevel) => {
    setSelectedClass(cl);
    if (cl === '9' || cl === '10') {
      setClassAndStream(cl, null);
    } else {
      setSelectedStream(null); // Reset stream when changing class
    }
  };

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
  };

  const handleProceed = () => {
    if (selectedClass && (selectedClass === '11' || selectedClass === '12') && selectedStream) {
      setClassAndStream(selectedClass, selectedStream);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-background text-foreground transition-all-200">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-secondary hover:text-foreground cursor-pointer"
          type="button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Login</span>
        </button>
        <ThemeToggle />
      </header>

      {/* Main Flow Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full bg-card-bg p-8 sm:p-10 rounded-xl border border-surface-border shadow-soft">
          
          {!selectedClass || (selectedClass !== '11' && selectedClass !== '12') ? (
            <StudentClassSelector onSelectClass={handleClassSelect} />
          ) : (
            <StreamSelector
              selectedClass={selectedClass}
              selectedStream={selectedStream}
              onSelectStream={handleStreamSelect}
              onBack={() => setSelectedClass(null)}
              onProceed={handleProceed}
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-secondary border-t border-surface-border/50">
        Class level and physics parameters are stored locally on this terminal.
      </footer>
    </div>
  );
}
