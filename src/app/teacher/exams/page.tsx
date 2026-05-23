'use client';

import React, { useState } from 'react';
import { useExam } from '../../../contexts/ExamContext';
import AppLayout from '../../../components/AppLayout';
import PhysicsExamCreationForm from '../../../components/PhysicsExamCreationForm';
import { Clock, ShieldCheck, ShieldAlert } from 'lucide-react';

export default function ExamsManagerPage() {
  const { exams, createExam, toggleExamProtocol, isMounted } = useExam();
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!isMounted) return null;

  const handleSaveExam = (examData: any) => {
    createExam({
      ...examData,
      status: 'active',
      questions: examData.questions.map((q: any, idx: number) => ({
        ...q,
        id: `q_custom_${idx}_${Date.now()}`,
        examId: ''
      }))
    });
    setShowCreateForm(false);
  };

  return (
    <AppLayout>
      <div className="space-y-10">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-surface-border/50">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Exam Manager</h1>
            <p className="text-secondary mt-1">
              Create and manage syllabus-aligned Physics exams.
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg shadow-soft transition-all-200 cursor-pointer text-sm"
            type="button"
          >
            {showCreateForm ? 'Back to Manager' : 'Create New Exam'}
          </button>
        </div>

        {!showCreateForm ? (
          <div className="space-y-6">
            <h3 className="font-bold text-lg tracking-tight">Active Assessments</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exams.map((exam) => {
                const isSec = exam.isProtocolEnabled !== false; // default to true
                return (
                  <div
                    key={exam.id}
                    className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft hover:border-primary/30 transition-all-200 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        Class {exam.classLevel} {exam.stream ? `• ${exam.stream === 'medical' ? 'Medical' : 'Non-Medical'}` : ''}
                      </span>
                      <span className="text-xs text-secondary font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{exam.durationMinutes}m</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-1">
                        {exam.title}
                      </h3>
                      <p className="text-xs text-secondary">Topic: {exam.topic}</p>
                    </div>

                    {/* DYNAMIC SECURITY PROTOCOL SWITCH CARD SECTION */}
                    <div className="p-3 bg-surface border border-surface-border rounded-lg flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        {isSec ? (
                          <>
                            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-xs font-bold text-foreground">Proctoring Secure</span>
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="w-4 h-4 text-secondary shrink-0" />
                            <span className="text-xs font-bold text-secondary">Proctoring Disabled</span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => toggleExamProtocol(exam.id)}
                        className={`w-10 h-5.5 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                          isSec ? 'bg-primary justify-end' : 'bg-surface-border justify-start'
                        }`}
                        type="button"
                        title={isSec ? 'Deactivate security protocol' : 'Activate security proctoring'}
                      >
                        <span className="w-4.5 h-4.5 rounded-full bg-white shadow shadow-md transform" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-surface-border/50 text-xs text-secondary font-medium">
                      <span>{exam.questions.length} Questions assigned</span>
                      <span>Total points: {exam.questions.reduce((sum, q) => sum + q.marks, 0)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <PhysicsExamCreationForm
            onSave={handleSaveExam}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

      </div>
    </AppLayout>
  );
}
