'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { LogOut, LayoutDashboard, ClipboardList, Users, TrendingUp, BookOpen } from 'lucide-react';

interface TeacherSidebarProps {
  onLogout: () => void;
}

export default function TeacherSidebar({ onLogout }: TeacherSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'Exam Manager', path: '/teacher/exams', icon: ClipboardList },
    { name: 'Student Roster', path: '/teacher/students', icon: Users },
    { name: 'Gradebook', path: '/teacher/progress', icon: TrendingUp },
  ];

  return (
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
          {navItems.map((item) => {
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

      {/* Profile and Settings footer */}
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
            onClick={onLogout}
            className="flex items-center justify-center p-2 rounded-lg border border-surface-border bg-card-bg hover:bg-surface text-secondary hover:text-foreground cursor-pointer shadow-soft"
            title="Sign Out"
            type="button"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
