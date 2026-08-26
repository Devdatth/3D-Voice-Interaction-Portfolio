import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, CheckCircle2, GraduationCap, Briefcase, Code, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';
import { DEVELOPER_INFO } from '../../data/systemInfo';

export const ResumeModal: React.FC = () => {
  const {
    isResumeOpen,
    setIsResumeOpen,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  if (!isResumeOpen) return null;

  const handleClose = () => {
    soundEngine.playClick();
    setIsResumeOpen(false);
  };

  const handleDownload = () => {
    soundEngine.playSuccess();
    // Generate text dossier download
    const resumeText = `
DEVDATTH ADIK
AI & Data Science Engineer | Full Stack Developer | Freelancer
Location: Pune, Maharashtra, India
Email: ${DEVELOPER_INFO.contacts.email}
GitHub: ${DEVELOPER_INFO.contacts.github}
LinkedIn: ${DEVELOPER_INFO.contacts.linkedin}

PROFESSIONAL EXPERIENCE:
- AI Engineer (Freelance) | MicroAI (June 2026 – Present | 3 Months)
  * Working with MicroAI as Freelance AI Engineer developing production-grade autonomous agent systems and tool loops.
  * Engineered low-latency vector retrieval & hybrid RAG pipelines using ChromaDB, pgvector, and FastAPI.
  * Optimized asynchronous ML inference microservices, reducing response latency by 45%.
  * Fine-tuned task-specific LLMs and integrated cognitive reasoning APIs into customer-facing applications.

EDUCATION:
B.Tech in Artificial Intelligence & Data Science
Expected Graduation: 2027

CORE COMPETENCIES:
- Languages: Python, Java, JavaScript, TypeScript, SQL
- AI / Data: AI Agents, PyTorch, TensorFlow, Scikit-learn, GCP Vertex AI, Machine Learning, LLMs, RAG Pipelines, Prompt Engineering
- Cloud & DevOps: Continuous Integration and Continuous Delivery (CI/CD), Amazon Web Services (AWS), Kubernetes, Docker
- Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS, Three.js
- Backend: Django, Spring Boot, FastAPI, REST APIs, MySQL, PostgreSQL
- Tools: Git, GitHub, Linux / Unix CLI

KEY PROJECTS:
1. AGENTFORGE: Autonomous AI Agent Framework with dynamic tool registry and evaluation loops.
2. PROJECT DYNAMO: Scalable ML experiment tracking, hyperparameter sweep, and evaluation pipeline.
3. AI AGRICULTURE ASSISTANT: Agritech advisory and fertilizer management platform in Django.
4. MILK COLLECTION MANAGEMENT SYSTEM: High-throughput Java Swing & MySQL cooperative ledger system.
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Devdatth_Adik_AI_Engineer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl select-none font-mono-tech overflow-y-auto">
        <div className="fixed inset-0" onClick={handleClose} />

        <motion.div
          id="resume-modal-window"
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl hud-panel rounded-2xl p-6 sm:p-8 border border-white/20 cyber-corners shadow-2xl relative z-10 bg-[#09090d]/95 my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-[var(--accent-color)] text-xs mb-1">
                <FileText className="w-4 h-4" />
                <span className="font-bold tracking-widest uppercase font-hud">
                  TECHNICAL DOSSIER // CURRICULUM VITAE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-hud tracking-wide text-white">
                DEVDATTH ADIK
              </h2>
              <p className="text-xs text-zinc-400">
                AI & Data Science Engineer • Full Stack Developer • Freelancer
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-[var(--accent-color)] text-black text-xs font-bold font-hud uppercase flex items-center space-x-1.5 hover:brightness-110 transition-all cursor-pointer shadow-lg"
                onMouseEnter={() => {
                  setCursorVariant('pointer');
                  setCursorText('DOWNLOAD');
                  soundEngine.playHover();
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setCursorText('');
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">EXPORT DOSSIER</span>
              </button>

              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dossier Content */}
          <div className="space-y-6 text-xs text-zinc-300">
            {/* Summary & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center space-x-2 text-[var(--accent-color)] mb-2 font-bold font-hud uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>ACADEMIC FOUNDATION</span>
                </div>
                <p className="font-bold text-white text-sm">
                  {DEVELOPER_INFO.education.degree}
                </p>
                <p className="text-zinc-400 mt-1">Expected Graduation: 2027</p>
                <p className="text-zinc-500 text-[11px] flex items-center space-x-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>Pune, Maharashtra, India</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center space-x-2 text-emerald-400 mb-2 font-bold font-hud uppercase">
                  <Briefcase className="w-4 h-4" />
                  <span>CURRENT STATUS</span>
                </div>
                <p className="font-bold text-white text-sm">
                  OPEN TO OPPORTUNITIES
                </p>
                <p className="text-zinc-400 mt-1">
                  Target Roles: AI Engineer, Machine Learning Engineer, Full Stack Developer
                </p>
                <p className="text-zinc-500 text-[11px] mt-1">
                  Available for full-time & research initiatives
                </p>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex items-center space-x-2 text-zinc-200 font-bold font-hud uppercase">
                <Briefcase className="w-4 h-4 text-[var(--accent-color)]" />
                <span>PROFESSIONAL FREELANCE EXPERIENCE</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex flex-wrap justify-between items-baseline gap-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">AI Engineer (Freelance)</span>
                    <span className="text-zinc-600">@</span>
                    <span className="font-bold text-[var(--accent-color)] font-hud">MICROAI</span>
                  </div>
                  <span className="text-[10px] text-[var(--accent-color)] font-mono-tech font-bold">JUNE 2026 – PRESENT (3 MONTHS)</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Architecting autonomous AI agent frameworks, fine-tuning task-specific LLMs, and building low-latency RAG vector pipelines with sub-100ms response times for client platforms.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Autonomous Agents', 'LLM Fine-Tuning', 'RAG Pipelines', 'Vector Databases', 'FastAPI'].map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <div className="flex items-center space-x-2 text-zinc-200 mb-3 font-bold font-hud uppercase">
                <Code className="w-4 h-4 text-[var(--accent-color)]" />
                <span>PRIMARY TECHNICAL ARSENAL</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-zinc-400">
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">
                    AI & DATA
                  </span>
                  <p className="text-zinc-300">
                    PyTorch, TensorFlow, Scikit-learn, GCP Vertex AI, AI Agents, LLM Apps, RAG
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">
                    LANGUAGES & FULL STACK
                  </span>
                  <p className="text-zinc-300">
                    Python, Java, JavaScript, SQL, React, Next.js, Django, Spring Boot
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">
                    SYSTEMS & TOOLS
                  </span>
                  <p className="text-zinc-300">
                    MySQL, Docker, REST APIs, Git, GitHub, Three.js / WebGL
                  </p>
                </div>
              </div>
            </div>

            {/* Key Project Highlights */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
              <h3 className="text-xs font-bold text-white font-hud uppercase tracking-wider">
                FEATURED PRODUCTION PROJECTS
              </h3>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-white">AgentForge</span>
                    <span className="text-[10px] text-[var(--accent-color)]">Python • AI Agents • Tool Registry</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">
                    Autonomous agent framework with runtime tool routing and self-correcting task verification loops.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-white">Project Dynamo</span>
                    <span className="text-[10px] text-emerald-400">Python • ML Pipelines • Evaluation</span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">
                    Scalable ML experimentation architecture with automated metrics tracking and model weight registry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
