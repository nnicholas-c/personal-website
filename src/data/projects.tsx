import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiDocker,
  SiFirebase,
  SiFlask,
  SiJavascript,
  SiPostgresql,
  SiPython,
  SiScikitlearn,
  SiShadcnui,
  SiSvelte,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  flask: {
    title: "Flask",
    bg: "black",
    fg: "white",
    icon: <SiFlask />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  svelte: {
    title: "SvelteKit",
    bg: "black",
    fg: "white",
    icon: <SiSvelte />,
  },
  sklearn: {
    title: "scikit-learn",
    bg: "black",
    fg: "white",
    icon: <SiScikitlearn />,
  },
  shadcn: {
    title: "shadcn/ui",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "civicgrid",
    category: "Full-Stack Pipeline",
    title: "CivicGrid",
    src: "/assets/projects-screenshots/civicgrid/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.react,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.flask,
      ],
    },
    live: "https://nnicholas-c.github.io/CivicGrid/#/",
    github: "https://github.com/nnicholas-c/CivicGrid",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Voice-to-Structured Data Pipeline
          </TypographyP>
          <TypographyP className="font-mono ">
            CivicGrid is a full-stack ingestion pipeline that converts call
            audio into structured, queryable incident records for civic triage
            and actionable work orders. Built at CalHacks 2025 and featured at
            the YC Afterparty.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Speech-to-Text Pipeline</TypographyH3>
          <p className="font-mono mb-2">
            Engineered a full-stack ingestion pipeline combining TypeScript/React
            (Vite), Python/Flask, and Deepgram STT to convert call audio into
            structured, queryable incident records.
          </p>
          <p className="font-mono text-sm text-muted-foreground mb-2">
            ⚠️ Note: The live demo has rate-limited Deepgram API calls to manage
            costs. Transcription functionality may be unavailable if the limit
            has been reached.
          </p>
          <TypographyH3 className="my-4 mt-8">LLM Classification Layer</TypographyH3>
          <p className="font-mono mb-2">
            Built an LLM-driven classification/normalization layer using
            Claude/Anthropic that transforms transcripts (plus optional image
            context) into typed issue schemas; productionized with scripted
            orchestration and secure env-key handling.
          </p>
        </div>
      );
    },
  },
  {
    id: "stock-predictor",
    category: "Machine Learning",
    title: "Stock Market Predictor",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.js,
      ],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.flask,
        PROJECT_SKILLS.sklearn,
      ],
    },
    live: "https://github.com/nnicholas-c/Python-stock-predictor",
    github: "https://github.com/nnicholas-c/Python-stock-predictor",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            ML-Powered Stock Prediction Web App
          </TypographyP>
          <TypographyP className="font-mono ">
            A modular data, feature engineering, model training, and inference
            pipeline serving predictions via a REST API to a React frontend
            with live Alpha Vantage data.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">ML Pipeline</TypographyH3>
          <p className="font-mono mb-2">
            Implemented a complete pipeline in Python/Flask + scikit-learn
            covering data ingestion, feature engineering, model training, and
            inference — achieving MAE 0.16 and R² 0.98.
          </p>
          <TypographyH3 className="my-4 mt-8">Live Data Integration</TypographyH3>
          <p className="font-mono mb-2">
            Predictions are served via a REST API to a React frontend that
            fetches live market data from Alpha Vantage, providing real-time
            stock price forecasting.
          </p>
        </div>
      );
    },
  },
  {
    id: "portfolio",
    category: "Portfolio",
    title: "This Portfolio",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    screenshots: ["landing.png"],
    live: "https://nicholaschen.dev",
    github: "https://github.com/nnicholas-c/personal-website",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.spline,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            My personal portfolio website — the one you&apos;re looking at right
            now. Built with Next.js, featuring interactive 3D animations,
            smooth scrolling, and a cosmic space theme.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">
            Interactive 3D Keyboard
          </TypographyH3>
          <p className="font-mono mb-2">
            A fully interactive 3D keyboard built with Spline where each keycap
            represents a skill. Hover to reveal — it&apos;s like typing, but
            make it art.
          </p>
          <TypographyH3 className="my-4 mt-8">Space Theme</TypographyH3>
          <p className="font-mono mb-2">
            Dark background + floating particles = out-of-this-world cool.
            Smooth scroll-driven animations powered by GSAP and Framer Motion.
          </p>
        </div>
      );
    },
  },
];
export default projects;
