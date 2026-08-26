import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Star,
  GitFork,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';
import { PROJECTS_DATA } from '../../data/projects';
import { Project } from '../../types/portfolio';
import { fetchLiveGithubRepos, GithubRepoItem } from '../../services/githubSync';

export const ProjectsSection: React.FC = () => {
  const {
    setSelectedProject,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'FEATURED' | 'LIVE_GITHUB'>('FEATURED');
  const [liveRepos, setLiveRepos] = useState<GithubRepoItem[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live Synced');

  const loadGithubRepos = async () => {
    setIsLoadingRepos(true);
    soundEngine.playClick();
    const repos = await fetchLiveGithubRepos('devdatth-adik');
    setLiveRepos(repos);
    setIsLoadingRepos(false);
    setLastSyncTime(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
  };

  useEffect(() => {
    if (activeTab === 'LIVE_GITHUB' && liveRepos.length === 0) {
      loadGithubRepos();
    }
  }, [activeTab]);

  const handleOpenProject = (project: Project) => {
    soundEngine.playModalOpen();
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center select-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[var(--accent-color)] font-mono-tech text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)]" />
            <span>[04] REPOSITORY ARCHIVE & LIVE SYNC</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-hud tracking-tight text-white leading-tight">
                SELECTED
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-600">
                  PROJECTS
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono-tech max-w-md">
              Engineered architectures spanning autonomous multi-agent frameworks, scalable ML experimentation pipelines, Agritech AI, and enterprise desktop database platforms.
            </p>
          </div>
        </div>

        {/* Dynamic Project Mode Selector & Live Github Synchronizer */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <button
              id="tab-featured-projects"
              onClick={() => {
                soundEngine.playNavSwitch();
                setActiveTab('FEATURED');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-hud font-bold tracking-wider transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'FEATURED'
                  ? 'bg-[var(--accent-color)] text-black shadow-[0_0_12px_var(--accent-glow)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP ARCHITECTURES ({PROJECTS_DATA.length})</span>
            </button>

            <button
              id="tab-live-github-repos"
              onClick={() => {
                soundEngine.playNavSwitch();
                setActiveTab('LIVE_GITHUB');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-hud font-bold tracking-wider transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'LIVE_GITHUB'
                  ? 'bg-[var(--accent-color)] text-black shadow-[0_0_12px_var(--accent-glow)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>LIVE GITHUB FEED</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-300 font-mono-tech border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                AUTO-SYNC
              </span>
            </button>
          </div>

          {activeTab === 'LIVE_GITHUB' && (
            <div className="flex items-center space-x-3 text-xs font-mono-tech text-zinc-400 pr-2">
              <span className="hidden sm:inline">Last Sync: {lastSyncTime}</span>
              <button
                id="btn-manual-sync-github"
                onClick={loadGithubRepos}
                disabled={isLoadingRepos}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                title="Force refresh live repositories from GitHub API"
              >
                <RefreshCw
                  className={`w-3 h-3 text-[var(--accent-color)] ${isLoadingRepos ? 'animate-spin' : ''}`}
                />
                <span>SYNC NOW</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Featured Project Cards Showcase (2x2 Grid) */}
        {activeTab === 'FEATURED' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative hud-panel rounded-2xl p-6 sm:p-8 border border-white/10 cyber-corners overflow-hidden transition-all duration-300 hover:border-white/30 flex flex-col justify-between"
                onMouseEnter={() => {
                  setCursorVariant('project');
                  setCursorText('VIEW');
                  soundEngine.playHover();
                }}
                onMouseLeave={() => {
                  setCursorVariant('default');
                  setCursorText('');
                }}
              >
                {/* Top Number & Category Badges */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl sm:text-4xl font-extrabold font-hud text-zinc-600 group-hover:text-[var(--accent-color)] transition-colors">
                        {project.number}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-mono-tech font-bold tracking-widest uppercase">
                          {project.category}
                        </span>
                        <span className="text-xs font-bold text-zinc-300 font-mono-tech">
                          [{project.year}]
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 text-[10px] font-bold bg-white/5 border border-white/10 rounded-md text-emerald-400 font-mono-tech">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-hud tracking-wide text-white group-hover:text-glow transition-all">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--accent-color)] font-semibold font-mono-tech">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-1.5 mb-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono-tech text-xs">
                    {project.features.slice(0, 3).map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-zinc-400">
                        <span className="text-[var(--accent-color)] font-bold">›</span>
                        <span className="leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono-tech text-zinc-300 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    id={`btn-view-project-${project.id}`}
                    onClick={() => handleOpenProject(project)}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[var(--accent-color)] text-black text-xs font-bold font-hud uppercase flex items-center justify-center space-x-2 hover:brightness-110 transition-all cursor-pointer shadow-md"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    id={`btn-github-${project.id}`}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white bg-black/40 transition-colors flex items-center justify-center"
                    title="View GitHub Source"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Live GitHub Repository Feed (Auto-Synced via GitHub API) */}
        {activeTab === 'LIVE_GITHUB' && (
          <div className="space-y-6">
            {isLoadingRepos ? (
              <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10">
                <RefreshCw className="w-8 h-8 text-[var(--accent-color)] animate-spin mx-auto mb-3" />
                <p className="font-hud text-sm text-white font-bold">CONTACTING GITHUB REST API ENGINE...</p>
                <p className="text-xs text-zinc-400 font-mono-tech mt-1">Retrieving latest repositories from @devdatth-adik</p>
              </div>
            ) : liveRepos.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10">
                <p className="font-hud text-sm text-white font-bold">No public repositories fetched.</p>
                <button
                  onClick={loadGithubRepos}
                  className="mt-4 px-4 py-2 rounded-lg bg-[var(--accent-color)] text-black font-bold text-xs"
                >
                  RETRY SYNC
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveRepos.map((repo) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-xl border border-white/10 bg-black/40 hover:border-[var(--accent-color)]/60 transition-all flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-tech mb-2">
                        <span className="text-[var(--accent-color)] font-bold truncate max-w-[150px]">
                          {repo.language || 'Codebase'}
                        </span>
                        <div className="flex items-center space-x-2 text-zinc-400">
                          <span className="flex items-center space-x-0.5">
                            <Star className="w-3 h-3 text-amber-400" />
                            <span>{repo.stargazers_count}</span>
                          </span>
                          <span className="flex items-center space-x-0.5">
                            <GitFork className="w-3 h-3 text-zinc-400" />
                            <span>{repo.forks_count}</span>
                          </span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold font-hud text-white group-hover:text-[var(--accent-color)] transition-colors mb-2 truncate">
                        {repo.name}
                      </h4>

                      <p className="text-xs text-zinc-300 line-clamp-3 mb-4 leading-relaxed font-sans">
                        {repo.description ||
                          'Public GitHub repository maintaining production algorithms and system pipelines.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-mono-tech text-zinc-500">
                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-hud font-bold text-[var(--accent-color)] hover:underline"
                      >
                        <span>VIEW REPO</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
