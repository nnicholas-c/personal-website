import { config } from "@/data/config";

const footer: { title: string; href: string; target?: string }[] = [
  {
    title: "Résumé",
    href: "/resume.pdf",
    target: "_blank",
  },
  {
    title: "Contact",
    href: `mailto:${config.email}`,
  },
];

export { footer };
