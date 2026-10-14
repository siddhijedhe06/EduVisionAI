import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Flame, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Bell,
  Zap,
  Check
} from 'lucide-react';
import { getDeadlines, createDeadline, deleteDeadline } from '../services/api';

export default function DeadlineDoctor({ onLaunchRescueMode, onNavigateQuiz }) {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Add deadline form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('exam');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newDate, setNewDate] = useState('');
  const [newSyllabus, setNewSyllabus] = useState('');

  // Daily plan completed checkboxes
  const [completedPlans, setCompletedPlans] = useState({});

  useEffect(() => {
    loadDeadlines();
  }, []);

  const loadDeadlines = async () => {
    setLoading(true);
    const list = await getDeadlines();
    if (list) {
      setDeadlines(list);
    }
    setLoading(false);
  };

  const handleAddDeadline = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Calculate approximate days left if date provided
    let days = 14;
    if (newDate) {
      const target = new Date(newDate);
      const now = new Date();
      const diffMs = target - now;
      days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    }

    const payload = {
      title: newTitle,
      type: newType,
      subject: newSubject,
      target_date: newDate || '2026-10-30T10:00:00',
      days_left: days,
      urgency: days <= 5 ? 'critical' : days <= 12 ? 'approaching' : 'on_track',
      weightage: newType === 'exam' ? 'Board Weightage 35%' : 'Internal Assessment',
      daily_rescue_plan: `Daily 25 mins: Key formula derivations & 3 practice numericals for ${newTitle}`,
      syllabus: newSyllabus ? newSyllabus.split(',').map(s => s.trim()) : [newSubject]
    };

    const res = await createDeadline(payload);
    if (res) {
      setDeadlines([...deadlines, res]);
      setShowAddModal(false);
      setNewTitle('');
      setNewDate('');
      setNewSyllabus('');
    }
  };

  const handleDelete = async (id) => {
    await deleteDeadline(id);
    setDeadlines(deadlines.filter(d => d.id !== id));
  };

  const togglePlanComplete = (id) => {
    setCompletedPlans(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="card-light rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200/60 dark:border-rose-800/60 mb-2">
            <Clock className="w-3.5 h-3.5 text-rose-600" />
            <span>Deadline Doctor</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Exam & Homework Countdown Schedules
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Never panic again. Deadline Doctor breaks upcoming exams and assignments into steady, manageable daily rescue sprints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onLaunchRescueMode && onLaunchRescueMode()}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-xs transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>2-Hour Rescue Mode</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xs transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Deadline</span>
          </button>
        </div>
      </div>

      {/* Countdown Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deadlines.map((item) => {
          const isCritical = item.days_left <= 5;
          const isApproaching = item.days_left > 5 && item.days_left <= 14;
          const isCompleted = completedPlans[item.id];

          return (
            <div 
              key={item.id}
              className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                isCritical 
                  ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 shadow-xs' 
                  : isApproaching
                    ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              <div>
                
                {/* Badge & Days left */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    item.type === 'exam'
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {item.type === 'exam' ? 'Exam' : 'Homework'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <div className={`px-2.5 py-1 rounded-xl font-mono text-xs font-black flex items-center gap-1 ${
                      isCritical
                        ? 'bg-rose-500 text-white animate-pulse'
                        : isApproaching
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{item.days_left} {item.days_left === 1 ? 'Day' : 'Days'} Left</span>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Remove deadline"
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Subject */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{item.subject}</span>
                  <span>•</span>
                  <span>{item.weightage}</span>
                </p>

                {/* Syllabus Chips */}
                {item.syllabus && item.syllabus.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {item.syllabus.map((s, idx) => (
                      <span 
                        key={idx}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

              </div>

              {/* Daily Rescue Plan Widget */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    Today's Rescue Slice
                  </span>
                  <span className="text-[10px] text-slate-400">Target: 30m</span>
                </div>

                <div 
                  onClick={() => togglePlanComplete(item.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                    isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 line-through'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isCompleted && <Check className="w-3 h-3" />}
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {item.daily_rescue_plan}
                  </p>
                </div>

                {isCritical && (
                  <button
                    onClick={() => onLaunchRescueMode && onLaunchRescueMode()}
                    className="w-full mt-2 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Emergency 2-Hour Sprint</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Deadline Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Add New Deadline
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Deadline Doctor will compute your daily rescue schedule automatically.
            </p>

            <form onSubmit={handleAddDeadline} className="space-y-3.5">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Physics Midterm Board Exam"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="exam">Major Exam / Test</option>
                    <option value="homework">Homework / Project</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Key Chapters / Syllabus (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Electricity, Ohm's Law, Joule Heating"
                  value={newSyllabus}
                  onChange={(e) => setNewSyllabus(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xs transition-all"
                >
                  Save Deadline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
