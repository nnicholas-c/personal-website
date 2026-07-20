"use client";

import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

type Handle = {
  label: string;
  href: string;
  icon: React.ElementType;
  external?: boolean;
  download?: boolean;
};

const HANDLES: Handle[] = [
  { label: "github", href: config.social.github, icon: Github, external: true },
  {
    label: "linkedin",
    href: config.social.linkedin,
    icon: Linkedin,
    external: true,
  },
  { label: "twitter", href: config.social.twitter, icon: Twitter, external: true },
  {
    label: "scholar",
    href: config.social.scholar,
    icon: GraduationCap,
    external: true,
  },
  { label: config.email, href: `mailto:${config.email}`, icon: Mail },
  {
    label: "résumé",
    href: config.resumePath,
    icon: ArrowUpRight,
    external: true,
    download: true,
  },
];

export default function SocialHandles({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-3", className)}>
      {HANDLES.map((h) => {
        const Icon = h.icon;
        return (
          <li key={h.label}>
            <Link
              href={h.href}
              target={h.external ? "_blank" : undefined}
              rel={h.external ? "noopener noreferrer" : undefined}
              download={h.download || undefined}
              className="label group inline-flex items-center gap-2 text-cream/55 transition-colors hover:text-cream"
            >
              <Icon size={13} className="opacity-70 group-hover:opacity-100" />
              <span>{h.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
