const config = {
  title: "Nicholas Chen | EECS @ UC Berkeley",
  description: {
    long: "Explore the portfolio of Nicholas Chen, an EECS student at UC Berkeley focused on AI/ML and quantitative research.",
    short:
      "Portfolio of Nicholas Chen — EECS @ UC Berkeley. AI/ML and quantitative research.",
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
  tagline: "AI/ML & Quantitative Research",
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
    facebook: "https://www.facebook.com/",
    github: "https://github.com/nnicholas-c",
  },
};

export { config };
