// "Currently" section content — what Nicholas is actively working on.
// Kept as data so it's easy to update without touching layout.

export const NOW_INTRO =
  "Third-year EECS undergraduate at UC Berkeley, working where machine learning meets markets and human decisions.";

export type NowItem = {
  meta: string;
  text: string;
};

export const NOW_ITEMS: NowItem[] = [
  {
    meta: "UC Berkeley · OBA Lab",
    text: "Reinforcement-learning research at the Operations & Behavioral Analytics Lab — reward shaping, offline policy evaluation, and fixed-effects causal inference over a 1,000-round human-decision study. First-author paper in preparation.",
  },
  {
    meta: "Coursework",
    text: "Random Processes (EE 126), Algorithms (CS 170), Machine Learning (CS 189), and Linear Algebra (Math 110). Expected May 2028.",
  },
  {
    meta: "Quantitative research",
    text: "Signal design, leakage auditing, and honest backtesting — deflated Sharpe, walk-forward validation, and model-risk controls over point-in-time market data.",
  },
  {
    meta: "Open to",
    text: "Summer 2026 internships in machine-learning research and quantitative roles.",
  },
];
