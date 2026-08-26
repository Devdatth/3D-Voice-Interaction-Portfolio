import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Layers,
  Database,
  Cpu,
  Wrench,
  CheckCircle2,
  Terminal,
  Sparkles,
  Info,
  ChevronDown,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';
import { SKILLS_DATA, SKILLS_CATEGORIES } from '../../data/skills';
import { SkillItem } from '../../types/portfolio';

const INITIAL_SKILLS_LIMIT = 6;

export const SkillsSection: React.FC = () => {
  const { setCursorVariant, setCursorText } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);

  const filteredSkills =
    selectedCategory === 'ALL'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const visibleSkills = showAllSkills
    ? filteredSkills
    : filteredSkills.slice(0, INITIAL_SKILLS_LIMIT);

  const hasMoreSkills = filteredSkills.length > INITIAL_SKILLS_LIMIT;
  const remainingCount = filteredSkills.length - INITIAL_SKILLS_LIMIT;

  const handleCategorySelect = (cat: string) => {
    soundEngine.playNavSwitch();
    setSelectedCategory(cat);
  };

  const handleSkillClick = (skill: SkillItem) => {
    soundEngine.playClick();
    setSelectedSkill(skill);
  };

  const toggleShowAll = () => {
    soundEngine.playClick();
    setShowAllSkills((prev) => !prev);
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[var(--accent-color)] font-mono-tech text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <span>[03] CAPABILITIES MATRIX</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-hud tracking-tight text-white leading-tight">
                TECHNICAL
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
                  ARSENAL
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono-tech max-w-md">
              A comprehensive directory of specialized programming languages, AI engineering frameworks, full-stack stacks, and deployment tooling.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
          {SKILLS_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`skill-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 rounded-lg border font-bold font-hud uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                }`}
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  setCursorText(cat);
                  soundEngine.playHover();
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setCursorText('');
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Interactive Grid & Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skills Node Grid & Expand Control */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {visibleSkills.map((skill) => {
                  const isSelected = selectedSkill.name === skill.name;
                  return (
                    <motion.button
                      layout
                      key={skill.name}
                      id={`skill-node-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleSkillClick(skill)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 relative ${
                        isSelected
                          ? 'bg-white/10 border-[var(--accent-color)] shadow-[0_0_16px_var(--accent-glow)]'
                          : 'hud-panel border-white/10 hover:border-white/30'
                      }`}
                      onMouseEnter={() => {
                        setCursorVariant('pointer');
                        setCursorText('INSPECT');
                        soundEngine.playHover();
                      }}
                      onMouseLeave={() => {
                        setCursorVariant('default');
                        setCursorText('');
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono-tech font-bold uppercase mb-1">
                          <span>{skill.category}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <h4 className="text-sm font-bold font-hud tracking-wide text-white truncate">
                          {skill.name}
                        </h4>
                      </div>

                      {/* Progress indicator line */}
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--accent-color)] transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Expand / Show More Skills Button */}
            {hasMoreSkills && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-1"
              >
                <button
                  id="toggle-all-skills-btn"
                  onClick={toggleShowAll}
                  className="w-full py-3 px-5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[var(--accent-color)]/70 text-white transition-all flex items-center justify-center space-x-2.5 font-hud font-bold text-xs tracking-wider cursor-pointer group shadow-lg"
                  onMouseEnter={() => {
                    setCursorVariant('pointer');
                    setCursorText(showAllSkills ? 'COLLAPSE' : 'EXPAND');
                    soundEngine.playHover();
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default');
                    setCursorText('');
                  }}
                >
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--accent-color)] transition-transform duration-300 ${
                      showAllSkills ? 'rotate-180' : ''
                    }`}
                  />
                  <span>
                    {showAllSkills
                      ? `COLLAPSE TECHNICAL MATRIX (SHOWING ALL ${filteredSkills.length} SKILLS)`
                      : `SHOW MORE SKILLS (+${remainingCount} MORE IN ${selectedCategory})`}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--accent-color)] transition-transform duration-300 ${
                      showAllSkills ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </motion.div>
            )}
          </div>

          {/* Right: Selected Skill Deep-Dive Inspector Card */}
          <div className="lg:col-span-4">
            <div className="hud-panel p-6 rounded-2xl border border-white/15 cyber-corners space-y-6 sticky top-28 bg-[#0b0b0f]/95">
              {/* Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono-tech font-bold uppercase mb-2">
                  <span>TELEMETRY INSPECTION</span>
                  <span className="text-[var(--accent-color)]">
                    {selectedSkill.category}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold font-hud tracking-wide text-white">
                  {selectedSkill.name}
                </h3>
              </div>

              {/* Proficiency Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-zinc-400">MASTERY COEFFICIENT</span>
                  <span className="text-white font-bold font-hud">
                    {selectedSkill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-[var(--accent-color)] rounded-full transition-all duration-500 shadow-[0_0_8px_var(--accent-glow)]"
                    style={{ width: `${selectedSkill.level}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 font-mono-tech uppercase">
                  SCOPE & ARCHITECTURAL APPLICATIONS
                </span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {selectedSkill.description}
                </p>
              </div>

              {/* Framework & Tool Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-500 font-mono-tech uppercase">
                  ASSOCIATED FRAMEWORKS & TOOLS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono-tech text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
