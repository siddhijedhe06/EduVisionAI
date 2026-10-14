import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Award,
  Lightbulb,
  AlertCircle,
  RotateCcw,
  Sliders,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateQuiz, submitQuizAnswer, submitDailyChallenge, analyzeMistake } from '../services/api';

export default function PracticeQuiz({ onUpdateProfile, onNavigateVisualizer, onNavigateRescueLoop }) {
  const [chapter, setChapter] = useState('topic-resistance');
  const [difficulty, setDifficulty] = useState('standard');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);

  // Daily Speed Challenge state
  const [speedAnswer, setSpeedAnswer] = useState(null);
  const [speedResult, setSpeedResult] = useState(null);

  const chapters = [
    { id: 'topic-resistance', title: 'Electricity: Resistance & Circuits' },
    { id: 'topic-optics', title: 'Optics: Reflection & Refraction' },
    { id: 'topic-linear', title: 'Maths: Linear Equations' }
  ];

  const difficulties = [
    { id: 'foundation', label: 'Foundation' },
    { id: 'standard', label: 'Standard' },
    { id: 'challenge', label: 'Challenge / Olympiad' }
  ];

  useEffect(() => {
    fetchQuizQuestions();
  }, [chapter, difficulty]);

  const fetchQuizQuestions = async () => {
    setLoading(true);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setFeedback(null);
    setShowHint(false);

    const res = await generateQuiz(chapter, difficulty);
    if (res && res.questions && res.questions.length > 0) {
      setQuestions(res.questions);
    }
    setLoading(false);
  };

  const currentQ = questions[currentIdx] || {
    id: 'default-q',
    question: "What happens to the resistance of a wire if its length is doubled and radius halved?",
    options: ["2 times", "4 times", "8 times", "Unchanged"],
    correct_index: 2,
    hint: "Area A = π·r². Halving radius quarters the area!",
    mistake_types: { 0: 'concept_gap', 1: 'careless_mistake', 3: 'misread_question' },
    explanation: "R = ρ(L/A). Doubling length gives 2L. Halving radius cuts area to 1/4th. Hence R increases 2 / (1/4) = 8 times!",
    xp: 50
  };

  const handleSelectOption = async (optionIdx) => {
    if (isAnswered) return;
    setSelectedOpt(optionIdx);
    setIsAnswered(true);

    const res = await submitQuizAnswer(chapter, currentQ.id, optionIdx);

    if (res) {
      setFeedback(res);
      if (res.is_correct) {
        setScore(prev => prev + 1);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
        if (onUpdateProfile) onUpdateProfile();
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    setFeedback(null);
    setShowHint(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handleSpeedChallengeAnswer = async (index) => {
    if (speedResult) return;
    setSpeedAnswer(index);
    const res = await submitDailyChallenge(index);
    if (res) {
      setSpeedResult(res);
      if (res.is_correct) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.5 }
        });
        if (onUpdateProfile) onUpdateProfile();
      }
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Header with Chapter & Difficulty Generator */}
      <div className="card-light rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200/60 dark:border-purple-800/60 mb-1">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Practice Quiz Generator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Concept Practice & Mistake Radar
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Session Score:</span>
            <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs border border-indigo-200/60 dark:border-indigo-800/60">
              {score} Solved
            </span>
          </div>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Chapter Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Select Chapter / Topic
            </label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:border-indigo-500"
            >
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>{ch.title}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Difficulty Tier
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setDifficulty(diff.id)}
                  className={`py-1 px-2 rounded-lg text-[10px] font-bold transition-all text-center ${
                    difficulty === diff.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Main Quiz Card */}
      <div className="card-light rounded-3xl p-5 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        {/* Progress & Hint Button */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              Question {currentIdx + 1} of {questions.length || 1}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
              +{currentQ.xp || 50} XP
            </span>
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : '💡 Reveal Hint'}</span>
          </button>
        </div>

        {/* Revealed Hint Box */}
        {showHint && currentQ.hint && (
          <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2 animate-in fade-in">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Hint:</span>
              <p>{currentQ.hint}</p>
            </div>
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h2>

        {/* Options Grid */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            let stateStyle = 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-800/80';
            
            if (isAnswered) {
              if (idx === currentQ.correct_index) {
                stateStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20';
              } else if (idx === selectedOpt) {
                stateStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20';
              } else {
                stateStyle = 'border-slate-200 dark:border-slate-800 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all select-none ${stateStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && idx === currentQ.correct_index && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
                {isAnswered && idx === selectedOpt && idx !== currentQ.correct_index && (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Mistake Type Detector Alert */}
        {isAnswered && feedback && (
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
            
            {/* If Incorrect: Mistake Type Detector */}
            {!feedback.is_correct && (
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    <span>Mistake Type Detected: {feedback.mistake_type ? feedback.mistake_type.replace('_', ' ').toUpperCase() : 'CONCEPT GAP'}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                    Rescue Loop Triggered
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {currentQ.explanation}
                </p>

                <div className="pt-2 border-t border-rose-200/60 dark:border-rose-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-rose-700 dark:text-rose-300 font-semibold">
                    🔄 Added a targeted 8-min recovery drill to your Rescue Loop schedule.
                  </span>
                  <button
                    onClick={() => onNavigateRescueLoop && onNavigateRescueLoop()}
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View Rescue Plan
                  </button>
                </div>
              </div>
            )}

            {/* If Correct */}
            {feedback.is_correct && (
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Brilliant! That's correct (+{feedback.xp_earned} XP)</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next Question Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Daily Rover Speed Challenge */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-200/80 dark:border-amber-900/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
              Daily Rover Speed Challenge • Daily Streak Boost
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold">
            +50 XP
          </span>
        </div>

        <p className="text-xs text-slate-800 dark:text-slate-200">
          A rover travels 120m across a test track in 8 seconds. What is its average speed? (v = d / t)
        </p>

        <div className="flex flex-wrap gap-2">
          {["12 m/s", "15 m/s", "18 m/s", "20 m/s"].map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSpeedChallengeAnswer(i)}
              disabled={speedResult !== null}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                speedAnswer === i
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {speedResult && (
          <div className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold pt-1">
            {speedResult.is_correct ? "🎉 Correct! Speed = 120 / 8 = 15 m/s (+50 XP, Streak increased!)" : speedResult.explanation}
          </div>
        )}
      </div>

    </div>
  );
}
