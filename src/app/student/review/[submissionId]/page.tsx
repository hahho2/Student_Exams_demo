'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import { useExam } from '../../../../contexts/ExamContext';
import AppLayout from '../../../../components/AppLayout';
import { ArrowLeft, AlertCircle, Check, X, Minus } from 'lucide-react';
import Link from 'next/link';

interface ReviewPageProps {
  params: Promise<{ submissionId: string }>;
}

export default function DedicatedReviewPage({ params }: ReviewPageProps) {
  const { submissionId } = use(params);
  const router = useRouter();
  const { currentUser, isMounted: authMounted } = useAuth();
  const { getSubmissionById, getExamById, isMounted: examMounted } = useExam();

  if (!authMounted || !examMounted) return null;

  const submission = getSubmissionById(submissionId);
  if (!submission) {
    return <div className="p-8 text-center text-error">Submission records not found.</div>;
  }

  const exam = getExamById(submission.examId);

  const correctCount = exam
    ? exam.questions.filter((q) => {
        const studAns = submission.answers[q.id] || '';
        return studAns.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
      }).length
    : 0;

  const incorrectCount = exam
    ? exam.questions.filter((q) => {
        const studAns = submission.answers[q.id];
        if (!studAns) return false;
        return studAns.toLowerCase().trim() !== q.correctAnswer.toLowerCase().trim();
      }).length
    : 0;

  const notAttemptedCount = exam
    ? exam.questions.filter((q) => !submission.answers[q.id]).length
    : 0;

  return (
    <AppLayout>
      <div className="max-w-[768px] mx-auto space-y-8 animate-in fade-in duration-300">
        
        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between border-b border-surface-border/50 pb-4">
          <Link
            href={`/student/result/${submissionId}`}
            className="flex items-center gap-2 text-sm text-secondary hover:text-foreground cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results Dashboard</span>
          </Link>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider">
            Detailed Concept Key
          </span>
        </div>

        {/* Overview banner stats card */}
        <div className="bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft space-y-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Class {submission.classLevel} Physics Assessment Review
          </h1>
          <p className="text-sm text-secondary">
            Title: <span className="font-semibold text-foreground">{submission.examTitle}</span>
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-success-bg/30 border border-success-border rounded-lg text-center">
              <span className="text-xs text-success font-bold uppercase tracking-wider">Correct</span>
              <h3 className="text-2xl font-extrabold text-foreground mt-1">{correctCount}</h3>
            </div>
            <div className="p-3 bg-error-bg/30 border border-error-border rounded-lg text-center">
              <span className="text-xs text-error font-bold uppercase tracking-wider">Incorrect</span>
              <h3 className="text-2xl font-extrabold text-foreground mt-1">{incorrectCount}</h3>
            </div>
            <div className="p-3 bg-secondary/10 border border-surface-border rounded-lg text-center">
              <span className="text-xs text-secondary font-bold uppercase tracking-wider">Empty</span>
              <h3 className="text-2xl font-extrabold text-foreground mt-1">{notAttemptedCount}</h3>
            </div>
          </div>
        </div>

        {/* Detailed MCQ Question List Review */}
        {exam ? (
          <div className="space-y-6">
            {exam.questions.map((q, idx) => {
              const studAns = submission.answers[q.id] || '';
              const isCorrect = studAns.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
              const isAttempted = !!studAns;

              return (
                <div
                  key={q.id}
                  className="bg-card-bg border border-surface-border rounded-xl p-6 space-y-4 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                      Question {idx + 1}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold border ${
                      !isAttempted
                        ? 'bg-secondary/10 text-secondary border-surface-border'
                        : isCorrect
                        ? 'bg-success-bg text-success border-success-border'
                        : 'bg-error-bg text-error border-error-border'
                    }`}>
                      {!isAttempted ? 'Left Empty' : isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    {q.questionText}
                  </h3>

                  {/* MCQ Options list options */}
                  {q.options && (
                    <div className="space-y-2 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const letter = String.fromCharCode(65 + oIdx);
                        const isCorrectOption = q.correctAnswer === letter;
                        const isSelectedOption = studAns === letter;

                        let containerClass = 'border-surface-border bg-card-bg';
                        let labelText = '';

                        if (isCorrectOption) {
                          containerClass = 'border-success bg-success-bg/20 text-success font-medium';
                          if (isSelectedOption) labelText = 'Your Answer (Correct)';
                          else labelText = 'Correct Answer';
                        } else if (isSelectedOption) {
                          containerClass = 'border-error bg-error-bg/20 text-error font-medium';
                          labelText = 'Your Answer (Incorrect)';
                        }

                        return (
                          <div
                            key={opt}
                            className={`flex items-center justify-between p-3 border rounded-lg text-sm ${containerClass}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] ${
                                isCorrectOption
                                  ? 'bg-success border-success text-primary-foreground'
                                  : isSelectedOption
                                  ? 'bg-error border-error text-primary-foreground'
                                  : 'border-surface-border text-secondary'
                              }`}>
                                {letter}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {labelText && (
                              <span className="text-[10px] uppercase font-bold tracking-wider">
                                {labelText}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Left Empty Warning Alert Banner */}
                  {!isAttempted && (
                    <div className="p-3.5 bg-surface border border-surface-border/80 rounded-lg text-xs text-secondary font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <span>You left this question empty. The correct option was <span className="font-bold text-success">Option {q.correctAnswer}</span>.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-secondary italic">Curriculum parameters not loaded.</div>
        )}

      </div>
    </AppLayout>
  );
}
