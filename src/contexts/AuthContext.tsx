'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Role, ClassLevel, Stream, User } from '../types';
import { getStorageItem, setStorageItem, removeStorageItem } from '../lib/localStorage';
import { MOCK_USERS } from '../data/users';

interface AuthContextType {
  currentUser: User | null;
  role: Role | null;
  classLevel: ClassLevel | null;
  stream: Stream | null;
  isAuthenticated: boolean;
  loginAsTeacher: () => void;
  loginAsStudent: () => void;
  setClassAndStream: (classLevel: ClassLevel, stream: Stream) => void;
  logout: () => void;
  isMounted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [classLevel, setClassLevel] = useState<ClassLevel | null>(null);
  const [stream, setStream] = useState<Stream | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Sync with localStorage on mount
    const savedRole = getStorageItem<Role | null>('role', null);
    const savedClassLevel = getStorageItem<ClassLevel | null>('classLevel', null);
    const savedStream = getStorageItem<Stream | null>('stream', null);

    setRole(savedRole);
    setClassLevel(savedClassLevel);
    setStream(savedStream);

    if (savedRole === 'teacher') {
      const teacherUser = MOCK_USERS.find((u) => u.role === 'teacher') || MOCK_USERS[0];
      setCurrentUser(teacherUser);
    } else if (savedRole === 'student') {
      // Find a mock student that matches class/stream, or default to s1
      const studentUser = MOCK_USERS.find(
        (u) =>
          u.role === 'student' &&
          u.classLevel === savedClassLevel &&
          (savedClassLevel === '11' || savedClassLevel === '12' ? u.stream === savedStream : true)
      ) || MOCK_USERS[1];
      setCurrentUser(studentUser);
    }

    setIsMounted(true);
  }, []);

  const loginAsTeacher = () => {
    const teacher = MOCK_USERS.find((u) => u.role === 'teacher') || MOCK_USERS[0];
    setCurrentUser(teacher);
    setRole('teacher');
    setStorageItem('role', 'teacher');
    
    // Clear any student selections
    setStorageItem('classLevel', null);
    setStorageItem('stream', null);
    setClassLevel(null);
    setStream(null);

    router.push('/teacher/dashboard');
  };

  const loginAsStudent = () => {
    setRole('student');
    setStorageItem('role', 'student');
    
    const savedClassLevel = getStorageItem<ClassLevel | null>('classLevel', null);
    if (savedClassLevel) {
      const student = MOCK_USERS.find((u) => u.role === 'student' && u.classLevel === savedClassLevel) || MOCK_USERS[1];
      setCurrentUser(student);
      router.push('/student/dashboard');
    } else {
      router.push('/student/select-class');
    }
  };

  const setClassAndStream = (cl: ClassLevel, st: Stream) => {
    setClassLevel(cl);
    setStream(st);
    setStorageItem('classLevel', cl);
    setStorageItem('stream', st);

    // Load appropriate student user matching the class/stream
    const matchingStudent = MOCK_USERS.find(
      (u) =>
        u.role === 'student' &&
        u.classLevel === cl &&
        (cl === '11' || cl === '12' ? u.stream === st : true)
    ) || MOCK_USERS[1];

    // Merge custom name if we want, but using standard mock student is great
    setCurrentUser(matchingStudent);

    router.push('/student/dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setRole(null);
    setClassLevel(null);
    setStream(null);
    removeStorageItem('role');
    removeStorageItem('classLevel');
    removeStorageItem('stream');
    router.push('/login');
  };

  const isAuthenticated = currentUser !== null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        classLevel,
        stream,
        isAuthenticated,
        loginAsTeacher,
        loginAsStudent,
        setClassAndStream,
        logout,
        isMounted
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
