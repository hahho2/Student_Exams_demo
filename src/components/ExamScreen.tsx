'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Exam, Submission, User, ClassLevel, Stream } from '../types';
import { Clock, AlertTriangle, CheckSquare, Play, ShieldAlert, ShieldCheck } from 'lucide-react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../lib/localStorage';
import ThemeToggle from './ThemeToggle';
import WarningModal from './WarningModal';
import ConfirmSubmitModal from './ConfirmSubmitModal';
import PhysicsQuestionCard from './PhysicsQuestionCard';

interface ExamScreenProps {
  exam: Exam;
  currentUser: User | null;
  classLevel: ClassLevel | null;
  stream: Stream;
  onSubmit: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void;
  onExitFullscreen: () => void;
}

export default function ExamScreen({
  exam,
  currentUser,
  classLevel,
  stream,
  onSubmit,
  onExitFullscreen
}: ExamScreenProps) {
  const examId = exam.id;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [warnings, setWarnings] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExamActive, setIsExamActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Security protocol states
  const [isProtocolEnforced, setIsProtocolEnforced] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from localStorage on mount and check protocol rules
  useEffect(() => {
    const ansKey = `exam_ans_${examId}`;
    const flgKey = `exam_flg_${examId}`;
    const warnKey = `exam_warn_${examId}`;
    const timeKey = `exam_time_${examId}`;
    const idxKey = `exam_idx_${examId}`;
    const activeKey = `exam_active_${examId}`;

    setAnswers(getStorageItem<Record<string, string>>(ansKey, {}));
    setFlagged(getStorageItem<Record<string, boolean>>(flgKey, {}));
    setWarnings(getStorageItem<number>(warnKey, 0));
    setTimeLeft(getStorageItem<number>(timeKey, exam.durationMinutes * 60));
    setCurrentIdx(getStorageItem<number>(idxKey, 0));
    setIsExamActive(getStorageItem<boolean>(activeKey, false));

    // Audit security proctor protocol exemptions
    const examSec = exam.isProtocolEnabled !== false; // exam protocol defaults to true
    
    // Global bypass parameters
    const sMode = getStorageItem<'enforced' | 'exempt_all' | 'custom'>('studentBypassMode', 'custom');
    const exemptedStudents = getStorageItem<string[]>('exemptedStudentIds', []);
    const cMode = getStorageItem<'enforced' | 'exempt_all' | 'custom'>('classBypassMode', 'enforced');
    const exemptedClasses = getStorageItem<string[]>('exemptedClassLevels', []);

    let isStudentExempt = false;

    // Evaluate Class-level exemptions
    if (cMode === 'exempt_all') {
      isStudentExempt = true;
    } else if (cMode === 'custom' && classLevel && exemptedClasses.includes(classLevel)) {
      isStudentExempt = true;
    }

    // Evaluate Student-level exemptions (only if class bypass hasn't already exempted them)
    if (!isStudentExempt) {
      if (sMode === 'exempt_all') {
        isStudentExempt = true;
      } else if (sMode === 'custom' && currentUser && exemptedStudents.includes(currentUser.id)) {
        isStudentExempt = true;
      }
    }

    // Enforce protocol only if exam has it active AND student is NOT exempted!
    setIsProtocolEnforced(examSec && !isStudentExempt);
  }, [exam, examId, currentUser, classLevel]);

  // Sync state with localStorage
  useEffect(() => {
    if (!isExamActive) return;
    setStorageItem(`exam_ans_${examId}`, answers);
  }, [answers, isExamActive, examId]);

  useEffect(() => {
    if (!isExamActive) return;
    setStorageItem(`exam_flg_${examId}`, flagged);
  }, [flagged, isExamActive, examId]);

  useEffect(() => {
    if (!isExamActive) return;
    setStorageItem(`exam_warn_${examId}`, warnings);

    // Only lockout submit if protocol is active
    if (isProtocolEnforced && warnings >= 3) {
      handleFinalSubmit(true, true);
    }
  }, [warnings, isExamActive, examId, isProtocolEnforced]);

  useEffect(() => {
    if (!isExamActive) return;
    setStorageItem(`exam_idx_${examId}`, currentIdx);
  }, [currentIdx, isExamActive, examId]);

  // Countdown timer
  useEffect(() => {
    if (!isExamActive || timeLeft <= 0) {
      if (timeLeft === 0 && isExamActive) {
        handleFinalSubmit(true, false);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        setStorageItem(`exam_time_${examId}`, next);
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExamActive, timeLeft, examId]);

  // Page Visibility API Hook (only if protocol is active)
  useEffect(() => {
    if (!isExamActive || !isProtocolEnforced) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const next = prev + 1;
          setWarningMessage('Suspicious activity detected: Tab change or window minimization is not permitted.');
          setShowWarningModal(true);
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isExamActive, isProtocolEnforced]);

  // Fullscreen API Hook (only if protocol is active)
  useEffect(() => {
    if (!isExamActive || !isProtocolEnforced) return;

    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);

      if (!isFull) {
        setWarnings((prev) => {
          const next = prev + 1;
          setWarningMessage('Suspicious activity detected: Exiting distraction-free fullscreen mode is prohibited.');
          setShowWarningModal(true);
          return next;
        });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isExamActive, isProtocolEnforced]);

  const startExam = async () => {
    // Only launch fullscreen requests if protocol is active
    if (isProtocolEnforced) {
      try {
        if (containerRef.current) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.warn('Fullscreen request failed, proceeding with exam.', err);
      }
      setIsFullscreen(true);
    }
    
    setIsExamActive(true);
    setStorageItem(`exam_active_${examId}`, true);
  };

  const handleFinalSubmit = (force = false, isInfraction = false) => {
    if (!currentUser) return;

    let rawScore = 0;
    let maxScore = 0;

    exam.questions.forEach((q) => {
      maxScore += q.marks;
      const studentAns = answers[q.id] || '';
      
      if (q.questionType === 'mcq') {
        if (studentAns.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
          rawScore += q.marks;
        }
      } else {
        const isMatch = studentAns.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
        if (isMatch) {
          rawScore += q.marks;
        } else if (studentAns.trim().length > 15) {
          rawScore += Math.floor(q.marks * 0.8);
        }
      }
    });

    const percentage = Math.round((rawScore / maxScore) * 100);

    onSubmit({
      examId: exam.id,
      examTitle: exam.title,
      studentId: currentUser.id,
      studentName: currentUser.name,
      answers,
      score: rawScore,
      maxScore,
      percentage,
      warningsCount: force && isInfraction ? 3 : warnings,
      autoSubmitted: force,
      classLevel: classLevel || '9',
      stream: stream || null
    });

    // Clear saved states
    removeStorageItem(`exam_ans_${examId}`);
    removeStorageItem(`exam_flg_${examId}`);
    removeStorageItem(`exam_warn_${examId}`);
    removeStorageItem(`exam_time_${examId}`);
    removeStorageItem(`exam_idx_${examId}`);
    removeStorageItem(`exam_active_${examId}`);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.log(err));
    }

    if (timerRef.current) clearInterval(timerRef.current);
  };

  const currentQuestion = exam.questions[currentIdx];
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isExamActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-all-200 px-6">
        <div className="max-w-xl w-full bg-card-bg border border-surface-border p-8 rounded-xl shadow-soft space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">{exam.title}</h1>
            <p className="text-sm text-secondary">
              Subject: Physics • Duration: {exam.durationMinutes} Minutes • Points: {exam.questions.reduce((sum, q) => sum + q.marks, 0)}
            </p>
          </div>

          {/* PROTOCOL AWARE NOTIFICATIONS DETAILS */}
          {isProtocolEnforced ? (
            <div className="p-5 bg-warning-bg/50 border border-warning-border rounded-lg space-y-3">
              <h3 className="flex items-center gap-2 font-semibold text-warning text-sm">
                <AlertTriangle className="w-5 h-5" />
                <span>Assessment Protocol (Active)</span>
              </h3>
              <ul className="text-xs space-y-1.5 text-secondary list-disc pl-5">
                <li>This test will execute in a locked fullscreen window to minimize outside noise.</li>
                <li>Toggling tabs, minimizing this viewport, or exiting fullscreen creates an infraction.</li>
                <li>Accumulating <span className="font-bold text-error">3 infractions</span> will immediately lock and submit your answers.</li>
                <li>Draft saves are auto-recorded to this node; refreshes will resume active session.</li>
              </ul>
            </div>
          ) : (
            <div className="p-5 bg-success-bg text-success border border-success-border rounded-lg space-y-2">
              <h3 className="flex items-center gap-2 font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-success" />
                <span>Unproctored Concept Mode</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Exam security proctors are fully disabled for this attempt by the administrator. Fullscreen mode, tab changes, and window minimize tracking are inactive. Take the test at your convenience.
              </p>
            </div>
          )}

          <button
            onClick={startExam}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-lg shadow-soft transition-all-200 cursor-pointer"
            type="button"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Exam Environment</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col bg-background text-foreground transition-all-200 focus:outline-none"
      tabIndex={-1}
    >
      {/* Distraction-free Header */}
      <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-card-bg/95 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Physics Assessment</span>
          <span className="text-xs text-secondary">•</span>
          <span className="text-xs font-medium text-foreground truncate max-w-[200px] sm:max-w-md">{exam.title}</span>
        </div>

        <div className="flex items-center gap-6">
          {/* SECURITY STATUS BANNER */}
          {isProtocolEnforced ? (
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border ${
              warnings > 0 ? 'bg-error-bg text-error border-error-border' : 'bg-success-bg text-success border-success-border'
            }`}>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Infractions: {warnings}/3</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold border border-success-border bg-success-bg text-success">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security Off</span>
            </div>
          )}

          <div className={`px-4 py-1.5 rounded-lg border font-mono font-bold text-lg ${
            timeLeft < 300 ? 'bg-error-bg text-error border-error border-dashed animate-pulse' : 'bg-surface border-surface-border text-foreground'
          }`}>
            {formatTime(timeLeft)}
          </div>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Main split dashboard pane */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-6 py-8 gap-8">
        
        {/* Left pane: Active Question Card */}
        <PhysicsQuestionCard
          question={currentQuestion}
          index={currentIdx}
          total={exam.questions.length}
          answer={answers[currentQuestion.id] || ''}
          flagged={!!flagged[currentQuestion.id]}
          onAnswerChange={(ans) => setAnswers({ ...answers, [currentQuestion.id]: ans })}
          onFlagToggle={() => setFlagged({ ...flagged, [currentQuestion.id]: !flagged[currentQuestion.id] })}
          onPrevious={() => setCurrentIdx((p) => Math.max(0, p - 1))}
          onNext={() => setCurrentIdx((p) => Math.min(exam.questions.length - 1, p + 1))}
          isFirst={currentIdx === 0}
          isLast={currentIdx === exam.questions.length - 1}
        />

        {/* Right Pane: Question Navigator */}
        <aside className="w-full lg:w-72 bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft flex flex-col justify-between shrink-0 h-fit">
          <div className="space-y-6">
            <h3 className="font-bold text-sm text-secondary uppercase tracking-wider">Question Navigator</h3>
            
            <div className="grid grid-cols-5 gap-2.5">
              {exam.questions.map((q, idx) => {
                const isAttempted = !!answers[q.id];
                const isCurrent = idx === currentIdx;
                const isFlag = !!flagged[q.id];

                let btnClass = 'border-surface-border bg-card-bg hover:bg-surface text-foreground';
                if (isAttempted) btnClass = 'bg-primary text-primary-foreground border-primary';
                if (isFlag) btnClass = 'bg-warning/10 text-warning border-warning ring-1 ring-warning';
                if (isCurrent) btnClass = 'border-foreground font-bold border-2 ring-2 ring-primary/20';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-11 w-11 rounded-lg border flex items-center justify-center text-sm font-semibold transition-all-200 cursor-pointer ${btnClass}`}
                    type="button"
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5 pt-4 border-t border-surface-border/50 text-xs text-secondary font-medium">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded bg-primary" />
                <span>Attempted</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded bg-warning/20 border border-warning" />
                <span>Flagged for Review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded bg-card-bg border border-surface-border" />
                <span>Not Attempted</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full mt-8 py-3.5 bg-success hover:bg-success/90 text-primary-foreground font-bold rounded-lg shadow-soft transition-all-200 flex items-center justify-center gap-2 cursor-pointer"
            type="button"
          >
            <CheckSquare className="w-5 h-5" />
            <span>Finish and Submit</span>
          </button>
        </aside>
      </div>

      {/* Warning Alert Modal */}
      <WarningModal
        isOpen={showWarningModal}
        warningsCount={warnings}
        message={warningMessage}
        onAcknowledge={async () => {
          setShowWarningModal(false);
          try {
            if (containerRef.current && !document.fullscreenElement) {
              await containerRef.current.requestFullscreen();
            }
          } catch(e) {}
        }}
      />

      {/* Confirm Submit Modal */}
      <ConfirmSubmitModal
        isOpen={showConfirmModal}
        totalQuestions={exam.questions.length}
        attemptedCount={Object.keys(answers).length}
        flaggedCount={Object.keys(flagged).filter(k => flagged[k]).length}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={() => handleFinalSubmit(false, false)}
      />
    </div>
  );
}
