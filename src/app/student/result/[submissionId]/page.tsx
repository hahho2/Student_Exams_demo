'use client';

import React, { use } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { useExam } from '../../../../contexts/ExamContext';
import AppLayout from '../../../../components/AppLayout';
import SubmissionSummary from '../../../../components/SubmissionSummary';

interface ResultPageProps {
  params: Promise<{ submissionId: string }>;
}

export default function ResultPage({ params }: ResultPageProps) {
  const { submissionId } = use(params);
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
      <div className="max-w-[768px] mx-auto space-y-12 animate-in fade-in duration-300">
        <SubmissionSummary
          submission={submission}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          notAttemptedCount={notAttemptedCount}
        />
      </div>
    </AppLayout>
  );
}
