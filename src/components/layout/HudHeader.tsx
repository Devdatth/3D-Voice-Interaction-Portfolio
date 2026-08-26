import React, { useState, useEffect } from 'react';
import { Settings, Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';

export const HudHeader: React.FC = () => {
  const {
    theme,
    audioMode,
    setAudioMode,
    isSettingsOpen,
    setIsSettingsOpen,
    setIsDevLabsOpen,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // Calculate IST time (India Standard Time - Pune)
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const istString = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTime(istString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudioQuick = () => {
    soundEngine.playClick();
    if (audioMode === 'off') {
      setAudioMode('ambient');
    } else {
      setAudioMode('off');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between pointer-events-none select-none font-mono-tech text-[11px]">
      {/* Top Left Brand / Identity */}
      <div className="pointer-events-auto flex items-center space-x-3">
        <a
          href="#home"
          id="hud-logo-link"
          className="group flex flex-col tracking-wider focus:outline-none"
          onMouseEnter={() => {
            setCursorVariant('pointer');
            setCursorText('HOME');
            soundEngine.playHover();
          }}
          onMouseLeave={() => {
            setCursorVariant('default');
            setCursorText('');
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white tracking-widest text-xs group-hover:text-[var(--accent-color)] transition-colors">
              DEVDATTH ADIK
            </span>
            <span className="text-zinc-600 font-light">|</span>
            <span className="text-zinc-400 text-[10px] tracking-wider uppercase">
              PORTFOLIO
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-normal tracking-wide">
            AI & DATA SCIENCE // 2026
          </span>
        </a>
      </div>

      {/* Center Technical Badges (Desktop only) */}
      <div className="hidden lg:flex items-center space-x-2.5 pointer-events-auto">
        {/* Availability */}
        <div className="hud-panel px-3 py-1 rounded-sm flex items-center space-x-2 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-400 uppercase text-[10px]">
            AVAILABILITY:
          </span>
          <span className="text-white font-bold text-[10px]">OPEN</span>
        </div>

        {/* Engine */}
        <div className="hud-panel px-3 py-1 rounded-sm flex items-center space-x-1.5 border border-white/5">
          <span className="text-zinc-500 uppercase text-[10px]">RENDERING:</span>
          <span className="text-[var(--accent-color)] font-bold text-[10px]">
            WEBGL / THREE.JS
          </span>
        </div>

        {/* Core role */}
        <div className="hud-panel px-3 py-1 rounded-sm flex items-center space-x-1.5 border border-white/5">
          <span className="text-zinc-500 uppercase text-[10px]">CORE_ID:</span>
          <span className="text-white font-bold text-[10px]">
            AI & DATA SCIENCE ENGINEER
          </span>
        </div>
      </div>

      {/* Top Right Controls & Local Time */}
      <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-3">
        {/* Dev Labs Button */}
        <button
          id="hud-dev-labs-btn"
          onClick={() => {
            soundEngine.playModalOpen();
            setIsDevLabsOpen(true);
          }}
          className="hud-panel px-2.5 py-1.5 rounded flex items-center space-x-1.5 text-zinc-300 hover:text-white hover:border-[var(--accent-color)] transition-all group cursor-pointer"
          onMouseEnter={() => {
            setCursorVariant('pointer');
            setCursorText('LABS');
            soundEngine.playHover();
          }}
          onMouseLeave={() => {
            setCursorVariant('default');
            setCursorText('');
          }}
          title="Open Interactive Dev Labs"
        >
          <Terminal className="w-3.5 h-3.5 text-[var(--accent-color)] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-[10px] font-bold tracking-wider">
            DEV LABS
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          id="hud-audio-toggle-btn"
          onClick={toggleAudioQuick}
          className="hud-panel p-1.5 sm:px-2.5 sm:py-1.5 rounded flex items-center space-x-1.5 text-zinc-400 hover:text-white hover:border-[var(--accent-color)] transition-colors cursor-pointer"
          onMouseEnter={() => {
            setCursorVariant('pointer');
            setCursorText(audioMode === 'off' ? 'UNMUTE' : 'MUTE');
            soundEngine.playHover();
          }}
          onMouseLeave={() => {
            setCursorVariant('default');
            setCursorText('');
          }}
          title={`Audio Mode: ${audioMode.toUpperCase()}`}
        >
          {audioMode === 'off' ? (
            <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[var(--accent-color)] animate-pulse" />
          )}
          <span className="hidden md:inline text-[10px] uppercase font-bold text-zinc-300">
            {audioMode === 'off' ? 'AUDIO: OFF' : `AUDIO: ${audioMode}`}
          </span>
        </button>

        {/* Pune IST Time */}
        <div className="hidden sm:flex hud-panel px-2.5 py-1.5 rounded items-center space-x-1.5 border border-white/5 text-zinc-300">
          <span className="text-zinc-500 text-[10px]">PUNE, IN:</span>
          <span className="text-white font-bold text-[10px]">{time || '15:15:00'} IST</span>
        </div>

        {/* Global Config / Settings Trigger */}
        <button
          id="hud-settings-btn"
          onClick={() => {
            soundEngine.playModalOpen();
            setIsSettingsOpen(true);
          }}
          className={`hud-panel p-2 rounded flex items-center justify-center transition-all cursor-pointer ${
            isSettingsOpen
              ? 'border-[var(--accent-color)] text-[var(--accent-color)] shadow-[0_0_15px_var(--accent-glow)]'
              : 'text-zinc-400 hover:text-white hover:border-white/30'
          }`}
          onMouseEnter={() => {
            setCursorVariant('pointer');
            setCursorText('CONFIG');
            soundEngine.playHover();
          }}
          onMouseLeave={() => {
            setCursorVariant('default');
            setCursorText('');
          }}
          title="Open Global System Config"
        >
          <Settings className="w-4 h-4 hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>
    </header>
  );
};
