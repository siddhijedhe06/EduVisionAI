import React, { useState, useEffect } from 'react';
import { 
  Video, 
  BookOpen, 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  BookmarkPlus, 
  Layers, 
  Search,
  PlayCircle
} from 'lucide-react';
import { getReferences, createNote } from '../services/api';

export const YoutubeIcon = ({ className = "w-4 h-4 text-rose-500" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function ReferenceSources({ topicId = 'topic-resistance', onSavedToNotes }) {
  const [references, setReferences] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'videos' | 'books' | 'websites'
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [savedSuccessId, setSavedSuccessId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSources();
  }, [topicId]);

  const fetchSources = async () => {
    const data = await getReferences(topicId);
    if (data) {
      setReferences(data);
    }
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSaveToNotes = async (refItem, type) => {
    const content = `📌 Source Reference: ${refItem.title}\n• Type: ${type.toUpperCase()}\n• Creator/Author: ${refItem.channel || refItem.author || refItem.platform}\n• Link: ${refItem.url}\n• Context: ${refItem.desc || refItem.chapter || refItem.recommended_for}`;
    
    await createNote({
      topic_id: topicId,
      title: `Reference: ${refItem.title}`,
      content: content,
      category: 'reference',
      tags: ['Reference', type]
    });

    setSavedSuccessId(refItem.id);
    setTimeout(() => setSavedSuccessId(null), 2500);
    if (onSavedToNotes) onSavedToNotes();
  };

  const fallbackVideos = [
    {
      id: "vid-1",
      title: "How Electricity Actually Works",
      channel: "Veritasium",
      url: "https://www.youtube.com/watch?v=bHIhgxav9LY",
      duration: "14 mins",
      type: "Visual Intuition",
      desc: "Mind-bending visual breakdown of electron fields, wire boundaries, and energy transmission."
    },
    {
      id: "vid-2",
      title: "Electric Current, Resistance & Resistivity",
      channel: "Khan Academy",
      url: "https://www.youtube.com/watch?v=F1p3742G83E",
      duration: "11 mins",
      type: "Curriculum Lesson",
      desc: "Step-by-step mathematical derivation of R = ρ(L/A) with worked numerical problems."
    },
    {
      id: "vid-3",
      title: "Electric Current: Crash Course Physics #28",
      channel: "CrashCourse",
      url: "https://www.youtube.com/watch?v=HXOok3mfMLM",
      duration: "10 mins",
      type: "Animated Overview",
      desc: "High-energy animation explaining charge drift, battery EMF, and circuit flow."
    }
  ];

  const fallbackBooks = [
    {
      id: "bk-1",
      title: "NCERT Class 10 Science",
      chapter: "Chapter 12: Electricity (§12.1 – §12.5)",
      author: "NCERT National Board",
      url: "https://ncert.nic.in/textbook.php?jesc1=12-16",
      pages: "pp. 199–209",
      recommended_for: "Core Board Syllabus & Standard Exam Problems"
    },
    {
      id: "bk-2",
      title: "Concepts of Physics (Vol. 2)",
      chapter: "Chapter 32: Electric Current in Conductors",
      author: "Dr. H.C. Verma",
      url: "https://www.google.com/search?q=HC+Verma+Electric+Current+in+Conductors",
      pages: "pp. 172–195",
      recommended_for: "Deep Microscopic Physics & Conceptual Clarity"
    },
    {
      id: "bk-3",
      title: "The Feynman Lectures on Physics",
      chapter: "Vol II, Chapter 19: The Principle of Least Action",
      author: "Richard P. Feynman",
      url: "https://www.feynmanlectures.caltech.edu/",
      pages: "Online Open Access",
      recommended_for: "Advanced Inquisitive Explorers"
    }
  ];

  const fallbackWebsites = [
    {
      id: "web-1",
      title: "PhET Circuit Construction Kit (DC)",
      platform: "University of Colorado Boulder",
      url: "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc",
      badge: "Interactive Simulator",
      desc: "Build virtual series and parallel circuits with real-time ammeters, voltmeters, and resistors."
    },
    {
      id: "web-2",
      title: "HyperPhysics: Resistance & Resistivity",
      platform: "Georgia State University",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/electric/resis.html",
      badge: "Concept Map Portal",
      desc: "Clickable concept tree covering temperature coefficients and material resistivities."
    },
    {
      id: "web-3",
      title: "Khan Academy Circuits Mastery Unit",
      platform: "Khan Academy",
      url: "https://www.khanacademy.org/science/physics/circuits-topic",
      badge: "Practice & Drills",
      desc: "Complete guided practice exercises with hint breakdowns and mastery checklists."
    }
  ];

  const videos = references?.videos || fallbackVideos;
  const books = references?.books || fallbackBooks;
  const websites = references?.websites || fallbackWebsites;

  const matchesSearch = (item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.channel?.toLowerCase().includes(q) ||
      item.author?.toLowerCase().includes(q) ||
      item.platform?.toLowerCase().includes(q) ||
      item.desc?.toLowerCase().includes(q)
    );
  };

  return (
    <div className="space-y-4">
      
      {/* Search & Filter Toolbar */}
      <div className="card-light rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Filter Pills */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Sources ({videos.length + books.length + websites.length})
          </button>
          <button
            onClick={() => setActiveFilter('videos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'videos'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
            }`}
          >
            <YoutubeIcon className="w-3.5 h-3.5 text-rose-500" />
            <span>YouTube ({videos.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('books')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'books'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Books ({books.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('websites')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeFilter === 'websites'
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <span>Websites ({websites.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
          />
        </div>

      </div>

      {/* 1. YOUTUBE VIDEO SECTION */}
      {(activeFilter === 'all' || activeFilter === 'videos') && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <div className="w-6 h-6 rounded-lg bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600">
              <YoutubeIcon className="w-4 h-4" />
            </div>
            <span>Curated YouTube Lessons & Conceptual Visuals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {videos.filter(matchesSearch).map((vid) => (
              <div 
                key={vid.id}
                className="card-light card-light-hover rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3 border-l-4 border-l-rose-500"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                      {vid.duration} • {vid.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {vid.channel}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {vid.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {vid.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleSaveToNotes(vid, 'video')}
                    className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                  >
                    {savedSuccessId === vid.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Saved to Notes</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-3.5 h-3.5" />
                        <span>Bookmark</span>
                      </>
                    )}
                  </button>

                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Watch Video</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. RECOMMENDED TEXTBOOKS & BOOKS */}
      {(activeFilter === 'all' || activeFilter === 'books') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <span>Standard Textbooks & Reading Chapters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {books.filter(matchesSearch).map((bk) => (
              <div 
                key={bk.id}
                className="card-light card-light-hover rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3 border-l-4 border-l-amber-500"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {bk.pages}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {bk.author}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {bk.title}
                  </h4>

                  <p className="text-xs font-medium text-amber-900 dark:text-amber-300">
                    {bk.chapter}
                  </p>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    Best for: {bk.recommended_for}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleSaveToNotes(bk, 'book')}
                    className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                  >
                    {savedSuccessId === bk.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Saved</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-3.5 h-3.5" />
                        <span>Bookmark</span>
                      </>
                    )}
                  </button>

                  <a
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>Read / Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AUTHORITATIVE WEBSITES & SIMULATORS */}
      {(activeFilter === 'all' || activeFilter === 'websites') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <div className="w-6 h-6 rounded-lg bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-600">
              <Globe className="w-4 h-4" />
            </div>
            <span>Interactive Simulators & Physics Portals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {websites.filter(matchesSearch).map((web) => (
              <div 
                key={web.id}
                className="card-light card-light-hover rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3 border-l-4 border-l-cyan-500"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                      {web.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {web.platform}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {web.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {web.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => copyLink(web.url)}
                    className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                  >
                    {copiedUrl === web.url ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={web.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950 dark:hover:bg-cyan-900 text-cyan-800 dark:text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
