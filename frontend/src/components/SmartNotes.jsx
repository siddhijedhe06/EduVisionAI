import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Sparkles, 
  Plus, 
  RotateCw, 
  Copy, 
  Check, 
  Tag,
  Upload,
  FileText,
  HelpCircle,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getNotes, createNote, summarizeNotes, simplifyNotesText } from '../services/api';
import ReferenceSources from './ReferenceSources';

export default function SmartNotes() {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('simplifier'); // 'simplifier' | 'notes' | 'flashcards' | 'summary' | 'references'
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Personal');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  
  // Notes Simplifier State
  const [rawNotesInput, setRawNotesInput] = useState(
    "Resistance is the property of a conductor by virtue of which it opposes the flow of electric charges through it. When an electric current flows through a metallic wire, free electrons drift from the negative terminal to the positive terminal. During their movement, they repeatedly collide with the fixed metallic atoms or ions in the lattice. These collisions impede the electron drift. The mathematical relation is R = rho * (L / A). Lengthening the conductor increases collisions, whereas increasing cross-sectional area provides more parallel channels for electrons. Resistance also increases with rising temperature in metallic conductors because lattice ions vibrate more vigorously. SI unit is Ohm. Resistivity rho is independent of dimensions."
  );
  const [simplifierResult, setSimplifierResult] = useState(null);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [userQuizAnswers, setUserQuizAnswers] = useState({});

  const [flashcards, setFlashcards] = useState([
    {
      id: 'fc-1',
      front: 'What is the microscopic cause of Resistance in a metallic wire?',
      back: 'Moving conduction electrons collide repeatedly with vibrating positive ions in the metallic crystal lattice, causing energy loss as heat.',
      flipped: false
    },
    {
      id: 'fc-2',
      front: 'How does doubling wire diameter affect electrical resistance?',
      back: 'Area is proportional to diameter squared (A ∝ d²). Doubling diameter quadruples cross-sectional area (4×), cutting resistance down to 1/4th!',
      flipped: false
    },
    {
      id: 'fc-3',
      front: 'What is the SI unit of Resistivity (ρ)?',
      back: 'Ohm-meter (Ω·m). Unlike resistance, resistivity is an intrinsic material property independent of conductor dimensions.',
      flipped: false
    }
  ]);
  const [summaryText, setSummaryText] = useState(
    "📌 RescueVerse AI Executive Summary — Resistance:\n\n" +
    "1. Fundamental Definition: Opposition against electric charge motion: R = V / I.\n" +
    "2. Geometrical Formula: R = ρ · (L / A). Directly proportional to length, inversely to area.\n" +
    "3. Joule Dissipation: Electrical energy is converted to thermal energy: P = I² · R.\n" +
    "4. Applications: Low R conductors (Copper/Silver) for transmission lines; high R alloys (Nichrome) for toasters."
  );

  useEffect(() => {
    fetchNotes();
    handleSimplifyRun(); // run default notes once
  }, []);

  const fetchNotes = async () => {
    const fetched = await getNotes('topic-resistance');
    if (fetched && fetched.length > 0) {
      setNotes(fetched);
    }
  };

  const handleSimplifyRun = async () => {
    if (!rawNotesInput.trim() || isSimplifying) return;
    setIsSimplifying(true);
    setUserQuizAnswers({});
    const res = await simplifyNotesText(rawNotesInput);
    if (res) {
      setSimplifierResult(res);
    }
    setIsSimplifying(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRawNotesInput(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleAnswerQuestion = (qIdx, optIdx, correctIdx) => {
    setUserQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
    if (optIdx === correctIdx) {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const res = await createNote({
      topic_id: 'topic-resistance',
      title: newTitle,
      content: newContent,
      category: 'personal',
      tags: [newTag]
    });

    if (res) {
      setNotes([res, ...notes]);
      setNewTitle('');
      setNewContent('');
      setShowAddForm(false);
    }
  };

  const toggleFlip = (index) => {
    setFlashcards(flashcards.map((f, i) => i === index ? { ...f, flipped: !f.flipped } : f));
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="card-light rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200/60 dark:border-amber-800/60 mb-2">
            <BookMarked className="w-3.5 h-3.5 text-amber-600" />
            <span>Smart Notes & Simplifier</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Notes Simplifier & Active Recall
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Paste messy textbook excerpts or lecture notes. AI condenses them into a 3-bullet summary, extracted formulas, and active recall practice questions.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('simplifier')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeTab === 'simplifier'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Notes Simplifier</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Flashcards ({flashcards.length})
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'notes'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Saved Notebook
          </button>
        </div>
      </div>

      {/* Tab 1: Notes Simplifier */}
      {activeTab === 'simplifier' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Input Area (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Paste or Upload Notes
                </span>
                <label className="cursor-pointer text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>Upload .txt/.md</span>
                  <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <textarea
                rows={9}
                value={rawNotesInput}
                onChange={(e) => setRawNotesInput(e.target.value)}
                placeholder="Paste class notes, textbook paragraphs, or lecture slides here..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
              />

              <button
                onClick={handleSimplifyRun}
                disabled={isSimplifying || !rawNotesInput.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSimplifying ? 'Simplifying Notes...' : 'Simplify & Generate Questions'}</span>
              </button>
            </div>
          </div>

          {/* Output: Summary, Formulas & Questions (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {simplifierResult ? (
              <div className="space-y-4">
                
                {/* 3-Bullet Summary */}
                <div className="card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>3-Bullet Core Concept Summary</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {simplifierResult.summary_bullets?.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Formulas */}
                {simplifierResult.key_formulas && simplifierResult.key_formulas.length > 0 && (
                  <div className="card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 block">
                      Extracted Formulas & SI Units
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {simplifierResult.key_formulas.map((f, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-500 block">{f.name}</span>
                          <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 block">{f.formula}</span>
                          <span className="text-[9px] text-slate-400 font-mono block">{f.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Recall Practice Questions */}
                <div className="card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Auto-Generated Active Recall Questions
                    </span>
                    <span className="text-[10px] text-slate-400">Instant Concept Check</span>
                  </div>

                  <div className="space-y-4">
                    {simplifierResult.practice_questions?.map((q, qIdx) => {
                      const selected = userQuizAnswers[qIdx];
                      const isAnswered = selected !== undefined;
                      const isCorrect = selected === q.correct_index;

                      return (
                        <div key={qIdx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700 space-y-2 text-xs">
                          <h4 className="font-bold text-slate-900 dark:text-white leading-relaxed">
                            {qIdx + 1}. {q.question}
                          </h4>

                          <div className="space-y-1.5">
                            {q.options.map((opt, optIdx) => {
                              let btnStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300';
                              if (isAnswered) {
                                if (optIdx === q.correct_index) {
                                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
                                } else if (optIdx === selected) {
                                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 font-bold';
                                } else {
                                  btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleAnswerQuestion(qIdx, optIdx, q.correct_index)}
                                  disabled={isAnswered}
                                  className={`w-full p-2 rounded-xl border text-left text-[11px] flex items-center justify-between transition-all ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isAnswered && optIdx === q.correct_index && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                                  {isAnswered && optIdx === selected && optIdx !== q.correct_index && <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                                </button>
                              );
                            })}
                          </div>

                          {isAnswered && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                              {q.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
                Click "Simplify & Generate Questions" to see the magic.
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flashcards.map((fc, idx) => (
            <div
              key={fc.id}
              onClick={() => toggleFlip(idx)}
              className="h-56 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs cursor-pointer select-none transition-all hover:scale-[1.01] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold">
                <span>Card {idx + 1}</span>
                <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                  <RotateCw className="w-3 h-3" />
                  <span>{fc.flipped ? 'Showing Answer' : 'Click to Flip'}</span>
                </span>
              </div>

              <div className="my-auto text-center text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                {fc.flipped ? (
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                    {fc.back}
                  </span>
                ) : (
                  <span>{fc.front}</span>
                )}
              </div>

              <div className="text-[9px] text-center text-slate-400 font-mono">
                {fc.flipped ? 'Active Recall Verified' : 'Tap to test your recall'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Saved Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Note</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleCreateNote} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
              <input
                type="text"
                placeholder="Note title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 font-bold"
                required
              />
              <textarea
                rows={3}
                placeholder="Content..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
                >
                  Save Note
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">{note.title}</h3>
                  <span className="text-[10px] text-slate-400">{note.created_at}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-[11px]">
                  {note.content}
                </p>
                {note.tags && (
                  <div className="flex gap-1 pt-1">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
