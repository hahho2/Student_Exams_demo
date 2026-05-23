import { Exam } from '../types';

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'e1',
    teacherId: 't1',
    title: 'Force and Motion Assessment',
    subject: 'Physics',
    classLevel: '9',
    stream: null,
    topic: 'Force and Laws of Motion',
    durationMinutes: 30,
    status: 'active',
    createdAt: '2026-05-15T09:00:00Z',
    isProtocolEnabled: true,
    questions: [
      {
        id: 'q1_1',
        examId: 'e1',
        questionText: 'What is the SI unit of force?',
        questionType: 'mcq',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Force and Laws of Motion'
      },
      {
        id: 'q1_2',
        examId: 'e1',
        questionText: 'Which law of motion states that an object remains at rest unless acted on by an external force?',
        questionType: 'mcq',
        options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Force and Laws of Motion'
      },
      {
        id: 'q1_3',
        examId: 'e1',
        questionText: 'What is acceleration defined as?',
        questionType: 'mcq',
        options: [
          'Rate of change of distance',
          'Rate of change of velocity',
          'Rate of change of displacement',
          'Total distance travelled over time'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Motion'
      },
      {
        id: 'q1_4',
        examId: 'e1',
        questionText: 'What is the formula for mechanical work in physics?',
        questionType: 'mcq',
        options: ['W = F * d', 'W = F / d', 'W = m * a', 'W = P * t'],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Work and Energy'
      }
    ]
  },
  {
    id: 'e2',
    teacherId: 't1',
    title: 'Electricity and Light Fundamentals',
    subject: 'Physics',
    classLevel: '10',
    stream: null,
    topic: 'Electricity',
    durationMinutes: 45,
    status: 'active',
    createdAt: '2026-05-16T10:00:00Z',
    isProtocolEnabled: true,
    questions: [
      {
        id: 'q2_1',
        examId: 'e2',
        questionText: 'What is the formula for electric power?',
        questionType: 'mcq',
        options: ['P = V / I', 'P = V * I', 'P = V^2 * I', 'P = I^2 / V'],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Electricity'
      },
      {
        id: 'q2_2',
        examId: 'e2',
        questionText: 'What is the SI unit of electrical resistance?',
        questionType: 'mcq',
        options: ['Ampere', 'Volt', 'Ohm', 'Coulomb'],
        correctAnswer: 'C',
        marks: 5,
        topic: 'Electricity'
      },
      {
        id: 'q2_3',
        examId: 'e2',
        questionText: 'According to Ohm’s Law, which equation represents the relationship between voltage, current, and resistance?',
        questionType: 'mcq',
        options: ['V = I / R', 'V = I * R', 'V = I^2 * R', 'V = R / I'],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Electricity'
      },
      {
        id: 'q2_4',
        examId: 'e2',
        questionText: 'What is the primary function of a convex lens?',
        questionType: 'mcq',
        options: [
          'Diverges parallel rays of light',
          'Converges parallel rays of light',
          'Reflects light rays at 90 degrees',
          'Absorbs all incoming light rays'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Light'
      }
    ]
  },
  {
    id: 'e3',
    teacherId: 't1',
    title: 'Class 11 Physics: Mechanics & Thermal (Medical)',
    subject: 'Physics',
    classLevel: '11',
    stream: 'medical',
    topic: 'Oscillations and Waves',
    durationMinutes: 60,
    status: 'active',
    createdAt: '2026-05-17T11:00:00Z',
    isProtocolEnabled: true,
    questions: [
      {
        id: 'q3_1',
        examId: 'e3',
        questionText: 'In dimensional analysis, what is the base dimension code for Mass?',
        questionType: 'mcq',
        options: ['[T]', '[L]', '[M]', '[A]'],
        correctAnswer: 'C',
        marks: 5,
        topic: 'Units and Measurements'
      },
      {
        id: 'q3_2',
        examId: 'e3',
        questionText: 'Define uniform acceleration.',
        questionType: 'mcq',
        options: [
          'Velocity changes by equal amounts in equal intervals of time',
          'Distance changes by equal amounts in equal intervals of time',
          'Velocity remains completely constant',
          'Speed is zero'
        ],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Motion in a Straight Line'
      },
      {
        id: 'q3_3',
        examId: 'e3',
        questionText: 'Which law states that energy can neither be created nor destroyed, only transformed?',
        questionType: 'mcq',
        options: [
          'First Law of Thermodynamics',
          'Law of Conservation of Mechanical Energy',
          'Hooke’s Law',
          'Newton’s Law of Cooling'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Work, Energy and Power'
      },
      {
        id: 'q3_4',
        examId: 'e3',
        questionText: 'What is simple harmonic motion (SHM)?',
        questionType: 'mcq',
        options: [
          'A periodic motion where acceleration is directly proportional to displacement and directed opposite to it',
          'A circular motion with constant angular velocity',
          'A linear motion with constant velocity',
          'A random vibrational motion with no fixed frequency'
        ],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Oscillations and Waves'
      }
    ]
  },
  {
    id: 'e4',
    teacherId: 't1',
    title: 'Class 11 Physics: Kinematics & Dynamics (Non-Medical)',
    subject: 'Physics',
    classLevel: '11',
    stream: 'non_medical',
    topic: 'Rotational Motion',
    durationMinutes: 60,
    status: 'active',
    createdAt: '2026-05-18T14:00:00Z',
    isProtocolEnabled: true,
    questions: [
      {
        id: 'q4_1',
        examId: 'e4',
        questionText: 'What is torque mathematically defined as?',
        questionType: 'mcq',
        options: ['T = r * F', 'T = r x F', 'T = F / r', 'T = I * w'],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Rotational Motion'
      },
      {
        id: 'q4_2',
        examId: 'e4',
        questionText: 'Define angular momentum.',
        questionType: 'mcq',
        options: [
          'Product of linear mass and linear velocity',
          'Product of moment of inertia and angular velocity (L = I*w)',
          'Rate of change of torque',
          'Centripetal force multiplied by radius'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Rotational Motion'
      },
      {
        id: 'q4_3',
        examId: 'e4',
        questionText: 'What is the moment of inertia formula for a single point mass at distance R?',
        questionType: 'mcq',
        options: ['I = m * R', 'I = m * R^2', 'I = m^2 * R', 'I = m / R^2'],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Rotational Motion'
      },
      {
        id: 'q4_4',
        examId: 'e4',
        questionText: 'State the principle of conservation of mechanical energy.',
        questionType: 'mcq',
        options: [
          'Total mechanical energy (PE + KE) remains constant if only conservative forces do work',
          'Kinetic energy is always equal to potential energy',
          'Friction always increases the total mechanical energy',
          'Heat energy is a part of mechanical energy'
        ],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Work, Energy and Power'
      }
    ]
  },
  {
    id: 'e5',
    teacherId: 't1',
    title: 'Class 12 Physics: Electromagnetism & Modern Physics (Medical)',
    subject: 'Physics',
    classLevel: '12',
    stream: 'medical',
    topic: 'Electrostatics',
    durationMinutes: 90,
    status: 'active',
    createdAt: '2026-05-19T09:00:00Z',
    isProtocolEnabled: true,
    questions: [
      {
        id: 'q5_1',
        examId: 'e5',
        questionText: 'What is the formula representing Coulomb’s Law?',
        questionType: 'mcq',
        options: ['F = k * q1 * q2 / r^2', 'F = k * q1 * q2 * r^2', 'F = q1 * q2 / (k * r^2)', 'F = k * r^2 / (q1 * q2)'],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Electrostatics'
      },
      {
        id: 'q5_2',
        examId: 'e5',
        questionText: 'Define electric potential.',
        questionType: 'mcq',
        options: [
          'Work done per unit charge in bringing a charge from infinity to a point in an electric field',
          'Force experienced by a unit charge in an electric field',
          'Flux passing through a closed surface',
          'Charge stored in a capacitor per unit volume'
        ],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Electrostatics'
      },
      {
        id: 'q5_3',
        examId: 'e5',
        questionText: 'Photoelectric effect demonstrates which nature of electromagnetic radiation?',
        questionType: 'mcq',
        options: ['Wave nature only', 'Particle nature only', 'Dual nature', 'Neither wave nor particle nature'],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Modern Physics'
      },
      {
        id: 'q5_4',
        examId: 'e5',
        questionText: 'What are isotopes?',
        questionType: 'mcq',
        options: [
          'Atoms with the same number of neutrons but different protons',
          'Atoms with the same atomic number but different mass numbers (same protons, different neutrons)',
          'Atoms with the same mass number but different atomic numbers',
          'Molecules with identical atomic structure'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Atoms and Nuclei'
      }
    ]
  },
  {
    id: 'e6',
    teacherId: 't1',
    title: 'Class 12 Physics: Electrodynamics & AC (Non-Medical)',
    subject: 'Physics',
    classLevel: '12',
    stream: 'non_medical',
    topic: 'Electromagnetic Induction',
    durationMinutes: 90,
    status: 'active',
    createdAt: '2026-05-20T10:00:00Z',
    isProtocolEnabled: true,
    questions: [
      {
        id: 'q6_1',
        examId: 'e6',
        questionText: 'Which law describes the production of an electromotive force (EMF) in a changing magnetic field?',
        questionType: 'mcq',
        options: ['Faraday’s Law of Induction', 'Ohm’s Law', 'Ampere’s Circuital Law', 'Coulomb’s Law'],
        correctAnswer: 'A',
        marks: 5,
        topic: 'Electromagnetic Induction'
      },
      {
        id: 'q6_2',
        examId: 'e6',
        questionText: 'Define the RMS value of alternating current.',
        questionType: 'mcq',
        options: [
          'Average of the current over a cycle',
          'Peak current divided by square root of 2 (I_rms = I_0 / sqrt(2))',
          'Peak current multiplied by 2',
          'Maximum rate of change of AC current'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Alternating Current'
      },
      {
        id: 'q6_3',
        examId: 'e6',
        questionText: 'What is a semiconductor diode?',
        questionType: 'mcq',
        options: [
          'A component that conducts in both directions equally',
          'A two-terminal component that conducts primarily in one direction',
          'A three-terminal amplifier',
          'An electrical resistor'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Semiconductor Electronics'
      },
      {
        id: 'q6_4',
        examId: 'e6',
        questionText: 'What is amplitude modulation?',
        questionType: 'mcq',
        options: [
          'Varying the frequency of a carrier wave in accordance with the message signal',
          'Varying the amplitude of a high-frequency carrier wave in accordance with the message signal',
          'Varying the phase of a carrier wave',
          'Transmitting signals without carrier wave mixing'
        ],
        correctAnswer: 'B',
        marks: 5,
        topic: 'Communication Systems'
      }
    ]
  }
];
