import React from 'react';
import { motion } from 'motion/react';
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  BrainCircuit,
  Database,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';
import { DEVELOPER_INFO } from '../../data/systemInfo';

export const AboutSection: React.FC = () => {
  const { setCursorVariant, setCursorText, setIsResumeOpen } = usePortfolio();

  const infoCards = [
    {
      icon: User,
      label: 'IDENTITY',
      value: 'AI & DATA SCIENCE ENGINEER',
      desc: 'AI Freelancer & Full Stack Architect',
      highlight: 'text-[var(--accent-color)]',
    },
    {
      icon: MapPin,
      label: 'LOCATION',
      value: 'PUNE, INDIA',
      desc: 'Coordinates: 18.5204° N, 73.8567° E',
      highlight: 'text-white',
    },
    {
      icon: Briefcase,
      label: 'STATUS',
      value: 'OPEN TO OPPORTUNITIES',
      desc: 'Full-Time AI Engineering & Software Roles',
      highlight: 'text-emerald-400',
    },
    {
      icon: GraduationCap,
      label: 'GRADUATION',
      value: '2027',
      desc: 'B.Tech in Artificial Intelligence & Data Science',
      highlight: 'text-white',
    },
  ];

  const pillars = [
    {
      title: 'AI Agents & LLM Architectures',
      desc: 'Designing autonomous multi-agent runtimes with dynamic tool introspection, context memory graphs, and self-correcting validation loops.',
      icon: BrainCircuit,
    },
    {
      title: 'Scalable ML Infrastructure',
      desc: 'Building reproducible experiment trackers, hyperparameter sweep engines, and automated model benchmarking pipelines.',
      icon: Cpu,
    },
    {
      title: 'Robust Full-Stack Systems',
      desc: 'Engineering low-latency backend microservices with Django, Spring Boot, and relational databases combined with modern reactive frontends.',
      icon: Database,
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[var(--accent-color)] font-mono-tech text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <span>[02] SYSTEM SPECIFICATION</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-hud tracking-tight text-white leading-tight">
                ABOUT THE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
                  SYSTEM
                </span>
              </h2>
            </div>

            <button
              id="about-view-dossier-btn"
              onClick={() => {
                soundEngine.playModalOpen();
                setIsResumeOpen(true);
              }}
              className="px-5 py-2.5 rounded-lg hud-panel border border-white/15 text-white hover:border-[var(--accent-color)] font-mono-tech text-xs font-bold uppercase transition-all self-start sm:self-auto cursor-pointer"
              onMouseEnter={() => {
                setCursorVariant('pointer');
                setCursorText('DOSSIER');
                soundEngine.playHover();
              }}
              onMouseLeave={() => {
                setCursorVariant('default');
                setCursorText('');
              }}
            >
              VIEW FULL DOSSIER / CV
            </button>
          </div>
        </div>

        {/* Narrative & High-Tech Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="hud-panel p-6 sm:p-8 rounded-2xl border border-white/10 cyber-corners space-y-4">
              <h3 className="text-lg sm:text-xl font-bold font-hud text-white">
                ENGINEERING INTELLIGENCE INTO PRACTICAL PRODUCTS
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                I am <span className="text-white font-bold">Devdatth Adik</span>, an AI & Data Science scholar and developer passionate about constructing intelligent systems and scalable digital products.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
                My work combines artificial intelligence, machine learning algorithms, robust backend engineering, and modern web architectures. I specialize in turning complex mathematical problems into intuitive, high-performance, and user-friendly software solutions.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
                Currently focused on <span className="text-[var(--accent-color)] font-semibold">autonomous AI agent frameworks (AgentForge)</span>, machine learning training pipelines (Project Dynamo), and full-stack software systems that deliver tangible real-world value.
              </p>
            </div>
          </div>

          {/* 4 Animated Telemetry Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="hud-panel p-5 rounded-xl border border-white/10 cyber-corners flex flex-col justify-between space-y-4 hover:border-white/25 transition-all group"
                  onMouseEnter={() => {
                    setCursorVariant('pointer');
                    setCursorText(card.label);
                    soundEngine.playHover();
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default');
                    setCursorText('');
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-mono-tech font-bold tracking-widest uppercase">
                      {card.label}
                    </span>
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-[var(--accent-color)] transition-colors" />
                  </div>

                  <div>
                    <h4 className={`text-base sm:text-lg font-bold font-hud tracking-wide ${card.highlight}`}>
                      {card.value}
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans mt-1">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3 Core Architectural Pillars */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold text-zinc-500 font-mono-tech uppercase tracking-widest">
            CORE DOMAIN EXPERTISE & METHODOLOGY
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="hud-panel p-6 rounded-xl border border-white/10 cyber-corners space-y-3 hover:border-[var(--accent-color)] transition-all"
                  onMouseEnter={() => {
                    setCursorVariant('pointer');
                    setCursorText('CORE');
                    soundEngine.playHover();
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default');
                    setCursorText('');
                  }}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent-color)] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold font-hud text-white">
                    {p.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
