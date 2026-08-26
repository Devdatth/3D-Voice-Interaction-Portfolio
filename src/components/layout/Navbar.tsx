import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu as MenuIcon,
  X,
  Linkedin,
  Github,
  Mail,
  FileText,
  Terminal,
  Grid,
  ExternalLink,
  ChevronRight,
  Compass,
  Cpu,
  FolderGit2,
  Briefcase,
  User,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';
import { DEVELOPER_INFO } from '../../data/systemInfo';

interface NavItem {
  id: string;
  num: string;
  label: string;
  icon: any;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', num: '01', label: 'HOME', icon: Compass },
  { id: 'about', num: '02', label: 'ABOUT', icon: User },
  { id: 'skills', num: '03', label: 'SKILLS', icon: Cpu },
  { id: 'projects', num: '04', label: 'PROJECTS', icon: FolderGit2 },
  { id: 'experience', num: '05', label: 'EXPERIENCE', icon: Briefcase },
  { id: 'contact', num: '06', label: 'CONTACT', icon: Mail },
];

export const Navbar: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    setIsDevLabsOpen,
    setIsResumeOpen,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    soundEngine.playNavSwitch();
    setActiveSection(id);
    setIsMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* --- FLOATING BOTTOM-CENTER DOCKED HUD NAVIGATION --- */}
      {/* Perfectly centered with max-width so it NEVER collides with the bottom-right DEV Voice Agent */}
      <nav
        id="docked-hud-navbar"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none font-mono-tech"
      >
        <div className="hud-panel p-1.5 sm:p-2 rounded-2xl border border-white/15 flex items-center space-x-1 shadow-2xl backdrop-blur-2xl bg-[#08080c]/90">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-hud tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isActive
                    ? 'text-black font-extrabold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  setCursorText(item.label);
                  soundEngine.playHover();
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setCursorText('');
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[var(--accent-color)] rounded-xl shadow-[0_0_15px_var(--accent-glow)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center space-x-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px] font-bold">
                    {item.label}
                  </span>
                </span>
              </button>
            );
          })}

          {/* Quick Hub Menu Toggle */}
          <button
            id="nav-quick-hub-btn"
            onClick={() => {
              soundEngine.playModalOpen();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              isMenuOpen
                ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                : 'bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border-white/10'
            }`}
            title="Toggle Quick Hub"
            onMouseEnter={() => {
              setCursorVariant('pointer');
              setCursorText('MENU');
              soundEngine.playHover();
            }}
            onMouseLeave={() => {
              setCursorVariant('default');
              setCursorText('');
            }}
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* --- QUICK HUB DRAWER MODAL (When user clicks Menu button) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="quick-hub-drawer"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-22 left-1/2 -translate-x-1/2 z-40 w-[92vw] max-w-sm rounded-2xl bg-[#09090d]/95 backdrop-blur-2xl border border-white/15 cyber-corners shadow-2xl p-4 font-mono-tech select-none"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div>
                <h3 className="text-xs font-bold font-hud tracking-widest text-white">
                  DEVDATTH ADIK // QUICK HUB
                </h3>
                <span className="text-[9px] text-zinc-500">SYSTEM ARCHIVE</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <a
                href={DEVELOPER_INFO.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px]">LinkedIn</span>
              </a>
              <a
                href={DEVELOPER_INFO.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200"
              >
                <Github className="w-3.5 h-3.5 text-zinc-300" />
                <span className="text-[11px]">GitHub</span>
              </a>
              <button
                onClick={() => {
                  soundEngine.playModalOpen();
                  setIsResumeOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-1.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">Resume / CV</span>
              </button>
              <a
                href={`mailto:${DEVELOPER_INFO.contacts.email}`}
                className="flex items-center space-x-1.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">Direct Email</span>
              </a>
            </div>

            <button
              onClick={() => {
                soundEngine.playModalOpen();
                setIsDevLabsOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[var(--accent-color)] text-black font-bold text-xs uppercase flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_15px_var(--accent-glow)]"
            >
              <Terminal className="w-4 h-4" />
              <span>LAUNCH DEV LABS SANDBOX</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
