'use client';

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldCheck, BookOpen, GraduationCap, UserCog } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';

export default function LoginPage() {
  const { loginAsTeacher, loginAsStudent, isMounted } = useAuth();

  if (!isMounted) return null;

  return (
    <div className="min-h-full flex flex-col justify-between bg-background text-foreground transition-all-200">
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold shadow-soft">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-primary dark:text-foreground">ExamCore</span>
            <p className="text-[10px] text-secondary tracking-widest uppercase -mt-1 font-medium">Physics Portal</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card-bg p-8 sm:p-10 rounded-xl border border-surface-border shadow-soft">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Portal Access
            </h1>
            <p className="mt-2 text-sm text-secondary">
              Select your academic pathway to access the secure physics testing portal.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={loginAsStudent}
              className="w-full flex items-center justify-between px-6 py-5 border border-surface-border rounded-lg bg-card-bg hover:bg-surface text-foreground shadow-soft hover:border-primary/30 transition-all-200 group text-left cursor-pointer focus-ring"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-all-200 mt-0.5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-6 group-hover:text-primary transition-all-200">
                    Student Login
                  </h3>
                  <p className="text-sm text-secondary mt-0.5">
                    Access assigned exams, complete syllabus tests, and view grade books.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={loginAsTeacher}
              className="w-full flex items-center justify-between px-6 py-5 border border-surface-border rounded-lg bg-card-bg hover:bg-surface text-foreground shadow-soft hover:border-primary/30 transition-all-200 group text-left cursor-pointer focus-ring"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500/20 transition-all-200 mt-0.5">
                  <UserCog className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-6 group-hover:text-primary transition-all-200">
                    Educator & Admin Portal
                  </h3>
                  <p className="text-sm text-secondary mt-0.5">
                    Build physics assessments, manage student rosters, and monitor progress.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Footer banner */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-secondary border-t border-surface-border/50">
        &copy; {new Date().getFullYear()} ExamCore Physics Testing. Securely encrypted session.
      </footer>
    </div>
  );
}
