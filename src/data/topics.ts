import { ClassLevel, Stream } from '../types';

export const PHYSICS_TOPICS: Record<ClassLevel, Record<'general' | 'medical' | 'non_medical', string[]>> = {
  '9': {
    general: [
      'Motion',
      'Force and Laws of Motion',
      'Gravitation',
      'Work and Energy',
      'Sound'
    ],
    medical: [],
    non_medical: []
  },
  '10': {
    general: [
      'Light',
      'Electricity',
      'Magnetic Effects of Current',
      'Human Eye and Colourful World'
    ],
    medical: [],
    non_medical: []
  },
  '11': {
    general: [],
    medical: [
      'Units and Measurements',
      'Motion in a Straight Line',
      'Laws of Motion',
      'Work, Energy and Power',
      'Gravitation',
      'Thermal Physics',
      'Oscillations and Waves'
    ],
    non_medical: [
      'Units and Measurements',
      'Kinematics',
      'Laws of Motion',
      'Work, Energy and Power',
      'Rotational Motion',
      'Gravitation',
      'Mechanical Properties of Solids and Fluids'
    ]
  },
  '12': {
    general: [],
    medical: [
      'Electrostatics',
      'Current Electricity',
      'Magnetic Effects of Current',
      'Electromagnetic Induction',
      'Ray Optics',
      'Wave Optics',
      'Modern Physics',
      'Atoms and Nuclei'
    ],
    non_medical: [
      'Electrostatics',
      'Current Electricity',
      'Magnetism',
      'Electromagnetic Induction',
      'Alternating Current',
      'Semiconductor Electronics',
      'Modern Physics',
      'Communication Systems'
    ]
  }
};

export function getTopicsForClassStream(classLevel: ClassLevel, stream: Stream): string[] {
  if (classLevel === '9' || classLevel === '10') {
    return PHYSICS_TOPICS[classLevel].general;
  }
  if (stream === 'medical') {
    return PHYSICS_TOPICS[classLevel].medical;
  }
  if (stream === 'non_medical') {
    return PHYSICS_TOPICS[classLevel].non_medical;
  }
  return [];
}
