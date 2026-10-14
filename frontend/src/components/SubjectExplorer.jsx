import React, { useState } from 'react';
import { 
  Compass, 
  Zap, 
  FlaskConical, 
  Dna, 
  Code2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function SubjectExplorer({ onSelectTopic }) {
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [activeSubject, setActiveSubject] = useState('sci-physics');

  const subjects = [
    {
      id: 'sci-physics',
      name: 'Physics',
      category: 'Science',
      icon: Zap,
      color: '#0284c7',
      bgLight: 'bg-sky-50 dark:bg-sky-950/40',
      chapters: [
        { id: 'topic-electricity', name: 'Electricity & Circuits', subtopics: ['Electric Current', 'Voltage', 'Resistance & Resistivity', "Ohm's Law", 'Electric Power'], activeSlice: true, progress: 68 },
        { id: 'topic-motion', name: 'Motion & Kinematics', subtopics: ['Displacement', 'Speed & Velocity', 'Acceleration', 'Equations of Motion'], progress: 100 },
        { id: 'topic-force', name: 'Force & Laws of Motion', subtopics: ["Newton's 1st Law", "Newton's 2nd Law", 'Action & Reaction', 'Momentum'], progress: 40 },
        { id: 'topic-energy', name: 'Work, Energy & Power', subtopics: ['Kinetic Energy', 'Potential Energy', 'Conservation of Energy'], progress: 20 },
      ]
    },
    {
      id: 'sci-chem',
      name: 'Chemistry',
      category: 'Science',
      icon: FlaskConical,
      color: '#9333ea',
      bgLight: 'bg-purple-50 dark:bg-purple-950/40',
      chapters: [
        { id: 'topic-atoms', name: 'Atoms & Molecules', subtopics: ['Subatomic Particles', 'Valency', 'Atomic Number'], progress: 60 },
        { id: 'topic-reactions', name: 'Chemical Reactions', subtopics: ['Balancing Equations', 'Exothermic & Endothermic', 'Redox'], progress: 35 },
        { id: 'topic-acids', name: 'Acids, Bases & Salts', subtopics: ['pH Scale', 'Indicators', 'Neutralization'], progress: 10 }
      ]
    },
    {
      id: 'sci-bio',
      name: 'Biology',
      category: 'Science',
      icon: Dna,
      color: '#059669',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
      chapters: [
        { id: 'topic-cells', name: 'The Fundamental Unit of Life (Cell)', subtopics: ['Plasma Membrane', 'Mitochondria & ATP', 'Chloroplasts'], progress: 85 },
        { id: 'topic-human-body', name: 'Human Physiology', subtopics: ['Circulatory System', 'Nervous Reflex', 'Digestion'], progress: 70 },
        { id: 'topic-ecosystem', name: 'Ecology & Natural Cycles', subtopics: ['Food Webs', 'Carbon Cycle', 'Biodiversity'], progress: 40 }
      ]
    },
    {
      id: 'math-algebra',
      name: 'Mathematics',
      category: 'Mathematics',
      icon: Compass,
      color: '#d97706',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40',
      chapters: [
        { id: 'topic-linear', name: 'Linear Equations in Two Variables', subtopics: ['Graphing Lines', 'Substitution Method', 'Elimination'], progress: 45 },
        { id: 'topic-quad', name: 'Quadratic Polynomials', subtopics: ['Roots of Equation', 'Factoring', 'Quadratic Formula'], progress: 30 },
        { id: 'topic-trig', name: 'Trigonometry Foundations', subtopics: ['Sine, Cosine, Tangent', 'Trig Identities', 'Heights & Distances'], progress: 15 }
      ]
    },
    {
      id: 'cs-code',
      name: 'Computer Science',
      category: 'Technology',
      icon: Code2,
      color: '#4f46e5',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
      chapters: [
        { id: 'topic-algorithms', name: 'Logic & Algorithms', subtopics: ['Flowcharts', 'Binary Search', 'Sorting Visualizer'], progress: 30 },
        { id: 'topic-python', name: 'Python Programming Essentials', subtopics: ['Variables & Types', 'Loops & Lists', 'Functions'], progress: 25 }
      ]
    }
  ];

  const currentSub = subjects.find(s => s.id === activeSubject) || subjects[0];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="card-light rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-0.5">
            <Compass className="w-4 h-4" />
            <span>Curriculum Independent</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Universal Subject Explorer
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Structured by conceptual understanding rather than rigid textbook boards.
          </p>
        </div>

        {/* Level */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
          <span>Level:</span>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            {['beginner', 'intermediate', 'advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold capitalize transition-all ${
                  selectedLevel === lvl
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {subjects.map((sub) => {
          const Icon = sub.icon;
          const isSelected = activeSubject === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubject(sub.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold shrink-0 transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-indigo-500 text-indigo-700 dark:text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white'
              }`}
            >
              <div 
                className={`w-6 h-6 rounded-lg flex items-center justify-center ${sub.bgLight}`}
                style={{ color: sub.color }}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {currentSub.chapters.map((ch) => (
          <div
            key={ch.id}
            className={`card-light rounded-2xl p-4 bg-white dark:bg-slate-900 border space-y-3 transition-all ${
              ch.activeSlice 
                ? 'border-indigo-400 dark:border-indigo-700 shadow-xs ring-1 ring-indigo-200/50' 
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {currentSub.name}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {ch.name}
                </h3>
              </div>
              {ch.activeSlice && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  <Sparkles className="w-3 h-3 text-cyan-500" />
                  <span>Interactive Lab ⭐</span>
                </span>
              )}
            </div>

            {/* Subtopics */}
            <div className="flex flex-wrap gap-1.5">
              {ch.subtopics.map((st, i) => (
                <span
                  key={i}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                    st.includes('Resistance')
                      ? 'bg-rose-50 text-rose-800 border-rose-200 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {st}
                </span>
              ))}
            </div>

            {/* Progress */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Progress</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{ch.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${ch.progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => onSelectTopic(ch.id)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>{ch.activeSlice ? 'Open Visual Lab & Notes' : 'Explore Concept Graph'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
