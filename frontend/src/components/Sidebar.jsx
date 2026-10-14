import React from 'react';
import { 
  Home, 
  Compass, 
  GitFork, 
  Sliders, 
  Bot, 
  BookMarked, 
  Gamepad2, 
  ChevronRight,
  Sparkles,
  BookOpen,
  Zap,
  RotateCcw,
  Clock,
  Trophy,
  GitBranch
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, onOpenProfile }) {
  const coreItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-indigo-600' },
    { id: 'ai-tutor', label: 'AI Study Buddy', icon: Bot, badge: 'Multilingual', color: 'text-violet-600' },
    { id: 'practice', label: 'Practice Quiz', icon: Gamepad2, badge: 'Generator', color: 'text-purple-600' },
    { id: 'visualizer', label: 'Visual Lab', icon: Sliders, badge: 'Live Sim', color: 'text-blue-600' },
    { id: 'subjects', label: 'Curriculum Tree', icon: Compass, color: 'text-cyan-600' }
  ];

  const rescueItems = [
    { id: 'rescue-2hour', label: '2-Hour Rescue', icon: Zap, badge: 'Emergency', highlight: true, color: 'text-rose-600' },
    { id: 'rescue-loop', label: 'Rescue Loop', icon: RotateCcw, badge: 'Adaptive', color: 'text-indigo-600' },
    { id: 'prerequisites', label: 'Prerequisite Gap', icon: GitBranch, badge: 'Class 6-8', color: 'text-purple-600' },
    { id: 'deadlines', label: 'Deadline Doctor', icon: Clock, badge: '12d left', color: 'text-amber-600' },
    { id: 'quests', label: 'Quest & Growth', icon: Trophy, badge: 'Healthy XP', color: 'text-emerald-600' },
    { id: 'notes', label: 'Notes Simplifier', icon: BookMarked, badge: 'Active Recall', color: 'text-amber-600' },
    { id: 'references', label: 'Sources & Books', icon: BookOpen, color: 'text-rose-600' },
  ];

  const renderNavGroup = (title, items) => (
    <div className="space-y-1">
      <p className="px-3 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
        {title}
      </p>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isActive 
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded-lg ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : `${item.color} bg-slate-100 dark:bg-slate-800`
              }`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="truncate">{item.label}</span>
            </div>

            {item.badge && (
              <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-md shrink-0 ${
                item.highlight
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-extrabold'
                  : isActive
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <aside className="w-full lg:w-56 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-3 flex flex-col justify-between shrink-0 shadow-xs">
      <div className="space-y-4">
        
        {/* Core Navigation */}
        {renderNavGroup('Core Modules', coreItems)}

        {/* RescueVerse Features */}
        {renderNavGroup('RescueVerse AI', rescueItems)}

        {/* Mini 2-Hour Rescue Fast Action */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50/50 dark:from-rose-950/30 dark:to-slate-900 border border-rose-100 dark:border-rose-950 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-rose-700 dark:text-rose-400">
            <Zap className="w-3 h-3 text-rose-500 animate-pulse" />
            <span>Last-Minute Emergency?</span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Instant 4-phase exam triage sprint.
          </p>
          <button
            onClick={() => setActiveView('rescue-2hour')}
            className="w-full py-1.5 px-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all shadow-xs"
          >
            <span>Launch 2-Hour Rescue</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[9px] text-slate-400 flex items-center justify-between">
        <span>Class 10 CBSE</span>
        <button onClick={onOpenProfile} className="hover:text-indigo-600 underline">
          Edit Profile
        </button>
      </div>
    </aside>
  );
}
