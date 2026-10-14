import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Zap, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  Heart, 
  Sparkles,
  Layers,
  ArrowUpRight,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWeeklyReport, claimQuest } from '../services/api';

export default function QuestModeView({ userProfile, onUpdateProfile, onNavigateQuiz }) {
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [activeTab, setActiveTab] = useState('missions'); // 'missions' | 'weekly-report' | 'badges'
  const [claiming, setClaiming] = useState({});

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const res = await getWeeklyReport();
    if (res) setWeeklyReport(res);
  };

  const handleClaim = async (questId) => {
    setClaiming(prev => ({ ...prev, [questId]: true }));
    const res = await claimQuest(questId);
    setClaiming(prev => ({ ...prev, [questId]: false }));
    if (res) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onUpdateProfile) onUpdateProfile();
    }
  };

  const currentLevel = userProfile?.level || 3;
  const levelTitle = userProfile?.level_title || 'Circuit Conqueror';
  const currentXP = userProfile?.xp || 580;
  const nextLevelXP = userProfile?.next_level_xp || 800;
  const levelProgressPct = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

  const subjectsProgress = [
    { name: 'Physics', progress: 68, color: 'bg-cyan-500' },
    { name: 'Mathematics', progress: 55, color: 'bg-amber-500' },
    { name: 'Chemistry', progress: 42, color: 'bg-purple-500' },
    { name: 'Biology', progress: 80, color: 'bg-emerald-500' }
  ];

  return (
    <div className="space-y-5">
      
      {/* Header with Level & Healthy Gamification Badge */}
      <div className="card-light rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/60 mb-1">
            <Heart className="w-3.5 h-3.5 text-emerald-500" />
            <span>Healthy Gamification • Zero Public Leaderboards</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Quest Mode & Growth Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compete only with your past self. Earn XP for improving from mistakes and mastering foundational concepts.
          </p>
        </div>

        {/* Level & XP Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/50 dark:from-slate-800 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 min-w-[240px] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
              Level {currentLevel}: {levelTitle}
            </span>
            <span className="font-mono text-slate-600 dark:text-slate-300 font-bold">
              {currentXP} / {nextLevelXP} XP
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${levelProgressPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
            <span>{nextLevelXP - currentXP} XP to Level {currentLevel + 1}</span>
            <span className="flex items-center gap-1 font-bold text-amber-600">
              <Flame className="w-3 h-3 text-amber-500" />
              {userProfile?.streak_days || 4}d Streak
            </span>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('missions')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            activeTab === 'missions'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Daily Quests & Missions
        </button>
        <button
          onClick={() => setActiveTab('weekly-report')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            activeTab === 'weekly-report'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Weekly "You vs. Last Week" Report
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            activeTab === 'badges'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Badges & Subject Mastery
        </button>
      </div>

      {/* Tab 1: Daily Quests */}
      {activeTab === 'missions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userProfile?.missions?.map((m) => {
            const isDone = m.completed;
            return (
              <div 
                key={m.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Daily Mission
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-mono">
                      +{m.xp} XP
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold leading-snug ${isDone ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>
                    {m.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      Completed & Claimed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleClaim(m.id)}
                      disabled={claiming[m.id]}
                      className="w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1"
                    >
                      <Zap className="w-3 h-3" />
                      <span>{claiming[m.id] ? 'Claiming...' : 'Claim Quest XP'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Weekly "You vs. Last Week" Report */}
      {activeTab === 'weekly-report' && weeklyReport && (
        <div className="space-y-4">
          
          {/* Coach's Encouragement Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                Personal Growth Coach Verdict
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                {weeklyReport.coach_verdict}
              </p>
            </div>
          </div>

          {/* Metrics Comparison Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(weeklyReport.metrics).map(([key, m]) => {
              const labelMap = {
                study_hours: 'Study Time',
                quiz_accuracy: 'Quiz Accuracy',
                topics_rescued: 'Topics Rescued',
                careless_mistakes: 'Careless Errors',
                xp_earned: 'Mastery XP'
              };

              return (
                <div 
                  key={key}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1.5"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {labelMap[key] || key}
                  </span>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                      {m.this_week}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {m.unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      {m.change_pct > 0 ? `+${m.change_pct}%` : `${m.change_pct}%`} vs last wk
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400">
              Next Personal Milestone: <strong className="text-slate-900 dark:text-white">{weeklyReport.next_milestone}</strong>
            </span>
            <button
              onClick={() => onNavigateQuiz && onNavigateQuiz()}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Practice now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* Tab 3: Badges & Subject Progress Bars */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Earned Badges
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userProfile?.badges?.map((b) => (
                <div 
                  key={b.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    b.unlocked
                      ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    b.unlocked 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  }`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {b.title}
                      </h4>
                      {b.unlocked && (
                        <Check className="w-3 h-3 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {b.desc}
                    </p>
                    <span className="text-[9px] font-mono text-slate-400 block pt-0.5">
                      {b.unlocked ? `Unlocked ${b.date}` : b.progress}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Mastery Progress Bars (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Curriculum Domain Mastery
            </span>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
              {subjectsProgress.map((subj) => (
                <div key={subj.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{subj.name}</span>
                    <span className="font-mono text-slate-900 dark:text-white font-bold">{subj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`${subj.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${subj.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
