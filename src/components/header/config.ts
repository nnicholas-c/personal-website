import { Link } from "@/types";
import { config } from "@/data/config";

const links: Link[] = [
  {
    title: 'Home',
    href: '/playful',
    thumbnail: '/assets/nav-link-previews/landing.png'
  },
  {
    title: 'Experience',
    href: '/playful#experience',
    thumbnail: '/assets/nav-link-previews/skills.png'
  },
  {
    title: 'Education',
    href: '/playful#education',
    thumbnail: '/assets/nav-link-previews/landing.png',
  },
  {
    title: 'Projects',
    href: '/playful#projects',
    thumbnail: '/assets/nav-link-previews/projects.png'
  },
  {
    title: 'Awards',
    href: '/playful#awards',
    thumbnail: '/assets/nav-link-previews/landing.png',
  },
  {
    title: 'Research',
    href: '/research',
    thumbnail: '/assets/nav-link-previews/research.png',
  },
  {
    title: 'The Researcher',
    href: '/editorial',
    thumbnail: '/assets/nav-link-previews/research.png',
  },
  {
    title: 'Writing',
    href: '/blogs',
    thumbnail: '/assets/nav-link-previews/writing.png',
  },
  {
    title: 'Contact',
    href: `mailto:${config.email}`,
    thumbnail: '/assets/nav-link-previews/contact.png'
  },
  {
    title: 'Résumé',
    href: config.resumePath,
    thumbnail: '/assets/nav-link-previews/contact.png',
    target: '_blank',
  }
];

export { links };
