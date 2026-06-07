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
    degree: "B.S. in Electrical Engineering & Computer Science",
    gpa: "3.8/4.0",
    expected: "Expected May 2028",
    coursework: [
      "Optimization Models (EECS 127)",
      "Probability & Discrete Math (CS 70)",
      "Deep Learning (CS 182)",
      "In progress: Probability & Random Processes (EE 126), Linear Algebra (Math 110), Algorithms (CS 170), Machine Learning (CS 189)",
    ],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Sep 2025",
    endDate: "Present",
    title: "AI/ML & Quantitative Research Engineer",
    company: "UC Berkeley — Operations & Behavioral Analytics Lab",
    description: [
      "Built a reinforcement-learning system (DQN: reward shaping, experience replay, target networks) and the full experiment + data pipeline (SvelteKit/Firebase) over 85 participants and 1,000+ rounds.",
      "Clustered behavior into 5 statistically separable decision policies (8× outcome spread, F=276) and ran offline policy evaluation.",
      "Fixed-effects causal inference showed payout salience raised suboptimal choices by 71 percentage points with no measurable learning across 15 rounds.",
      "First author, in preparation (targeting ACM CHI 2027); presented with Prof. Sinchaisri at Stanford and CMU.",
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
    id: 3,
    startDate: "Feb 2023",
    endDate: "Apr 2024",
    title: "Machine Learning Researcher",
    company: "MIT — Pentelute Lab",
    description: [
      "Built a deep generative + reinforcement-learning stack in PyTorch with diffusion sampling and policy/value methods over a multi-objective reward.",
      "First-authored a peer-reviewed paper on AI-driven molecular design (DOI: 10.36838/v7i4.29).",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.PYTORCH,
      SkillNames.NUMPY,
      SkillNames.PANDAS,
    ],
  },
  {
    id: 4,
    startDate: "Dec 2023",
    endDate: "Jan 2024",
    title: "Computational Research — Ranked 1st of 45",
    company: "University of Oxford",
    description: [
      "Built Monte Carlo, stochastic-process, and time-series models of nonlinear biochemical systems.",
      "Implemented PCA, k-means, and random-forest pipelines for computational research workflows.",
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
  { year: "2024", title: "International Olympiad in Informatics (IOI) 2024 National Camp Member" },
  { year: "2021", title: "Australian Mathematics Competition — Medal (top 1/5,000) & Top in Auckland; 3× High Distinction" },
  { year: "2024", title: "NZ Mathematical Olympiad Camp Member" },
  { year: "2024", title: "NZ Senior Mathematics Competition — 1st Place" },
  { year: "2024", title: "NZ Chemistry Olympiad — 2× Gold, 1× Silver; National Exam full score" },
  { year: "2024", title: "Science olympiad gold: UK Chemistry" },
  { year: "2024", title: "Science olympiad gold: British Physics" },
  { year: "2024", title: "Science olympiad gold: British Biology" },
  { year: "2024", title: "IChO 2024 Qualifier" },
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
