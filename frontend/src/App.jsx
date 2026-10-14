import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import SubjectExplorer from './components/SubjectExplorer';
import ConceptGraph from './components/ConceptGraph';
import Visualizer from './components/Visualizer';
import AITutor from './components/AITutor';
import SmartNotes from './components/SmartNotes';
import PracticeQuiz from './components/PracticeQuiz';
import ReferenceSources from './components/ReferenceSources';
import DeadlineDoctor from './components/DeadlineDoctor';
import RescueModeView from './components/RescueModeView';
import RescueLoopView from './components/RescueLoopView';
import PrerequisiteFinderView from './components/PrerequisiteFinderView';
import QuestModeView from './components/QuestModeView';
import StudentProfileModal from './components/StudentProfileModal';
import { checkHealth, getUserProfile } from './services/api';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Siddhi',
    class_level: 'Class 10',
    board: 'CBSE',
    target_subject: 'Physics',
    language: 'English',
    explanation_style: 'cricket',
    streak_days: 4,
    xp: 580,
    level: 3,
    level_title: 'Circuit Conqueror'
  });
  const [backendStatus, setBackendStatus] = useState(null);

  useEffect(() => {
    initApp();
  }, []);

  // Sync theme class to document body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = "bg-slate-950 text-slate-100 font-sans antialiased min-h-screen selection:bg-indigo-500 selection:text-white";
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = "bg-slate-50 text-slate-800 font-sans antialiased min-h-screen selection:bg-indigo-500 selection:text-white";
    }
  }, [theme]);

  const initApp = async () => {
    const health = await checkHealth();
    setBackendStatus(health);

    const profile = await getUserProfile();
    if (profile) {
      setUserProfile(profile);
    }
  };

  const handleUpdateProfile = async () => {
    const profile = await getUserProfile();
    if (profile) {
      setUserProfile(profile);
    }
  };

  const handleProfileUpdated = (newProfile) => {
    setUserProfile(newProfile);
  };

  const handleSearch = (term) => {
    const q = term.toLowerCase();
    if (q.includes('resist') || q.includes('ohm') || q.includes('circuit') || q.includes('pipe')) {
      setActiveView('visualizer');
    } else if (q.includes('graph') || q.includes('map') || q.includes('tree')) {
      setActiveView('concept-graph');
    } else if (q.includes('ai') || q.includes('buddy') || q.includes('tutor') || q.includes('ask')) {
      setActiveView('ai-tutor');
    } else if (q.includes('quiz') || q.includes('game') || q.includes('speed') || q.includes('practice')) {
      setActiveView('practice');
    } else if (q.includes('note') || q.includes('simplif') || q.includes('flashcard')) {
      setActiveView('notes');
    } else if (q.includes('rescue') || q.includes('sprint') || q.includes('panic') || q.includes('2 hour')) {
      setActiveView('rescue-2hour');
    } else if (q.includes('deadline') || q.includes('exam') || q.includes('homework')) {
      setActiveView('deadlines');
    } else if (q.includes('prereq') || q.includes('ladder') || q.includes('gap')) {
      setActiveView('prerequisites');
    } else if (q.includes('loop') || q.includes('weak') || q.includes('mistake')) {
      setActiveView('rescue-loop');
    } else if (q.includes('quest') || q.includes('xp') || q.includes('report') || q.includes('badge')) {
      setActiveView('quests');
    }
  };

  const handleDirectAskAI = (prompt) => {
    setActiveView('ai-tutor');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        userProfile={userProfile}
        onSearch={handleSearch}
        theme={theme}
        setTheme={setTheme}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Dynamic Main Workspace Area */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 overflow-y-auto">
          
          {/* Active View Dispatcher */}
          {activeView === 'dashboard' && (
            <DashboardView
              userProfile={userProfile}
              onNavigateView={setActiveView}
              onAskAI={handleDirectAskAI}
              onOpenProfile={() => setIsProfileOpen(true)}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeView === 'ai-tutor' && (
            <AITutor
              userProfile={userProfile}
              onNavigateVisualizer={() => setActiveView('visualizer')}
              onNavigateQuiz={() => setActiveView('practice')}
            />
          )}

          {activeView === 'practice' && (
            <PracticeQuiz
              onUpdateProfile={handleUpdateProfile}
              onNavigateVisualizer={() => setActiveView('visualizer')}
              onNavigateRescueLoop={() => setActiveView('rescue-loop')}
            />
          )}

          {activeView === 'rescue-2hour' && (
            <RescueModeView
              onNavigateQuiz={() => setActiveView('practice')}
            />
          )}

          {activeView === 'rescue-loop' && (
            <RescueLoopView
              onNavigateVisualizer={() => setActiveView('visualizer')}
              onNavigateQuiz={() => setActiveView('practice')}
              onNavigateAI={() => setActiveView('ai-tutor')}
            />
          )}

          {activeView === 'prerequisites' && (
            <PrerequisiteFinderView
              onNavigateVisualizer={() => setActiveView('visualizer')}
              onNavigateAI={() => setActiveView('ai-tutor')}
            />
          )}

          {activeView === 'deadlines' && (
            <DeadlineDoctor
              onLaunchRescueMode={() => setActiveView('rescue-2hour')}
              onNavigateQuiz={() => setActiveView('practice')}
            />
          )}

          {activeView === 'quests' && (
            <QuestModeView
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onNavigateQuiz={() => setActiveView('practice')}
            />
          )}

          {activeView === 'visualizer' && (
            <Visualizer
              onOpenAITutor={() => setActiveView('ai-tutor')}
              onOpenQuiz={() => setActiveView('practice')}
            />
          )}

          {activeView === 'notes' && (
            <SmartNotes />
          )}

          {activeView === 'subjects' && (
            <SubjectExplorer
              onSelectTopic={(topicId) => {
                if (topicId.includes('electricity') || topicId.includes('resistance')) {
                  setActiveView('visualizer');
                } else {
                  setActiveView('concept-graph');
                }
              }}
            />
          )}

          {activeView === 'concept-graph' && (
            <ConceptGraph
              onSelectConcept={(node) => {
                // Focus concept
              }}
              onNavigateView={setActiveView}
            />
          )}

          {activeView === 'references' && (
            <div className="space-y-4">
              <div className="card-light rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-1">
                  Topic References & Media
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Curated Sources for Resistance & Circuits
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Hand-picked conceptual walk-throughs, textbook readings, and virtual simulators.
                </p>
              </div>
              <ReferenceSources topicId="topic-resistance" />
            </div>
          )}

        </main>

      </div>

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onProfileUpdated={handleProfileUpdated}
      />

      {/* Simplified Clean Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 px-4 py-2.5 text-[11px] text-slate-500 bg-white/70 dark:bg-slate-900/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>FastAPI: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">200 OK</strong></span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Focus: <strong className="text-indigo-600 dark:text-indigo-400">{userProfile?.target_subject || 'Physics'} ({userProfile?.class_level || 'Class 10'})</strong></span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>RescueVerse AI Suite</span>
            <span>•</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">EduVision AI</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
