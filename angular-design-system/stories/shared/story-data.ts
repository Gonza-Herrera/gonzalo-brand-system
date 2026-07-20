import type {
  GhArticleCardData,
  GhContactAction,
  GhContentHighlightData,
  GhExperienceCardData,
  GhFeatureItem,
  GhFooterGroup,
  GhHeroAction,
  GhNavigationItem,
  GhProjectCardData,
} from 'gh-design-system';

export const STORY_PROJECT: GhProjectCardData = {
  title: 'GH Design System',
  description:
    'A token-driven Angular library for building accessible, responsive portfolio experiences.',
  technologies: ['Angular', 'TypeScript', 'Sass', 'Storybook'],
  imageSrc: '/cards/project-design-system.svg',
  imageAlt: 'Abstract pastel shapes representing a design system',
  projectUrl: '#project',
  repositoryUrl: 'https://github.com/',
  status: 'completed',
  featured: true,
};

export const STORY_ARTICLE: GhArticleCardData = {
  title: 'Designing accessible Angular forms',
  href: '#article',
  excerpt: 'Practical patterns for labels, errors, focus management, and validation feedback.',
  imageSrc: '/cards/article-angular-forms.svg',
  imageAlt: 'Abstract illustration of an Angular form',
  publishedAt: 'May 16, 2026',
  readingTime: '7 min read',
  category: 'Accessibility',
  featured: true,
  linkLabel: 'Read article',
};

export const STORY_EXPERIENCE: GhExperienceCardData = {
  role: 'Senior Frontend Engineer',
  company: 'Demonstration Company',
  startDate: '2023',
  current: true,
  currentLabel: 'Present',
  location: 'Remote, Argentina',
  workMode: 'remote',
  description:
    'Leading design-system architecture and accessible product experiences across Angular applications.',
  responsibilities: [
    'Shape reusable Angular foundations with product and engineering teams.',
    'Review implementation decisions for maintainability and accessibility.',
  ],
  achievements: [
    'Reduced duplicated UI code through composable primitives.',
    'Introduced automated accessibility checks in the delivery workflow.',
  ],
  technologies: ['Angular', 'TypeScript', 'Design systems'],
  companyLogoSrc: '/cards/demonstration-company.svg',
  companyLogoAlt: 'Demonstration Company mark',
};

export const STORY_EXPERIENCES: readonly GhExperienceCardData[] = [
  STORY_EXPERIENCE,
  {
    role: 'Frontend Engineer',
    company: 'Product Studio',
    startDate: '2020',
    endDate: '2023',
    location: 'Tucumán, Argentina',
    workMode: 'hybrid',
    description: 'Built and maintained responsive product interfaces for distributed teams.',
    technologies: ['Angular', 'RxJS', 'Sass'],
  },
];

export const STORY_NAVIGATION_ITEMS: readonly GhNavigationItem[] = [
  { label: 'Work', href: '#work', active: true },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
  { label: 'GitHub', href: 'https://github.com/', external: true },
];

export const STORY_FOOTER_GROUPS: readonly GhFooterGroup[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Projects', href: '#projects' },
      { label: 'Experience', href: '#experience' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/', external: true },
    ],
  },
];

export const STORY_HERO_ACTIONS: readonly GhHeroAction[] = [
  { label: 'View projects', href: '#projects', variant: 'primary' },
  { label: 'Contact me', href: 'mailto:hello@example.com', variant: 'secondary' },
];

export const STORY_CONTACT_ACTIONS: readonly GhContactAction[] = [
  { label: 'Send an email', href: 'mailto:hello@example.com', variant: 'primary' },
  {
    label: 'View LinkedIn',
    href: 'https://www.linkedin.com/',
    external: true,
    variant: 'secondary',
  },
];

export const STORY_FEATURES: readonly GhFeatureItem[] = [
  {
    eyebrow: 'Foundation',
    iconLabel: 'Tokens',
    title: 'Token driven',
    description: 'Semantic tokens keep every composition coherent across light and dark themes.',
  },
  {
    eyebrow: 'Quality',
    iconLabel: 'A11y',
    title: 'Accessible by default',
    description: 'Semantics, keyboard behavior, and focus states are part of each public API.',
  },
  {
    eyebrow: 'Workflow',
    iconLabel: 'Docs',
    title: 'Documented in isolation',
    description: 'Storybook makes visual states and responsive behavior easy to inspect.',
  },
];

export const STORY_HIGHLIGHT: GhContentHighlightData = {
  type: 'article',
  eyebrow: 'Featured writing',
  title: 'A practical approach to resilient design systems',
  description: 'How tokens, composition, and accessibility checks support sustainable UI delivery.',
  href: 'https://example.com/design-systems',
  linkLabel: 'Read the article',
  external: true,
  imageSrc: '/cards/article-angular-forms.svg',
  imageAlt: 'Abstract shapes illustrating connected interface elements',
  tags: ['Design systems', 'Angular', 'Accessibility'],
};
