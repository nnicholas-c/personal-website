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

export type Education = {
  school: string;
  degree: string;
  gpa: string;
  expected: string;
  coursework: string[];
};

export const EDUCATION: Education[] = [
  {
    school: "University of California, Berkeley",
    degree: "B.S. in Electrical Engineering & Computer Sciences",
    gpa: "3.8/4.0",
    expected: "Expected May 2029",
    coursework: [
      "Data Structures (CS 61B)",
      "Probability & Random Processes (EE 126)",
      "Discrete Math & Probability (CS 70)",
      "Algorithms (CS 170)",
      "Linear Algebra (Math 110)",
      "In progress: Machine Learning (CS 189), Deep Learning (CS 182), Optimization Models (EECS 127)",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Oct 2026",
    endDate: "Present",
    title: "Founder & Technical Lead",
    company: "Research Compute Autopilot (startup)",
    description: [
      "Building an AI agent on SkyPilot that measures lost GPU hours on shared clusters, explains Slurm job failures in plain English, and retries failed jobs within user-set limits, starting with Berkeley's Savio cluster.",
      "Built a GPU-hour ledger from Slurm data showing hours allocated, used and lost by cause, per job and user.",
      "Built a safety layer where the AI only proposes actions and a rule-based gate checks each against user limits and budgets.",
      "Built a Slurm test cluster in an isolated Linux namespace with simulated GPU nodes and injected failures (2,700+ tests); recruited and lead two student engineers.",
    ],
    skills: [SkillNames.PYTHON, SkillNames.DOCKER],
  },
  {
    id: 2,
    startDate: "Sep 2026",
    endDate: "Present",
    title: "Undergraduate Researcher (URAP)",
    company: "Sayeef Lab, UC Berkeley EECS, with Lawrence Berkeley National Laboratory",
    description: [
      "Wrote custom CUDA kernels with shared-memory tiling that sped up the simulation and training pipeline by 35%, and set up batched parallel training and simulation across multiple NVIDIA H200 GPUs.",
      "Developing a PyTorch diffusion model that predicts how a material's atomic structure changes during manufacturing, conditioned on processing history (temperature, electric field).",
      "Running GPU molecular dynamics with machine-learned force fields (MACE) to simulate hafnium oxide (HfO2) during annealing.",
    ],
    skills: [SkillNames.PYTHON, SkillNames.PYTORCH, SkillNames.CPP],
  },
  {
    id: 3,
    startDate: "Sep 2025",
    endDate: "Present",
    title: "Undergraduate Researcher",
    company: "UC Berkeley Haas — Operations & Behavioral Analytics Lab",
    description: [
      "Ran the personalized reward-model experiments on a local RTX 5090 and led a pre-submission code audit that reversed several reported effects.",
      "Built the agent populations for a benchmark-design paper: 122 reference agents per domain, 38 optimization algorithms over 95,000 evaluations, and 19 language-model agents; led its independent reproducibility audit.",
      "Built the BundleGame experiment platform (SvelteKit, Firebase, Vercel) and its conditional-logit analysis.",
      "Papers under review at AISTATS 2027 and AAAI 2027.",
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
    id: 4,
    startDate: "Jan 2025",
    endDate: "Feb 2025",
    title: "Data Engineering Intern",
    company: "Shenwan Hongyuan Securities",
    description: [
      "Built and hardened large-scale equities market-data pipelines across multi-terabyte tick and daily-bar feeds with billions of rows.",
      "Optimized Spark/Pandas processing over partitioned Parquet for 20% faster runtime and automated ETL with Airflow.",
      "Tuned PostgreSQL performance and supported Redis caching and Dockerized services for production data workflows.",
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
    id: 5,
    startDate: "Feb 2023",
    endDate: "Apr 2024",
    title: "Machine Learning Researcher",
    company: "MIT — Pentelute Lab",
    description: [
      "Peptide binder design for BACE1 with RFdiffusion, ProteinMPNN and AlphaFold3, mentored by Dr. Vladimir Akhmetov.",
      "Sole-authored a peer-reviewed paper on AI-driven peptide design (DOI: 10.36838/v7i4.29).",
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
    startDate: "Dec 2023",
    endDate: "Jan 2024",
    title: "Computational Research — Ranked 1st of 45",
    company: "University of Oxford",
    description: [
      "Wrote Monte Carlo simulations of nonlinear dynamical systems in C++, Python and MATLAB with parameter sweeps.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.CPP,
      SkillNames.NUMPY,
      SkillNames.PANDAS,
      SkillNames.SKLEARN,
    ],
  },
];

export type Award = {
  year: string;
  title: string;
};

export const AWARDS: Award[] = [
  { year: "2024", title: "USACO Gold" },
  { year: "2024", title: "International Olympiad in Informatics (IOI) 2024 — National Camp Member" },
  { year: "2021", title: "Australian Mathematical Competition – 1× Medal (1/5000) & Top in Auckland City, 3× High Distinction" },
  { year: "2024", title: "New Zealand Mathematical Olympiad Camp Member; New Zealand Senior Maths Competition 1st Place" },
  { year: "2024", title: "New Zealand Young Physicists' Tournament 2nd Place" },
  { year: "2023", title: "New Zealand Young Physicists' Tournament 3rd Place" },
  { year: "2023", title: "New Zealand Physics and Maths Competition 7th Place; International Young Physicists' Tournament Qualifier" },
  { year: "2024", title: "New Zealand Chemistry Olympiad – 2× Gold Medal, 1× Silver Medal; National Exam Full Score Achiever" },
  { year: "2024", title: "International Chemistry Olympiad Qualifier; New Zealand Chemistry Olympiad National Team Member" },
  { year: "2024", title: "British Biology Olympiad Gold Medal; British Physics Olympiad Gold Medal; UK Chemistry Olympiad Gold Medal" },
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
