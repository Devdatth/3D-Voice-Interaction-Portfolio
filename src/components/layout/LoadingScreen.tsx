import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../../utils/audio';
import { Cpu, Terminal, Shield, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const logs = [
    'INITIALIZING QUANTUM RUNTIME & NEURAL GRAPH...',
    'CONFIGURING HARDWARE-ACCELERATED WEBGL ENGINE...',
    'CALIBRATING 3D SPATIAL PARTICLES & SHADERS...',
    'SYNCING AUTONOMOUS AI AGENT ORCHESTRATOR...',
    'ESTABLISHING LOW-LATENCY RAG VECTOR PIPELINES...',
    'CALIBRATING INTERACTIVE HUD & SPATIAL AUDIO...',
    'SYSTEM ONLINE // ALL CHANNELS NOMINAL',
  ];

  const handleFinish = useCallback(() => {
    setIsFinished(true);
    soundEngine.playSuccess();
    setTimeout(onComplete, 400);
  }, [onComplete]);

  useEffect(() => {
    // Exactly 5 seconds total duration (50ms intervals * 100 steps = 5000ms)
    const totalDurationMs = 5000;
    const intervalMs = 50;
    const totalSteps = totalDurationMs / intervalMs; // 100 steps
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      const calculatedProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(calculatedProgress);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setTimeout(handleFinish, 200);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [handleFinish]);

  useEffect(() => {
    const logIdx = Math.min(
      logs.length - 1,
      Math.floor((progress / 100) * logs.length)
    );
    setLogIndex(logIdx);
  }, [progress]);

  // Keyboard shortcut listener for instantaneous entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        setProgress(100);
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            setProgress(100);
            handleFinish();
          }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-4 sm:p-6 select-none font-mono-tech cursor-pointer"
        >
          {/* Background cyber grid & scanlines */}
          <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

          {/* Central Holographic Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full max-w-lg hud-panel p-6 sm:p-8 rounded-2xl cyber-corners border border-white/15 bg-black/85 backdrop-blur-xl relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top HUD Telemetry Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-xs text-zinc-400">
              <div className="flex items-center space-x-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-color)]" />
                </span>
                <span className="text-white font-bold font-hud tracking-wider text-xs">
                  DEVDATTH ADIK <span className="text-zinc-600">//</span> OS_BOOT
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono-tech">
                <span>SYS_INIT</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="text-emerald-400">NOMINAL</span>
              </div>
            </div>

            {/* Futuristic Orbital HUD Pulse Graphic */}
            <div className="flex items-center space-x-5 mb-6">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                {/* Outer rotating dashed ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[var(--accent-color)]/40"
                />
                {/* Middle counter-rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 rounded-full border-t-2 border-b-2 border-[var(--accent-color)]/80"
                />
                {/* Center Core Glyph */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center shadow-[0_0_15px_var(--accent-color)]">
                  <Cpu className="w-4 h-4 text-[var(--accent-color)] animate-pulse" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-mono-tech tracking-widest uppercase">
                  AI & DATA SCIENCE WORKSPACE
                </p>
                <h1 className="text-lg sm:text-xl font-black font-hud tracking-wide text-white leading-tight">
                  INTELLIGENT SYSTEMS & 3D INTERACTION
                </h1>
              </div>
            </div>

            {/* Live Progress Bar Rail */}
            <div className="space-y-2 mb-4">
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-zinc-400 font-mono-tech uppercase flex items-center space-x-1.5">
                  <Terminal className="w-3 h-3 text-[var(--accent-color)]" />
                  <span>INITIALIZATION PROGRESS</span>
                </span>
                <span className="text-xl font-black font-hud text-[var(--accent-color)] text-glow">
                  {progress}%
                </span>
              </div>

              {/* Progress Rail Track */}
              <div className="w-full h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden relative p-0.5">
                <motion.div
                  className="h-full rounded-full bg-[var(--accent-color)] shadow-[0_0_12px_var(--accent-color)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Live Terminal Telemetry Log Box */}
            <div className="bg-black/80 rounded-xl p-3.5 border border-white/5 h-16 flex flex-col justify-center text-xs">
              <div className="flex items-center space-x-2 text-zinc-200">
                <span className="text-[var(--accent-color)] font-bold">&gt;</span>
                <span className="truncate text-xs font-mono-tech">{logs[logIndex]}</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1 flex items-center justify-between">
                <span>LOC: PUNE, INDIA (18.5204° N, 73.8567° E)</span>
                <span className="text-zinc-600">RT_LATENCY: 12ms</span>
              </p>
            </div>

            {/* Bottom Quick-Start Action Bar */}
            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono-tech">
              <span className="text-zinc-500">CLICK ANYWHERE OR PRESS [ENTER]</span>
              <button
                id="skip-loader-btn"
                onClick={() => {
                  setProgress(100);
                  handleFinish();
                }}
                className="text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all uppercase text-[10px] font-bold"
              >
                ENTER DIRECTLY ›
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

