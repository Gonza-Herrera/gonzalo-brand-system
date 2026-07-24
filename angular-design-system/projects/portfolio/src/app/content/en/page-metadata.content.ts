import type { PortfolioPageId, PortfolioPageMetadata } from '../models/page-content.model';

export const EN_PAGE_METADATA = {
  home: {
    metaTitle: 'Gonzalo Herrera | Frontend Tech Lead & AI-Augmented Engineer',
    metaDescription:
      'Frontend Tech Lead and AI-Augmented Engineer specializing in Angular, scalable frontend architecture, technical leadership and better software delivery.',
    metaTitleIsAbsolute: true,
  },
  about: {
    metaTitle: 'About',
    metaDescription:
      'Learn more about Gonzalo Herrera, his frontend engineering journey, leadership experience and approach to building maintainable software with Angular and AI.',
  },
  experience: {
    metaTitle: 'Experience',
    metaDescription:
      'Explore Gonzalo Herrera’s professional experience in frontend engineering, Angular development, technical leadership and software delivery.',
  },
  projects: {
    metaTitle: 'Projects',
    metaDescription:
      'Explore selected projects by Gonzalo Herrera focused on Angular, frontend architecture, design systems, developer experience and AI-assisted engineering.',
  },
  content: {
    metaTitle: 'Content',
    metaDescription:
      'Articles, ideas and practical insights about Angular, frontend engineering, technical leadership, code quality and AI-augmented software development.',
  },
  contact: {
    metaTitle: 'Contact',
    metaDescription:
      'Contact Gonzalo Herrera to discuss frontend engineering, Angular, technical leadership, collaboration and software opportunities.',
  },
  'not-found': {
    metaTitle: 'Page not found',
    metaDescription:
      'The page you are looking for could not be found. Return to Gonzalo Herrera’s portfolio and continue exploring.',
  },
} as const satisfies Readonly<Record<PortfolioPageId, PortfolioPageMetadata>>;
