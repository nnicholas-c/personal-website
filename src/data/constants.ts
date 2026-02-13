// Skills and experience data
export enum SkillNames {
  PYTHON = "python",
  JS = "js",
  JAVA = "java",
  CPP = "cpp",
  SQL = "sql",
  CSHARP = "csharp",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  FLASK = "flask",
  MYSQL = "mysql",
  PYTORCH = "pytorch",
  SKLEARN = "sklearn",
  NUMPY = "numpy",
  PANDAS = "pandas",
  GIT = "git",
  BASH = "bash",
  DOCKER = "docker",
  POSTGRES = "postgres",
  FIREBASE = "firebase",
  GITHUB = "github",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PYTHON]: {
    id: 1,
    name: "python",
    label: "Python",
    shortDescription: "from ML pipelines to ETL jobs — Python does it all ��",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.JS]: {
    id: 2,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯�",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.JAVA]: {
    id: 3,
    name: "java",
    label: "Java",
    shortDescription: "write once, run anywhere — OOP at its finest ☕�",
    color: "#ED8B00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  [SkillNames.CPP]: {
    id: 4,
    name: "cpp",
    label: "C++",
    shortDescription: "low-level power meets high-level headaches 🏎️⚡",
    color: "#00599C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  [SkillNames.SQL]: {
    id: 5,
    name: "sql",
    label: "SQL",
    shortDescription: "SELECT * FROM skills WHERE power = 'maximum' 🗄️🔍",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.CSHARP]: {
    id: 6,
    name: "csharp",
    label: "C#",
    shortDescription: "Microsoft's finest — versatile and powerful 🎯�",
    color: "#239120",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  [SkillNames.TS]: {
    id: 7,
    name: "ts",
    label: "TypeScript",
    shortDescription: "JavaScript's overachieving cousin who's always flexing ��",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  [SkillNames.HTML]: {
    id: 8,
    name: "html",
    label: "HTML",
    shortDescription: "the backbone of the web, still going strong �🔥",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  [SkillNames.CSS]: {
    id: 9,
    name: "css",
    label: "CSS",
    shortDescription: "styling with the ultimate drip, no cap �‍♂️🎨",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  [SkillNames.REACT]: {
    id: 10,
    name: "react",
    label: "React",
    shortDescription: "component-based UIs that just hit different ⚛️✨",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  [SkillNames.FLASK]: {
    id: 11,
    name: "flask",
    label: "Flask",
    shortDescription: "lightweight Python web framework — simple and deadly 🧪�",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  [SkillNames.MYSQL]: {
    id: 12,
    name: "mysql",
    label: "MySQL",
    shortDescription: "relational databases done right, no drama 🐬�",
    color: "#4479A1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  [SkillNames.PYTORCH]: {
    id: 13,
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "tensors go brrrr — deep learning's weapon of choice �🧠",
    color: "#EE4C2C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  [SkillNames.SKLEARN]: {
    id: 14,
    name: "sklearn",
    label: "scikit-learn",
    shortDescription: "ML made accessible — from PCA to Random Forests 🌲📈",
    color: "#F7931E",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  },
  [SkillNames.NUMPY]: {
    id: 15,
    name: "numpy",
    label: "NumPy",
    shortDescription: "numerical computing at warp speed, respectfully �⚡",
    color: "#013243",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  [SkillNames.PANDAS]: {
    id: 16,
    name: "pandas",
    label: "Pandas",
    shortDescription: "DataFrames that make data wrangling a vibe ��",
    color: "#150458",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  [SkillNames.GIT]: {
    id: 17,
    name: "git",
    label: "Git",
    shortDescription: "version control that keeps the chaos in check �️‍♂️🔄",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.BASH]: {
    id: 18,
    name: "bash",
    label: "Bash",
    shortDescription: "command line wizardry — piping and scripting all day 🧙‍♂️�",
    color: "#4EAA25",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 19,
    name: "docker",
    label: "Docker",
    shortDescription: "containerize everything, deploy anywhere 🐳🔥",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 20,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "the elephant in the room — robust and reliable ��",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 21,
    name: "firebase",
    label: "Firebase",
    shortDescription: "auth, realtime DB, hosting — Google's all-in-one 🔥👌",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  [SkillNames.GITHUB]: {
    id: 22,
    name: "github",
    label: "GitHub",
    shortDescription: "where code lives, PRs flow, and stars shine �⭐",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Sep 2025",
    endDate: "Present",
    title: "AI/Game Development Engineer",
    company: "UC Berkeley Operations & Behavioral Analytics Lab",
    description: [
      "Modeled sequential decision-making under uncertainty using Deep Q-Networks (DQN) with reward shaping, experience replay, and target networks.",
      "Built an experiment-grade simulation platform in SvelteKit with Firebase for collecting event-level trajectories and behavioral analysis.",
      "Quantified behavioral effects in human–agent interaction data using controlled comparisons and uncertainty estimates; presented at Stanford and CMU.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.PYTORCH,
      SkillNames.JS,
      SkillNames.TS,
      SkillNames.FIREBASE,
    ],
  },
  {
    id: 2,
    startDate: "Oct 2025",
    endDate: "Oct 2025",
    title: "Full-Stack Engineer — CivicGrid",
    company: "CalHacks 2025 · Featured at YC Afterparty",
    description: [
      "Engineered a full-stack ingestion pipeline combining TypeScript/React (Vite), Python/Flask, and Deepgram STT to convert call audio into structured, queryable incident records for civic triage.",
      "Built an LLM-driven classification/normalization layer (Claude/Anthropic) that transforms transcripts into typed issue schemas; productionized with scripted orchestration and secure env-key handling.",
    ],
    skills: [
      SkillNames.TS,
      SkillNames.REACT,
      SkillNames.PYTHON,
      SkillNames.FLASK,
    ],
  },
  {
    id: 3,
    startDate: "Jan 2025",
    endDate: "Feb 2025",
    title: "Data Engineering Intern",
    company: "Shenwan Hongyuan",
    description: [
      "Owned market-data QA + reconciliation for trading pipelines; optimized Pandas/NumPy/Spark transforms for 20% faster runtime.",
      "Automated and hardened ETL for time-series market feeds (Python/SQL/Airflow): idempotent jobs, backfill-safe runs; improved throughput by 10%.",
      "Tuned PostgreSQL performance for production queries, cutting query latency by 30%; added Redis caching and containerized services with Docker.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.SQL,
      SkillNames.PANDAS,
      SkillNames.NUMPY,
      SkillNames.POSTGRES,
      SkillNames.DOCKER,
    ],
  },
  {
    id: 4,
    startDate: "Dec 2023",
    endDate: "Jan 2024",
    title: "Academic Researcher",
    company: "Oxford University",
    description: [
      "Ranked 1/45 in a research team modeling biochemical systems through stochastic processes and algorithmic complexity.",
      "Implemented Monte Carlo simulation and time-series / nonlinear dynamical systems models in Python, C++, and MATLAB, including parameter sweeps and stability/sensitivity analysis of molecular interaction dynamics.",
      "Built high-dimensional statistical learning pipelines in NumPy/Pandas/scikit-learn, applying PCA, k-means clustering, and Random Forest for candidate scoring and uncertainty/risk-style assessment.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.CPP,
      SkillNames.NUMPY,
      SkillNames.PANDAS,
      SkillNames.SKLEARN,
    ],
  },
  {
    id: 5,
    startDate: "Feb 2023",
    endDate: "Apr 2024",
    title: "Research Intern",
    company: "MIT Pentelute Lab",
    description: [
      "Developed a stochastic generative modeling + optimization stack for peptide candidates using diffusion models and deep reinforcement learning in PyTorch with vectorized preprocessing in NumPy/Pandas.",
      "Designed the RL reward as a multi-objective utility: maximize predicted affinity and developability scores while penalizing constraint violations, turning peptide design into a constrained optimization loop.",
      "Improved reproducibility by tracking configs, data lineage, training metrics, RL dynamics, and generation KPIs across sensitivity analyses.",
      "Published a research paper with Dr. Vladimir Akhmetov on AI-assisted Alzheimer's drug design (DOI: 10.36838/v7i4.5).",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.PYTORCH,
      SkillNames.NUMPY,
      SkillNames.PANDAS,
    ],
  },
  {
    id: 6,
    startDate: "May 2025",
    endDate: "May 2025",
    title: "Developer — Stock Market Prediction Web App",
    company: "Personal Project",
    description: [
      "Implemented a modular data, feature engineering, model training, and inference pipeline in Python/Flask + scikit-learn.",
      "Served predictions via a REST API to a React frontend with live Alpha Vantage data; achieved MAE 0.16 and R² 0.98.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.FLASK,
      SkillNames.SKLEARN,
      SkillNames.REACT,
      SkillNames.JS,
    ],
  },
  {
    id: 6,
    startDate: "Jan 2025",
    endDate: "Feb 2025",
    title: "Data Engineering Intern",
    company: "Shenwan Hongyuan",
    description: [
      "Owned market-data QA + reconciliation for trading pipelines; optimized Pandas/NumPy/Spark transforms for 20% faster runtime.",
      "Automated and hardened ETL for time-series market feeds (Python/SQL/Airflow): idempotent jobs, backfill-safe runs; improved throughput by 10%.",
      "Tuned PostgreSQL performance for production queries, cutting query latency by 30%; added Redis caching and containerized services with Docker.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.SQL,
      SkillNames.PANDAS,
      SkillNames.NUMPY,
      SkillNames.POSTGRES,
      SkillNames.DOCKER,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode is like staring directly at the sun. Proceed with caution!",
    "Caution: Light mode ahead!",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode!",
    "Flipping the switch to light mode...",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated!",
    "Welcome back to the shadows.",
    "Dark mode on!",
  ],
};

