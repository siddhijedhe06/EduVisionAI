import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  TrendingUp, 
  Flame, 
  Check,
  ShieldCheck,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getRescuePlan, completeRescueItem, getWeakTopics, rescueWeakTopic } from '../services/api';

export default function RescueLoopView({ onNavigateVisualizer, onNavigateQuiz, onNavigateAI }) {
  const [rescuePlan, setRescuePlan] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('rescue-loop'); // 'rescue-loop' | 'weak-topics' | 'mistake-radar'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [plan, wt] = await Promise.all([getRescuePlan(), getWeakTopics()]);
    if (plan) setRescuePlan(plan);
    if (wt) setWeakTopics(wt);
    setLoading(false);
  };

  const handleCompleteItem = async (id) => {
    await completeRescueItem(id);
    setRescuePlan(prev => prev.map(item => item.id === id ? { ...item, completed: true } : item));
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const handleRescueTopic = async (topicId) => {
    await rescueWeakTopic(topicId);
    setWeakTopics(prev => prev.map(t => {
      if (t.id === topicId) {
        const newMastery = Math.min(100, t.mastery + 25);
        return {
          ...t,
          mastery: newMastery,
          severity: newMastery >= 70 ? 'low' : newMastery >= 50 ? 'medium' : 'critical'
        };
      }
      return t;
    }));
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const activePlanCount = rescuePlan.filter(i => !i.completed).length;

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="card-light rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/60 mb-2">
            <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
            <span>Winning Feature Suite</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Rescue Loop & Weak Topic Detector
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            When you make a mistake in a quiz, the Rescue Loop immediately catches it, diagnoses the mistake type, and updates your study schedule.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('rescue-loop')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'rescue-loop'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span>Rescue Loop</span>
            {activePlanCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {activePlanCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('weak-topics')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'weak-topics'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Weak Topics ({weakTopics.length})
          </button>

          <button
            onClick={() => setActiveTab('mistake-radar')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'mistake-radar'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Mistake Radar
          </button>
        </div>
      </div>

      {/* Tab 1: Rescue Loop Study Plan */}
      {activeTab === 'rescue-loop' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Live Dynamic Schedule (Generated from your quiz errors)
              </span>
            </div>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
              Earn +25 XP per rescue item completed
            </span>
          </div>

          <div className="space-y-3">
            {rescuePlan.map((item) => {
              const isDone = item.completed;
              const mistakeBadge = {
                concept_gap: { label: 'Concept Gap', bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' },
                careless_mistake: { label: 'Careless Mistake', bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
                misread_question: { label: 'Misread Question', bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' }
              }[item.mistake_type] || { label: 'Practice Item', bg: 'bg-slate-100 text-slate-800' };

              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 opacity-75'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${mistakeBadge.bg}`}>
                        {mistakeBadge.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ~{item.estimated_minutes} mins drill
                      </span>
                    </div>

                    <h3 className={`text-xs font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Reason: <span className="italic">{item.reason}</span>
                    </p>
                    <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                      Action: {item.suggested_action}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950">
                        <Check className="w-3.5 h-3.5" />
                        Rescued (+25 XP)
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCompleteItem(item.id)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Rescued</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Weak Topic Detector */}
      {activeTab === 'weak-topics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weakTopics.map((topic) => {
            const isCrit = topic.severity === 'critical';
            const isMed = topic.severity === 'medium';
            return (
              <div 
                key={topic.id}
                className={`rounded-2xl p-4 sm:p-5 border flex flex-col justify-between ${
                  isCrit
                    ? 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                    : isMed
                      ? 'bg-amber-50/30 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                      : 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {topic.subject}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isCrit 
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                        : isMed
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {isCrit ? 'Critical Gap' : isMed ? 'Needs Practice' : 'On Track'}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {topic.topic}
                  </h3>

                  {/* Mastery Progress Bar */}
                  <div className="space-y-1 my-3">
                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                      <span>Concept Mastery</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{topic.mastery}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCrit ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${topic.mastery}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-1 text-[11px]">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Common Slip Pattern:</span>
                    <p className="text-slate-500 dark:text-slate-400 italic">
                      "{topic.common_mistake}"
                    </p>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block pt-1">Quick Fix:</span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {topic.quick_fix_tip}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <button
                    onClick={() => onNavigateAI && onNavigateAI()}
                    className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    Ask AI Buddy
                  </button>
                  <button
                    onClick={() => handleRescueTopic(topic.id)}
                    className="py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs transition-all"
                  >
                    <span>Rescue Topic (+40 XP)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Mistake Type Radar */}
      {activeTab === 'mistake-radar' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Concept Gap */}
          <div className="rounded-2xl p-5 border border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Type A (45% of slips)</span>
              <AlertCircle className="w-4 h-4 text-rose-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Concept Gap
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When the core physics mechanism or formula definition is unclear (e.g. confusing resistance R with resistivity ρ).
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
              <span className="font-bold text-rose-600 dark:text-rose-400 block">Rescue Remedy:</span>
              <p className="text-slate-600 dark:text-slate-400">
                1. Switch to "Explain In My Way" (Cricket or ELI5 analogy).<br/>
                2. Play with the interactive water-pipe slider to feel the physics intuitively.
              </p>
            </div>
          </div>

          {/* Card 2: Careless Mistake */}
          <div className="rounded-2xl p-5 border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Type B (35% of slips)</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Careless Mistake
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When you know the concept perfectly, but made a sign slip, unit error (mm² vs m²), or rushed simple arithmetic.
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
              <span className="font-bold text-amber-600 dark:text-amber-400 block">Rescue Remedy:</span>
              <p className="text-slate-600 dark:text-slate-400">
                1. Write standard SI unit beside each variable before calculating.<br/>
                2. Underline exponents like 10⁻⁶ so they don't get lost in scrap paper.
              </p>
            </div>
          </div>

          {/* Card 3: Misread Question */}
          <div className="rounded-2xl p-5 border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Type C (20% of slips)</span>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Misread Question
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When you skipped words like "NOT", "EXCEPT", or overlooked that the question gave "diameter" instead of "radius".
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Rescue Remedy:</span>
              <p className="text-slate-600 dark:text-slate-400">
                1. Mentally circle negative constraint words.<br/>
                2. Take a 2-second pause before locking in your answer option.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
