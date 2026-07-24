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

export const ES_FEATURED_PROJECT_PREVIEW = {
  id: 'angular-design-system',
  slug: 'angular-design-system',
  title: 'Angular Design System',
  shortDescription:
    'Un Design System reutilizable en Angular construido alrededor de design tokens, accesibilidad, composición y fundamentos consistentes de marca.',
  status: 'in-progress',
  statusLabel: 'En desarrollo',
  category: 'design-system',
  categoryLabel: 'Design System',
  technologies: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'Design Tokens'],
  capabilities: ['Accesibilidad', 'SSR', 'Temas claro y oscuro', 'APIs públicas tipadas'],
  featured: true,
  order: 1,
  caseStudy: { available: true },
} as const satisfies PortfolioProjectPreviewContent;

export const ES_EXPERIENCE_TIMELINE_LABELS = {
  card: {
    at: 'en',
    responsibilities: 'Responsabilidades',
    achievements: 'Aportes destacados',
    technologies: 'Tecnologías',
    capabilities: 'Capacidades',
  },
  current: 'Actualidad',
  workModes: {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    onsite: 'Presencial',
  },
} as const satisfies PortfolioExperienceTimelineLabels;

export const ES_HOME_EXPERIENCE_IDENTITIES = [
  {
    id: 'icbc-frontend-developer',
    order: 1,
    company: 'Banco ICBC',
    role: 'Frontend Developer',
    startDate: 'Febrero de 2023',
    endDate: 'Actualidad',
    current: true,
  },
  {
    id: 'endava-team-leader',
    order: 2,
    company: 'Endava',
    role: 'Team Leader',
    startDate: 'Junio de 2021',
    endDate: 'Enero de 2023',
    current: false,
  },
  {
    id: 'vortex-frontend-developer',
    order: 3,
    company: 'Vortex',
    role: 'Frontend Developer',
    startDate: 'Febrero de 2020',
    endDate: 'Mayo de 2021',
    current: false,
  },
] as const satisfies readonly PortfolioExperiencePreviewIdentity[];

export const ES_FEATURED_CONTENT_PREVIEW = {
  id: 'building-ai-agents',
  slug: 'building-ai-agents',
  title: 'Más allá del chat: agentes de IA que hacen trabajo real',
  excerpt:
    'Una guía práctica para convertir la asistencia con IA en flujos de ingeniería acotados, manteniendo explícitos el criterio técnico y la revisión humana.',
  type: 'guide',
  typeLabel: 'Guía',
  category: 'ai-engineering',
  categoryLabel: 'Ingeniería con IA',
  status: 'published',
  statusLabel: 'Publicado',
  tags: ['Agentes de IA', 'Flujos de Ingeniería', 'Criterio Técnico'],
  featured: true,
  order: 3,
  source: { type: 'internal' },
  detailAvailable: true,
} as const satisfies PortfolioContentItem;
