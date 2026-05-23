'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import { useExam } from '../../../../contexts/ExamContext';
import ExamScreen from '../../../../components/ExamScreen';

interface PageProps {
  params: Promise<{ examId: string }>;
}

export default function ExamPage({ params }: PageProps) {
  const { examId } = use(params);
  const router = useRouter();
  const { currentUser, classLevel, stream, isMounted: authMounted } = useAuth();
  const { getExamById, submitExam, isMounted: examMounted } = useExam();

  const exam = getExamById(examId);

  if (!authMounted || !examMounted) return null;
  if (!exam) return <div className="p-8 text-center text-error">Assessment parameters not loaded.</div>;

  const handleSubmit = (subData: any) => {
    const sub = submitExam(subData);
    router.push(`/student/result/${sub.id}`);
  };

  return (
    <ExamScreen
      exam={exam}
      currentUser={currentUser}
      classLevel={classLevel}
      stream={stream}
      onSubmit={handleSubmit}
      onExitFullscreen={() => {}}
    />
  );
}
