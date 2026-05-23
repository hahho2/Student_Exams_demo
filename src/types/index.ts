export type Role = 'teacher' | 'student';

export type ClassLevel = '9' | '10' | '11' | '12';

export type Stream = 'medical' | 'non_medical' | null;

export type QuestionType = 'mcq' | 'short_answer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  classLevel?: ClassLevel;
  stream?: Stream;
  createdAt: string;
}

export interface Question {
  id: string;
  examId: string;
  questionText: string;
  questionType: QuestionType;
  options?: string[]; // MCQs only
  correctAnswer: string; // "A", "B", "C", "D" for MCQ
  marks: number;
  topic: string;
}

export interface Exam {
  id: string;
  teacherId: string;
  title: string;
  subject: 'Physics';
  classLevel: ClassLevel;
  stream: Stream;
  topic: string;
  durationMinutes: number;
  status: 'draft' | 'active' | 'completed';
  questions: Question[];
  createdAt: string;
  isProtocolEnabled?: boolean; // toggle security protocol ON/OFF
}

export interface Submission {
  id: string;
  examId: string;
  examTitle: string; // for rendering history
  studentId: string;
  studentName: string; // for roster views
  answers: Record<string, string>; // map of questionId -> studentAnswer
  score: number;
  maxScore: number;
  percentage: number;
  warningsCount: number;
  submittedAt: string;
  autoSubmitted: boolean;
  classLevel: ClassLevel;
  stream: Stream;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  examId: string;
  examTitle: string;
  classLevel: ClassLevel;
  stream: Stream;
  topic: string;
  score: number;
  maxScore: number;
  percentage: number;
  attemptDate: string;
}
