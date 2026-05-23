'use client';

import React from 'react';
import { useExam } from '../../../contexts/ExamContext';
import AppLayout from '../../../components/AppLayout';
import { MOCK_USERS } from '../../../data/users';
import StudentRosterTable from '../../../components/StudentRosterTable';

export default function StudentRosterPage() {
  const { submissions, isMounted } = useExam();

  if (!isMounted) return null;

  const studentsList = MOCK_USERS.filter((u) => u.role === 'student');

  return (
    <AppLayout>
      <div className="space-y-10">
        
        {/* Header section */}
        <div className="pb-6 border-b border-surface-border/50">
          <h1 className="text-3xl font-extrabold tracking-tight">Student Roster</h1>
          <p className="text-secondary mt-1">
            Browse and monitor active students enrolled in the Physics curriculum.
          </p>
        </div>

        <StudentRosterTable
          studentsList={studentsList}
          submissions={submissions}
        />

      </div>
    </AppLayout>
  );
}
