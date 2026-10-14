import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDown, 
  Sliders, 
  BookOpen, 
  HelpCircle,
  Zap,
  Check
} from 'lucide-react';
import { getPrerequisites } from '../services/api';

export default function PrerequisiteFinderView({ onNavigateVisualizer, onNavigateAI }) {
  const [data, setData] = useState(null);
  const [activeStep, setActiveStep] = useState(1); // Root gap step
  
  // Interactive Mini Bridge Simulator state: Denominator slider
  const [sliderA, setSliderA] = useState(2); // Cross section area multiplier (1x to 5x)
  const [lengthL, setLengthL] = useState(10); // Length fixed at 10
  const calculatedR = (lengthL / sliderA).toFixed(2);

  useEffect(() => {
    loadPrereqs();
  }, []);

  const loadPrereqs = async () => {
    const res = await getPrerequisites('topic-resistance');
    if (res) setData(res);
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="card-light rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200/60 dark:border-purple-800/60 mb-2">
            <GitBranch className="w-3.5 h-3.5 text-purple-600" />
            <span>Winning Feature Suite</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Prerequisite Gap Finder
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Struggling with a high school topic? 85% of physics and math confusion stems from a missed foundation concept in earlier classes (Class 6, 7, or 8).
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs max-w-xs">
          <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1 mb-0.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Diagnostic Result
          </span>
          <p className="text-[11px] text-amber-700 dark:text-amber-400">
            Resistance difficulties traced back to <strong>Class 8: Inverse Proportions</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Prerequisite Ladder (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Concept Foundation Ladder</span>
            <span>Trace Direction: Top ➔ Root</span>
          </div>

          {data?.ladder?.map((step, idx) => {
            const isGap = step.status === 'gap_detected';
            const isMastered = step.status === 'mastered';
            const isCurrent = step.status === 'in_progress';

            return (
              <div 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  isGap 
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 shadow-sm ring-2 ring-amber-400/20' 
                    : isCurrent
                      ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-800'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-90'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    
                    {/* Grade indicator pill */}
                    <div className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono shrink-0 ${
                      isGap
                        ? 'bg-amber-500 text-white shadow-xs'
                        : isCurrent
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {step.grade}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                          {step.concept}
                        </h3>
                        {isGap && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                            Root Gap Found
                          </span>
                        )}
                      </div>

                      {step.summary && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          {step.summary}
                        </p>
                      )}

                      {isGap && step.warning && (
                        <div className="mt-2 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 text-[11px] space-y-1">
                          <p className="font-semibold text-amber-800 dark:text-amber-300">
                            {step.warning}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400">
                            Remedy: {step.remedy}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 pt-0.5">
                    {isMastered && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {isGap && <AlertTriangle className="w-4 h-4 text-amber-500 animate-bounce" />}
                    {isCurrent && <Zap className="w-4 h-4 text-indigo-500" />}
                  </div>
                </div>

                {/* Connecting Arrow */}
                {idx < data.ladder.length - 1 && (
                  <div className="flex justify-center -mb-5 mt-2">
                    <ArrowDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 1-Minute Interactive Bridge Refresher (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-light rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  1-Minute Foundation Bridge
                </h3>
                <span className="text-[10px] text-slate-400">Class 8 Math ➔ Class 10 Physics</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Why does a thicker wire reduce resistance? Because the formula is a fraction with Area in the <strong>denominator</strong>:
            </p>

            {/* Interactive Math Fraction Visualizer */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <div className="inline-block font-mono text-base font-bold text-slate-800 dark:text-slate-100">
                <div className="pb-1 border-b-2 border-slate-800 dark:border-slate-200">
                  Length L ({lengthL}m)
                </div>
                <div className="pt-1 text-indigo-600 dark:text-indigo-400">
                  Area A ({sliderA} mm²)
                </div>
              </div>

              <div className="text-xs font-bold">
                Resistance = <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{calculatedR} Ω</span>
              </div>

              {/* Slider for Area */}
              <div className="space-y-1 text-left pt-2">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  <span>Adjust Wire Thickness (Area A):</span>
                  <span className="font-mono text-indigo-600 font-bold">{sliderA}×</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={sliderA}
                  onChange={(e) => setSliderA(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>Thin wire (High R)</span>
                  <span>Thick wire (Low R)</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 block">💡 The Mental Click:</span>
              <p>
                As denominator (Area) grows from 1 to 5, the total fraction drops from 10.0 Ω down to 2.0 Ω. Thicker wire gives electrons 5 lanes to pass through instead of 1!
              </p>
            </div>

            <button
              onClick={() => onNavigateVisualizer && onNavigateVisualizer()}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span>See This Live in Visual Lab</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
