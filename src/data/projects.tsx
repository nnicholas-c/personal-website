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
    id: "equity-signal",
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
    status: "Research",
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
    status: "Research",
  },
  {
    id: "civicgrid",
    category: "Full-Stack Pipeline",
    title: "CivicGrid",
    src: "/assets/projects-screenshots/civicgrid/landing.png",
    description:
      "Full-stack voice-to-structured-data LLM pipeline for civic triage, using Deepgram STT and LLM classification; featured at the CalHacks 2025 YC afterparty.",
    tags: ["TypeScript", "React", "Python", "Flask", "Deepgram", "LLM"],
    github: "https://github.com/nnicholas-c/CivicGrid",
    status: "Live",
  },
];

export default projects;
