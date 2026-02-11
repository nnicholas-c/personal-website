const config = {
  title: "Nicholas Chen | EECS @ UC Berkeley",
  description: {
    long: "Explore the portfolio of Nicholas Chen, an EECS student at UC Berkeley specializing in quantitative engineering, machine learning, and startups. From data pipelines to deep reinforcement learning — let's build something impactful.",
    short:
      "Portfolio of Nicholas Chen — EECS @ UC Berkeley. Quantitative engineering, ML, and development.",
  },
  keywords: [
    "Nicholas Chen",
    "portfolio",
    "UC Berkeley",
    "EECS",
    "machine learning",
    "quantitative",
    "startups",
    "Python",
    "data engineering",
    "deep learning",
    "React",
    "Next.js",
  ],
  author: "Nicholas Chen",
  email: "nchen06@berkeley.edu",
  site: "https://nicholaschen.dev",

  // for github stars button
  githubUsername: "nnicholas-c",
  githubRepo: "personal-website",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/NChen43323",
    linkedin: "https://www.linkedin.com/in/nchen06/",
    instagram: "https://www.instagram.com/nnicholas_c/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/nnicholas-c",
  },
};
export { config };
