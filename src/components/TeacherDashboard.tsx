'use client';

import React from 'react';
import { Exam, Submission } from '../types';
import Link from 'next/link';
import {
  Users,
  ClipboardCheck,
  Award,
  ArrowUpRight,
  Clock,
  FileCheck2,
  CalendarCheck
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import DashboardCard from './DashboardCard';
import { MOCK_PERFORMANCE_TREND } from '../data/progress';
import { MOCK_USERS } from '../data/users';

interface TeacherDashboardProps {
  exams: Exam[];
  submissions: Submission[];
  mounted: boolean;
}

export default function TeacherDashboard({
  exams,
  submissions,
  mounted
}: TeacherDashboardProps) {
  const totalStudents = MOCK_USERS.filter((u) => u.role === 'student').length;
  const activeExamsCount = exams.filter((e) => e.status === 'active').length;
  const completedSubmissionsCount = submissions.length;

  const averageClassScore = submissions.length > 0
    ? Math.round(submissions.reduce((sum, s) => sum + s.percentage, 0) / submissions.length)
    : 0;

  const activeExams = exams.filter((e) => e.status === 'active').slice(0, 3);
  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  const getWarningBadge = (warns: number) => {
    if (warns === 0) return 'bg-success-bg text-success border-success-border';
    if (warns < 3) return 'bg-warning-bg text-warning border-warning-border';
    return 'bg-error-bg text-error border-error border-dashed';
  };

  return (
    <div className="space-y-10">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-surface-border/50">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Physics Overview</h1>
          <p className="text-secondary mt-1">
            Here is a summary of your active physics examination environment.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border bg-card-bg text-secondary text-sm font-semibold shadow-soft">
            <CalendarCheck className="w-4 h-4 text-primary" />
            <span>Sat, May 23</span>
          </span>
        </div>
      </div>

      {/* Overview Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Active Exams" value={activeExamsCount} icon={FileCheck2} iconBgColor="bg-indigo-500/10" iconColor="text-primary" />
        <DashboardCard title="Total Students" value={totalStudents} icon={Users} iconBgColor="bg-emerald-500/10" iconColor="text-emerald-500" />
        <DashboardCard title="Submissions Completed" value={completedSubmissionsCount} icon={ClipboardCheck} iconBgColor="bg-amber-500/10" iconColor="text-amber-500" />
        <DashboardCard title="Average Class Score" value={`${averageClassScore}%`} icon={Award} trend="+4.2%" iconBgColor="bg-teal-500/10" iconColor="text-teal-500" />
      </div>

      {/* Split Dashboard Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Trend line curve chart */}
        <div className="lg:col-span-2 bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft space-y-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-bold text-base">Performance Trend</h3>
              <p className="text-xs text-secondary">Historical exam scoring index</p>
            </div>
            <span className="text-xs font-semibold text-secondary px-2.5 py-1 bg-surface border border-surface-border rounded-lg">
              Last 30 Days
            </span>
          </div>

          <div className="w-full h-64 mt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={MOCK_PERFORMANCE_TREND}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                    dataKey="averageScore"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                    dot={{ strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-surface border border-surface-border rounded-lg animate-pulse" />
            )}
          </div>
        </div>

        {/* Active exams side panel */}
        <div className="bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft space-y-6 flex flex-col justify-between">
          <div className="space-y-1.5">
            <h3 className="font-bold text-base">Active Physics Exams</h3>
            <p className="text-xs text-secondary">Assessments open for student attempts</p>
          </div>

          <div className="divide-y divide-surface-border/50 flex-1 flex flex-col justify-center">
            {activeExams.map((exam) => (
              <div key={exam.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-secondary uppercase">
                    Class {exam.classLevel}
                  </span>
                  <span className="text-[10px] text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{exam.durationMinutes}m</span>
                  </span>
                </div>
                <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-1">
                  {exam.title}
                </h4>
                <p className="text-[11px] text-secondary truncate">{exam.topic}</p>
              </div>
            ))}
          </div>

          <Link
            href="/teacher/exams"
            className="w-full text-center py-2 border border-surface-border bg-card-bg hover:bg-surface text-secondary hover:text-foreground text-xs font-bold rounded-lg transition-all-200 shadow-soft cursor-pointer block mt-4"
          >
            Manage Assessments
          </Link>
        </div>

      </div>

      {/* Recent submissions table list */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg tracking-tight">Recent Submissions</h3>
          <Link
            href="/teacher/progress"
            className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
          >
            <span>Gradebook analysis</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-card-bg border border-surface-border rounded-xl overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-secondary font-semibold text-xs uppercase border-b border-surface-border">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Assessment / Exam</th>
                  <th className="px-6 py-4">Time Completed</th>
                  <th className="px-6 py-4">Behavior warnings</th>
                  <th className="px-6 py-4 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50 text-sm">
                {recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface/50 transition-all-200">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {sub.studentName}
                    </td>
                    <td className="px-6 py-4 text-secondary">
                      Class {sub.classLevel} Physics • {sub.examTitle}
                    </td>
                    <td className="px-6 py-4 text-secondary">
                      {new Date(sub.submittedAt).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getWarningBadge(sub.warningsCount)}`}>
                        {sub.warningsCount === 3 ? '🔒 Submitted via Lockout' : `${sub.warningsCount} warnings logged`}
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
      </div>

    </div>
  );
}
