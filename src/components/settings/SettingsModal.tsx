import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sliders, Monitor, Eye, Activity } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ThemeColor, AudioMode, PerformanceTier } from '../../types/portfolio';
import { soundEngine } from '../../utils/audio';

const THEMES: { id: ThemeColor; label: string; color: string; ring: string }[] = [
  { id: 'white', label: 'WHITE / MONO', color: '#ffffff', ring: 'ring-white' },
  { id: 'cyan', label: 'CYAN NEON', color: '#00f0ff', ring: 'ring-cyan-400' },
  { id: 'green', label: 'MATRIX GREEN', color: '#00ff88', ring: 'ring-emerald-400' },
  { id: 'yellow', label: 'SOLAR AMBER', color: '#ffd000', ring: 'ring-yellow-400' },
  { id: 'red', label: 'CRIMSON RED', color: '#ff3366', ring: 'ring-rose-500' },
];

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    theme,
    setTheme,
    audioMode,
    setAudioMode,
    volume,
    setVolume,
    performanceTier,
    setPerformanceTier,
    isScanlinesActive,
    setIsScanlinesActive,
    isGridActive,
    setIsGridActive,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  if (!isSettingsOpen) return null;

  const handleClose = () => {
    soundEngine.playClick();
    setIsSettingsOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none font-mono-tech">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={handleClose} />

        {/* Modal Container */}
        <motion.div
          id="system-settings-modal"
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md hud-panel rounded-2xl p-6 border border-white/15 cyber-corners shadow-2xl relative z-10 bg-[#0e0e12]/95"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold font-hud tracking-wider text-white">
                System
              </h2>
              <p className="text-[10px] text-zinc-400 tracking-widest uppercase">
                GLOBAL CONFIG
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[9px] font-bold bg-white/5 border border-white/10 rounded text-zinc-400">
                SET
              </span>
              <button
                id="close-settings-btn"
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
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section 01: Core Theme */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">
                [01] CORE THEME
              </span>
              <span className="text-[10px] text-zinc-500 font-bold">V_1.0</span>
            </div>

            <div className="grid grid-cols-5 gap-3 p-3 rounded-xl bg-black/50 border border-white/5">
              {THEMES.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    id={`theme-btn-${t.id}`}
                    onClick={() => setTheme(t.id)}
                    className={`h-11 rounded-lg flex items-center justify-center transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border border-white/40 bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                        : 'border border-transparent hover:bg-white/5'
                    }`}
                    onMouseEnter={() => {
                      setCursorVariant('pointer');
                      setCursorText(t.id);
                      soundEngine.playHover();
                    }}
                    onMouseLeave={() => {
                      setCursorVariant('default');
                      setCursorText('');
                    }}
                    title={t.label}
                  >
                    <span
                      className="w-4 h-4 rounded-full transition-transform"
                      style={{
                        backgroundColor: t.color,
                        boxShadow: isSelected ? `0 0 10px ${t.color}` : 'none',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                      }}
                    />
                    {isSelected && (
                      <span className="absolute inset-1.5 border border-white/60 rounded-md pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 02: Audio Engine */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">
                [02] AUDIO ENGINE
              </span>
              <span className="text-[10px] text-[var(--accent-color)] font-bold">
                {audioMode.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2">
              {/* Option 1: Off */}
              <button
                id="audio-mode-off"
                onClick={() => setAudioMode('off')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  audioMode === 'off'
                    ? 'bg-white/10 border-[var(--accent-color)] text-white'
                    : 'bg-black/40 border-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold font-hud uppercase">Pure Silence (Muted)</p>
                  <p className="text-[10px] text-zinc-500">Zero background synth playback</p>
                </div>
                {audioMode === 'off' && (
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]" />
                )}
              </button>

              {/* Option 2: Ambient Digital Minimalism */}
              <button
                id="audio-mode-ambient"
                onClick={() => setAudioMode('ambient')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  audioMode === 'ambient'
                    ? 'bg-white/10 border-[var(--accent-color)] text-white shadow-[0_0_12px_var(--accent-glow)]'
                    : 'bg-black/40 border-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold font-hud uppercase">Digital Minimalism Ambient</p>
                  <p className="text-[10px] text-zinc-500 uppercase">SUBTLE & SILENT DEEP MINIMALIST LOOP</p>
                </div>
                {audioMode === 'ambient' && (
                  <div className="flex items-end space-x-0.5 h-3">
                    <span className="w-1 h-2 bg-[var(--accent-color)] animate-pulse" />
                    <span className="w-1 h-3 bg-[var(--accent-color)] animate-pulse delay-75" />
                    <span className="w-1 h-1.5 bg-[var(--accent-color)] animate-pulse delay-150" />
                  </div>
                )}
              </button>

              {/* Option 3: Digital Minimalism */}
              <button
                id="audio-mode-digital"
                onClick={() => setAudioMode('digital')}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  audioMode === 'digital'
                    ? 'bg-white/10 border-[var(--accent-color)] text-white shadow-[0_0_12px_var(--accent-glow)]'
                    : 'bg-black/40 border-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div>
                  <p className="text-xs font-bold font-hud uppercase">Minimal Harmonic Pulse</p>
                  <p className="text-[10px] text-zinc-500 uppercase">SUBTLE & CALM SPATIAL TEXTURE</p>
                </div>
                {audioMode === 'digital' && (
                  <div className="flex items-end space-x-0.5 h-3">
                    <span className="w-1 h-3 bg-[var(--accent-color)] animate-pulse" />
                    <span className="w-1 h-2 bg-[var(--accent-color)] animate-pulse delay-100" />
                    <span className="w-1 h-3 bg-[var(--accent-color)] animate-pulse delay-200" />
                  </div>
                )}
              </button>

              {/* Volume Slider */}
              {audioMode !== 'off' && (
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center space-x-3 mt-2">
                  <Volume2 className="w-4 h-4 text-zinc-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-[var(--accent-color)] cursor-pointer"
                  />
                  <span className="text-[10px] text-zinc-400 w-8 text-right font-bold">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 03: Performance Tier */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-zinc-400 font-bold uppercase tracking-wider">
                [03] PERFORMANCE TIER
              </span>
              <span className="text-[10px] text-zinc-500 font-bold">SYS</span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/60 rounded-xl border border-white/5">
              {(['high', 'medium', 'saver'] as PerformanceTier[]).map((tier) => {
                const isSelected = performanceTier === tier;
                return (
                  <button
                    key={tier}
                    id={`perf-tier-${tier}`}
                    onClick={() => setPerformanceTier(tier)}
                    className={`py-2 rounded-lg text-xs font-bold font-hud uppercase transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black font-extrabold shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                    onMouseEnter={() => {
                      setCursorVariant('pointer');
                      setCursorText(tier);
                      soundEngine.playHover();
                    }}
                    onMouseLeave={() => {
                      setCursorVariant('default');
                      setCursorText('');
                    }}
                  >
                    {tier}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual FX Toggles */}
          <div className="mb-6 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsScanlinesActive(!isScanlinesActive);
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                isScanlinesActive
                  ? 'bg-white/5 border-white/20 text-white'
                  : 'bg-black/40 border-white/5 text-zinc-500'
              }`}
            >
              <span>Scanlines</span>
              <span
                className={`text-[10px] font-bold ${
                  isScanlinesActive ? 'text-[var(--accent-color)]' : 'text-zinc-600'
                }`}
              >
                {isScanlinesActive ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setIsGridActive(!isGridActive);
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                isGridActive
                  ? 'bg-white/5 border-white/20 text-white'
                  : 'bg-black/40 border-white/5 text-zinc-500'
              }`}
            >
              <span>Cyber Grid</span>
              <span
                className={`text-[10px] font-bold ${
                  isGridActive ? 'text-[var(--accent-color)]' : 'text-zinc-600'
                }`}
              >
                {isGridActive ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Footer Status */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-wider">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SYSTEM ACTIVE</span>
            </div>
            <span>DEVDATTH ADIK // 2026</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
