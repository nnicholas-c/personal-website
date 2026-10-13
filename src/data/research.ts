// Research page content. Titles/venues are easy to edit here as work is
// published or updated — the /research page renders straight from this file.
// Keep this in sync with the current resume: roles, authorship and venues
// should read the same in both places.

export const RESEARCH_INTRO =
  "I'm an EECS student at Berkeley. I build GPU-accelerated simulation and machine-learning systems, study how people make judgments with and without AI help, and work on making AI agents reliable enough to trust. What I care about most is whether a result still holds once you push on it.";

export const RESEARCH_INTERESTS = [
  "GPU-accelerated simulation and ML",
  "Models of human judgment",
  "Reliable AI agents",
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  status: "Published" | "Spotlight" | "Submitted" | "Under review";
  abstract: string;
  links?: { label: string; href: string }[];
  /** true when the title is a working title for unpublished work */
  workingTitle?: boolean;
};

export const PUBLICATIONS: Publication[] = [
  {
    title:
      "Approval Is Not Discovery: When Can a Model of the Scientist Steer a Discovery Agent?",
    authors: "Nicholas Chen (sole author)",
    venue: "NeurIPS 2026 Workshop on Agentic AI for Biological Discovery",
    year: "2026",
    status: "Spotlight",
    abstract:
      "Sole-authored workshop paper, selected as a spotlight.",
  },
  {
    title: "The Withdrawal Test",
    workingTitle: true,
    authors: "Nicholas Chen (co-first author), with Prof. Park Sinchaisri",
    venue: "ACM CHI 2027",
    year: "2026",
    status: "Submitted",
    abstract:
      "Does AI decision support improve human judgment, or only performance while the AI is present? The withdrawal test scores a support system on two separate outcomes: assisted performance, and the residual, meaning how well people do on new, held-out problems once the support is removed. The two can diverge: a system can make someone far more accurate in the moment while leaving them no better, or worse, on their own.",
  },
  {
    title: "RuleReveal: Small Benchmarks That Predict How Decision Agents Deploy",
    workingTitle: true,
    authors: "Nicholas Chen (co-first author)",
    venue: "AAAI 2027",
    year: "2026",
    status: "Under review",
    abstract:
      "Two agents can earn the same benchmark score while following very different policies. RuleReveal picks benchmark problems by the agents' action signatures, choosing the problems that best separate agents whose behavior differs under the target deployment distribution. This turns benchmark design into a weighted coverage problem with a 1−1/e greedy guarantee; eight selected problems are enough to predict held-out agents accurately.",
  },
  {
    title: "AISTATS 2027 submission",
    authors: "Nicholas Chen (co-first author)",
    venue: "AISTATS 2027",
    year: "2026",
    status: "Submitted",
    abstract: "Details to follow after the review period.",
  },
  {
    title: "ML-Driven Approach to Discovery of Peptide-Based BACE1 Inhibitors",
    authors: "Nicholas Chen (co-first author) · MIT Pentelute Lab",
    venue: "International Journal of High School Research, 7(4)",
    year: "2025",
    status: "Published",
    abstract:
      "De novo design of catalytic-site-targeted peptide binders of β-secretase (BACE1), a key enzyme in amyloid-beta plaque formation in Alzheimer's disease. Uses RFdiffusion, ProteinMPNN and AlphaFold2 inside a reinforcement-learning loop to generate potent, low-immunogenicity inhibitor candidates.",
    links: [
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
    role: "Undergraduate Researcher (URAP)",
    lab: "Sayeef Lab (Prof. Sayeef Salahuddin), UC Berkeley EECS, with Lawrence Berkeley National Laboratory",
    period: "Sep 2026 — Present",
    summary:
      "Custom CUDA kernels with shared-memory tiling that sped up the simulation and training pipeline by 35%, with batched parallel training and simulation across multiple NVIDIA H200 GPUs. Developing a PyTorch diffusion model that predicts how a material's atomic structure changes during manufacturing, conditioned on the full processing history (temperature, electric field), on top of GPU molecular dynamics with MACE force fields for hafnium oxide.",
  },
  {
    role: "Undergraduate Researcher",
    lab: "UC Berkeley Haas — Operations & Behavioral Analytics Lab (Prof. Park Sinchaisri)",
    period: "Sep 2025 — Present",
    summary:
      "Personal reward models trained in PyTorch/CUDA from 41,844 human preference labels; a Python framework evaluating 38 optimizers and 19 LLM agents over 95,000 runs with a reproducibility audit; and a code audit that caught and corrected results before submission.",
  },
  {
    role: "Machine Learning Researcher",
    lab: "MIT — Pentelute Lab",
    period: "Feb 2023 — Apr 2024",
    summary:
      "Peptide design with RFdiffusion, ProteinMPNN and AlphaFold2 inside a reinforcement-learning loop over a multi-objective reward (binding affinity, toxicity, aggregation); co-first author of a peer-reviewed paper.",
  },
  {
    role: "Computational Research — Ranked 1st of 45",
    lab: "University of Oxford",
    period: "Dec 2023 — Jan 2024",
    summary:
      "Monte Carlo simulations of nonlinear dynamical systems in C++, Python and MATLAB with parameter sweeps.",
  },
];

export type Talk = {
  title: string;
  venue: string;
  year: string;
};

// Only list talks given in person. (The Stanford/CMU presentations were
// removed until it's confirmed who presented.)
export const TALKS: Talk[] = [];

export type Highlight = {
  value: number;
  suffix?: string;
  label: string;
};

// Count-up figures shown on the research page.
export const HIGHLIGHTS: Highlight[] = [
  { value: 35, suffix: "%", label: "faster pipeline from custom CUDA kernels" },
  { value: 95000, label: "agent and optimizer runs evaluated" },
  { value: 41844, label: "human preference labels modeled" },
  { value: 2700, suffix: "+", label: "tests on the Slurm test cluster" },
];
