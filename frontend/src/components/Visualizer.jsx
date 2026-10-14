import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Droplets, 
  Zap, 
  RotateCcw, 
  Flame, 
  ArrowRight, 
  Sparkles,
  Maximize2,
  Minimize2,
  BookOpen,
  Plus,
  Copy,
  Check,
  Lightbulb,
  Gauge,
  HelpCircle,
  FileText,
  Globe
} from 'lucide-react';
import ReferenceSources, { YoutubeIcon } from './ReferenceSources';

export default function Visualizer({ onOpenAITutor, onOpenQuiz }) {
  const [mode, setMode] = useState('pipe'); // 'pipe' | 'circuit'
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Pipe Simulation state
  const [pipeDiameter, setPipeDiameter] = useState(28); // 10 (constricted) to 50 (wide)
  const [waterPressure, setWaterPressure] = useState(12); // 2 to 24 (corresponds to Voltage)
  
  // Circuit Simulation state
  const [wireLength, setWireLength] = useState(2.0); // 0.5 to 4.0 meters
  const [wireArea, setWireArea] = useState(1.5); // 0.5 to 3.5 mm²
  const [material, setMaterial] = useState('copper'); // copper, aluminum, nichrome
  const [voltage, setVoltage] = useState(12); // 1 to 24 Volts

  // Live Notes Beside state
  const [sideTab, setSideTab] = useState('notes'); // 'notes' | 'references'
  const [userNoteInput, setUserNoteInput] = useState('');
  const [savedNotes, setSavedNotes] = useState([
    { id: 1, text: "Key rule: R ∝ L / A. Narrow wires throttle current just like thin pipes throttle water.", time: "Just now" },
    { id: 2, text: "Ohm's Law: V = I × R. If resistance is constant, higher voltage forces more charge flow.", time: "2 min ago" }
  ]);
  const [copiedFormula, setCopiedFormula] = useState(null);

  // Materials config with bright, colorful palettes
  const materials = {
    copper: { name: 'Copper Wire', rho: 1.7, color: '#f97316', desc: 'Conductor: Minimal resistance; ideal for household circuits' },
    aluminum: { name: 'Aluminum Wire', rho: 2.8, color: '#0ea5e9', desc: 'Lightweight Conductor: Used in long-distance overhead power grids' },
    nichrome: { name: 'Nichrome Alloy', rho: 100.0, color: '#ef4444', desc: 'Heating Element: High resistance converts electricity into intense heat' },
  };

  const currentMat = materials[material];

  // Live Circuit Calculations
  const resistance = ((currentMat.rho * (wireLength / wireArea))).toFixed(2);
  const current = (voltage / Math.max(0.1, parseFloat(resistance))).toFixed(2);
  const powerWatts = (voltage * parseFloat(current)).toFixed(2);

  // Live Pipe Calculations
  // Hydraulic resistance inversely proportional to area (radius squared)
  const hydraulicResistance = (800 / (pipeDiameter * pipeDiameter)).toFixed(2);
  const flowRate = (waterPressure / Math.max(0.1, parseFloat(hydraulicResistance))).toFixed(1);

  // Wire heating glow color
  const getWireGlow = () => {
    const p = parseFloat(powerWatts);
    if (p < 25) return { bg: '#e0f2fe', border: '#38bdf8', text: '#0284c7', label: 'Cool Conductor (Low Loss)' };
    if (p < 70) return { bg: '#ffedd5', border: '#fb923c', text: '#c2410c', label: 'Warm Wire (Moderate Loss)' };
    return { bg: '#fee2e2', border: '#ef4444', text: '#b91c1c', label: 'Glowing Hot! (Joule Heating)' };
  };

  const wireStatus = getWireGlow();

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!userNoteInput.trim()) return;
    setSavedNotes([
      { id: Date.now(), text: userNoteInput.trim(), time: 'Just now' },
      ...savedNotes
    ]);
    setUserNoteInput('');
  };

  const copyFormula = (formula) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className={`space-y-4 transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto' 
        : ''
    }`}>
      
      {/* Top Controls Bar */}
      <div className="card-light rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            {mode === 'pipe' ? <Droplets className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {mode === 'pipe' ? 'Water Pipe Analogy' : 'Electron Circuit Lab'}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                Interactive Sim
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mode === 'pipe' 
                ? 'Visualize water flow throttling as you choke the pipe constriction' 
                : 'Control conductor dimensions and watch real-time electron collisions'}
            </p>
          </div>
        </div>

        {/* Tab switcher & Fullscreen Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('pipe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'pipe'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Water Pipe</span>
            </button>
            <button
              onClick={() => setMode('circuit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'circuit'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Electron Circuit</span>
            </button>
          </div>

          {/* Full Screen Toggle Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Full Screen' : 'Full Screen Lab Mode'}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 text-xs font-semibold"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Full Screen</span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* Main Dual-Pane Workspace: Left Visual Simulation (65%) | Right Live Notes Beside (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* ================= LEFT MAIN CANVAS (7 COLUMNS) ================= */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Simulation Stage Container */}
          <div className="card-light rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[440px]">
            
            {/* Stage Header Readout */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                {mode === 'pipe' ? 'Fluid Dynamics Analogy' : 'Lattice Collision Mechanics'}
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {mode === 'pipe' ? `Flow: ${flowRate} L/s` : `Current: ${current} A`}
              </span>
            </div>

            {/* Dynamic Animated Canvas */}
            <div className="my-auto py-4 flex flex-col items-center justify-center">
              
              {mode === 'pipe' ? (
                /* ---------------- WATER PIPE ANIMATION ---------------- */
                <div className="w-full max-w-lg relative">
                  
                  <svg viewBox="0 0 600 230" className="w-full h-auto drop-shadow-md select-none">
                    <defs>
                      {/* Gradient for water */}
                      <linearGradient id="brightWater" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="40%" stopColor="#0284c7" />
                        <stop offset="70%" stopColor="#0369a1" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>

                      {/* Pressure pump gradient */}
                      <radialGradient id="pumpGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </radialGradient>
                    </defs>

                    {/* Left Wide Inflow Pipe */}
                    <rect x="20" y="55" width="170" height="110" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
                    
                    {/* Dynamic Constricted Choke Neck */}
                    <path
                      d={`M 190 55
                          C 230 55, 250 ${110 - pipeDiameter}, 290 ${110 - pipeDiameter}
                          L 350 ${110 - pipeDiameter}
                          C 390 ${110 - pipeDiameter}, 410 55, 450 55
                          L 450 165
                          C 410 165, 390 ${110 + pipeDiameter}, 350 ${110 + pipeDiameter}
                          L 290 ${110 + pipeDiameter}
                          C 250 ${110 + pipeDiameter}, 230 165, 190 165
                          Z`}
                      fill="#cbd5e1"
                      stroke="#64748b"
                      strokeWidth="3.5"
                    />

                    {/* Right Outflow Pipe */}
                    <rect x="450" y="55" width="130" height="110" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />

                    {/* Inside Water stream */}
                    <rect x="25" y="60" width="165" height="100" fill="url(#brightWater)" opacity="0.9" />
                    <path
                      d={`M 190 60
                          C 230 60, 250 ${110 - pipeDiameter + 4}, 290 ${110 - pipeDiameter + 4}
                          L 350 ${110 - pipeDiameter + 4}
                          C 390 ${110 - pipeDiameter + 4}, 410 60, 450 60
                          L 450 160
                          C 410 160, 390 ${110 + pipeDiameter - 4}, 350 ${110 + pipeDiameter - 4}
                          L 290 ${110 + pipeDiameter - 4}
                          C 250 ${110 + pipeDiameter - 4}, 230 160, 190 160
                          Z`}
                      fill="url(#brightWater)"
                      opacity="0.95"
                    />
                    <rect x="450" y="60" width="125" height="100" fill="url(#brightWater)" opacity="0.9" />

                    {/* Animated Wave Streamlines */}
                    <g opacity="0.8">
                      <line x1="30" y1="85" x2="175" y2="85" stroke="#ffffff" strokeWidth="3" strokeDasharray="14 10">
                        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur={`${Math.max(0.3, 2.4 - flowRate * 0.12)}s`} repeatCount="indefinite" />
                      </line>
                      <line x1="30" y1="110" x2="175" y2="110" stroke="#ffffff" strokeWidth="4" strokeDasharray="18 12">
                        <animate attributeName="stroke-dashoffset" from="0" to="-60" dur={`${Math.max(0.25, 2.0 - flowRate * 0.12)}s`} repeatCount="indefinite" />
                      </line>
                      <line x1="30" y1="135" x2="175" y2="135" stroke="#ffffff" strokeWidth="3" strokeDasharray="14 10">
                        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur={`${Math.max(0.3, 2.4 - flowRate * 0.12)}s`} repeatCount="indefinite" />
                      </line>

                      {/* Constricted High-Speed Choked Streamline */}
                      <line x1="270" y1="110" x2="370" y2="110" stroke="#fef08a" strokeWidth={Math.max(3, pipeDiameter / 7)} strokeDasharray="20 8">
                        <animate attributeName="stroke-dashoffset" from="0" to="-56" dur={`${Math.max(0.12, 1.2 - flowRate * 0.08)}s`} repeatCount="indefinite" />
                      </line>

                      {/* Outflow Jet Streamlines */}
                      <line x1="465" y1="110" x2="565" y2="110" stroke="#ffffff" strokeWidth="4" strokeDasharray="16 10">
                        <animate attributeName="stroke-dashoffset" from="0" to="-52" dur={`${Math.max(0.2, 1.8 - flowRate * 0.1)}s`} repeatCount="indefinite" />
                      </line>
                    </g>

                    {/* Pressure Gauge Icon on Entry */}
                    <circle cx="85" cy="40" r="18" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                    <line 
                      x1="85" y1="40" 
                      x2={85 + Math.sin(waterPressure * 0.15) * 12} 
                      y2={40 - Math.cos(waterPressure * 0.15) * 12} 
                      stroke="#ef4444" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                    />
                    <text x="85" y="20" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {waterPressure} kPa
                    </text>

                    {/* Labels */}
                    <text x="100" y="195" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Wide Pipe (Low R)
                    </text>
                    <text x="320" y={Math.max(35, 95 - pipeDiameter)} fill="#b91c1c" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Constriction (Resistance R)
                    </text>
                    <text x="510" y="195" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Flow Output (Current I)
                    </text>
                  </svg>

                  {/* Flow Status Pill */}
                  <div className="mt-2 flex items-center justify-center">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      pipeDiameter < 20 
                        ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                    }`}>
                      {pipeDiameter < 20 ? '⚠️ High Resistance: Narrow Choke Slows Water' : '✅ Low Resistance: Wide Bore Allows Free Flow'}
                    </span>
                  </div>

                </div>
              ) : (
                /* ---------------- ELECTRON CIRCUIT ANIMATION ---------------- */
                <div className="w-full max-w-lg space-y-3">
                  
                  {/* Schematic Wire Box */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                    
                    <div className="flex justify-between items-center text-xs mb-3 font-mono font-bold">
                      <span className="text-amber-600 dark:text-amber-400">Battery: {voltage}V</span>
                      <span className="text-indigo-600 dark:text-indigo-400">R: {resistance} Ω</span>
                      <span className="text-emerald-600 dark:text-emerald-400">Current: {current}A</span>
                    </div>

                    {/* Conductor Visual Bar */}
                    <div
                      className="rounded-xl border relative overflow-hidden transition-all duration-300 flex items-center shadow-sm"
                      style={{
                        height: `${Math.min(130, Math.max(50, wireArea * 36))}px`,
                        width: `${Math.min(100, Math.max(45, wireLength * 23))}%`,
                        margin: '0 auto',
                        backgroundColor: wireStatus.bg,
                        borderColor: wireStatus.border,
                      }}
                    >
                      {/* Fixed Positive Metal Lattice Ions */}
                      <div className="absolute inset-0 flex items-center justify-around px-3 pointer-events-none opacity-40">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="flex flex-col justify-around h-full py-1">
                            <div className="w-4 h-4 rounded-full bg-slate-400 dark:bg-slate-600 text-white flex items-center justify-center text-[9px] font-bold">
                              +
                            </div>
                            <div className="w-4 h-4 rounded-full bg-slate-400 dark:bg-slate-600 text-white flex items-center justify-center text-[9px] font-bold">
                              +
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Moving Free Electrons */}
                      <div className="absolute inset-0 flex items-center justify-around pointer-events-none overflow-hidden">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm border border-white flex items-center justify-center text-[8px] text-slate-950 font-black"
                            style={{
                              animation: `electronFlow ${Math.max(0.3, 3.2 / Math.max(0.2, parseFloat(current)))}s linear infinite`,
                              animationDelay: `${i * 0.18}s`
                            }}
                          >
                            -
                          </div>
                        ))}
                      </div>

                      {/* Label Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded shadow-sm bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white">
                          {currentMat.name} • {wireLength}m • {wireArea}mm²
                        </span>
                      </div>

                    </div>

                    {/* Thermal Dissipation Indicator */}
                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="flex items-center gap-1.5 font-semibold" style={{ color: wireStatus.text }}>
                        <Flame className={`w-4 h-4 ${parseFloat(powerWatts) > 40 ? 'animate-bounce text-red-500' : ''}`} />
                        {wireStatus.label} ({powerWatts} W)
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">P = I² × R</span>
                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* Readout Metrics Cards */}
            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-slate-800/80 border border-cyan-100 dark:border-slate-700">
                <span className="text-[10px] text-cyan-700 dark:text-cyan-400 uppercase font-bold block">
                  {mode === 'pipe' ? 'Pressure (V)' : 'Voltage (V)'}
                </span>
                <span className="text-base font-extrabold text-cyan-900 dark:text-cyan-200">
                  {mode === 'pipe' ? `${waterPressure} kPa` : `${voltage} V`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-slate-800/80 border border-rose-100 dark:border-slate-700">
                <span className="text-[10px] text-rose-700 dark:text-rose-400 uppercase font-bold block">
                  Resistance (R)
                </span>
                <span className="text-base font-extrabold text-rose-900 dark:text-rose-200">
                  {mode === 'pipe' ? `${hydraulicResistance} Ω eq.` : `${resistance} Ω`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold block">
                  {mode === 'pipe' ? 'Flow Rate (I)' : 'Current (I)'}
                </span>
                <span className="text-base font-extrabold text-emerald-900 dark:text-emerald-200">
                  {mode === 'pipe' ? `${flowRate} L/s` : `${current} A`}
                </span>
              </div>
            </div>

          </div>

          {/* Interactive Sliders Panel */}
          <div className="card-light rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span>Adjust Parameters Live</span>
              </h3>
              <button
                onClick={() => {
                  if (mode === 'pipe') { setPipeDiameter(28); setWaterPressure(12); }
                  else { setWireLength(2.0); setWireArea(1.5); setVoltage(12); setMaterial('copper'); }
                }}
                className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {mode === 'pipe' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pipe Constriction */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Constriction Diameter (A)</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{pipeDiameter} mm</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="48"
                    value={pipeDiameter}
                    onChange={(e) => setPipeDiameter(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Choked (High R)</span>
                    <span>Wide (Low R)</span>
                  </div>
                </div>

                {/* Water Pressure */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Pump Push (Voltage V)</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{waterPressure} kPa</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    value={waterPressure}
                    onChange={(e) => setWaterPressure(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Gentle</span>
                    <span>High Pressure</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Material */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Material (ρ)</label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100"
                    >
                      <option value="copper">Copper (Low R)</option>
                      <option value="aluminum">Aluminum (Mid R)</option>
                      <option value="nichrome">Nichrome (High R)</option>
                    </select>
                  </div>

                  {/* Wire Length */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Length (L)</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{wireLength}m</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="4.0"
                      step="0.1"
                      value={wireLength}
                      onChange={(e) => setWireLength(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Wire Area */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Area (A)</span>
                      <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{wireArea}mm²</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.5"
                      step="0.1"
                      value={wireArea}
                      onChange={(e) => setWireArea(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Voltage Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Battery Potential (V)</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{voltage} V</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ================= RIGHT PANE: NOTES BESIDE OR REFERENCE SOURCES (5 COLUMNS) ================= */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Side Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setSideTab('notes')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                sideTab === 'notes'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Live Notes & Formulas</span>
            </button>
            <button
              onClick={() => setSideTab('references')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                sideTab === 'references'
                  ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <YoutubeIcon className="w-3.5 h-3.5 text-rose-500" />
              <span>Sources & Links 📚</span>
            </button>
          </div>

          {sideTab === 'notes' ? (
            <>
              {/* Conceptual Formulas Card */}
              <div className="card-light rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span>Concept Formula Cheatsheet</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">Live Reference</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div 
                    onClick={() => copyFormula("R = ρ · (L / A)")}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 transition-all group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mb-0.5">
                      <span>Resistance Law</span>
                      {copiedFormula === "R = ρ · (L / A)" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
                    </div>
                    <code className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      R = ρ · (L / A)
                    </code>
                  </div>

                  <div 
                    onClick={() => copyFormula("V = I · R")}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-emerald-400 transition-all group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mb-0.5">
                      <span>Ohm's Law</span>
                      {copiedFormula === "V = I · R" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
                    </div>
                    <code className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      V = I · R
                    </code>
                  </div>
                </div>

                {/* Dynamic AI Observation based on current values */}
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Live Lab Insight:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {mode === 'pipe' 
                      ? (pipeDiameter < 22 
                          ? "Because diameter is constricted, flow rate drops steeply. In electrical terms, thinner wire = higher resistance!" 
                          : "Wide bore provides ample cross-section, allowing high fluid discharge with minimal friction.")
                      : (parseFloat(powerWatts) > 50 
                          ? "Notice the heat dissipation! High current through this resistor converts electrical power into thermal energy (P = I²R)." 
                          : "Current is flowing smoothly with low power loss. Copper lattice creates few scattered electron collisions.")}
                  </p>
                </div>
              </div>

              {/* Interactive Live Notebook (Take Notes While Simulating) */}
              <div className="card-light rounded-2xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>Live Notebook (Beside Sim)</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {savedNotes.length} Notes Saved
                  </span>
                </div>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    value={userNoteInput}
                    onChange={(e) => setUserNoteInput(e.target.value)}
                    placeholder="Write your observation while running the simulation..."
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400">Press Enter to add</span>
                    <button
                      type="submit"
                      disabled={!userNoteInput.trim()}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {savedNotes.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <p className="leading-snug">{n.text}</p>
                      <span className="text-[9px] text-slate-400 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Reference Sources Pane beside simulation */
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              <ReferenceSources 
                topicId="topic-resistance" 
                onSavedToNotes={() => {
                  setSavedNotes([
                    { id: Date.now(), text: "Saved reference source to notes.", time: "Just now" },
                    ...savedNotes
                  ]);
                }} 
              />
            </div>
          )}

          {/* Quick AI & Quiz Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={onOpenAITutor}
              className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Ask AI About This</span>
            </button>
            <button
              onClick={onOpenQuiz}
              className="flex-1 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Test Knowledge</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
