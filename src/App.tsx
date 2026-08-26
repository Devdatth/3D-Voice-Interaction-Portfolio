import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Scene3D } from './components/three/Scene3D';
import { HudHeader } from './components/layout/HudHeader';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/layout/CustomCursor';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { Footer } from './components/layout/Footer';
import { SettingsModal } from './components/settings/SettingsModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { DevLabsModal } from './components/modals/DevLabsModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { AIVoiceAgent } from './components/voice/AIVoiceAgent';
import { trackVisitorTelemetry } from './services/visitorAlert';

const PortfolioContent: React.FC = () => {
  const {
    isLoaded,
    setIsLoaded,
    isScanlinesActive,
    isGridActive,
  } = usePortfolio();

  // Lenis smooth scrolling initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Automated visitor alert trigger
  useEffect(() => {
    trackVisitorTelemetry();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e0e0e0] overflow-x-hidden">
      {/* 1. Cinematic Loading Sequence */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* 2. Three.js 3D Background Engine */}
      <Scene3D />

      {/* 3. Cyber Grid Layer (Toggleable in Settings) */}
      {isGridActive && (
        <div className="fixed inset-0 cyber-grid opacity-35 pointer-events-none z-0" />
      )}

      {/* 4. CRT Scanlines & Film Grain Overlay (Toggleable in Settings) */}
      {isScanlinesActive && (
        <div className="fixed inset-0 scanlines opacity-20 pointer-events-none z-30" />
      )}

      {/* 5. Custom Interactive Hardware Cursor */}
      <CustomCursor />

      {/* 6. Top Technical HUD Bar */}
      <HudHeader />

      {/* 7. Floating HUD Navigation Panel */}
      <Navbar />

      {/* 8. Main Content Stream */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* 9. Interactive AI Voice Navigation Agent */}
      <AIVoiceAgent />

      {/* 10. Terminal Footer */}
      <Footer />

      {/* 11. Modals */}
      <SettingsModal />
      <ProjectDetailModal />
      <DevLabsModal />
      <ResumeModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
