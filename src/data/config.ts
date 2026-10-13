const config = {
  title: "Nicholas Chen | EECS @ UC Berkeley",
  description: {
    long: "Explore the portfolio of Nicholas Chen, an EECS student at UC Berkeley working on GPU-accelerated simulation and ML, models of human judgment, and reliable AI agents.",
    short:
      "Portfolio of Nicholas Chen — EECS @ UC Berkeley. GPU-accelerated ML, human judgment, and reliable AI agents.",
  },
  keywords: [
    "Nicholas Chen",
    "portfolio",
    "UC Berkeley",
    "EECS",
    "machine learning",
    "quantitative",
    "startups",
    "CUDA",
    "AI agents",
    "Python",
    "data engineering",
    "deep learning",
    "React",
    "Next.js",
  ],
  author: "Nicholas Chen",
  tagline: "GPU-accelerated ML, human judgment & reliable AI agents",
  email: "nchen06@berkeley.edu",
  phone: "+1 510-529-6747",
  site: "https://www.nicholaschen.dev/",
  resumePath: "/assets/Nicholas_Chen_Quant_Resume.pdf",

  // for github stars button
  githubUsername: "nnicholas-c",
  githubRepo: "personal-website",

  get ogImg() {
    return this.site.replace(/\/$/, "") + "/assets/seo/websiten.png";
  },
  social: {
    twitter: "https://x.com/NChen43323",
    linkedin: "https://www.linkedin.com/in/nchen06/",
    instagram: "https://www.instagram.com/nnicholas_c/",
    github: "https://github.com/nnicholas-c",
    scholar: "https://scholar.google.com/citations?user=T-HYHZYAAAAJ&hl=en",
  },
};

export { config };
