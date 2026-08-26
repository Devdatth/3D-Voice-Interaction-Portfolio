import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  Terminal,
  Activity,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';
import { DEVELOPER_INFO } from '../../data/systemInfo';

export const HeroSection: React.FC = () => {
  const { setCursorVariant, setCursorText, setIsDevLabsOpen, theme } = usePortfolio();

  // Dynamic animated role cycler
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % DEVELOPER_INFO.roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 lg:px-12 select-none pointer-events-none"
    >
      {/* --- TOP / MAIN HERO GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left Column: Bold Typography & Manifesto */}
        <div className="lg:col-span-7 z-10 pointer-events-auto space-y-6">
          {/* Status Capsule */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full hud-panel border border-white/10 text-xs font-mono-tech"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-ping" />
            <span className="text-zinc-400 uppercase text-[10px] tracking-wider">
              QUANTUM INTELLIGENCE SYSTEM
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-[var(--accent-color)] font-bold text-[10px] tracking-widest uppercase">
              DEVDATTH ADIK
            </span>
          </motion.div>

          {/* Main Giant Kinetic Typography */}
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-hud tracking-tight text-white leading-[0.95]"
            >
              BUILDING
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-hud tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 leading-[0.95]"
            >
              INTELLIGENT
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black font-hud tracking-tight text-white leading-[0.95]"
            >
              EXPERIENCES
            </motion.h1>
          </div>

          {/* Dynamic Role Subheading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center space-x-3 text-sm sm:text-base font-mono-tech font-bold text-[var(--accent-color)] text-glow h-7"
          >
            <span className="text-zinc-500 font-mono">&gt;</span>
            <span className="tracking-widest uppercase transition-all duration-300">
              {DEVELOPER_INFO.roles[roleIndex]}
            </span>
          </motion.div>

          {/* Technical Info Log Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hud-panel p-4 sm:p-5 rounded-xl max-w-xl border border-white/10 cyber-corners space-y-2.5"
          >
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono-tech border-b border-white/5 pb-2">
              <span className="tracking-widest">[ INFO_LOG ]</span>
              <span>GEO: PUNE, INDIA (18.5204° N)</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed font-sans">
              Sculpting intelligent multi-agent systems, scalable machine learning infrastructure, and interactive 3D digital experiences at the intersection of mathematical precision and creative technology.
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-3 pt-2 font-mono-tech text-xs"
          >
            <button
              id="hero-explore-projects-btn"
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 rounded-lg bg-[var(--accent-color)] text-black font-bold font-hud uppercase flex items-center space-x-2 hover:brightness-110 transition-all hover:scale-105 shadow-[0_0_20px_var(--accent-glow)] cursor-pointer"
              onMouseEnter={() => {
                setCursorVariant('pointer');
                setCursorText('VIEW');
                soundEngine.playHover();
              }}
              onMouseLeave={() => {
                setCursorVariant('default');
                setCursorText('');
              }}
            >
              <span>EXPLORE PROJECTS</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              id="hero-open-labs-btn"
              onClick={() => {
                soundEngine.playModalOpen();
                setIsDevLabsOpen(true);
              }}
              className="px-5 py-3 rounded-lg hud-panel border border-white/15 text-white hover:border-[var(--accent-color)] font-bold font-hud uppercase flex items-center space-x-2 transition-all cursor-pointer"
              onMouseEnter={() => {
                setCursorVariant('pointer');
                setCursorText('LABS');
                soundEngine.playHover();
              }}
              onMouseLeave={() => {
                setCursorVariant('default');
                setCursorText('');
              }}
            >
              <Terminal className="w-4 h-4 text-[var(--accent-color)]" />
              <span>LAUNCH DEV LABS</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: High-Tech Telemetry Status Panel */}
        <div className="lg:col-span-5 z-10 pointer-events-auto flex flex-col items-start lg:items-end justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-sm hud-panel rounded-xl p-5 border border-white/10 cyber-corners space-y-4 font-mono-tech text-xs"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                DEVELOPER STATS
              </span>
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LOADED</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">PROJECTS_COMPLETED</span>
                  <span className="text-white font-bold">{DEVELOPER_INFO.stats.projectsCompleted}</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '88%' }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="h-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-glow)]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">EXPERIENCE_HORIZON</span>
                  <span className="text-white font-bold">2023 - 2027</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                    className="h-full bg-white shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Technical Parameters Feed */}
            <div className="p-3 bg-black/60 rounded-lg border border-white/5 space-y-1.5 text-[10px] text-zinc-400 font-mono-tech">
              <p className="flex justify-between">
                <span>&gt; ACTIVE_STACK:</span>
                <span className="text-white font-bold">PYTHON / REACT / JAVA</span>
              </p>
              <p className="flex justify-between">
                <span>&gt; AVAILABILITY_TYPE:</span>
                <span className="text-emerald-400 font-bold">OPEN_FOR_OFFERS</span>
              </p>
              <p className="flex justify-between">
                <span>&gt; STATUS:</span>
                <span className="text-white font-bold">ONLINE (B.TECH '27)</span>
              </p>
              <p className="flex justify-between">
                <span>&gt; SYSTEM_PERF:</span>
                <span className="text-[var(--accent-color)] font-bold">[OPTIMAL]</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- HERO FOOTER METRICS & SCROLL HINT --- */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5 font-mono-tech text-[11px] text-zinc-500">
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-zinc-600 block text-[9px] uppercase">Wanna Say Hello?</span>
            <a
              href={`mailto:${DEVELOPER_INFO.contacts.email}`}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              {DEVELOPER_INFO.contacts.email}
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors uppercase group cursor-pointer"
          onMouseEnter={() => {
            setCursorVariant('pointer');
            setCursorText('SCROLL');
            soundEngine.playHover();
          }}
          onMouseLeave={() => {
            setCursorVariant('default');
            setCursorText('');
          }}
        >
          <span className="text-[10px] tracking-widest">INITIALIZE SYSTEM SCAN</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[var(--accent-color)]" />
        </button>
      </div>
    </section>
  );
};
