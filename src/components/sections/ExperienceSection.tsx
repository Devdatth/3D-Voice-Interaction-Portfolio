import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';
import { EXPERIENCE_DATA } from '../../data/experience';

export const ExperienceSection: React.FC = () => {
  const { setCursorVariant, setCursorText } = usePortfolio();

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[var(--accent-color)] font-mono-tech text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse" />
            <span>[05] PROFESSIONAL ENGAGEMENTS</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-hud tracking-tight text-white leading-tight">
                WORK & FREELANCE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
                  EXPERIENCE
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono-tech max-w-md">
              Demonstrated track record of delivering autonomous AI agents, enterprise LLM fine-tuning, and scalable machine learning pipelines in real-world freelance and engineering roles.
            </p>
          </div>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-8">
          {EXPERIENCE_DATA.map((exp, idx) => {
            const isFeatured = exp.id === 'microai-freelance';

            return (
              <motion.div
                key={exp.id}
                id={`exp-card-${exp.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative group"
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  setCursorText(exp.company);
                  soundEngine.playHover();
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setCursorText('');
                }}
              >
                <div
                  className={`hud-panel p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    isFeatured
                      ? 'border-[var(--accent-color)]/40 bg-gradient-to-br from-white/[0.04] via-black to-black shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:border-[var(--accent-color)]'
                      : 'border-white/10 hover:border-white/25 bg-black/60'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  {isFeatured && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent" />
                  )}

                  {/* Header Row: Role, Company, Date Badge */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30">
                          {exp.type}
                        </span>
                        {isFeatured && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>CURRENT ENGAGEMENT (3 MONTHS)</span>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-hud text-white tracking-wide group-hover:text-[var(--accent-color)] transition-colors">
                          {exp.role}
                        </h3>
                        <span className="text-zinc-500 text-lg hidden sm:inline">@</span>
                        <span className="text-lg sm:text-xl font-bold font-hud text-zinc-200">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    {/* Period & Location Metadata */}
                    <div className="flex flex-col sm:items-end font-mono-tech text-xs space-y-1 text-zinc-400">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <Calendar className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-500 text-[11px]">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed mb-6">
                    {exp.summary}
                  </p>

                  {/* Responsibilities & Key Deliverables */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pb-6 border-b border-white/10">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono-tech font-bold tracking-wider uppercase">
                        <Terminal className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                        <span>KEY RESPONSIBILITIES & SYSTEM SCOPE</span>
                      </div>
                      <div className="space-y-2">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-start space-x-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-snug"
                          >
                            <span className="text-[var(--accent-color)] font-mono-tech font-bold mt-0.5">
                              ›
                            </span>
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono-tech font-bold tracking-wider uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>MEASURABLE OUTCOMES & ACHIEVEMENTS</span>
                      </div>
                      <div className="space-y-2">
                        {exp.achievements.map((ach, aIdx) => (
                          <div
                            key={aIdx}
                            className="flex items-start space-x-2.5 text-xs sm:text-sm text-zinc-400 font-sans leading-snug"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-5 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono-tech font-bold uppercase tracking-wider mr-2">
                      CORE TECH:
                    </span>
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-white/[0.04] text-zinc-300 border border-white/5 group-hover:border-white/15 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
