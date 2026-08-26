import { SkillItem } from '../types/portfolio';

export const SKILLS_CATEGORIES = [
  'ALL',
  'CLOUD & DEVOPS',
  'AI / DATA',
  'LANGUAGES',
  'FRONTEND',
  'BACKEND',
  'TOOLS'
] as const;

export const SKILLS_DATA: SkillItem[] = [
  // CLOUD & DEVOPS / TOP SPECIALIZATIONS
  {
    name: 'CI/CD Pipelines',
    category: 'CLOUD & DEVOPS',
    level: 93,
    description: 'Automated continuous integration and delivery pipelines, multi-stage testing, automated builds, artifact publishing, and zero-downtime rollouts.',
    tags: ['GitHub Actions', 'Automated Testing', 'Docker Buildx', 'Continuous Deployment'],
    featured: true
  },
  {
    name: 'Amazon Web Services (AWS)',
    category: 'CLOUD & DEVOPS',
    level: 91,
    description: 'Cloud infrastructure provisioning, serverless computing, storage architectures, IAM security policies, and scalable cloud deployments.',
    tags: ['EC2', 'S3', 'Lambda', 'ECS', 'CloudWatch', 'IAM'],
    featured: true
  },
  {
    name: 'Kubernetes',
    category: 'CLOUD & DEVOPS',
    level: 89,
    description: 'Container orchestration, declarative manifests, service discovery, pod auto-scaling, ingress controllers, and resilient cluster management.',
    tags: ['K8s', 'Pods', 'Deployments', 'Ingress', 'Helm', 'Horizontal Pod Autoscaling'],
    featured: true
  },

  // AI / DATA
  {
    name: 'AI Agents',
    category: 'AI / DATA',
    level: 95,
    description: 'Multi-agent orchestration, dynamic tool selection, memory systems, autonomous reflection and execution loops.',
    tags: ['AgentForge', 'Tool Registry', 'State Machines', 'ReAct Pattern'],
    featured: true
  },
  {
    name: 'PyTorch',
    category: 'AI / DATA',
    level: 93,
    description: 'Deep neural networks, autograd mechanics, tensor operations, custom training loops, model fine-tuning, and GPU-accelerated computing.',
    tags: ['PyTorch', 'Torchvision', 'Autograd', 'CUDA', 'Neural Nets'],
    featured: true
  },
  {
    name: 'TensorFlow',
    category: 'AI / DATA',
    level: 88,
    description: 'Deep learning model graph execution, Keras neural architecture modeling, model quantization, and production inference optimization.',
    tags: ['TensorFlow', 'Keras', 'TensorBoard', 'TFLite', 'Inference'],
    featured: true
  },
  {
    name: 'Scikit-learn',
    category: 'AI / DATA',
    level: 92,
    description: 'Statistical machine learning algorithms, ensemble methods, dimensional reduction, hyperparameter cross-validation, and feature pipelines.',
    tags: ['Scikit-Learn', 'Ensemble Models', 'Classification', 'PCA', 'GridSearch'],
    featured: true
  },
  {
    name: 'GCP Vertex AI',
    category: 'AI / DATA',
    level: 90,
    description: 'Enterprise cloud AI orchestration, managed model training, endpoint deployment, foundation model tuning, and generative AI search pipelines on Google Cloud.',
    tags: ['Vertex AI', 'Google Cloud', 'Model Registry', 'Endpoint Deployment', 'Gemini APIs'],
    featured: true
  },
  {
    name: 'Machine Learning',
    category: 'AI / DATA',
    level: 90,
    description: 'Supervised & unsupervised learning, classification, regression, model training workflows, and evaluation metrics.',
    tags: ['Scikit-Learn', 'PyTorch', 'Data Preprocessing', 'Model Tuning'],
    featured: true
  },
  {
    name: 'LLM Applications',
    category: 'AI / DATA',
    level: 92,
    description: 'Context orchestration, structured output generation, RAG architecture, semantic search, and streaming interfaces.',
    tags: ['Gemini', 'OpenAI', 'LangChain', 'Function Calling'],
    featured: true
  },
  {
    name: 'Data Analysis',
    category: 'AI / DATA',
    level: 88,
    description: 'Exploratory data analysis, statistical modeling, feature engineering, and high-density visualization pipelines.',
    tags: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL'],
    featured: true
  },
  {
    name: 'Prompt Engineering',
    category: 'AI / DATA',
    level: 94,
    description: 'Few-shot prompting, chain-of-thought decomposition, system instructions, and schema-constrained extraction.',
    tags: ['CoT', 'Structured Outputs', 'System Calibration'],
    featured: false
  },

  // LANGUAGES
  {
    name: 'Python',
    category: 'LANGUAGES',
    level: 96,
    description: 'Primary language for AI agent engines, machine learning pipelines, backend services, and automation scripts.',
    tags: ['FastAPI', 'Django', 'PyTorch', 'NumPy', 'AsyncIO'],
    featured: true
  },
  {
    name: 'Java',
    category: 'LANGUAGES',
    level: 89,
    description: 'Object-oriented software architecture, enterprise systems, multithreading, and robust backend engineering.',
    tags: ['Spring Boot', 'Java Swing', 'JDBC', 'OOP', 'Data Structures'],
    featured: true
  },
  {
    name: 'JavaScript / TypeScript',
    category: 'LANGUAGES',
    level: 91,
    description: 'Modern ES6+, strict type safety, asynchronous patterns, reactive state management, and 3D WebGL interfaces.',
    tags: ['React', 'TypeScript', 'Node.js', 'Three.js'],
    featured: true
  },
  {
    name: 'SQL',
    category: 'LANGUAGES',
    level: 90,
    description: 'Complex querying, indexing, normalized schema design, joins, stored procedures, and performance optimization.',
    tags: ['MySQL', 'PostgreSQL', 'Query Tuning', 'Relational Modeling'],
    featured: true
  },

  // FRONTEND
  {
    name: 'React',
    category: 'FRONTEND',
    level: 94,
    description: 'Component architecture, custom hooks, context state management, performance optimization, and WebGL integration.',
    tags: ['Hooks', 'Context API', 'Three.js / R3F', 'Framer Motion'],
    featured: true
  },
  {
    name: 'Next.js',
    category: 'FRONTEND',
    level: 88,
    description: 'Server-side rendering, App router, API route handlers, static site generation, and optimized web performance.',
    tags: ['App Router', 'SSR / SSG', 'API Routes', 'Vercel Deployment'],
    featured: true
  },
  {
    name: 'Tailwind CSS',
    category: 'FRONTEND',
    level: 96,
    description: 'High-speed utility-first design, custom design tokens, responsive breakpoints, and dark mode UI systems.',
    tags: ['Tailwind v4', 'Custom Themes', 'Responsive Design'],
    featured: true
  },
  {
    name: 'HTML5 / CSS3',
    category: 'FRONTEND',
    level: 95,
    description: 'Semantic markup, modern CSS grid & flexbox, keyframe animations, glassmorphism, and accessibility (a11y).',
    tags: ['Semantic HTML', 'CSS Grid', 'Keyframes', 'Animations'],
    featured: false
  },

  // BACKEND
  {
    name: 'Django',
    category: 'BACKEND',
    level: 90,
    description: 'Rapid full-stack backend development, ORM modeling, secure authentication, and administrative portals.',
    tags: ['Django ORM', 'Django REST Framework', 'Admin Engine', 'PostgreSQL'],
    featured: true
  },
  {
    name: 'Spring Boot',
    category: 'BACKEND',
    level: 85,
    description: 'Enterprise Java microservices, dependency injection, JPA/Hibernate repository patterns, and REST controllers.',
    tags: ['Spring MVC', 'Spring Data JPA', 'RESTful Services', 'Maven'],
    featured: true
  },
  {
    name: 'REST APIs',
    category: 'BACKEND',
    level: 93,
    description: 'Contract-first API design, JSON payload validation, JWT authentication, rate limiting, and documentation.',
    tags: ['OpenAPI / Swagger', 'FastAPI', 'Express', 'Status Codes'],
    featured: true
  },
  {
    name: 'SQL Databases & MySQL',
    category: 'BACKEND',
    level: 91,
    description: 'ACID transactions, relational constraint modeling, foreign keys, JDBC connectivity, and data persistence.',
    tags: ['MySQL Workbench', 'PostgreSQL', 'Connection Pooling'],
    featured: true
  },

  // TOOLS
  {
    name: 'Git & GitHub',
    category: 'TOOLS',
    level: 94,
    description: 'Version control workflows, branch strategies, collaborative PR reviews, and automated release workflows.',
    tags: ['Git CLI', 'GitHub Workflows', 'Rebase', 'Semantic Commits'],
    featured: true
  },
  {
    name: 'Docker & Containers',
    category: 'TOOLS',
    level: 90,
    description: 'Containerization of applications, Dockerfile multi-stage builds, container networks, and reproducible deployments.',
    tags: ['Containers', 'Docker Compose', 'Image Optimization', 'Registry'],
    featured: true
  },
  {
    name: 'Linux / Unix CLI',
    category: 'TOOLS',
    level: 92,
    description: 'POSIX shell scripting, system performance profiling, process management, and remote server administration.',
    tags: ['Bash', 'SSH', 'Systemd', 'Server Admin'],
    featured: true
  }
];
