"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
      <SectionHeader id="projects" title="Projects" className="static mb-12" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const isResearch = project.status === "Research";

  return (
    <Card className="group pointer-events-auto flex h-full min-h-[520px] flex-col overflow-hidden border-border bg-card/90 shadow-sm transition-colors duration-300 hover:border-primary/40 hover:shadow-md focus-within:border-primary/60">
      <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-border bg-muted">
        <Image
          src={project.src}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          unoptimized={project.src.endsWith(".svg")}
        />
      </div>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {project.category}
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground">
              {project.title}
            </h3>
          </div>
          {project.status && (
            <Badge variant={isResearch ? "secondary" : "outline"} className="shrink-0">
              {project.status}
            </Badge>
          )}
        </div>
        <p className="min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
          >
            <Github size={16} />
            GitHub
          </Link>
        )}
        {project.live && (
          <Link
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <ExternalLink size={16} />
            Live Site
          </Link>
        )}
        {!project.github && !project.live && (
          <Badge variant="outline" className="h-9 px-3 text-xs">
            Links coming soon
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectsSection;
