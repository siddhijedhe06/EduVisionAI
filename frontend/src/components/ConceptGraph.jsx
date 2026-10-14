import React, { useState } from 'react';
import { 
  GitFork, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  Bot, 
  BookMarked, 
  Gamepad2
} from 'lucide-react';

export default function ConceptGraph({ onSelectConcept, onNavigateView }) {
  const [selectedNodeId, setSelectedNodeId] = useState('topic-resistance');

  const nodes = [
    { 
      id: 'topic-electricity', 
      label: 'Electricity', 
      category: 'Core Domain', 
      cx: 380, 
      cy: 60, 
      color: '#0284c7',
      status: 'mastered',
      summary: 'The fundamental physical phenomenon of electric charges in motion.'
    },
    { 
      id: 'topic-current', 
      label: 'Electric Current (I)', 
      category: 'Flow of Charge', 
      cx: 170, 
      cy: 175, 
      color: '#0ea5e9',
      status: 'mastered',
      formula: 'I = Q / t',
      summary: 'Rate of charge flow through a conductor cross-section. Measured in Amperes (A).'
    },
    { 
      id: 'topic-voltage', 
      label: 'Voltage (V)', 
      category: 'Electrical Push', 
      cx: 380, 
      cy: 175, 
      color: '#6366f1',
      status: 'mastered',
      formula: 'V = W / Q',
      summary: 'Potential difference supplying energy to move charges through the circuit.'
    },
    { 
      id: 'topic-resistance', 
      label: 'Resistance (R)', 
      category: 'Opposition to Flow', 
      cx: 590, 
      cy: 175, 
      color: '#ef4444',
      status: 'in_progress',
      isFocus: true,
      formula: 'R = ρ · (L / A)',
      summary: 'Opposition to electron motion caused by microscopic lattice collisions in conductors. Measured in Ohms (Ω).'
    },
    { 
      id: 'topic-ohms-law', 
      label: "Ohm's Law", 
      category: 'Governing Law', 
      cx: 380, 
      cy: 300, 
      color: '#10b981',
      status: 'unlocked',
      formula: 'V = I × R',
      summary: 'Directly relates Voltage, Current, and Resistance into a single elegant equation.'
    },
    { 
      id: 'topic-electric-power', 
      label: 'Electric Power (P)', 
      category: 'Energy Rate', 
      cx: 380, 
      cy: 410, 
      color: '#f59e0b',
      status: 'locked',
      formula: 'P = V · I = I²R',
      summary: 'The rate at which electric energy is transformed into thermal energy or mechanical work.'
    }
  ];

  const edges = [
    { from: 'topic-electricity', to: 'topic-current', label: 'manifests as' },
    { from: 'topic-electricity', to: 'topic-voltage', label: 'driven by' },
    { from: 'topic-electricity', to: 'topic-resistance', label: 'moderated by' },
    { from: 'topic-current', to: 'topic-ohms-law', label: 'flows' },
    { from: 'topic-voltage', to: 'topic-ohms-law', label: 'pushes' },
    { from: 'topic-resistance', to: 'topic-ohms-law', label: 'resists' },
    { from: 'topic-ohms-law', to: 'topic-electric-power', label: 'dissipates' }
  ];

  const activeNode = nodes.find(n => n.id === selectedNodeId) || nodes[3];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="card-light rounded-2xl p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">
            <GitFork className="w-4 h-4" />
            <span>Interactive Knowledge Graph</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Concept Connections & Prerequisites
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click on any concept node to reveal prerequisite relationships, formulas, and visual models.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-700 dark:text-slate-300">Mastered</span>
          <span className="w-2 h-2 rounded-full bg-rose-500 ml-2" />
          <span className="text-slate-700 dark:text-slate-300">Focus Concept ⭐</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-8 card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[440px]">
          
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Interactive Map View</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">Domain: Science → Physics</span>
          </div>

          <div className="flex-1 flex items-center justify-center relative py-2">
            <svg viewBox="0 0 760 460" className="w-full h-auto select-none">
              <defs>
                <marker id="arrowHead" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>

              {/* Edge Connecting Lines */}
              {edges.map((edge, idx) => {
                const src = nodes.find(n => n.id === edge.from);
                const tgt = nodes.find(n => n.id === edge.to);
                const isConnected = selectedNodeId === edge.from || selectedNodeId === edge.to;
                return (
                  <g key={idx}>
                    <line
                      x1={src.cx}
                      y1={src.cy}
                      x2={tgt.cx}
                      y2={tgt.cy}
                      stroke={isConnected ? '#6366f1' : '#cbd5e1'}
                      strokeWidth={isConnected ? 3 : 1.5}
                      strokeDasharray={isConnected ? 'none' : '4 4'}
                      markerEnd="url(#arrowHead)"
                      className="transition-all duration-300"
                    />
                    <text
                      x={(src.cx + tgt.cx) / 2}
                      y={(src.cy + tgt.cy) / 2 - 6}
                      fill={isConnected ? '#4338ca' : '#94a3b8'}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <g
                    key={node.id}
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      if (onSelectConcept) onSelectConcept(node);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for focus node */}
                    {node.isFocus && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="32"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        opacity="0.5"
                        className="animate-ping"
                      />
                    )}

                    {/* Main Node Circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isSelected ? 26 : 22}
                      fill={isSelected ? '#ffffff' : '#f8fafc'}
                      stroke={node.color}
                      strokeWidth={isSelected ? 4 : 2.5}
                      className="transition-all duration-200 drop-shadow-sm group-hover:scale-105"
                    />

                    {/* Inner Colored Dot */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="6"
                      fill={node.color}
                    />

                    {/* Title */}
                    <text
                      x={node.cx}
                      y={node.cy + 38}
                      fill="#1e293b"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.label}
                    </text>

                    {/* Category */}
                    <text
                      x={node.cx}
                      y={node.cy + 50}
                      fill="#64748b"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      {node.category}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            <span>Causal Tree Mode</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">6 Interconnected Concepts</span>
          </div>

        </div>

        {/* Selected Concept Inspection Drawer */}
        <div className="lg:col-span-4 space-y-3">
          <div className="card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 border-t-4" style={{ borderTopColor: activeNode.color }}>
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {activeNode.category}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeNode.isFocus 
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {activeNode.isFocus ? 'Current Focus ⭐' : 'Mastered'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {activeNode.label}
              </h3>
              {activeNode.formula && (
                <div className="mt-1 inline-block px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-xs text-indigo-700 dark:text-indigo-400 font-bold border border-slate-200 dark:border-slate-700">
                  {activeNode.formula}
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeNode.summary}
            </p>

            {/* Prerequisites */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Prerequisites Checked
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Electric Current (Rate of flow)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Voltage (Potential difference pump)</span>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateView('visualizer')}
                className="py-2 px-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:hover:bg-cyan-900 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulate Lab</span>
              </button>
              <button
                onClick={() => onNavigateView('ai-tutor')}
                className="py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI Tutor</span>
              </button>
              <button
                onClick={() => onNavigateView('notes')}
                className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span>Smart Notes</span>
              </button>
              <button
                onClick={() => onNavigateView('practice')}
                className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Test Quiz</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
