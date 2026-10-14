import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Lightbulb, 
  Sliders, 
  ArrowRight, 
  Zap,
  Globe2,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import { sendAIChat } from '../services/api';

export default function AITutor({ onNavigateVisualizer, onNavigateQuiz, userProfile }) {
  const [language, setLanguage] = useState(userProfile?.language || 'English');
  const [style, setStyle] = useState(userProfile?.explanation_style || 'cricket');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello Siddhi! 👋 I'm your RescueVerse AI Study Buddy.\n\nWe're exploring **Resistance & Resistivity** in Electric Circuits.\n\nYou can switch my language to **Hindi, Hinglish, or Marathi**, or pick how you want me to explain using **'Explain in My Way'** (Cricket pitch analogy, 5-year-old mode, Story mode, etc.)!\n\nWhat would you like to explore first?",
      language: 'English',
      style: 'cricket',
      suggested_follow_up: "Explain resistance using the Cricket Pitch analogy 🏏"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText = inputQuery) => {
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInputQuery('');
    setLoading(true);

    try {
      const aiResponse = await sendAIChat(textToSend, 'topic-resistance', newMessages, language, style);
      setMessages([...newMessages, {
        role: 'assistant',
        content: aiResponse.response,
        language: aiResponse.language || language,
        style: aiResponse.style || style,
        suggested_follow_up: aiResponse.suggested_follow_up,
        source: aiResponse.source
      }]);
    } catch (err) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: "Resistance is the opposition moving electrons face from vibrating atomic ions in a wire: R = ρ(L/A). Would you like to visualize this in the interactive pipe lab?",
        language: 'English',
        style: style
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const languagesList = [
    { id: 'English', label: 'English' },
    { id: 'Hinglish', label: 'Hinglish (हिंग्लिश)' },
    { id: 'Hindi', label: 'हिंदी (Hindi)' },
    { id: 'Marathi', label: 'मराठी (Marathi)' }
  ];

  const stylesList = [
    { id: 'cricket', label: '🏏 Cricket Analogy' },
    { id: 'eli5', label: '👶 Like I\'m 5' },
    { id: 'story', label: '🎬 Superhero Story' },
    { id: 'steps', label: '🔬 Step-by-Step' },
    { id: 'formula', label: '⚡ Formula Logic' }
  ];

  const quickChips = [
    "🏏 Explain resistance using the cricket pitch analogy",
    "💧 Explain resistance like a water hose for a 5-year-old",
    "📐 Why does wire stretching multiply resistance by 4 times?",
    "🔥 Why do lightbulb filaments glow white-hot while wires stay cool?"
  ];

  return (
    <div className="space-y-4">
      
      {/* Header with Language & Style Selectors */}
      <div className="card-light rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">
            <Bot className="w-4 h-4 text-indigo-500" />
            <span>AI Study Buddy • Multilingual & Personalized</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Explain in My Way
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simple, zero-jargon explanations tailored to your preferred language and intuitive mental model.
          </p>
        </div>

        {/* Language & Style Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Language Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {languagesList.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  language === lang.id
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Style Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 ml-1.5" />
            {stylesList.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  style === s.id
                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Chat Window */}
      <div className="card-light rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={idx}
                className={`flex gap-2.5 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-xs'
                }`}>
                  {isUser ? 'S' : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-3.5 text-xs space-y-2 leading-relaxed ${
                  isUser 
                    ? 'bg-indigo-600 text-white rounded-tr-xs' 
                    : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700 rounded-tl-xs text-slate-800 dark:text-slate-100 shadow-xs'
                }`}>
                  <div className="whitespace-pre-line font-medium">
                    {msg.content}
                  </div>

                  {!isUser && (
                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700 font-mono text-[9px]">
                          {msg.language || language}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700 font-mono text-[9px]">
                          {msg.style || style}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                      >
                        {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {!isUser && msg.suggested_follow_up && (
                    <button
                      onClick={() => handleSend(msg.suggested_follow_up)}
                      className="mt-1 w-full text-left p-2 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold flex items-center justify-between hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                    >
                      <span>👉 {msg.suggested_follow_up}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2.5 max-w-md mr-auto">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-xs text-xs text-slate-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-200" />
                <span>Simplifying explanation in {language}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-600 dark:text-slate-300 hover:text-indigo-600 shrink-0 transition-colors shadow-2xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask in ${language} (e.g. "Explain resistance like cricket bowling" or "वायरची लांबी वाढल्यास काय होते?")...`}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={loading}
              className="flex-1 p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
