import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';

export const ProjectDetailModal: React.FC = () => {
  const {
    selectedProject,
    setSelectedProject,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  if (!selectedProject) return null;

  const handleClose = () => {
    soundEngine.playClick();
    setSelectedProject(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl select-none font-mono-tech overflow-y-auto">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={handleClose} />

        {/* Modal Window */}
        <motion.div
          id="project-detail-modal-window"
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl hud-panel rounded-2xl p-6 sm:p-8 border border-white/20 cyber-corners shadow-2xl relative z-10 bg-[#0a0a0e]/95 my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[var(--accent-color)] text-black font-bold text-xs font-hud">
                  PROJECT {selectedProject.number}
                </span>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                  // {selectedProject.category}
                </span>
                <span className="text-xs text-zinc-500 font-bold">
                  [{selectedProject.year}]
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-hud tracking-wide text-white">
                {selectedProject.title}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--accent-color)] mt-1 font-semibold">
                {selectedProject.subtitle}
              </p>
            </div>

            <button
              id="close-project-modal-btn"
              onClick={handleClose}
              className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer ml-4"
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

          {/* Quick Action Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-black/60 border border-white/10 mb-8">
            <p className="text-xs text-zinc-300 max-w-xl font-normal leading-relaxed">
              {selectedProject.tagline}
            </p>

            <div className="flex items-center space-x-3">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold font-hud transition-all hover:scale-105"
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  setCursorText('GITHUB');
                  soundEngine.playHover();
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setCursorText('');
                }}
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPO</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--accent-color)] hover:brightness-110 text-black text-xs font-bold font-hud transition-all hover:scale-105"
                  onMouseEnter={() => {
                    setCursorVariant('pointer');
                    setCursorText('DEMO');
                    soundEngine.playHover();
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default');
                    setCursorText('');
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>VIEW LIVE</span>
                </a>
              )}
            </div>
          </div>

          {/* Core Metrics Cards (if available) */}
          {selectedProject.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {selectedProject.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between"
                >
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                    {m.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-hud text-[var(--accent-color)] text-glow">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Grid Layout: Problem/Solution & Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Problem & Solution Panel */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center space-x-2 text-rose-400 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase font-hud tracking-wider">
                    PROBLEM STATEMENT
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase font-hud tracking-wider">
                    ENGINEERED SOLUTION
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Architecture Pipeline */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col">
              <div className="flex items-center space-x-2 text-[var(--accent-color)] mb-3">
                <Layers className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase font-hud tracking-wider">
                  SYSTEM ARCHITECTURE
                </h3>
              </div>
              <div className="space-y-2.5 flex-1">
                {selectedProject.architecture.map((arch, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2.5 text-xs text-zinc-300 font-mono-tech"
                  >
                    <span className="text-[var(--accent-color)] font-bold text-[10px] mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-snug">{arch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div className="mb-8 p-5 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center space-x-2 text-white mb-4">
              <Cpu className="w-4 h-4 text-[var(--accent-color)]" />
              <h3 className="text-xs font-bold uppercase font-hud tracking-wider">
                CORE CAPABILITIES & IMPLEMENTATION HIGHLIGHTS
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedProject.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2 text-xs text-zinc-300"
                >
                  <span className="text-[var(--accent-color)] text-sm font-bold">›</span>
                  <span className="leading-relaxed font-sans">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
              TECHNOLOGIES & STACK DEPLOYED
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 font-mono-tech"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
