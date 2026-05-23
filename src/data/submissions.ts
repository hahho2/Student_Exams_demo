import { Submission } from '../types';

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub_1',
    examId: 'e1',
    examTitle: 'Force and Motion Assessment',
    studentId: 's1',
    studentName: 'Aarav Sharma',
    classLevel: '9',
    stream: null,
    answers: {
      'q1_1': 'B', // Correct (Newton)
      'q1_2': 'A', // Correct (First Law)
      'q1_3': 'B', // Correct (Rate of change of velocity)
      'q1_4': 'A'  // Correct (W = F * d)
    },
    score: 20, // Out of 20
    maxScore: 20,
    percentage: 100,
    warningsCount: 0,
    submittedAt: '2026-05-18T10:15:00Z',
    autoSubmitted: false
  },
  {
    id: 'sub_2',
    examId: 'e2',
    examTitle: 'Electricity and Light Fundamentals',
    studentId: 's2',
    studentName: 'Priya Patel',
    classLevel: '10',
    stream: null,
    answers: {
      'q2_1': 'B', // Correct (P = V * I)
      'q2_2': 'C', // Correct (Ohm)
      'q2_3': 'B', // Correct (V = IR)
      'q2_4': 'A'  // Incorrect (says diverges instead of converges)
    },
    score: 15, // Out of 20 (5 + 5 + 5 + 0)
    maxScore: 20,
    percentage: 75,
    warningsCount: 1,
    submittedAt: '2026-05-19T11:42:00Z',
    autoSubmitted: false
  },
  {
    id: 'sub_3',
    examId: 'e3',
    examTitle: 'Class 11 Physics: Mechanics & Thermal (Medical)',
    studentId: 's3',
    studentName: 'Kabir Verma',
    classLevel: '11',
    stream: 'medical',
    answers: {
      'q3_1': 'C', // Correct (Mass = [M])
      'q3_2': 'A', // Correct
      'q3_3': 'B', // Correct (Conservation)
      'q3_4': 'C'  // Incorrect
    },
    score: 15, // Out of 20 (5 + 5 + 5 + 0)
    maxScore: 20,
    percentage: 75,
    warningsCount: 0,
    submittedAt: '2026-05-20T12:05:00Z',
    autoSubmitted: false
  },
  {
    id: 'sub_4',
    examId: 'e6',
    examTitle: 'Class 12 Physics: Electrodynamics & AC (Non-Medical)',
    studentId: 's6',
    studentName: 'Diya Malhotra',
    classLevel: '12',
    stream: 'non_medical',
    answers: {
      'q6_1': 'A', // Correct
      'q6_2': 'B', // Correct
      'q6_3': 'B', // Correct
      'q6_4': 'B'  // Correct
    },
    score: 20, // Out of 20
    maxScore: 20,
    percentage: 100,
    warningsCount: 0,
    submittedAt: '2026-05-21T15:30:00Z',
    autoSubmitted: false
  },
  {
    id: 'sub_5',
    examId: 'e1',
    examTitle: 'Force and Motion Assessment',
    studentId: 's7',
    studentName: 'Aditya Gupta',
    classLevel: '9',
    stream: null,
    answers: {
      'q1_1': 'A', // Incorrect (Joule)
      'q1_2': 'C', // Incorrect
      'q1_3': 'A', // Incorrect
      'q1_4': ''   // Left empty
    },
    score: 0, // Out of 20
    maxScore: 20,
    percentage: 0,
    warningsCount: 3,
    submittedAt: '2026-05-22T09:12:00Z',
    autoSubmitted: true // Flagged auto submit due to warning limit!
  }
];
