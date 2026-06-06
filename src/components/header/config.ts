import { Link } from "@/types";
import { config } from "@/data/config";

const links: Link[] = [
  {
    title: 'Home',
    href: '/',
    thumbnail: '/assets/nav-link-previews/landing.png'
  },
  {
    title: 'Experience',
    href: '/#experience',
    thumbnail: '/assets/nav-link-previews/skills.png'
  },
  {
    title: 'Education',
    href: '/#education',
    thumbnail: '/assets/nav-link-previews/landing.png',
  },
  {
    title: 'Projects',
    href: '/#projects',
    thumbnail: '/assets/nav-link-previews/projects.png'
  },
  {
    title: 'Awards',
    href: '/#awards',
    thumbnail: '/assets/nav-link-previews/landing.png',
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
