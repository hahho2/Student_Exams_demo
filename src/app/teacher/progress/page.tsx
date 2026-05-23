'use client';

import React, { useState, useEffect } from 'react';
import { useExam } from '../../../contexts/ExamContext';
import AppLayout from '../../../components/AppLayout';
import { MOCK_USERS } from '../../../data/users';
import { MOCK_STUDENT_PROGRESS } from '../../../data/progress';
import ProgressChart from '../../../components/ProgressChart';
import {
  Award,
  AlertTriangle,
  FileCheck2,
  GraduationCap
} from 'lucide-react';

export default function GradebookPage() {
  const { submissions, isMounted } = useExam();

  const students = MOCK_USERS.filter((u) => u.role === 'student');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (students.length > 0) {
      setSelectedStudentId(students[0].id);
    }
  }, []);

  if (!isMounted) return null;

  const currentStudent = students.find((s) => s.id === selectedStudentId);

  const studentSubmissions = submissions.filter(
    (s) => s.studentId === selectedStudentId
  );

  const completedCount = studentSubmissions.length;
  const averageScore = completedCount > 0
    ? Math.round(studentSubmissions.reduce((sum, s) => sum + s.percentage, 0) / completedCount)
    : 0;

  const warningCount = studentSubmissions.reduce(
    (sum, s) => sum + s.warningsCount,
    0
  );

  const getChartData = () => {
    if (currentStudent && MOCK_STUDENT_PROGRESS[currentStudent.id]) {
      return MOCK_STUDENT_PROGRESS[currentStudent.id];
    }
    if (studentSubmissions.length > 0) {
      return [...studentSubmissions]
        .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime())
        .map((s) => ({
          name: s.examTitle.split(':')[0] || 'Assessment',
          score: s.percentage
        }));
    }
    return [{ name: 'Intro', score: 0 }];
  };

  const chartData = getChartData();

  return (
    <AppLayout>
      <div className="space-y-10">
        
        {/* Top header selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-surface-border/50">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Gradebook</h1>
            <p className="text-secondary mt-1">
              Select and analyze individual student performance trends.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase text-secondary">Student Profile:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="p-2.5 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-sm font-semibold"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Class {s.classLevel})
                </option>
              ))}
            </select>
          </div>
        </div>

        {currentStudent ? (
          <div className="space-y-8">
            
            {/* Student Stats overview summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group">
                <div className="space-y-1">
                  <p className="text-xs uppercase text-secondary font-bold tracking-wider">Assigned Curriculum</p>
                  <h3 className="text-lg font-bold text-foreground truncate max-w-[140px]">
                    Class {currentStudent.classLevel}
                  </h3>
                  <span className="text-[10px] text-secondary">
                    {currentStudent.stream ? currentStudent.stream.replace('_', ' ').toUpperCase() : 'GENERAL PHYSICS'}
                  </span>
                </div>
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <GraduationCap className="w-5.5 h-5.5" />
                </div>
              </div>

              <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group">
                <div className="space-y-1">
                  <p className="text-xs uppercase text-secondary font-bold tracking-wider">Completed Exams</p>
                  <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-all-200">
                    {completedCount}
                  </h3>
                  <span className="text-[10px] text-secondary">Syllabus assessments taken</span>
                </div>
                <div className="w-11 h-11 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <FileCheck2 className="w-5.5 h-5.5" />
                </div>
              </div>

              <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group">
                <div className="space-y-1">
                  <p className="text-xs uppercase text-secondary font-bold tracking-wider">Average Score</p>
                  <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-all-200">
                    {averageScore > 0 ? `${averageScore}%` : 'N/A'}
                  </h3>
                  <span className="text-[10px] text-secondary">Weighted cumulative grade</span>
                </div>
                <div className="w-11 h-11 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Award className="w-5.5 h-5.5" />
                </div>
              </div>

              <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group">
                <div className="space-y-1">
                  <p className="text-xs uppercase text-secondary font-bold tracking-wider">Infraction warning log</p>
                  <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-all-200">
                    {warningCount}
                  </h3>
                  <span className="text-[10px] text-secondary">Browser warnings triggered</span>
                </div>
                <div className="w-11 h-11 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <AlertTriangle className="w-5.5 h-5.5" />
                </div>
              </div>

            </div>

            {/* Performance growth chart */}
            <ProgressChart
              data={chartData}
              mounted={mounted}
            />

            {/* Student specific submissions table history */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg tracking-tight">Submission History</h3>
              
              {studentSubmissions.length === 0 ? (
                <p className="text-xs text-secondary italic">No exam attempts logged for this student.</p>
              ) : (
                <div className="bg-card-bg border border-surface-border rounded-xl overflow-hidden shadow-soft">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface text-secondary font-semibold text-xs uppercase border-b border-surface-border">
                          <th className="px-6 py-4">Exam Title</th>
                          <th className="px-6 py-4">Attempt Date</th>
                          <th className="px-6 py-4 text-center">Warnings Logged</th>
                          <th className="px-6 py-4 text-right">Raw Score / Pct</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-border/50 text-sm">
                        {studentSubmissions.map((sub) => (
                          <tr key={sub.id} className="hover:bg-surface/50 transition-all-200">
                            <td className="px-6 py-4 font-semibold text-foreground">
                              {sub.examTitle}
                            </td>
                            <td className="px-6 py-4 text-secondary">
                              {new Date(sub.submittedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 text-center font-medium">
                              <span className={`inline-flex px-2 py-0.5 rounded text-xs ${
                                sub.warningsCount > 0 ? 'bg-error-bg text-error' : 'bg-success-bg text-success'
                              }`}>
                                {sub.warningsCount}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-primary">
                              {sub.percentage}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="text-center p-8 text-secondary">Please configure at least one student profile.</div>
        )}

      </div>
    </AppLayout>
  );
}
