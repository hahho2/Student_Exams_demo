'use client';

import React, { useState, useEffect } from 'react';
import { User, Submission, ClassLevel } from '../types';
import { Mail, Activity, Cpu, ShieldCheck, ShieldAlert, Settings2, Users2, Layers } from 'lucide-react';
import { getStorageItem, setStorageItem } from '../lib/localStorage';

interface StudentRosterTableProps {
  studentsList: User[];
  submissions: Submission[];
}

type BypassMode = 'enforced' | 'exempt_all' | 'custom';

export default function StudentRosterTable({
  studentsList,
  submissions
}: StudentRosterTableProps) {
  // Student settings states
  const [studentMode, setStudentMode] = useState<BypassMode>('custom');
  const [exemptedIds, setExemptedIds] = useState<string[]>([]);
  
  // Class settings states
  const [classMode, setClassMode] = useState<BypassMode>('enforced');
  const [exemptedClasses, setExemptedClasses] = useState<ClassLevel[]>([]);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync configurations from localStorage
    setStudentMode(getStorageItem<BypassMode>('studentBypassMode', 'custom'));
    setExemptedIds(getStorageItem<string[]>('exemptedStudentIds', []));
    setClassMode(getStorageItem<BypassMode>('classBypassMode', 'enforced'));
    setExemptedClasses(getStorageItem<ClassLevel[]>('exemptedClassLevels', []));
    setMounted(true);
  }, []);

  // Sync state modifications with localStorage
  const updateStudentMode = (mode: BypassMode) => {
    setStudentMode(mode);
    setStorageItem('studentBypassMode', mode);
  };

  const updateClassMode = (mode: BypassMode) => {
    setClassMode(mode);
    setStorageItem('classBypassMode', mode);
  };

  const handleToggleStudent = (studentId: string) => {
    if (studentMode !== 'custom') return; // only active in custom select mode
    let updated: string[];
    if (exemptedIds.includes(studentId)) {
      updated = exemptedIds.filter(id => id !== studentId);
    } else {
      updated = [...exemptedIds, studentId];
    }
    setExemptedIds(updated);
    setStorageItem('exemptedStudentIds', updated);
  };

  const handleToggleClass = (level: ClassLevel) => {
    if (classMode !== 'custom') return;
    let updated: ClassLevel[];
    if (exemptedClasses.includes(level)) {
      updated = exemptedClasses.filter(c => c !== level);
    } else {
      updated = [...exemptedClasses, level];
    }
    setExemptedClasses(updated);
    setStorageItem('exemptedClassLevels', updated);
  };
  
  const getStudentStats = (studentId: string) => {
    const subs = submissions.filter((s) => s.studentId === studentId);
    const count = subs.length;
    const avg = count > 0 ? Math.round(subs.reduce((sum, s) => sum + s.percentage, 0) / count) : 0;
    const totalWarns = subs.reduce((sum, s) => sum + s.warningsCount, 0);
    return { count, avg, totalWarns };
  };

  const getStatusBadge = (avgScore: number, totalWarns: number) => {
    if (totalWarns >= 3) return 'bg-error-bg text-error border-error-border';
    if (avgScore >= 80) return 'bg-success-bg text-success border-success-border';
    if (avgScore > 0) return 'bg-primary/10 text-primary border-primary/20';
    return 'bg-surface text-secondary border-surface-border';
  };

  const getStatusLabel = (avgScore: number, totalWarns: number) => {
    if (totalWarns >= 3) return 'Review Lockouts';
    if (avgScore >= 80) return 'High Proficiency';
    if (avgScore > 0) return 'Standard Active';
    return 'Pending Attempt';
  };

  // Determine if a specific student profile gets proctored bypass
  const isStudentBypassed = (student: User) => {
    // 1. Check Class level bypass rules
    if (classMode === 'exempt_all') return true;
    if (classMode === 'custom' && student.classLevel && exemptedClasses.includes(student.classLevel)) return true;

    // 2. Check Student bypass rules
    if (studentMode === 'exempt_all') return true;
    if (studentMode === 'custom' && exemptedIds.includes(student.id)) return true;

    return false;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* EXEMPTION HUB CONTROL PANEL */}
      {mounted && (
        <div className="bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft space-y-6">
          <div className="flex items-center gap-2 border-b border-surface-border/50 pb-3">
            <Settings2 className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">Protocol Bypass Control Hub</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            
            {/* Student Exemption controls */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-bold text-foreground">
                <Users2 className="w-4 h-4 text-secondary" />
                <span>Student Bypass Settings</span>
              </h4>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg bg-surface hover:bg-surface/85 border-surface-border transition-all-200 cursor-pointer">
                  <input
                    type="radio"
                    name="studentBypass"
                    checked={studentMode === 'exempt_all'}
                    onChange={() => updateStudentMode('exempt_all')}
                    className="text-primary focus:ring-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="font-semibold block leading-tight">Allow All Students</span>
                    <span className="text-[11px] text-secondary">Bypasses security protocols globally for all students.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg bg-surface hover:bg-surface/85 border-surface-border transition-all-200 cursor-pointer">
                  <input
                    type="radio"
                    name="studentBypass"
                    checked={studentMode === 'enforced'}
                    onChange={() => updateStudentMode('enforced')}
                    className="text-primary focus:ring-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="font-semibold block leading-tight">Disallow All Students</span>
                    <span className="text-[11px] text-secondary">Enforces active testing protocols on all students.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg bg-surface hover:bg-surface/85 border-surface-border transition-all-200 cursor-pointer">
                  <input
                    type="radio"
                    name="studentBypass"
                    checked={studentMode === 'custom'}
                    onChange={() => updateStudentMode('custom')}
                    className="text-primary focus:ring-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="font-semibold block leading-tight">Select Custom Students</span>
                    <span className="text-[11px] text-secondary">Enable mouse clicking on specific student toggles below.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Class Exemption controls */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-bold text-foreground">
                <Layers className="w-4 h-4 text-secondary" />
                <span>Class Bypass Settings</span>
              </h4>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-lg bg-surface hover:bg-surface/85 border-surface-border transition-all-200 cursor-pointer">
                  <input
                    type="radio"
                    name="classBypass"
                    checked={classMode === 'exempt_all'}
                    onChange={() => updateClassMode('exempt_all')}
                    className="text-primary focus:ring-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="font-semibold block leading-tight">Allow All Classes</span>
                    <span className="text-[11px] text-secondary">Bypasses security protocols globally for all grade levels.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg bg-surface hover:bg-surface/85 border-surface-border transition-all-200 cursor-pointer">
                  <input
                    type="radio"
                    name="classBypass"
                    checked={classMode === 'enforced'}
                    onChange={() => updateClassMode('enforced')}
                    className="text-primary focus:ring-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="font-semibold block leading-tight">Disallow All Classes</span>
                    <span className="text-[11px] text-secondary">Enforces testing protocols across all classes.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-lg bg-surface hover:bg-surface/85 border-surface-border transition-all-200 cursor-pointer">
                  <input
                    type="radio"
                    name="classBypass"
                    checked={classMode === 'custom'}
                    onChange={() => updateClassMode('custom')}
                    className="text-primary focus:ring-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="font-semibold block leading-tight">Select Custom Classes</span>
                    <span className="text-[11px] text-secondary">Select specific grade levels using mouse clicks below:</span>
                  </div>
                </label>

                {/* Dynamic Class level check boxes */}
                {classMode === 'custom' && (
                  <div className="flex gap-4 p-2 bg-background border border-surface-border rounded-lg justify-around items-center">
                    {(['9', '10', '11', '12'] as ClassLevel[]).map((level) => {
                      const isCheck = exemptedClasses.includes(level);
                      return (
                        <button
                          key={level}
                          onClick={() => handleToggleClass(level)}
                          className={`px-3 py-1 text-xs font-semibold rounded border transition-all-200 cursor-pointer ${
                            isCheck ? 'bg-primary border-primary text-white' : 'bg-card-bg border-surface-border text-secondary hover:text-foreground'
                          }`}
                          type="button"
                        >
                          Class {level}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Student Roster Table list */}
      <div className="bg-card-bg border border-surface-border rounded-xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-secondary font-semibold text-xs uppercase border-b border-surface-border">
                <th className="px-6 py-4">Student Profile</th>
                <th className="px-6 py-4">Academic Level</th>
                <th className="px-6 py-4">Physics Stream</th>
                <th className="px-6 py-4 text-center">Completed Exams</th>
                <th className="px-6 py-4 text-center">Average Score</th>
                <th className="px-6 py-4 text-center">Bypass Protocol</th>
                <th className="px-6 py-4 text-right">Academic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/50 text-sm">
              {studentsList.map((student) => {
                const { count, avg, totalWarns } = getStudentStats(student.id);
                const isUpperClass = student.classLevel === '11' || student.classLevel === '12';
                const isBypassed = isStudentBypassed(student);
                const isCustomStudentActive = studentMode === 'custom';

                return (
                  <tr key={student.id} className="hover:bg-surface/50 transition-all-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground leading-tight">
                            {student.name}
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] text-secondary mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-semibold text-foreground">
                      Class {student.classLevel}
                    </td>

                    <td className="px-6 py-4">
                      {isUpperClass && student.stream ? (
                        <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
                          {student.stream === 'medical' ? (
                            <>
                              <Activity className="w-3.5 h-3.5 text-rose-500" />
                              <span>Medical</span>
                            </>
                          ) : (
                            <>
                              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Non-Medical</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="text-secondary text-xs italic">—</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center font-semibold text-foreground">
                      {count}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${avg >= 75 ? 'text-primary' : 'text-foreground'}`}>
                        {avg > 0 ? `${avg}%` : 'N/A'}
                      </span>
                    </td>

                    {/* PROTOCOL BYPASS DYNAMIC SWITCH ROW */}
                    <td className="px-6 py-4">
                      {mounted ? (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <button
                            onClick={() => handleToggleStudent(student.id)}
                            disabled={!isCustomStudentActive}
                            className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                              !isCustomStudentActive ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
                            } ${
                              isBypassed ? 'bg-amber-500 justify-end' : 'bg-surface-border justify-start'
                            }`}
                            type="button"
                            title={isBypassed ? 'Enforce active proctor security' : 'Bypass proctor security parameters'}
                          >
                            <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                          </button>
                          <span className="text-[10px] text-secondary font-bold uppercase tracking-wider scale-90">
                            {isBypassed ? 'Bypassed' : 'Enforced'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-secondary">—</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusBadge(avg, totalWarns)}`}>
                        {getStatusLabel(avg, totalWarns)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
