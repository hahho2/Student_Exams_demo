'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import {
  BookOpen,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Users,
  TrendingUp,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, role, classLevel, stream, logout, isMounted } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isMounted) return null;

  const teacherNavItems = [
    { name: 'Overview', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'Exam Manager', path: '/teacher/exams', icon: ClipboardList },
    { name: 'Student Roster', path: '/teacher/students', icon: Users },
    { name: 'Gradebook', path: '/teacher/progress', icon: TrendingUp },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const getStreamText = () => {
    if (!stream) return '';
    return stream === 'medical' ? 'Medical' : 'Non-Medical';
  };

  // Student top navbar layout
  if (role === 'student') {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-all-200">
        <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-card-bg/95 backdrop-blur-md shadow-soft">
          <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-lg font-bold tracking-tight text-primary dark:text-foreground">ExamCore</span>
                  <p className="text-[9px] text-secondary tracking-widest uppercase -mt-1 font-medium">Student</p>
                </div>
              </div>
              
              {classLevel && (
                <div className="hidden md:flex items-center gap-2 text-xs bg-surface border border-surface-border px-2.5 py-1 rounded-md">
                  <GraduationCap className="w-3.5 h-3.5 text-secondary" />
                  <span className="font-medium text-secondary">
                    Class {classLevel} {getStreamText() ? `• ${getStreamText()}` : ''}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-border bg-card-bg hover:bg-surface text-secondary hover:text-foreground text-sm font-medium transition-all-200 cursor-pointer shadow-soft"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-[1120px] w-full mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    );
  }

  // Teacher Sidebar Layout
  return (
    <div className="min-h-screen flex bg-background text-foreground transition-all-200">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r border-surface-border bg-card-bg py-6 px-4 shrink-0 shadow-soft">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-primary dark:text-foreground">Admin Portal</span>
              <p className="text-[10px] text-secondary tracking-widest uppercase -mt-1 font-medium">Academic Year 2026</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {teacherNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-secondary hover:text-foreground hover:bg-surface'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile and logout */}
        <div className="space-y-4 pt-4 border-t border-surface-border/50 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
              VM
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate leading-none">Dr. Vikrant Mehta</p>
              <span className="text-[10px] text-secondary">Physics Head</span>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <ThemeToggle />
            </div>
            <button
              onClick={logout}
              className="flex items-center justify-center p-2 rounded-lg border border-surface-border bg-card-bg hover:bg-surface text-secondary hover:text-foreground cursor-pointer shadow-soft"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer/Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-40 w-full border-b border-surface-border bg-card-bg/95 backdrop-blur-md flex items-center justify-between px-6 h-16 shadow-soft">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-primary dark:text-foreground">Admin Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-surface text-secondary hover:text-foreground cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-30 bg-background/95 backdrop-blur-md p-6 space-y-6">
            <nav className="space-y-2">
              {teacherNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-secondary hover:text-foreground hover:bg-surface'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-surface-border/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-base flex items-center justify-center">
                  VM
                </div>
                <div>
                  <p className="text-sm font-semibold">Dr. Vikrant Mehta</p>
                  <span className="text-xs text-secondary">Physics Department Head</span>
                </div>
              </div>

              <button
                onClick={() => {
                  handleLinkClick();
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-surface-border bg-card-bg hover:bg-surface text-secondary hover:text-foreground text-sm font-bold shadow-soft cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1120px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
