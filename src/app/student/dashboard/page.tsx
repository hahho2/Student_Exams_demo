'use client';

import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useExam } from '../../../contexts/ExamContext';
import AppLayout from '../../../components/AppLayout';
import StudentDashboard from '../../../components/StudentDashboard';

export default function StudentDashboardPage() {
  const { currentUser, classLevel, stream, isMounted: authMounted } = useAuth();
  const { exams, submissions, isMounted: examMounted } = useExam();

  if (!authMounted || !examMounted) return null;

  // Filter exams based on student's class and stream
  const assignedExams = exams.filter(
    (exam) =>
      exam.classLevel === classLevel &&
      (classLevel === '11' || classLevel === '12' ? exam.stream === stream : true) &&
      exam.status === 'active'
  );

  // Filter past submissions for the current mock student
  const studentSubmissions = submissions.filter(
    (sub) => sub.studentId === currentUser?.id
  );

  return (
    <AppLayout>
      <StudentDashboard
        currentUser={currentUser}
        classLevel={classLevel}
        assignedExams={assignedExams}
        studentSubmissions={studentSubmissions}
      />
    </AppLayout>
  );
}
