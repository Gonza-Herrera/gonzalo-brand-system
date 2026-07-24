import type { PortfolioSiteShellContent } from '../models/site-content.model';

export const EN_SITE_SHELL_CONTENT = {
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
} as const satisfies PortfolioSiteShellContent;
