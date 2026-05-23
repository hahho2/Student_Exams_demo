export interface ChartDataPoint {
  name: string;      // e.g. "Week 1", "Week 2", etc.
  averageScore: number;
}

export const MOCK_PERFORMANCE_TREND: ChartDataPoint[] = [
  { name: 'Week 1', averageScore: 72 },
  { name: 'Week 2', averageScore: 78 },
  { name: 'Week 3', averageScore: 82 },
  { name: 'Week 4', averageScore: 86.4 }
];

export interface StudentProgressDataPoint {
  name: string; // Exam title / date
  score: number;
}

export const MOCK_STUDENT_PROGRESS: Record<string, StudentProgressDataPoint[]> = {
  's1': [
    { name: 'Test 1: Motion', score: 70 },
    { name: 'Test 2: Gravity', score: 85 },
    { name: 'Test 3: Force', score: 93 }
  ],
  's2': [
    { name: 'Test 1: Reflection', score: 75 },
    { name: 'Test 2: Refraction', score: 80 },
    { name: 'Test 3: Electricity', score: 83 }
  ],
  's3': [
    { name: 'Test 1: Dimensions', score: 80 },
    { name: 'Test 2: Vectors', score: 82 },
    { name: 'Test 3: SHM', score: 83 }
  ],
  's6': [
    { name: 'Test 1: Static', score: 90 },
    { name: 'Test 2: Direct Current', score: 95 },
    { name: 'Test 3: AC Power', score: 100 }
  ]
};
