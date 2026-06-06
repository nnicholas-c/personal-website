import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import ScrollDownIcon from "../scroll-down-icon";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-[92svh]")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "min-h-[calc(92svh-3rem)] md:min-h-[calc(92svh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-start",
            "px-6 pt-28 pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
            <div className="flex flex-col">
              <div>
                <p
                  className={cn(
                    "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                    "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                  )}
                >
                  Hi, I am
                  <br className="md:hidden" />
                </p>

                <h1
                  aria-label={config.author}
                  className={cn(
                    "md:-ml-[6px] leading-none font-thin text-transparent text-slate-800 text-left",
                    "font-thin text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                    "cursor-default text-edge-outline font-display "
                  )}
                >
                  {config.author.split(" ")[0]}
                  <br className="md:block hiidden" />
                  {config.author.split(" ")[1]}
                </h1>
                {/* <div className="md:block hidden bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 w-screen h-px animate-fade-right animate-glow" /> */}
                <p
                  className={cn(
                    "md:self-start md:mt-4 max-w-xl font-sans text-base text-slate-600 dark:text-zinc-300",
                    "cursor-default sm:text-lg md:text-xl leading-relaxed bg-clip-text"
                  )}
                >
                  EECS @ UC Berkeley — {config.tagline}
                </p>
              </div>
              <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none">
                <Link
                  href={config.resumePath}
                  target="_blank"
                  download
                  className="w-full sm:w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Button className="flex items-center gap-2 w-full sm:w-auto">
                    <Download size={20} />
                    <p>Download Résumé</p>
                  </Button>
                </Link>
                <div className="md:self-start flex flex-wrap gap-3">
                  <Link
                    href={config.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Button variant={"outline"} className="gap-2">
                      <Github size={18} />
                      GitHub
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Button variant={"outline"} className="gap-2">
                      <Linkedin size={18} />
                      LinkedIn
                    </Button>
                  </Link>
                  <Link
                    href={`mailto:${config.email}`}
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Button variant={"outline"} className="gap-2">
                      <Mail size={18} />
                      Contact
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
