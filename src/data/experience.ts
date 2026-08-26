import { ExperienceEntry } from '../types/portfolio';

export const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    id: 'microai-freelance',
    role: 'AI ENGINEER (FREELANCE)',
    company: 'MicroAI',
    type: 'FREELANCE / CONTRACT',
    period: 'JUNE 2026 – PRESENT (3 MONTHS)',
    durationBadge: 'ACTIVE / 3 MONTHS',
    location: 'Remote / Pune, India',
    summary: 'Working with MicroAI as a Freelance AI Engineer for the last 3 months (since June 2026), architecting and deploying autonomous agent frameworks, fine-tuning task-specific LLMs, and engineering low-latency cognitive pipelines.',
    responsibilities: [
      'Architecting and deploying autonomous AI agent systems featuring dynamic tool registry and self-evaluating loops',
      'Engineering low-latency hybrid RAG retrieval pipelines using ChromaDB, pgvector, and FastAPI microservices',
      'Establishing automated CI/CD deployment pipelines on AWS infrastructure with containerized Kubernetes orchestration',
      'Fine-tuning and prompt-optimizing domain-specific large language models for production client workflows',
      'Designing scalable Python & TypeScript integration layers bridging machine learning services with customer-facing web apps'
    ],
    achievements: [
      'Delivered 3 autonomous agent workflows handling complex multi-step reasoning and automated API tool dispatching',
      'Deployed production workloads on Amazon Web Services (AWS) using Kubernetes (EKS) clusters with automated CI/CD testing',
      'Reduced client ML inference and response latency by 45% through optimized asynchronous caching & query batching',
      'Built robust vector search systems indexing enterprise knowledge bases with high precision and recall',
      'Seamlessly integrated MicroAI cognitive computing models into live production applications'
    ],
    skills: [
      'CI/CD Pipelines',
      'Amazon Web Services (AWS)',
      'Kubernetes',
      'AI Agents',
      'LLM Fine-Tuning',
      'RAG Pipelines',
      'Python',
      'FastAPI',
      'Docker',
      'ChromaDB',
      'pgvector',
      'React'
    ],
    status: 'ACTIVE'
  },
  {
    id: 'independent-ai-dev',
    role: 'AI & FULL STACK DEVELOPER (INDEPENDENT)',
    company: 'Open Source & Dev Labs',
    type: 'INDEPENDENT / LABS',
    period: '2025 – PRESENT',
    durationBadge: 'ONGOING',
    location: 'Pune, India',
    summary: 'Architecting experimental machine learning platforms, full-stack enterprise desktop and web solutions, and modern interactive digital systems.',
    responsibilities: [
      'Developed AgentForge: A modular autonomous AI agent system with dynamic tool introspection and safety boundaries',
      'Engineered Project Dynamo: A reproducible ML experimentation workflow, hyperparameter tracking, and evaluation suite',
      'Designed and shipped practical desktop logistics systems and AI-powered agricultural advisory tools'
    ],
    achievements: [
      'Engineered complete end-to-end full stack platforms with Django, Spring Boot, MySQL, and React',
      'Implemented real-time 3D WebGL / Three.js data visualization interfaces with high frame rate performance'
    ],
    skills: [
      'Machine Learning',
      'PyTorch',
      'Django',
      'Spring Boot',
      'TypeScript',
      'Three.js',
      'MySQL',
      'REST APIs'
    ],
    status: 'ACTIVE'
  },
  {
    id: 'academic-ai-scholar',
    role: 'AI & DATA SCIENCE SCHOLAR',
    company: 'D.Y. Patil International University',
    type: 'ACADEMIC B.TECH',
    period: '2023 – 2027 (EXPECTED)',
    durationBadge: 'B.TECH IN PROGRESS',
    location: 'Pune, Maharashtra, India',
    summary: 'Pursuing Bachelor of Technology in Artificial Intelligence & Data Science with focus on algorithms, statistical machine learning, neural networks, and scalable software systems.',
    responsibilities: [
      'Rigorous academic coursework in Data Structures, Advanced Algorithms, Database Management, and Operating Systems',
      'Applied research in computer vision, natural language processing, and deep learning architectures',
      'Active leadership in technical hackathons, algorithmic coding challenges, and open-source project initiatives'
    ],
    achievements: [
      'Consistent top academic performance across core computer science and AI specialization tracks',
      'Published and presented research-backed engineering implementations for applied computing projects'
    ],
    skills: [
      'Data Structures',
      'Algorithms',
      'Machine Learning Math',
      'Linear Algebra',
      'Deep Learning',
      'Software Engineering'
    ],
    status: 'ACTIVE'
  }
];
