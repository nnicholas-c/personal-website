import React from "react";
import Link from "next/link";
import { footer } from "./config";
import { buttonVariants } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-border px-4 py-6 sm:flex-row md:px-6 sm:justify-between">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {year} {config.author}. All rights reserved.
      </p>
      <SocialMediaButtons />
      <nav className="flex gap-4 sm:gap-6 z-10">
        {footer.map((link, index) => {
          const { title, href, target } = link;

          return (
            <Link
              className={cn(buttonVariants({ variant: "link" }), "cursor-can-hover text-xs")}
              href={href}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : undefined}
              key={`l_${index}`}
            >
              {title}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

export default Footer;
