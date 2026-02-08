const config = {
  title: "Nicholas Chen | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Nicholas Chen, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Let's build something amazing together!",
    short:
      "Discover the portfolio of Nicholas Chen, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Nicholas Chen",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Nicholas Chen",
  email: "your-email@example.com",
  site: "https://nicholaschen.dev",

  // for github stars button
  githubUsername: "nicholaschen",
  githubRepo: "personal-website",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/your-twitter",
    linkedin: "https://www.linkedin.com/in/your-linkedin/",
    instagram: "https://www.instagram.com/your-instagram",
    facebook: "https://www.facebook.com/your-facebook/",
    github: "https://github.com/nicholaschen",
  },
};
export { config };
