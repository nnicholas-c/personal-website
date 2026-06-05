import { Link } from "@/types";

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
    href: '/#contact',
    thumbnail: '/assets/nav-link-previews/contact.png'
  },
  {
    title: 'Résumé',
    href: '/resume.pdf',
    thumbnail: '/assets/nav-link-previews/contact.png',
    target: '_blank',
  }
];

export { links };
