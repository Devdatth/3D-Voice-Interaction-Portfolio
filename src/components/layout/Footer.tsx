import React from 'react';
import { ArrowUp, Terminal, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { DEVELOPER_INFO } from '../../data/systemInfo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505] py-12 px-4 sm:px-8 lg:px-12 font-mono-tech select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
        {/* Left identity */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="font-bold text-white font-hud tracking-wider">
              DEVDATTH ADIK
            </span>
            <span>//</span>
            <span className="text-[var(--accent-color)] font-bold">PORTFOLIO OS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <p className="text-[10px] text-zinc-500">
            Crafted for AI Engineering, Machine Learning, and Scalable Full-Stack Systems.
          </p>
        </div>

        {/* Center coordinates */}
        <div className="text-center text-[11px] text-zinc-400">
          <span>PUNE, MAHARASHTRA, INDIA</span>
          <span className="mx-2 text-zinc-600">|</span>
          <span className="text-zinc-500">18.5204° N, 73.8567° E</span>
        </div>

        {/* Right back to top */}
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-zinc-600">© 2026 DEVDATTH ADIK</span>
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors flex items-center space-x-1 text-[10px] font-bold uppercase cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
