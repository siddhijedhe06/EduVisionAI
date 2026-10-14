import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldAlert, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { get2HourRescuePlan } from '../services/api';

export default function RescueModeView({ onNavigateQuiz }) {
  const [plan, setPlan] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(120 * 60); // 120 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [completedItems, setCompletedItems] = useState({});
  const [copiedText, setCopiedText] = useState(null);

  useEffect(() => {
    loadPlan();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const loadPlan = async () => {
    const data = await get2HourRescuePlan();
    if (data) {
      setPlan(data);
    }
  };

  const formatTimer = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleCheck = (itemId) => {
    setCompletedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const copyCheatsheet = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const totalItemsCount = plan?.phases?.reduce((acc, p) => acc + p.items.length, 0) || 12;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalItemsCount) * 100);

  return (
    <div className="space-y-5">
      
      {/* Top Banner with Live Rescue Timer */}
      <div className="card-light rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white border border-rose-900/60 shadow-xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <Zap className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Exam Emergency Protocol</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              2-Hour Rescue Mode
            </h1>
            <p className="text-xs text-rose-200/80 leading-relaxed">
              Triage for last-minute exams. 4 non-negotiable phases designed to maximize marks in minimal time without overwhelm.
            </p>
          </div>

          {/* Big Digital Stopwatch */}
          <div className="flex flex-col items-center bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 shadow-inner">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Time Remaining
            </span>
            <span className="font-mono text-3xl sm:text-4xl font-black text-rose-400 tracking-wider">
              {formatTimer(secondsLeft)}
            </span>

            {/* Timer controls */}
            <div className="flex items-center gap-2 mt-2.5">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  isRunning 
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Start Sprint</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setSecondsLeft(120 * 60);
                }}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                title="Reset timer to 120 mins"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-rose-200">Sprint Completion:</span>
            <span className="font-mono text-white font-bold">{completedCount} of {totalItemsCount} items ({progressPct}%)</span>
          </div>
          <div className="w-full sm:w-64 bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full transition-all duration-300" 
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

      </div>

      {/* 4 Rescue Phases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plan?.phases?.map((p, idx) => {
          const phaseColorStyles = {
            cyan: 'border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/20 dark:bg-cyan-950/10',
            amber: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10',
            rose: 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10',
            emerald: 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10',
          }[p.color] || 'border-slate-200 dark:border-slate-800';

          return (
            <div 
              key={p.id}
              className={`rounded-2xl p-4 sm:p-5 border bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between ${phaseColorStyles}`}
            >
              <div>
                
                {/* Phase Badge & Time */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {p.phase}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  {p.title}
                </h3>

                {/* Checklist Items */}
                <div className="space-y-2">
                  {p.items.map((item, itemIdx) => {
                    const itemId = `${p.id}-${itemIdx}`;
                    const isDone = completedItems[itemId];
                    return (
                      <div 
                        key={itemIdx}
                        onClick={() => toggleCheck(itemId)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all flex items-start justify-between gap-2 ${
                          isDone
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 line-through'
                            : 'bg-white dark:bg-slate-800/90 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                            isDone 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-slate-300 dark:border-slate-600'
                          }`}>
                            {isDone && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-[11px] leading-relaxed font-medium">
                            {item}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyCheatsheet(item);
                          }}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                          title="Copy text"
                        >
                          {copiedText === item ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    );
                  })}
                </div>

              </div>

              {idx === 1 && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => onNavigateQuiz && onNavigateQuiz()}
                    className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>Test these derivations in Quiz</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
