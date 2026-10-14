import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  BookOpen, 
  Globe2, 
  Sparkles, 
  Check, 
  ShieldCheck,
  Flame,
  Zap
} from 'lucide-react';
import { updateUserProfile } from '../services/api';

export default function StudentProfileModal({ 
  isOpen, 
  onClose, 
  userProfile, 
  onProfileUpdated 
}) {
  if (!isOpen) return null;

  const [name, setName] = useState(userProfile?.name || 'Siddhi');
  const [classLevel, setClassLevel] = useState(userProfile?.class_level || 'Class 10');
  const [board, setBoard] = useState(userProfile?.board || 'CBSE');
  const [targetSubject, setTargetSubject] = useState(userProfile?.target_subject || 'Physics');
  const [language, setLanguage] = useState(userProfile?.language || 'English');
  const [explanationStyle, setExplanationStyle] = useState(userProfile?.explanation_style || 'cricket');
  const [saving, setSaving] = useState(false);

  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
  const boards = ['CBSE', 'ICSE', 'State Board (MSBSHSE / UP / etc)', 'IB', 'Cambridge (IGCSE)'];
  const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'];
  const languages = [
    { id: 'English', label: 'English' },
    { id: 'Hindi', label: 'हिंदी (Hindi)' },
    { id: 'Hinglish', label: 'Hinglish (हिंग्लिश)' },
    { id: 'Marathi', label: 'मराठी (Marathi)' }
  ];
  const styles = [
    { id: 'cricket', label: '🏏 Cricket Analogy', desc: 'Turf friction, fast bowling, outfield gaps' },
    { id: 'eli5', label: '👶 Explain Like I\'m 5', desc: 'Everyday water hose, playground slides' },
    { id: 'story', label: '🎬 Superhero Story', desc: 'Electron squad infiltrates crystal fortress' },
    { id: 'steps', label: '🔬 Step-by-Step Lab', desc: 'Crisp protocol bullets & observations' },
    { id: 'formula', label: '⚡ Formula Intuition', desc: 'Pure mathematical derivation & limits' }
  ];

  const handleSave = async () => {
    setSaving(true);
    const updated = {
      name,
      class_level: classLevel,
      board,
      target_subject: targetSubject,
      language,
      explanation_style: explanationStyle
    };
    const res = await updateUserProfile(updated);
    setSaving(false);
    if (onProfileUpdated) {
      onProfileUpdated({ ...userProfile, ...updated });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Student Profile & Preferences
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                RescueVerse AI customizes explanations, curriculum & exam plans to your profile.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Name & Quick Stats */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {name.charAt(0)}
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Student Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent font-bold text-slate-900 dark:text-white border-b border-dashed border-slate-300 dark:border-slate-600 focus:outline-none focus:border-indigo-500 pb-0.5"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-bold border border-amber-200/60 dark:border-amber-800/60 text-[11px]">
                <Flame className="w-3.5 h-3.5" />
                {userProfile?.streak_days || 4}d Streak
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/60 dark:border-indigo-800/60 text-[11px]">
                <Zap className="w-3.5 h-3.5" />
                {userProfile?.xp || 580} XP
              </span>
            </div>
          </div>

          {/* Class & Board Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Class / Grade Level
              </label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Curriculum Board
              </label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {boards.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary Target Subject */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Current Focus Subject
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {subjects.map((subj) => (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setTargetSubject(subj)}
                  className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all ${
                    targetSubject === subj 
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 text-indigo-700 dark:text-indigo-300 shadow-xs' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Globe2 className="w-3.5 h-3.5 text-indigo-500" />
              <label className="font-bold text-slate-700 dark:text-slate-300">
                AI Buddy Preferred Language
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLanguage(l.id)}
                  className={`py-2.5 px-3 rounded-xl border text-left font-semibold flex items-center justify-between transition-all ${
                    language === l.id
                      ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-400 text-cyan-800 dark:text-cyan-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{l.label}</span>
                  {language === l.id && <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Explain in My Way Style */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Default Explanation Style ("Explain in My Way")
              </label>
            </div>
            <div className="space-y-1.5">
              {styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setExplanationStyle(s.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    explanationStyle === s.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {s.label}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {s.desc}
                    </span>
                  </div>
                  {explanationStyle === s.id && (
                    <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

      </div>
    </div>
  );
}
