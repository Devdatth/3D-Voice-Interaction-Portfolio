import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeColor, AudioMode, PerformanceTier, Project } from '../types/portfolio';
import { soundEngine } from '../utils/audio';

interface PortfolioContextType {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  audioMode: AudioMode;
  setAudioMode: (mode: AudioMode) => void;
  volume: number;
  setVolume: (vol: number) => void;
  performanceTier: PerformanceTier;
  setPerformanceTier: (tier: PerformanceTier) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isDevLabsOpen: boolean;
  setIsDevLabsOpen: (open: boolean) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  isScanlinesActive: boolean;
  setIsScanlinesActive: (active: boolean) => void;
  isGridActive: boolean;
  setIsGridActive: (active: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  cursorVariant: 'default' | 'pointer' | 'project' | 'text';
  setCursorVariant: (variant: 'default' | 'pointer' | 'project' | 'text') => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<ThemeColor>(() => {
    return (localStorage.getItem('devdatth_theme') as ThemeColor) || 'white';
  });

  // Audio mode
  const [audioMode, setAudioModeState] = useState<AudioMode>(() => {
    return (localStorage.getItem('devdatth_audio_mode') as AudioMode) || 'off';
  });

  // Audio volume
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('devdatth_volume');
    return saved ? parseFloat(saved) : 0.4;
  });

  // Performance tier
  const [performanceTier, setPerformanceTierState] = useState<PerformanceTier>(() => {
    // Detect mobile or low power
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return (localStorage.getItem('devdatth_perf') as PerformanceTier) || 'medium';
    }
    return (localStorage.getItem('devdatth_perf') as PerformanceTier) || 'high';
  });

  // Section tracking
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Modals & UI Toggles
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isDevLabsOpen, setIsDevLabsOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isScanlinesActive, setIsScanlinesActive] = useState<boolean>(true);
  const [isGridActive, setIsGridActive] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Cursor state
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pointer' | 'project' | 'text'>('default');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('devdatth_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
    soundEngine.playClick();
  };

  const setAudioMode = (mode: AudioMode) => {
    setAudioModeState(mode);
    localStorage.setItem('devdatth_audio_mode', mode);
    soundEngine.setAudioMode(mode);
    soundEngine.playClick();
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    localStorage.setItem('devdatth_volume', vol.toString());
    soundEngine.setVolume(vol);
  };

  const setPerformanceTier = (tier: PerformanceTier) => {
    setPerformanceTierState(tier);
    localStorage.setItem('devdatth_perf', tier);
    soundEngine.playClick();
  };

  // Section observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        setTheme,
        audioMode,
        setAudioMode,
        volume,
        setVolume,
        performanceTier,
        setPerformanceTier,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
        isSettingsOpen,
        setIsSettingsOpen,
        isDevLabsOpen,
        setIsDevLabsOpen,
        isResumeOpen,
        setIsResumeOpen,
        isScanlinesActive,
        setIsScanlinesActive,
        isGridActive,
        setIsGridActive,
        isLoaded,
        setIsLoaded,
        cursorText,
        setCursorText,
        cursorVariant,
        setCursorVariant,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
