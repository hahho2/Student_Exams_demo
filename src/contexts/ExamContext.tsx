'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Exam, Submission, Question, ClassLevel, Stream } from '../types';
import { getStorageItem, setStorageItem } from '../lib/localStorage';
import { MOCK_EXAMS } from '../data/exams';
import { MOCK_SUBMISSIONS } from '../data/submissions';

interface ExamContextType {
  exams: Exam[];
  submissions: Submission[];
  createExam: (exam: Omit<Exam, 'id' | 'createdAt' | 'teacherId'>) => void;
  submitExam: (submission: Omit<Submission, 'id' | 'submittedAt'>) => Submission;
  toggleExamProtocol: (examId: string) => void;
  getExamById: (id: string) => Exam | undefined;
  getSubmissionById: (id: string) => Submission | undefined;
  isMounted: boolean;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: React.ReactNode }) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Sync lists with localStorage and fallback to mock files
    const localExams = getStorageItem<Exam[]>('createdExams', []);
    const localSubmissions = getStorageItem<Submission[]>('submissions', []);

    // Combine static mock exams with custom created exams
    const combinedExams = [...MOCK_EXAMS];
    if (localExams.length > 0) {
      // If we have custom lists, let's sync them ensuring we have static mocks as well
      localExams.forEach((local) => {
        const idx = combinedExams.findIndex((me) => me.id === local.id);
        if (idx !== -1) {
          combinedExams[idx] = local; // Apply loaded overrides to mock exams (e.g. protocol toggles)
        } else {
          combinedExams.push(local); // Append newly created exams
        }
      });
    }

    const combinedSubmissions = [...MOCK_SUBMISSIONS];
    localSubmissions.forEach((local) => {
      if (!combinedSubmissions.some((ms) => ms.id === local.id)) {
        combinedSubmissions.push(local);
      }
    });

    setExams(combinedExams);
    setSubmissions(combinedSubmissions);
    setIsMounted(true);
  }, []);

  const createExam = (newExamData: Omit<Exam, 'id' | 'createdAt' | 'teacherId'>) => {
    const newExam: Exam = {
      ...newExamData,
      id: `exam_${Date.now()}`,
      teacherId: 't1', // Vikrant Mehta
      createdAt: new Date().toISOString()
    };

    const updatedExams = [...exams, newExam];
    setExams(updatedExams);

    // Save all customized exams list to local storage so overrides are remembered
    setStorageItem('createdExams', updatedExams);
  };

  const toggleExamProtocol = (examId: string) => {
    const updated = exams.map((e) => {
      if (e.id === examId) {
        return { ...e, isProtocolEnabled: !e.isProtocolEnabled };
      }
      return e;
    });
    setExams(updated);
    setStorageItem('createdExams', updated);
  };

  const submitExam = (submissionData: Omit<Submission, 'id' | 'submittedAt'>): Submission => {
    const finalSubmission: Submission = {
      ...submissionData,
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toISOString()
    };

    const updatedSubmissions = [...submissions, finalSubmission];
    setSubmissions(updatedSubmissions);

    const customSubmissions = getStorageItem<Submission[]>('submissions', []);
    setStorageItem('submissions', [...customSubmissions, finalSubmission]);

    return finalSubmission;
  };

  const getExamById = (id: string) => {
    return exams.find((e) => e.id === id);
  };

  const getSubmissionById = (id: string) => {
    return submissions.find((s) => s.id === id);
  };

  return (
    <ExamContext.Provider
      value={{
        exams,
        submissions,
        createExam,
        submitExam,
        toggleExamProtocol,
        getExamById,
        getSubmissionById,
        isMounted
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}
