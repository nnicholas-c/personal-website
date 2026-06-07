export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  status?: "Live" | "Research";
};

const projects: Project[] = [
  {
    id: "bundlegame",
    category: "Research Platform",
    title: "BundleGame",
    src: "/assets/projects-screenshots/bundlegame/landing.svg",
    description:
      "SvelteKit and Firebase research app for studying delivery-order bundling decisions across a 50-round task, with participant telemetry, Qualtrics linkage, analytics exports, and offline-RL artifacts.",
    tags: ["SvelteKit", "Firebase", "JavaScript", "Analytics", "Offline RL"],
    github: "https://github.com/nnicholas-c/bundlegame_no_company",
    live: "https://bundlegame-no-company.vercel.app",
    status: "Live",
  },
  {
    id: "manyr",
    category: "AI Safety Product",
    title: "Manyr Agent Firewall",
    src: "/assets/projects-screenshots/manyr/landing.svg",
    description:
      "Next.js product site and interactive policy playground for an agent-governance layer that evaluates tool calls, applies allow/deny/approval rules, and records audit trails.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "AI Safety"],
    github: "https://github.com/nnicholas-c/manyr-website",
    live: "https://www.getmanyr.com/",
    status: "Live",
  },
  {
    id: "civicgrid",
    category: "Full-Stack Pipeline",
    title: "CivicGrid",
    src: "/assets/projects-screenshots/civicgrid/landing.png",
    description:
      "Voice-to-structured-data civic triage platform using Deepgram STT/TTS, LLM classification, Firebase, and a role-based dashboard for residents, contractors, and officials.",
    tags: ["TypeScript", "React", "Python", "Flask", "Deepgram", "LLM"],
    github: "https://github.com/nnicholas-c/CivicGrid",
    live: "https://nnicholas-c.github.io/CivicGrid/",
    status: "Live",
  },
  {
    id: "return-prediction-signal",
    category: "Quant Research",
    title: "Cross-Sectional Equity Signal Research",
    src: "/assets/projects-screenshots/equity-signal/landing.svg",
    description:
      "Point-in-time S&P 500 study that caught and killed a survivorship artifact: a +8%/yr factor alpha (t ≈ 3.6) vanished under point-in-time membership; honest null with deflated Sharpe ≈ 0.35, independent re-derivation, and 50 unit tests.",
    tags: [
      "Python",
      "pandas",
      "Walk-Forward CV",
      "Newey-West",
      "Fama-French",
      "LinUCB",
    ],
    github: "https://github.com/nnicholas-c/Return-prediction-signal",
    live: "https://nnicholas-c.github.io/Return-prediction-signal/",
    status: "Research",
  },
  {
    id: "personal-website",
    category: "Portfolio Website",
    title: "Personal Website",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    description:
      "Next.js portfolio site with interactive 3D visuals, smooth scroll animation, project cards, contact flow, SEO metadata, and responsive presentation for AI/ML and quant research work.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind", "Spline", "GSAP"],
    github: "https://github.com/nnicholas-c/personal-website",
    live: "https://www.nicholaschen.dev/",
    status: "Live",
  },
  {
    id: "axiom",
    category: "Quant Research",
    title: "AXIOM — Quant Research Backtesting Portfolio",
    src: "/assets/projects-screenshots/axiom/landing.svg",
    description:
      "Honest backtesting portfolio focused on signal design, leakage auditing, and model-risk controls, including deflated Sharpe and cost-aware evaluation.",
    tags: ["Python", "Backtesting", "Leakage Audits", "Model Risk", "Sharpe"],
    github: "https://github.com/nnicholas-c/stock-trading-system",
    live: "https://nnicholas-c.github.io/stock-trading-system/",
    status: "Research",
  },
];

export default projects;
