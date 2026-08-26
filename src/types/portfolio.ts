export type ThemeColor = 'white' | 'cyan' | 'green' | 'yellow' | 'red';
export type AudioMode = 'off' | 'ambient' | 'digital';
export type PerformanceTier = 'high' | 'medium' | 'saver';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'AI / AGENTS' | 'MACHINE LEARNING' | 'FULL STACK' | 'SYSTEMS';
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  github: string;
  demo?: string;
  year: string;
  status: 'ACTIVE' | 'PRODUCTION' | 'LAB_STAGE' | 'ARCHIVED';
  highlightColor?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: 'CLOUD & DEVOPS' | 'AI / DATA' | 'LANGUAGES' | 'FRONTEND' | 'BACKEND' | 'TOOLS';
  iconName?: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  type: string; // 'FREELANCE' | 'FULL-TIME' | 'INTERNSHIP' | 'INDEPENDENT'
  period: string; // 'JUNE 2026 – PRESENT (3 MONTHS)'
  durationBadge: string; // 'CURRENT / 3 MONTHS'
  location: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  skills: string[];
  status: 'ACTIVE' | 'COMPLETED';
}

export interface TimelineEntry {
  year: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  milestones: string[];
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PROJECTED';
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SYS' | 'AI' | 'RENDER';
  message: string;
}
