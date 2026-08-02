// Research page content. Titles/venues are easy to edit here as work is
// published or updated — the /research page renders straight from this file.

export const RESEARCH_INTRO =
  "I'm an EECS student at Berkeley doing machine-learning research. Most of it is reinforcement learning and how people make the same decision over and over, with some generative modeling for protein design on the side. What I care about most is whether a result still holds once you push on it.";

export const RESEARCH_INTERESTS = [
  "Reinforcement learning",
  "How people make repeated decisions",
  "Generative models for protein design",
  "Empirical work that holds up",
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  status: "Published" | "In preparation" | "Under review";
  abstract: string;
  links?: { label: string; href: string }[];
  /** true when the title is a working title for unpublished work */
  workingTitle?: boolean;
};

export const PUBLICATIONS: Publication[] = [
  {
    title: "Reward Salience and Learning in Repeated Human Decisions",
    workingTitle: true,
    authors: "Nicholas Chen (first author), with Prof. Sinchaisri",
    venue: "Targeting ACM CHI 2027",
    year: "2026",
    status: "In preparation",
    abstract:
      "A behavioral study of a repeated bundling task across 85 participants and 1,000+ rounds. Fixed-effects causal inference finds that increasing payout salience raised suboptimal choices by 71 percentage points, with no measurable learning over 15 rounds. Behavior separates into five statistically distinct decision policies (8× outcome spread), analyzed with offline policy evaluation over a DQN trained with reward shaping, experience replay, and target networks.",
  },
  {
    title: "ML-Driven Approach to Discovery of Peptide-Based BACE1 Inhibitors",
    authors: "Nicholas Chen · Mentor: Vladimir Akhmetov",
    venue: "International Journal of High School Research, 7(4)",
    year: "2025",
    status: "Published",
    abstract:
      "A machine-learning approach to the de novo design of catalytic-site-targeted peptide binders of β-secretase (BACE1) — a key enzyme in amyloid-beta plaque formation in Alzheimer's disease. Applies deep reinforcement learning and diffusion models (AlphaFold3, RoseTTAFold) to generate potent, low-immunogenicity inhibitor candidates.",
    links: [
      {
        label: "DOI: 10.36838/v7i4.29",
        href: "https://doi.org/10.36838/v7i4.29",
      },
      {
        label: "PDF",
        href: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume7-issue4/IJHSR_2025_74_29.pdf",
      },
    ],
  },
];

export type Appointment = {
  role: string;
  lab: string;
  period: string;
  summary: string;
};

export const APPOINTMENTS: Appointment[] = [
  {
    role: "AI/ML & Quantitative Research",
    lab: "UC Berkeley — Operations & Behavioral Analytics Lab",
    period: "Sep 2025 — Present",
    summary:
      "Reinforcement learning, offline policy evaluation, and fixed-effects causal inference over a 1,000-round human-decision experiment, with the full experiment and data pipeline in SvelteKit/Firebase.",
  },
  {
    role: "Machine Learning Researcher",
    lab: "MIT — Pentelute Lab",
    period: "Feb 2023 — Apr 2024",
    summary:
      "Built a deep generative and reinforcement-learning system for molecular design over a multi-objective reward; first-authored a peer-reviewed paper.",
  },
  {
    role: "Computational Research — Ranked 1st of 45",
    lab: "University of Oxford",
    period: "Dec 2023 — Jan 2024",
    summary:
      "Monte Carlo, stochastic-process, and time-series models of nonlinear biochemical systems, with PCA, k-means, and random-forest pipelines.",
  },
];

export type Talk = {
  title: string;
  venue: string;
  year: string;
};

export const TALKS: Talk[] = [
  {
    title: "Reward salience and decision-making in repeated human choice",
    venue: "Presented at Stanford University and Carnegie Mellon University",
    year: "2026",
  },
];
