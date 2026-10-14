import React, { useState } from 'react';
import { Sparkles, Flame, Zap, Search, Sun, Moon, Layers, Clock, Globe2, ChevronDown } from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  userProfile, 
  onSearch, 
  theme, 
  setTheme,
  onOpenProfile
}) {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 lg:px-8 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-xs group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[9px] flex items-center justify-center">
              <span className="text-base">🌈</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                EduVision
              </span>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800">
                RescueVerse AI
              </span>
            </div>
            <p className="text-[9px] text-slate-400 hidden sm:block tracking-wide">
              Learn it. Visualize it. Rescue it.
            </p>
          </div>
        </div>

        {/* Universal Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm items-center relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search concept or ask AI Buddy..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full bg-slate-100/90 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner"
          />
        </div>

        {/* Stats, Reminders & Profile Pill */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Exam Countdown Reminder Pill */}
          <button
            onClick={() => setActiveView('deadlines')}
            title="Nearest Exam: Physics Midterm Board Exam in 12 days"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 text-[11px] font-bold text-rose-700 dark:text-rose-400 hover:bg-rose-100 transition-colors"
          >
            <Clock className="w-3 h-3 text-rose-500 animate-pulse" />
            <span>Physics Exam: 12d</span>
          </button>

          {/* Daily Streak */}
          <div 
            title="Daily Learning Streak"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-400"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
            <span>{userProfile?.streak_days || 4}d</span>
          </div>

          {/* XP counter */}
          <div 
            title="Total Improvement XP"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
            <span>{userProfile?.xp || 580} XP</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>

          {/* Student Profile Pill (Click to open modal) */}
          <button
            onClick={onOpenProfile}
            title="Open Student Profile & Settings"
            className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 text-left hover:opacity-85 transition-opacity"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {(userProfile?.name || 'S').charAt(0)}
            </div>
            <div className="hidden lg:block">
              <span className="font-bold text-xs text-slate-900 dark:text-white block leading-tight">
                {userProfile?.name || 'Siddhi'}
              </span>
              <span className="text-[9px] text-slate-400 block">
                {userProfile?.class_level || 'Class 10'} • {userProfile?.board || 'CBSE'}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden lg:block" />
          </button>

        </div>

      </div>
    </header>
  );
}
