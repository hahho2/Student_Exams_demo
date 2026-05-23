'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useExam } from '../../../contexts/ExamContext';
import AppLayout from '../../../components/AppLayout';
import TeacherDashboard from '../../../components/TeacherDashboard';

export default function TeacherDashboardPage() {
  const { currentUser, isMounted: authMounted } = useAuth();
  const { exams, submissions, isMounted: examMounted } = useExam();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!authMounted || !examMounted) return null;

  return (
    <AppLayout>
      <TeacherDashboard
        exams={exams}
        submissions={submissions}
        mounted={mounted}
      />
    </AppLayout>
  );
}
