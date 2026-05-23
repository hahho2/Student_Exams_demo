'use client';

import React, { useState, useEffect } from 'react';
import { User, Exam, Submission } from '../types';
import Link from 'next/link';
import {
  AlertCircle,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  TrendingUp,
  Award,
  AlertTriangle,
  FileCheck2
} from 'lucide-react';
import PendingExamCard from './PendingExamCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface StudentDashboardProps {
  currentUser: User | null;
  classLevel: string | null;
  assignedExams: Exam[];
  studentSubmissions: Submission[];
}

export default function StudentDashboard({
  currentUser,
  classLevel,
  assignedExams,
  studentSubmissions
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'exams' | 'performance'>('exams');
  const [chartMounted, setChartMounted] = useState(false);

  useEffect(() => {
    setChartMounted(true);
  }, []);

  const getGradeBadgeClass = (percentage: number) => {
    if (percentage >= 90) return 'bg-success-bg text-success border-success-border';
    if (percentage >= 75) return 'bg-primary/10 text-primary border-primary/20';
    return 'bg-warning-bg text-warning border-warning-border';
  };

  const getSyllabusLabel = () => {
    if (!classLevel) return 'General';
    return `Class ${classLevel} Curriculum`;
  };

  // Performance calculations
  const completedCount = studentSubmissions.length;
  const averageScore = completedCount > 0
    ? Math.round(studentSubmissions.reduce((sum, s) => sum + s.percentage, 0) / completedCount)
    : 0;

  const totalWarnings = studentSubmissions.reduce(
    (sum, s) => sum + s.warningsCount,
    0
  );

  const getProficiencyCategory = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Proficient';
    if (score >= 50) return 'Developing';
    return 'Revision Required';
  };

  // Chart data mapping based on completed attempts
  const getChartData = () => {
    if (studentSubmissions.length > 0) {
      return [...studentSubmissions]
        .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime())
        .map((s) => ({
          name: s.examTitle.split(':')[0] || 'Quiz',
          score: s.percentage
        }));
    }
    // Base standard template if zero attempts exist
    return [
      { name: 'Start', score: 0 }
    ];
  };

  const chartData = getChartData();

  return (
    <div className="space-y-10">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-surface-border/50">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser?.name.split(' ')[0]}.
          </h1>
          <p className="text-secondary mt-1">
            Analyze your physics concepts and complete assigned school assessments.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/student/select-class"
            className="flex items-center gap-1.5 px-4 py-2 border border-surface-border bg-card-bg hover:bg-surface text-secondary hover:text-foreground text-sm font-semibold rounded-lg shadow-soft transition-all-200 cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Change Class / Stream</span>
          </Link>
        </div>
      </div>

      {/* Interactive Navigation Tabs */}
      <div className="flex border-b border-surface-border">
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all-200 cursor-pointer ${
            activeTab === 'exams'
              ? 'border-primary text-primary'
              : 'border-transparent text-secondary hover:text-foreground'
          }`}
          type="button"
        >
          My Assigned Exams ({assignedExams.length})
        </button>

        <button
          onClick={() => setActiveTab('performance')}
          className={`px-6 py-3.5 font-bold text-sm border-b-2 transition-all-200 cursor-pointer ${
            activeTab === 'performance'
              ? 'border-primary text-primary'
              : 'border-transparent text-secondary hover:text-foreground'
          }`}
          type="button"
        >
          Performance Analytics Board
        </button>
      </div>

      {activeTab === 'exams' ? (
        /* ASSIGNED EXAMS PANEL */
        <div className="space-y-10">
          {/* Up Next Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Up Next</h2>
            
            {assignedExams.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-card-bg border border-dashed border-surface-border rounded-xl text-center">
                <AlertCircle className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold text-lg">No pending assessments</h3>
                <p className="text-sm text-secondary mt-1 max-w-sm">
                  Your syllabus is fully up-to-date. Active exams will appear here when assigned by your educator.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignedExams.map((exam) => (
                  <PendingExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Grades Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Grades</h2>
            </div>

            {studentSubmissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-card-bg border border-dashed border-surface-border rounded-xl text-center">
                <BookOpen className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold text-lg">No exam history</h3>
                <p className="text-sm text-secondary mt-1">
                  Completed exam submissions and analytics reports will show up here.
                </p>
              </div>
            ) : (
              <div className="bg-card-bg border border-surface-border rounded-xl overflow-hidden shadow-soft">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface text-secondary font-semibold text-xs uppercase border-b border-surface-border">
                        <th className="px-6 py-4">Assessment / Exam</th>
                        <th className="px-6 py-4">Date Completed</th>
                        <th className="px-6 py-4">Behavior Log</th>
                        <th className="px-6 py-4 text-right">Score Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border/50 text-sm">
                      {studentSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-surface/50 transition-all-200">
                          <td className="px-6 py-4">
                            <div>
                              <Link
                                href={`/student/result/${sub.id}`}
                                className="font-semibold text-foreground hover:text-primary transition-all-200 block"
                              >
                                Class {sub.classLevel} Physics: {sub.examTitle}
                              </Link>
                              <span className="text-[11px] text-secondary">
                                Submitted: {sub.autoSubmitted ? 'Auto-Graded' : 'Complete'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-secondary">
                            {new Date(sub.submittedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                              sub.warningsCount > 0
                                ? 'bg-error-bg text-error border-error-border'
                                : 'bg-success-bg text-success border-success-border'
                            }`}>
                              {sub.warningsCount} warnings logged
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getGradeBadgeClass(sub.percentage)}`}>
                                {sub.percentage}%
                              </span>
                              <Link
                                href={`/student/result/${sub.id}`}
                                className="text-secondary hover:text-foreground cursor-pointer"
                                title="View Result Summary"
                              >
                                <ArrowUpRight className="w-4 h-4" />
                              </Link>
                            </div>
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
        /* STUDENT PERFORMANCE BOARD TAB */
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Stat indicators card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group hover:border-primary/30 transition-all-200">
              <div className="space-y-1">
                <p className="text-xs uppercase text-secondary font-bold tracking-wider">Average Physics Score</p>
                <h2 className="text-3xl font-extrabold text-foreground group-hover:text-primary transition-all-200">
                  {completedCount > 0 ? `${averageScore}%` : 'N/A'}
                </h2>
                <span className="text-[10px] text-secondary">Concept proficiency index</span>
              </div>
              <div className="w-11 h-11 rounded-lg bg-indigo-500/10 text-primary flex items-center justify-center">
                <TrendingUp className="w-5.5 h-5.5" />
              </div>
            </div>

            <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group hover:border-primary/30 transition-all-200">
              <div className="space-y-1">
                <p className="text-xs uppercase text-secondary font-bold tracking-wider">Exams Completed</p>
                <h2 className="text-3xl font-extrabold text-foreground group-hover:text-primary transition-all-200">
                  {completedCount}
                </h2>
                <span className="text-[10px] text-secondary">Total attempts logged</span>
              </div>
              <div className="w-11 h-11 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <FileCheck2 className="w-5.5 h-5.5" />
              </div>
            </div>

            <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group hover:border-primary/30 transition-all-200">
              <div className="space-y-1">
                <p className="text-xs uppercase text-secondary font-bold tracking-wider">Overall Category</p>
                <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-all-200 truncate max-w-[140px]">
                  {completedCount > 0 ? getProficiencyCategory(averageScore) : 'Pending'}
                </h2>
                <span className="text-[10px] text-secondary">Performance status</span>
              </div>
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Award className="w-5.5 h-5.5" />
              </div>
            </div>

            <div className="bg-card-bg border border-surface-border p-6 rounded-xl shadow-soft flex items-center justify-between group hover:border-primary/30 transition-all-200">
              <div className="space-y-1">
                <p className="text-xs uppercase text-secondary font-bold tracking-wider">Total Infractions</p>
                <h2 className="text-3xl font-extrabold text-foreground group-hover:text-primary transition-all-200">
                  {totalWarnings}
                </h2>
                <span className="text-[10px] text-secondary">Browser warnings logged</span>
              </div>
              <div className="w-11 h-11 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-5.5 h-5.5" />
              </div>
            </div>

          </div>

          {/* Student growth line chart curve */}
          <div className="bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-base">Concept Growth Trend</h3>
              <p className="text-xs text-secondary">Score progression chart across assessments</p>
            </div>

            <div className="w-full h-64 mt-4">
              {chartMounted && completedCount > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-border)" />
                    <XAxis
                      dataKey="name"
                      stroke="var(--secondary)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="var(--secondary)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card-bg)',
                        borderColor: 'var(--surface-border)',
                        color: 'var(--foreground)',
                        fontSize: '12px',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      dot={{ strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-surface-border rounded-lg text-center p-8 bg-surface">
                  <AlertCircle className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-bold text-base">Progression data unavailable</h4>
                  <p className="text-xs text-secondary mt-1">Complete your first assigned exam to initialize concept growth line charts.</p>
                </div>
              )}
            </div>
          </div>

          {/* Submission history reference links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg tracking-tight">Recent Submissions</h3>
            
            {studentSubmissions.length === 0 ? (
              <p className="text-xs text-secondary italic">No exam history recorded.</p>
            ) : (
              <div className="bg-card-bg border border-surface-border rounded-xl overflow-hidden shadow-soft">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface text-secondary font-semibold text-xs uppercase border-b border-surface-border">
                        <th className="px-6 py-4">Exam Title</th>
                        <th className="px-6 py-4">Attempt Date</th>
                        <th className="px-6 py-4 text-center">Warnings</th>
                        <th className="px-6 py-4 text-right">Score</th>
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
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex px-2 py-0.5 rounded text-xs ${
                              sub.warningsCount > 0 ? 'bg-error-bg text-error border-error-border' : 'bg-success-bg text-success border-success-border'
                            } border`}>
                              {sub.warningsCount}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-primary">
                            <Link href={`/student/result/${sub.id}`} className="hover:underline flex items-center justify-end gap-1.5 cursor-pointer">
                              <span>{sub.percentage}%</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
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
      )}

    </div>
  );
}
