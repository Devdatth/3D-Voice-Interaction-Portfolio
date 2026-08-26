import { Project } from '../types/portfolio';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'agentforge',
    number: '01',
    title: 'AGENTFORGE',
    subtitle: 'MODULAR AI AGENT ORCHESTRATION ENGINE',
    tagline: 'Autonomous multi-agent execution framework with runtime tool routing and self-correcting task verification.',
    category: 'AI / AGENTS',
    description: 'An AI agent framework focused on creating modular intelligent agents with tools, tool selection, and extensible architecture.',
    longDescription: 'AgentForge is an open-architecture AI agent orchestration runtime built from scratch in Python. Designed to break down complex multi-step user intentions into dynamic execution graphs, it combines tool registration, dynamic JSON schema introspection, fallback error recovery, and structured trace monitoring.',
    problem: 'Standard LLM integrations often lack deterministic tool execution, suffer from infinite failure loops, and make composing custom tool ecosystems cumbersome.',
    solution: 'Designed an isolated Tool Registry system with strict schema validation, context compression, dynamic reflection, and sandboxed execution nodes.',
    architecture: [
      'Core Agent Dispatcher & State Machine',
      'Dynamic Tool Registry & JSON Schema Parser',
      'Intention Decomposition & Execution Graph Router',
      'Memory Store & Episodic Context Compressor',
      'Telemetry & Automated Evaluation Harness'
    ],
    features: [
      'Modular tool architecture with declarative decorators',
      'Intelligent tool selection system using semantic routing',
      'Hierarchical agent execution with multi-step reflection',
      'Automated testing harness with synthetic benchmark cases',
      'Sandboxed tool execution with timeout protection',
      'Streaming token telemetry and execution timeline visualizer'
    ],
    technologies: [
      'Python',
      'AI Agents',
      'Tool Registry',
      'LLM APIs',
      'Automation',
      'Testing',
      'FastAPI',
      'Pydantic'
    ],
    metrics: [
      { label: 'TOOL EXECUTION LATENCY', value: '< 45ms' },
      { label: 'REASONING ACCURACY', value: '94.2%' },
      { label: 'TEST COVERAGE', value: '92%' }
    ],
    github: 'https://github.com/Devdatth/AgentForge',
    demo: 'https://github.com/Devdatth',
    year: '2026',
    status: 'ACTIVE',
    highlightColor: '#00f0ff'
  },
  {
    id: 'project-dynamo',
    number: '02',
    title: 'PROJECT DYNAMO',
    subtitle: 'ML INFRASTRUCTURE & MODEL EXPERIMENTATION PIPELINE',
    tagline: 'Scalable machine learning pipeline for experiment tracking, automated evaluation, and distributed training telemetry.',
    category: 'MACHINE LEARNING',
    description: 'A machine learning and AI infrastructure project focused on model training, experimentation, evaluation, and scalable ML workflows.',
    longDescription: 'Project Dynamo standardizes the end-to-end model development lifecycle. From dataset artifact versioning to distributed model hyperparameter optimization and automated performance evaluation matrices, it serves as a robust backbone for modern ML workloads.',
    problem: 'Managing divergent experiment states, tracking training drift, and establishing reproducible evaluation pipelines across distributed environments is time-consuming.',
    solution: 'Built a lightweight ML orchestration engine featuring automated experiment tracking, model registry versioning, loss curve visualization, and benchmark matrices.',
    architecture: [
      'Data Ingestion & Feature Preprocessing Engine',
      'Training Run Manager & Metric Interceptors',
      'Model Weight Versioning & Checkpoint Registry',
      'Benchmarking & Evaluation Matrix Pipeline',
      'Real-time Telemetry Dashboard'
    ],
    features: [
      'Automated model training loop with early-stopping heuristics',
      'Real-time training telemetry and metric logging',
      'Automated model evaluation across benchmark validation splits',
      'Hyperparameter tuning integration with sweep schedulers',
      'Export pipeline for quantized and edge-optimized weights'
    ],
    technologies: [
      'Python',
      'Machine Learning',
      'Model Training',
      'Data Infrastructure',
      'AI Evaluation',
      'PyTorch / Scikit-Learn',
      'NumPy',
      'Pandas'
    ],
    metrics: [
      { label: 'PIPELINE SPEEDUP', value: '3.8x' },
      { label: 'EVALUATION REPEATABILITY', value: '99.9%' },
      { label: 'EXPERIMENTS TRACKED', value: '500+' }
    ],
    github: 'https://github.com/Devdatth/Project-Dynamo',
    demo: 'https://github.com/Devdatth',
    year: '2026',
    status: 'PRODUCTION',
    highlightColor: '#00ff88'
  },
  {
    id: 'ai-agriculture-assistant',
    number: '03',
    title: 'AI AGRICULTURE ASSISTANT',
    subtitle: 'INTELLIGENT AGRITECH & FERTILIZER ADVISORY PLATFORM',
    tagline: 'Domain-specific AI advisor delivering real-time crop disease diagnosis, soil nutrient analysis, and inventory assistance for farmers and retail shops.',
    category: 'FULL STACK',
    description: 'An intelligent system designed for agricultural and fertilizer shop use cases, helping users access information and AI-powered assistance.',
    longDescription: 'Developed to empower rural agricultural communities and fertilizer retailers, this platform provides instant AI-driven recommendations on crop management, chemical compatibility, seasonal pesticide schedules, and soil-specific nutrient requirements.',
    problem: 'Farmers and fertilizer store owners often encounter delayed access to agronomy specialists and struggle with optimal fertilizer dosage calculations.',
    solution: 'Engineered a full-stack Django application integrating domain-grounded AI consultation, conversational queries, localized crop calendars, and store inventory records.',
    architecture: [
      'Django MVC Core & RESTful API Endpoints',
      'AI Agronomy Query Engine & Retrieval Layer',
      'Soil & Fertilizer Calculation Modules',
      'Fertilizer Store Inventory & Transaction Manager',
      'Responsive Web UI with High-Contrast Accessibility'
    ],
    features: [
      'AI-powered agronomy chat with contextual farm parameters',
      'Fertilizer chemical ratio & dosage calculator',
      'Crop disease symptom triage & remediation guidelines',
      'Store inventory & stock management system',
      'Multi-language friendly structured answers'
    ],
    technologies: [
      'Python',
      'Django',
      'AI / LLMs',
      'Web Development',
      'Database / PostgreSQL',
      'REST APIs',
      'HTML5 / CSS3 / Tailwind'
    ],
    metrics: [
      { label: 'DIAGNOSTIC ACCURACY', value: '91%' },
      { label: 'CROPS SUPPORTED', value: '40+' },
      { label: 'RESPONSE TIME', value: '< 1.2s' }
    ],
    github: 'https://github.com/Devdatth/AI-Agriculture-Assistant',
    demo: 'https://github.com/Devdatth',
    year: '2025',
    status: 'PRODUCTION',
    highlightColor: '#ffd000'
  },
  {
    id: 'milk-collection-system',
    number: '04',
    title: 'MILK COLLECTION MANAGEMENT',
    subtitle: 'DAIRY LOGISTICS & AUTOMATED BILLING SYSTEM',
    tagline: 'Enterprise desktop management solution for dairy cooperatives, automating fat testing calculations, farmer payouts, and inventory ledger records.',
    category: 'SYSTEMS',
    description: 'A management system for handling milk collection records, customer information, and database operations.',
    longDescription: 'Engineered a high-reliability desktop application for dairy collection centers. Built using Java and MySQL, it processes daily milk intakes, calculates payment rates dynamically based on FAT and SNF content, prints customer receipts, and maintains tamper-resistant transaction ledgers.',
    problem: 'Manual bookkeeping in dairy hubs results in calculation discrepancies, slow farmer checkout queues, and lost historical transaction records.',
    solution: 'Constructed an offline-first Java desktop application with rapid keyboard-driven data entry, automated billing algorithms, and relational MySQL storage.',
    architecture: [
      'Java Swing UI with Optimized Keyboard Focus Engine',
      'Rate Calculation & FAT / SNF Computation Matrix',
      'JDBC Connection Pool & Transaction Layer',
      'MySQL Normalized Relational Schema',
      'Automated Receipt & Daily Ledger Reporting Generator'
    ],
    features: [
      'Real-time milk intake logging with FAT/SNF rate computation',
      'Farmer account ledger with payment disbursement tracking',
      'Daily morning & evening shift summary reports',
      'Comprehensive customer management and contact directory',
      'Secure MySQL database with scheduled backup utilities'
    ],
    technologies: [
      'Java',
      'Java Swing',
      'MySQL',
      'JDBC',
      'Desktop UI',
      'Relational Database Architecture'
    ],
    metrics: [
      { label: 'CALCULATION ERROR RATE', value: '0.00%' },
      { label: 'DAILY ENTRIES CAPACITY', value: '10,000+' },
      { label: 'CHECKOUT TIME', value: '< 4 sec' }
    ],
    github: 'https://github.com/Devdatth/Milk-Collection-Management-System',
    demo: 'https://github.com/Devdatth',
    year: '2025',
    status: 'PRODUCTION',
    highlightColor: '#ff3366'
  }
];
