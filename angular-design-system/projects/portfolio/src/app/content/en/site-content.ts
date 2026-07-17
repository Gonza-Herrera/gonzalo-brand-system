import type { PortfolioSiteContent } from '../models/site-content.model';

export const EN_SITE_CONTENT: PortfolioSiteContent = {
  identity: {
    name: 'Gonzalo Herrera',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    tagline: 'Think bigger. Build smarter.',
    description: 'Helping teams build better software through engineering, leadership and AI.',
  },
  pages: {
    home: {
      eyebrow: 'Portfolio foundation',
      title: 'Gonzalo Herrera',
      description: 'The production application foundation is ready for the future home experience.',
    },
    about: {
      eyebrow: 'About',
      title: 'Professional story',
      description:
        'This page will introduce the experience, values and perspective behind the work.',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Engineering and leadership experience',
      description:
        'This page will present roles, outcomes and the teams supported throughout the career journey.',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Selected projects and case studies',
      description:
        'This page will document representative product work, decisions and measurable outcomes.',
    },
    content: {
      eyebrow: 'Content',
      title: 'Articles, talks and practical insights',
      description:
        'This page will collect educational material about frontend engineering, leadership and AI.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Start a thoughtful conversation',
      description:
        'This page will provide clear ways to discuss engineering, leadership and collaboration.',
    },
    notFound: {
      eyebrow: '404',
      title: 'Page not found',
      description: 'The page you are looking for does not exist or has moved.',
    },
  },
};
