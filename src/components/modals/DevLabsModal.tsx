import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Terminal,
  Cpu,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Workflow,
  Zap,
  Sliders,
  Activity,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';

const AGENT_SAMPLE_PROMPTS = [
  {
    title: 'Soil Diagnostics & Recommendation',
    prompt: 'Diagnose nitrogen deficiency in wheat crop and generate organic fertilizer dosage schedule.',
    tools: ['SoilNPKAnalyzer', 'FertilizerDatabase', 'CropCalendarEngine'],
    output: 'Analysis Complete: Soil Nitrogen index at 142 kg/ha (Deficient). Recommended: Apply Urea at 45kg/acre with 1st irrigation, supplemented with Azotobacter biofertilizer. Risk factor: Low.',
  },
  {
    title: 'Model Training Hyperparameter Optimization',
    prompt: 'Run automated Bayesian sweep on AgentForge memory compression model with early stopping.',
    tools: ['DynamoSweepScheduler', 'LossCurveInterceptor', 'ModelCheckpointRegistry'],
    output: 'Optimal Parameters Found (Epoch 48): Learning Rate=2.4e-4, Batch Size=64, Attention Dropout=0.08. Validation Loss reduced to 0.142 (-28.4% improvement). Checkpoint serialized.',
  },
  {
    title: 'Dairy Intake & Payout Batch Processing',
    prompt: 'Process 140 farmer morning milk intake logs with dynamic FAT/SNF rate matrix and generate bank payout batch.',
    tools: ['JDBCConnectionPool', 'FatSnfCalculator', 'ReceiptBatchGenerator'],
    output: 'Batch 2026-08-A executed: 140 records processed. Average FAT: 4.8%, Average SNF: 8.6%. Total Payout: ₹184,250.00. Zero transaction errors. Audit hash: 0x9f4a7c1b.',
  },
];

