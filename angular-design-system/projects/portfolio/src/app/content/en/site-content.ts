import type { PortfolioSiteContent } from '../models/site-content.model';
import { EN_ABOUT_CONTENT } from './about.content';
import { EN_CONTENT_HUB_CONTENT } from './content-hub.content';
import { EN_EXPERIENCE_CONTENT } from './experience.content';
import { EN_HOME_CONTENT } from './home.content';
import { EN_PROJECTS_CONTENT } from './projects.content';

export const EN_SITE_CONTENT = {
  identity: {
    name: 'Gonzalo Herrera',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    tagline: 'Think bigger. Build smarter.',
    description: 'Helping teams build better software through engineering, leadership and AI.',
  },
  shell: {
    accessibility: {
      skipToContent: 'Skip to main content',
    },
    brand: {
      name: 'Gonzalo Herrera',
      role: 'Frontend Tech Lead & AI-Augmented Engineer',
      homeAriaLabel: 'Gonzalo Herrera, home',
    },
    navigation: {
      label: 'Primary navigation',
      openMenuLabel: 'Open navigation menu',
      closeMenuLabel: 'Close navigation menu',
      externalLinkLabel: 'opens in a new tab',
      items: [
        { id: 'home', label: 'Home', path: '' },
        { id: 'about', label: 'About', path: 'about' },
        { id: 'experience', label: 'Experience', path: 'experience' },
        { id: 'projects', label: 'Projects', path: 'projects' },
        { id: 'content', label: 'Content', path: 'content' },
        { id: 'contact', label: 'Contact', path: 'contact' },
      ],
    },
    language: {
      label: 'Language',
      englishLabel: 'English',
      spanishLabel: 'Spanish',
    },
    theme: {
      label: 'Theme',
      lightLabel: 'Light',
      darkLabel: 'Dark',
      systemLabel: 'System',
    },
    footer: {
      description: 'Helping teams build better software through engineering, leadership and AI.',
      navigationLabel: 'Footer navigation',
      socialLabel: 'Social links',
      copyright: '© 2026 Gonzalo Herrera. All rights reserved.',
    },
  },
  pages: {
    home: EN_HOME_CONTENT,
    about: EN_ABOUT_CONTENT,
    experience: EN_EXPERIENCE_CONTENT,
    projects: EN_PROJECTS_CONTENT,
    content: EN_CONTENT_HUB_CONTENT,
    contact: {
      eyebrow: 'Contact',
      title: 'Start a thoughtful conversation',
      description: 'A future place to discuss engineering, leadership and collaboration.',
      stage: 'The complete Contact experience will be delivered in PR 17.',
      metaTitle: 'Contact',
      metaDescription: 'Contact Gonzalo Herrera about engineering, leadership and collaboration.',
    },
    'not-found': {
      eyebrow: '404',
      title: 'Page not found',
      description: 'The page you are looking for does not exist or may have moved.',
      stage: 'Use the link below to continue browsing the portfolio.',
      metaTitle: 'Page not found',
      metaDescription: 'The requested portfolio page could not be found.',
      actionLabel: 'Back to home',
    },
  },
} as const satisfies PortfolioSiteContent;
