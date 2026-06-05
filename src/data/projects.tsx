export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  status?: "Live" | "Coming soon";
};

const projects: Project[] = [
  {
    id: "civicgrid",
    category: "Full-Stack Pipeline",
    title: "CivicGrid",
    src: "/assets/projects-screenshots/civicgrid/landing.png",
    description:
      "Voice-to-structured-data pipeline for civic triage and incident work orders.",
    tags: ["TypeScript", "React", "Python", "Flask", "Deepgram"],
    live: "https://nnicholas-c.github.io/CivicGrid/#/",
    github: "https://github.com/nnicholas-c/CivicGrid",
    status: "Live",
  },
  {
    id: "bundlegame",
    category: "Research / RL",
    title: "BundleGame",
    src: "/assets/projects-screenshots/bundlegame/landing.svg",
    description:
      "RL and behavioral-data platform for bundle-choice experiments and policy evaluation.",
    tags: ["Python", "DQN", "SvelteKit", "Firebase", "Policy Evaluation"],
    live: "https://bundlegame-no-company.vercel.app",
    github: "https://github.com/nnicholas-c/bundlegame_no_company",
    status: "Live",
  },
  {
    id: "mc-server-share",
    category: "Desktop App",
    title: "MC Server Share",
    src: "/assets/projects-screenshots/mc-server-share/landing.svg",
    description:
      "Shipped desktop app for sharing Minecraft Java servers through a Tauri host.",
    tags: ["Tauri", "TypeScript", "Rust", "Vercel"],
    live: "https://mc-server-share-app.vercel.app",
    github: "https://github.com/nnicholas-c/mc-server-share-app",
    status: "Live",
  },
  {
    id: "equity-signal",
    category: "Coming soon",
    title: "Cross-Sectional Equity Signal Research",
    src: "/assets/projects-screenshots/equity-signal/landing.svg",
    description:
      "Placeholder for Python research on cross-sectional return signals and evaluation.",
    tags: ["Python", "pandas", "scikit-learn"],
    status: "Coming soon",
  },
  {
    id: "portfolio",
    category: "Portfolio",
    title: "This Portfolio",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    description:
      "Next.js portfolio tuned for research, ML, and quantitative engineering recruiting.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Spline"],
    live: "https://nicholaschen.dev",
    github: "https://github.com/nnicholas-c/personal-website",
    status: "Live",
  },
];

export default projects;
