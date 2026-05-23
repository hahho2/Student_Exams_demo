'use client';

import React, { useState } from 'react';
import { getTopicsForClassStream } from '../data/topics';
import { ClassLevel, Stream, Question } from '../types';
import { Plus, Trash2, ShieldAlert } from 'lucide-react';

interface PhysicsExamCreationFormProps {
  onSave: (examData: {
    title: string;
    classLevel: ClassLevel;
    stream: Stream;
    topic: string;
    durationMinutes: number;
    isProtocolEnabled: boolean;
    questions: Omit<Question, 'id' | 'examId'>[];
  }) => void;
  onCancel: () => void;
}

export default function PhysicsExamCreationForm({
  onSave,
  onCancel
}: PhysicsExamCreationFormProps) {
  const [title, setTitle] = useState('');
  const [classLevel, setClassLevel] = useState<ClassLevel>('9');
  const [stream, setStream] = useState<Stream>(null);
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(45);
  const [isProtocolEnabled, setIsProtocolEnabled] = useState(true); // default to true
  const [questions, setQuestions] = useState<Omit<Question, 'id' | 'examId'>[]>([]);

  // MCQ building states
  const [qText, setQText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('A');
  const [qMarks, setQMarks] = useState(5);

  const handleClassChange = (cl: ClassLevel) => {
    setClassLevel(cl);
    if (cl === '9' || cl === '10') {
      setStream(null);
      const topics = getTopicsForClassStream(cl, null);
      setTopic(topics[0] || '');
    } else {
      setStream('medical');
      const topics = getTopicsForClassStream(cl, 'medical');
      setTopic(topics[0] || '');
    }
  };

  const handleStreamChange = (st: Stream) => {
    setStream(st);
    const topics = getTopicsForClassStream(classLevel, st);
    setTopic(topics[0] || '');
  };

  const addQuestion = () => {
    if (!qText.trim() || options.some(o => !o.trim())) return;

    const newQ: Omit<Question, 'id' | 'examId'> = {
      questionText: qText,
      questionType: 'mcq',
      options: [...options],
      correctAnswer: correctAnswer,
      marks: qMarks,
      topic: topic
    };

    setQuestions([...questions, newQ]);
    
    // Clear builders
    setQText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('A');
  };

  const removeQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!title.trim() || questions.length === 0) return;
    onSave({
      title,
      classLevel,
      stream,
      topic,
      durationMinutes: duration,
      isProtocolEnabled,
      questions
    });
  };

  const topicsList = getTopicsForClassStream(classLevel, stream);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* Exam Details Block */}
      <div className="lg:col-span-2 bg-card-bg border border-surface-border rounded-xl p-6 sm:p-8 shadow-soft space-y-6">
        <h2 className="text-xl font-bold tracking-tight border-b border-surface-border/50 pb-4">
          Exam Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-secondary uppercase">Exam Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Midterm Assessment: Kinematics & Mechanics"
              className="w-full p-3 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-secondary uppercase">Class Level</label>
            <select
              value={classLevel}
              onChange={(e) => handleClassChange(e.target.value as ClassLevel)}
              className="w-full p-3 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-sm"
            >
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          {/* Dynamic Stream Options */}
          {(classLevel === '11' || classLevel === '12') && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-secondary uppercase">Syllabus Stream</label>
              <select
                value={stream || 'medical'}
                onChange={(e) => handleStreamChange(e.target.value as Stream)}
                className="w-full p-3 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-sm"
              >
                <option value="medical">Medical</option>
                <option value="non_medical">Non-Medical</option>
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-secondary uppercase">Physics Chapter / Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-sm"
            >
              {topicsList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-secondary uppercase">Duration (Minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="10"
              max="180"
              className="w-full p-3 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-sm"
            />
          </div>

          {/* SECURITY PROTOCOL TOGGLE BUTTON */}
          <div className="sm:col-span-2 p-4 bg-surface border border-surface-border rounded-xl flex items-center justify-between">
            <div className="flex items-start gap-3 pr-4">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-primary shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Secure Exam Security Protocol</h4>
                <p className="text-xs text-secondary mt-0.5">
                  Forces full-screen proctoring and tab switching detection. Auto-submits on 3 infractions.
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsProtocolEnabled(!isProtocolEnabled)}
              className={`w-12 h-6.5 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                isProtocolEnabled ? 'bg-primary justify-end' : 'bg-surface-border justify-start'
              }`}
              type="button"
            >
              <span className="w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>
        </div>

        {/* Assigned Questions */}
        <div className="space-y-4 pt-4 border-t border-surface-border/50">
          <h3 className="font-bold text-base">Questions ({questions.length})</h3>
          
          {questions.length === 0 ? (
            <p className="text-xs text-secondary italic">No questions added yet. Use the builder on the right to assign questions.</p>
          ) : (
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-4 border border-surface-border rounded-lg bg-surface text-sm"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <span className="text-[10px] uppercase font-bold text-secondary">
                      Question {idx + 1} • {q.questionType.toUpperCase()} ({q.marks} Pts)
                    </span>
                    <p className="font-semibold text-foreground leading-tight">{q.questionText}</p>
                    {q.options && (
                      <p className="text-xs text-secondary">Options: {q.options.join(', ')} | Correct: {q.correctAnswer}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeQuestion(idx)}
                    className="p-1.5 rounded hover:bg-error-bg hover:text-error text-secondary transition-all-200 cursor-pointer"
                    type="button"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-surface-border/50 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-3 border border-surface-border bg-card-bg hover:bg-surface font-semibold rounded-lg text-sm transition-all-200 cursor-pointer"
            type="button"
          >
            Cancel Form
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || questions.length === 0}
            className={`px-6 py-3 rounded-lg text-sm font-bold shadow-soft transition-all-200 cursor-pointer ${
              title.trim() && questions.length > 0
                ? 'bg-primary hover:bg-primary-hover text-primary-foreground'
                : 'bg-surface text-secondary border border-surface-border cursor-not-allowed'
            }`}
            type="button"
          >
            Publish and Save Exam
          </button>
        </div>
      </div>

      {/* Question Builder Column */}
      <div className="bg-card-bg border border-surface-border rounded-xl p-6 shadow-soft space-y-6 h-fit shrink-0">
        <h2 className="text-lg font-bold tracking-tight border-b border-surface-border/50 pb-4">
          Add MCQ Question
        </h2>

        <div className="space-y-4 text-sm">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-secondary uppercase">Question Text</label>
            <textarea
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              placeholder="e.g., What is the mathematical relationship of gravitational force?"
              className="w-full min-h-[80px] p-2.5 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-xs"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-secondary uppercase">MCQ Options</label>
            {options.map((opt, oIdx) => (
              <div key={oIdx} className="flex items-center gap-2">
                <span className="text-xs font-bold text-secondary shrink-0">
                  {String.fromCharCode(65 + oIdx)}
                </span>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[oIdx] = e.target.value;
                    setOptions(newOptions);
                  }}
                  placeholder={`Option ${oIdx + 1}`}
                  className="flex-1 p-2 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-xs"
                />
              </div>
            ))}

            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-bold text-secondary uppercase">Correct Option</label>
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full p-2 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-xs"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-secondary uppercase">Marks Weightage</label>
            <input
              type="number"
              value={qMarks}
              onChange={(e) => setQMarks(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-surface-border rounded-lg bg-card-bg text-foreground focus-ring font-sans text-xs"
            />
          </div>
        </div>

        <button
          onClick={addQuestion}
          disabled={!qText.trim() || options.some(o => !o.trim())}
          className={`w-full py-3 rounded-lg text-xs font-bold shadow-soft transition-all-200 flex items-center justify-center gap-1.5 cursor-pointer ${
            qText.trim() && options.every(o => o.trim())
              ? 'bg-primary hover:bg-primary-hover text-primary-foreground'
              : 'bg-surface text-secondary border border-surface-border cursor-not-allowed'
          }`}
          type="button"
        >
          <Plus className="w-4 h-4" />
          <span>Add Question to Exam</span>
        </button>
      </div>

    </div>
  );
}
