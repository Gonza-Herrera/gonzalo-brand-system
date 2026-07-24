import type { PortfolioContentItem } from '../models/content-hub-content.model';
import type {
  PortfolioExperienceTimelineLabels,
  PortfolioProfessionalExperienceContent,
} from '../models/experience-content.model';
import type { PortfolioProjectPreviewContent } from '../models/projects-content.model';

type PortfolioExperiencePreviewIdentity = Pick<
  PortfolioProfessionalExperienceContent,
  'id' | 'order' | 'company' | 'role' | 'startDate' | 'endDate' | 'current'
>;

export const EN_FEATURED_PROJECT_PREVIEW = {
  id: 'angular-design-system',
  slug: 'angular-design-system',
  title: 'Angular Design System',
  shortDescription:
    'A reusable Angular Design System built around design tokens, accessibility, composition and consistent brand foundations.',
  status: 'in-progress',
  statusLabel: 'In progress',
  category: 'design-system',
  categoryLabel: 'Design System',
  technologies: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'Design Tokens'],
  capabilities: ['Accessibility', 'SSR', 'Light and dark themes', 'Typed public APIs'],
  featured: true,
  order: 1,
  caseStudy: { available: true },
} as const satisfies PortfolioProjectPreviewContent;

export const EN_EXPERIENCE_TIMELINE_LABELS = {
  card: {
    at: 'at',
    responsibilities: 'Responsibilities',
    achievements: 'Selected contributions',
    technologies: 'Technologies',
    capabilities: 'Capabilities',
  },
  current: 'Current',
  workModes: {
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'On-site',
  },
} as const satisfies PortfolioExperienceTimelineLabels;

export const EN_HOME_EXPERIENCE_IDENTITIES = [
  {
    id: 'icbc-frontend-developer',
    order: 1,
    company: 'ICBC Bank',
    role: 'Frontend Developer',
    startDate: 'February 2023',
    endDate: 'Present',
    current: true,
  },
  {
    id: 'endava-team-leader',
    order: 2,
    company: 'Endava',
    role: 'Team Leader',
    startDate: 'June 2021',
    endDate: 'January 2023',
    current: false,
  },
  {
    id: 'vortex-frontend-developer',
    order: 3,
    company: 'Vortex',
    role: 'Frontend Developer',
    startDate: 'February 2020',
    endDate: 'May 2021',
    current: false,
  },
] as const satisfies readonly PortfolioExperiencePreviewIdentity[];

export const EN_FEATURED_CONTENT_PREVIEW = {
  id: 'building-ai-agents',
  slug: 'building-ai-agents',
  title: 'Beyond chat: building AI agents that do real work',
  excerpt:
    'A practical guide to turning AI assistance into bounded engineering workflows while keeping technical judgment and human review explicit.',
  type: 'guide',
  typeLabel: 'Guide',
  category: 'ai-engineering',
  categoryLabel: 'AI Engineering',
  status: 'published',
  statusLabel: 'Published',
  tags: ['AI Agents', 'Engineering Workflows', 'Technical Judgment'],
  featured: true,
  order: 3,
  source: { type: 'internal' },
  detailAvailable: true,
} as const satisfies PortfolioContentItem;
