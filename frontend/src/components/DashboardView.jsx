import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Zap, 
  ArrowRight, 
  Search, 
  Compass, 
  Layers, 
  Award,
  Bot,
  Sliders,
  ChevronRight,
  BookOpen,
  Clock,
  RotateCcw,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Check,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getDeadlines, getRescuePlan, getWeakTopics, getWeeklyReport, claimQuest } from '../services/api';

export default function DashboardView({ 
  userProfile, 
  onNavigateView, 
  onAskAI,
  onOpenProfile,
  onUpdateProfile
}) {
  const [deadlines, setDeadlines] = useState([]);
  const [rescuePlan, setRescuePlan] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);
  const [weeklyReport, setWeeklyReport] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const [dl, rp, wt, rep] = await Promise.all([
      getDeadlines(),
      getRescuePlan(),
      getWeakTopics(),
      getWeeklyReport()
    ]);
    if (dl) setDeadlines(dl.slice(0, 2));
    if (rp) setRescuePlan(rp.slice(0, 2));
    if (wt) setWeakTopics(wt.slice(0, 3));
    if (rep) setWeeklyReport(rep);
  };

  const handleClaim = async (questId) => {
    const res = await claimQuest(questId);
    if (res) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      if (onUpdateProfile) onUpdateProfile();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="card-light rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-indigo-50/90 via-purple-50/40 to-white dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 border border-indigo-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Good Evening, {userProfile?.name || 'Siddhi'} 👋</span>
            </div>

            <button
              onClick={onOpenProfile}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              {userProfile?.class_level || 'Class 10'} • {userProfile?.board || 'CBSE'}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            Learn it. Visualize it. <span className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Rescue it.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Personalized exam rescue engine, adaptive mistake feedback, and physical science simulators.
          </p>

          {/* Quick AI Search Bar */}
          <div className="pt-1 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Ask AI Buddy (e.g. 'Explain resistance like cricket bowling')..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    onAskAI(e.target.value);
                  }
                }}
                className="w-full bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 shadow-xs"
              />
            </div>
            <button
              onClick={() => onNavigateView('ai-tutor')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>Ask Buddy</span>
              <Bot className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Emergency 2-Hour Rescue Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white border border-rose-900/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Exam Panic? Launch 2-Hour Rescue Mode
              </h3>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-rose-500 text-white">
                Emergency Sprint
              </span>
            </div>
            <p className="text-[11px] text-rose-200/80 mt-0.5">
              4 high-yield phases: Must-Know Formulas ➔ Top 3 Derivations ➔ Trap Avoidance ➔ Calm Strategy.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateView('rescue-2hour')}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Start 120m Sprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid: Daily Missions & Deadline Doctor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Daily Quests / Missions (Left 6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Today's Rescue Missions</span>
            </h2>
            <button
              onClick={() => onNavigateView('quests')}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Quests & Badges
            </button>
          </div>

          <div className="space-y-2.5">
            {userProfile?.missions?.map((m) => (
              <div 
                key={m.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  m.completed
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                    m.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                  }`}>
                    {m.completed && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold leading-tight ${m.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {m.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">+{m.xp} XP</span>
                  </div>
                </div>

                {!m.completed && (
                  <button
                    onClick={() => handleClaim(m.id)}
                    className="py-1 px-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-[10px] font-bold transition-colors shrink-0"
                  >
                    Claim XP
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deadline Doctor Widget (Right 6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>Deadline Doctor</span>
            </h2>
            <button
              onClick={() => onNavigateView('deadlines')}
              className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Full Schedule
            </button>
          </div>

          <div className="space-y-2.5">
            {deadlines.map((dl) => (
              <div 
                key={dl.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {dl.subject}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {dl.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {dl.daily_rescue_plan}
                  </p>
                </div>

                <div className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-900/60 font-mono text-xs font-black text-rose-600 dark:text-rose-400 shrink-0 text-center">
                  <span>{dl.days_left}d</span>
                  <span className="block text-[8px] font-bold uppercase text-slate-400">Left</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grid: Rescue Loop Status & Weak Topic Detector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Rescue Loop Active Radar (Left 6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-indigo-500" />
              <span>Rescue Loop: Quiz Feedback</span>
            </h2>
            <button
              onClick={() => onNavigateView('rescue-loop')}
              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Open Loop
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2.5">
            {rescuePlan.map((rp) => (
              <div key={rp.id} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{rp.title}</span>
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                    {rp.mistake_type?.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400">
                  {rp.suggested_action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topic Detector Chips (Right 6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Weak Topic Detector</span>
            </h2>
            <button
              onClick={() => onNavigateView('prerequisites')}
              className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Prerequisite Gap Finder
            </button>
          </div>

          <div className="space-y-2">
            {weakTopics.map((wt) => (
              <div 
                key={wt.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{wt.topic}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    "{wt.common_mistake}"
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-xs text-amber-600 block">{wt.mastery}%</span>
                  <button
                    onClick={() => onNavigateView('rescue-loop')}
                    className="text-[10px] font-bold text-indigo-600 hover:underline"
                  >
                    Rescue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Healthy Gamification Spotlight: "You vs. Last Week" */}
      {weeklyReport && (
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Healthy Growth Metric • You vs. Last Week
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                Study Time: <strong className="text-emerald-600 font-mono">+60.7%</strong> • Careless Errors: <strong className="text-emerald-600 font-mono">-66.7%</strong> • Personal Bests Only!
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateView('quests')}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-400 transition-colors shrink-0"
          >
            View Weekly Growth Report
          </button>
        </div>
      )}

      {/* Active Concept Deep Dive */}
      <div className="card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
            Active Science Simulation
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Resistance & Ohm's Law (Dual Simulation: Water Pipe & Electron Circuit)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjust pipe constriction diameter, wire length, and battery voltage in real time.
          </p>
        </div>

        <button
          onClick={() => onNavigateView('visualizer')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Launch Visual Sim</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