export const DevLabsModal: React.FC = () => {
  const {
    isDevLabsOpen,
    setIsDevLabsOpen,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'agent' | 'neural' | 'telemetry'>('agent');
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(AGENT_SAMPLE_PROMPTS[0].prompt);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState<number>(0);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [agentResult, setAgentResult] = useState<string | null>(null);

  // Neural Sandbox state
  const [activation, setActivation] = useState<'relu' | 'gelu' | 'sigmoid' | 'softmax'>('relu');
  const [learningRate, setLearningRate] = useState(0.001);
  const [hiddenLayers, setHiddenLayers] = useState(3);
  const [dropoutRate, setDropoutRate] = useState(0.1);

  if (!isDevLabsOpen) return null;

  const handleClose = () => {
    soundEngine.playClick();
    setIsDevLabsOpen(false);
  };

  const handleRunAgent = () => {
    if (isExecuting) return;
    soundEngine.playClick();
    setIsExecuting(true);
    setExecutionStep(1);
    setAgentLogs([]);
    setAgentResult(null);

    const activePreset = AGENT_SAMPLE_PROMPTS[selectedPreset];

    const steps = [
      `[PARSE] Intention decomposed: "${customPrompt.slice(0, 48)}..."`,
      `[ROUTING] Dynamic Tool Registry evaluated: Selected [${activePreset.tools.join(', ')}]`,
      `[SANDBOX] Executing tool '${activePreset.tools[0]}' with context bounds...`,
      `[REFLECTION] Intermediate verification passed. Evaluating state convergence...`,
      `[SYNTHESIS] Output verified with 99.4% confidence score.`,
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAgentLogs((prev) => [...prev, step]);
        setExecutionStep(index + 1);
        soundEngine.playHover();
      }, (index + 1) * 450);
    });

    setTimeout(() => {
      setAgentResult(activePreset.output);
      setIsExecuting(false);
      soundEngine.playSuccess();
    }, (steps.length + 1) * 450);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl select-none font-mono-tech overflow-y-auto">
        <div className="fixed inset-0" onClick={handleClose} />

        <motion.div
          id="dev-labs-modal-window"
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl hud-panel rounded-2xl p-6 sm:p-8 border border-white/20 cyber-corners shadow-2xl relative z-10 bg-[#09090d]/95 my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[var(--accent-color)] text-black">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-hud tracking-wider text-white">
                  DEV LABS // EXPERIMENTAL RUNTIME
                </h2>
                <p className="text-[10px] text-zinc-400 tracking-widest uppercase">
                  INTERACTIVE AI ORCHESTRATION & NEURAL SIMULATOR
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
              onMouseEnter={() => {
                setCursorVariant('pointer');
                setCursorText('CLOSE');
                soundEngine.playHover();
              }}
              onMouseLeave={() => {
                setCursorVariant('default');
                setCursorText('');
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3 mb-6 text-xs">
            <button
              onClick={() => {
                soundEngine.playNavSwitch();
                setActiveTab('agent');
              }}
              className={`px-4 py-2 rounded-lg font-bold font-hud uppercase transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'agent'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>AI Agent Simulator</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playNavSwitch();
                setActiveTab('neural');
              }}
              className={`px-4 py-2 rounded-lg font-bold font-hud uppercase transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'neural'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Neural Weights Matrix</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playNavSwitch();
                setActiveTab('telemetry');
              }}
              className={`px-4 py-2 rounded-lg font-bold font-hud uppercase transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'telemetry'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Diagnostics</span>
            </button>
          </div>

          {/* --- TAB 1: AI AGENT SIMULATOR --- */}
          {activeTab === 'agent' && (
            <div className="space-y-6">
              {/* Presets Selection */}
              <div>
                <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">
                  SELECT SIMULATION SCENARIO:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {AGENT_SAMPLE_PROMPTS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedPreset(idx);
                        setCustomPrompt(preset.prompt);
                        setAgentLogs([]);
                        setAgentResult(null);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPreset === idx
                          ? 'bg-white/10 border-[var(--accent-color)] text-white shadow-[0_0_12px_var(--accent-glow)]'
                          : 'bg-black/40 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <p className="text-xs font-bold font-hud uppercase mb-1">
                        0{idx + 1}. {preset.title}
                      </p>
                      <p className="text-[10px] text-zinc-500 line-clamp-2">
                        {preset.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Execution Prompt Box */}
              <div>
                <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider block mb-2">
                  AGENT EXECUTION INTENTION:
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:border-[var(--accent-color)] focus:outline-none resize-none font-sans"
                  />
                  <button
                    onClick={handleRunAgent}
                    disabled={isExecuting}
                    className={`absolute right-3 bottom-3 px-4 py-1.5 rounded-lg font-bold text-xs uppercase flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isExecuting
                        ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                        : 'bg-[var(--accent-color)] text-black hover:brightness-110 shadow-lg'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isExecuting ? 'EXECUTING...' : 'DISPATCH AGENT'}</span>
                  </button>
                </div>
              </div>

              {/* Live Agent Terminal Log */}
              <div className="p-4 rounded-xl bg-black/80 border border-white/10 min-h-[140px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3 text-[10px] text-zinc-500 uppercase">
                    <span>AGENTFORGE // TRACE MONITOR</span>
                    <span>ACTIVE TOOLS: [{AGENT_SAMPLE_PROMPTS[selectedPreset].tools.join(', ')}]</span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono-tech">
                    {agentLogs.length === 0 && !isExecuting && (
                      <p className="text-zinc-600 italic">
                        &gt; Press "DISPATCH AGENT" to trigger autonomous tool execution loop...
                      </p>
                    )}
                    {agentLogs.map((log, i) => (
                      <div key={i} className="flex items-start space-x-2 text-zinc-300">
                        <span className="text-[var(--accent-color)] font-bold">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {agentResult && (
                  <div className="mt-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs">
                    <div className="flex items-center space-x-2 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>SYNTHESIZED AGENT OUTPUT:</span>
                    </div>
                    <p className="font-sans leading-relaxed text-zinc-200">
                      {agentResult}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- TAB 2: NEURAL WEIGHTS MATRIX --- */}
          {activeTab === 'neural' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Activation selector */}
                <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                    ACTIVATION FUNCTION:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['relu', 'gelu', 'sigmoid', 'softmax'] as const).map((act) => (
                      <button
                        key={act}
                        onClick={() => {
                          soundEngine.playClick();
                          setActivation(act);
                        }}
                        className={`p-2 rounded-lg text-xs font-bold font-hud uppercase transition-all cursor-pointer ${
                          activation === act
                            ? 'bg-white text-black font-extrabold'
                            : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hyperparameter Sliders */}
                <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400 font-bold">LEARNING RATE</span>
                      <span className="text-[var(--accent-color)] font-bold">{learningRate}</span>
                    </div>
                    <input
                      type="range"
                      min="0.0001"
                      max="0.01"
                      step="0.0005"
                      value={learningRate}
                      onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                      className="w-full accent-[var(--accent-color)] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400 font-bold">HIDDEN LAYERS</span>
                      <span className="text-[var(--accent-color)] font-bold">{hiddenLayers}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={hiddenLayers}
                      onChange={(e) => setHiddenLayers(parseInt(e.target.value))}
                      className="w-full accent-[var(--accent-color)] cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Neural Topology Preview Canvas */}
              <div className="p-4 rounded-xl bg-black/80 border border-white/10 flex flex-col items-center justify-center min-h-[160px] text-center">
                <div className="flex items-center space-x-6">
                  {Array.from({ length: hiddenLayers + 2 }).map((_, colIdx) => (
                    <div key={colIdx} className="flex flex-col items-center space-y-2">
                      <span className="text-[9px] text-zinc-500 font-bold">
                        {colIdx === 0
                          ? 'IN'
                          : colIdx === hiddenLayers + 1
                          ? 'OUT'
                          : `L${colIdx}`}
                      </span>
                      <div className="flex flex-col space-y-1.5">
                        {Array.from({ length: colIdx === 0 || colIdx === hiddenLayers + 1 ? 3 : 5 }).map((_, nodeIdx) => (
                          <div
                            key={nodeIdx}
                            className="w-3 h-3 rounded-full border border-[var(--accent-color)] bg-[var(--accent-color)]/20 animate-pulse"
                            style={{
                              animationDelay: `${(colIdx + nodeIdx) * 120}ms`,
                              boxShadow: `0 0 8px var(--accent-glow)`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-500 mt-4 uppercase">
                  TOPOLOGY: [{3}, ...{Array(hiddenLayers).fill(5)}, {3}] // ACTIVATION: {activation.toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {/* --- TAB 3: DIAGNOSTICS & TELEMETRY --- */}
          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">FPS TARGET</p>
                  <p className="text-xl font-bold font-hud text-emerald-400">60.0 FPS</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">GPU MEMORY</p>
                  <p className="text-xl font-bold font-hud text-[var(--accent-color)]">42.8 MB</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">GEO LATENCY</p>
                  <p className="text-xl font-bold font-hud text-zinc-200">18 ms</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">STATE SYNC</p>
                  <p className="text-xl font-bold font-hud text-emerald-400">OPTIMAL</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/80 border border-white/10 text-xs space-y-2 text-zinc-400 font-mono-tech">
                <p>&gt; RUNTIME: VITE + REACT 19 + TYPESCRIPT + THREE.JS</p>
                <p>&gt; LOCATION: PUNE, INDIA (18.5204° N, 73.8567° E)</p>
                <p>&gt; GRADUATION NODE: 2027 (B.TECH AI & DATA SCIENCE)</p>
                <p>&gt; CORE GITHUB: HTTPS://GITHUB.COM/DEVDATTH</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
