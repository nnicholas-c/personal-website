"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="mx-auto min-h-screen w-full max-w-7xl px-4 py-20 md:px-8">
      <SectionHeader
        id="contact"
        className="relative mb-14"
        title={
          <>
            LET&apos;S WORK <br />
            TOGETHER
          </>
        }
      />
      <div className="mx-auto max-w-2xl">
        <Card className="pointer-events-auto border-border bg-card/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl tracking-tight">Contact</CardTitle>
            <CardDescription className="text-base leading-7">
              For research, ML, or engineering opportunities, reach me directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link
              href={`mailto:${config.email}`}
              aria-label={`Email ${config.author}`}
              className={cn(buttonVariants(), "gap-2")}
            >
              <Mail size={18} />
              Email
            </Link>
            <Link
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <Github size={18} />
              GitHub
            </Link>
            <Link
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <Linkedin size={18} />
              LinkedIn
            </Link>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
