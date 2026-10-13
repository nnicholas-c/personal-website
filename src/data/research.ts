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
  status: "Published" | "Accepted · Spotlight" | "Under review";
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
    venue: "AgenticLS Workshop, NeurIPS 2026 (non-archival)",
    year: "2026",
    status: "Accepted · Spotlight",
    abstract:
      "Models a scientist who checks a proposal carefully some fraction of the time and otherwise approves what looks plausible, and shows that granting a discovery agent autonomy once it agrees with the scientist only certifies a copy of that quick check. Proposes an audit that needs no lab assays, built from silent repeat reviews, and tests it in retrospective simulations on four genome-wide CRISPR screens in primary human T cells.",
  },
  {
    title:
      "The Withdrawal Test: Unaided Operational Decisions after Answer and Rationale Support",
    authors: "Nicholas Chen, Jiaming Guan, Wichinpong Park Sinchaisri",
    venue: "ACM CHI 2027",
    year: "2026",
    status: "Under review",
    abstract:
      "Algorithmic recommendations can improve current decisions without teaching people to decide on their own. In a two-session delivery-bundling study with 118 MBA students, participants got an optimal recommendation alone, the same recommendation with a rationale matched or mismatched to their baseline diagnosis, or no recommendation. A withdrawal test then measured optimal choice and operational loss on new menus after assistance was removed. Adoption was high, but the primary comparisons did not establish an added benefit from rationales.",
  },
  {
    title:
      "When Personalization Feels Accurate: Endorsement and Prediction in Professional Judgment",
    authors: "Nicholas Chen, Jiaming Guan, Wichinpong Park Sinchaisri",
    venue: "ACM CHI 2027",
    year: "2026",
    status: "Under review",
    abstract:
      "Personalized assistants ask people to approve descriptions of their preferences, but what does that approval validate? Thirty-two professionals wrote standing instructions, judged work-related drafts, and reviewed accounts derived from their decisions or constructed alternatives. Eighteen learned accounts made a constant prediction across sixteen held-out drafts yet still received mean endorsement of 5.44 out of 7. Favorable evaluations can leave person-specific prediction unestablished.",
  },
  {
    title:
      "Agreeing for the Wrong Reasons: Coordinate Identifiability in Personalized Reward Models",
    authors: "Nicholas Chen, with Park Sinchaisri and Jiaming Guan",
    venue: "AISTATS 2027",
    year: "2026",
    status: "Under review",
    abstract:
      "A personalized reward model can predict a person's accept or reject choices accurately without learning what any of its named factors means. The paper analyzes when extra concern labels, meaning which reason drove a rejection, recover that meaning, with experiments on MultiPref and frozen open-weight embeddings.",
  },
  {
    title: "RuleReveal: Deployment-Aware Diagnostic Benchmarks for Decision Agents",
    authors: "Nicholas Chen (co-first author)",
    venue: "AAAI 2027",
    year: "2026",
    status: "Under review",
    abstract:
      "Two agents can earn the same benchmark score while following very different policies. RuleReveal picks benchmark problems by the agents' action signatures, choosing the problems that best separate agents whose behavior differs under the target deployment distribution. This turns benchmark design into a weighted coverage problem with a 1−1/e greedy guarantee.",
  },
  {
    title: "ML-Driven Approach to Discovery of Peptide-Based BACE1 Inhibitors",
    authors: "Nicholas Chen · Mentor: Dr. Vladimir Akhmetov (MIT)",
    venue: "International Journal of High School Research, 7(4)",
    year: "2025",
    status: "Published",
    abstract:
      "De novo design of catalytic-site-targeted peptide binders of β-secretase (BACE1), a key enzyme in amyloid-beta plaque formation in Alzheimer's disease, using RFdiffusion, ProteinMPNN and AlphaFold3.",
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
      "Ran the reward-model experiments for the AISTATS submission on a local RTX 5090 and led the pre-submission code audit that reversed several reported effects. For RuleReveal, built the agent populations (122 reference agents per domain, 38 optimization algorithms over 95,000 evaluations, 19 language-model agents) and led the independent reproducibility audit. Built the BundleGame experiment platform and its conditional-logit analysis.",
  },
  {
    role: "Machine Learning Researcher",
    lab: "MIT — Pentelute Lab",
    period: "Feb 2023 — Apr 2024",
    summary:
      "Peptide binder design for BACE1 with RFdiffusion, ProteinMPNN and AlphaFold3, mentored by Dr. Vladimir Akhmetov; sole-authored the resulting peer-reviewed paper.",
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
  { value: 259, label: "numbers re-verified by the NeurIPS reproducibility check" },
  { value: 2700, suffix: "+", label: "tests on the Slurm test cluster" },
];
