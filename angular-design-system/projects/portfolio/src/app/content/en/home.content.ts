import type { PortfolioHomeContent } from '../models/home-content.model';
import {
  mapPortfolioExperiencesToTimeline,
  selectFeaturedExperiences,
} from '../utils/experience-card.mapper';
import { EN_EXPERIENCE_CONTENT } from './experience.content';

export const EN_HOME_CONTENT = {
  metaTitle: 'Gonzalo Herrera | Frontend Tech Lead & AI-Augmented Engineer',
  metaDescription:
    'Frontend leadership, Angular architecture, design systems and AI-augmented engineering by Gonzalo Herrera.',
  metaTitleIsAbsolute: true,
  hero: {
    eyebrow: 'Frontend leadership · Angular · AI',
    title: 'Think bigger. Build smarter.',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    description: 'Helping teams build better software through engineering, leadership and AI.',
    visualLabel: 'Professional focus areas',
    primaryAction: {
      label: 'View selected work',
      pageId: 'projects',
      variant: 'primary',
    },
    secondaryAction: {
      label: 'About me',
      pageId: 'about',
      variant: 'secondary',
    },
    highlights: [
      { id: 'frontend-engineering', label: 'Engineering', value: 'Frontend systems' },
      { id: 'technical-leadership', label: 'Leadership', value: 'Clearer team decisions' },
      {
        id: 'ai-augmented-development',
        label: 'Applied AI',
        value: 'Smarter engineering workflows',
      },
    ],
  },
  expertise: {
    eyebrow: 'Areas of expertise',
    title: 'What I help teams improve',
    description:
      'A combination of frontend engineering, technical leadership and practical AI adoption.',
    items: [
      {
        id: 'frontend-engineering',
        iconLabel: '01',
        title: 'Frontend Engineering',
        description: 'Building maintainable, accessible and performant frontend applications.',
      },
      {
        id: 'technical-leadership',
        iconLabel: '02',
        title: 'Technical Leadership',
        description:
          'Helping teams make clearer decisions, improve collaboration and deliver with confidence.',
      },
      {
        id: 'angular-architecture',
        iconLabel: '03',
        title: 'Angular Architecture',
        description:
          'Designing scalable Angular applications, reusable systems and sustainable frontend foundations.',
      },
      {
        id: 'ai-augmented-development',
        iconLabel: '04',
        title: 'AI-Augmented Development',
        description:
          'Using AI to improve engineering workflows without replacing technical judgment.',
      },
      {
        id: 'developer-experience',
        iconLabel: '05',
        title: 'Developer Experience',
        description:
          'Reducing friction through better tooling, documentation and shared standards.',
      },
      {
        id: 'mentoring-code-quality',
        iconLabel: '06',
        title: 'Mentoring and Code Quality',
        description:
          'Supporting engineers through code reviews, feedback and practical technical guidance.',
      },
    ],
  },
  selectedProjects: {
    eyebrow: 'Selected work',
    title: 'Selected projects',
    description:
      'Projects that combine frontend architecture, reusable systems and AI-assisted engineering.',
    viewAllAction: {
      label: 'View all projects',
      pageId: 'projects',
      variant: 'ghost',
    },
    cardLabels: {
      projectPrefix: 'Project',
      featured: 'Featured',
      technologies: 'Technologies',
      links: 'Project links',
    },
    items: [
      {
        id: 'angular-design-system',
        title: 'Angular Design System',
        description:
          'A reusable Angular Design System built around design tokens, accessibility, composition and brand consistency.',
        status: 'in-progress',
        statusLabel: 'In progress',
        technologies: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'Design Tokens'],
        featured: true,
      },
      {
        id: 'ai-code-review-assistant',
        title: 'AI Code Review Assistant',
        description:
          'A concept for reviewing pull requests against engineering standards and project-specific guidelines.',
        status: 'concept',
        statusLabel: 'Concept',
      },
      {
        id: 'angular-accelerator-kit',
        title: 'Angular Accelerator Kit',
        description:
          'A practical starter-kit concept for consistent Angular foundations, architecture and development standards.',
        status: 'concept',
        statusLabel: 'Concept',
        technologies: ['Angular', 'TypeScript'],
      },
      {
        id: 'ai-toolkit-for-developers',
        title: 'AI Toolkit for Developers',
        description:
          'A concept for curating prompts, workflows and reusable resources for AI-augmented software development.',
        status: 'concept',
        statusLabel: 'Concept',
      },
    ],
  },
  experience: {
    eyebrow: 'Experience preview',
    title: 'Experience',
    description:
      'A career focused on frontend engineering, technical leadership and building better ways of working.',
    verificationNotice:
      'Company, role and date details will be published here once they are available from a verified source.',
    viewAllAction: {
      label: 'View full experience',
      pageId: 'experience',
      variant: 'ghost',
    },
    cardLabels: EN_EXPERIENCE_CONTENT.timeline.labels.card,
    items: mapPortfolioExperiencesToTimeline(
      selectFeaturedExperiences(EN_EXPERIENCE_CONTENT.timeline.items),
      EN_EXPERIENCE_CONTENT.timeline.labels,
    ),
  },
  featuredContent: {
    eyebrow: 'Ideas and practice',
    title: 'Featured content',
    description:
      'Ideas and practical lessons about Angular, engineering leadership and AI-assisted development.',
    typeLabels: {
      article: 'Article',
      project: 'Project',
      linkedin: 'LinkedIn',
      resource: 'Resource',
      talk: 'Talk',
    },
    tagsLabel: 'Content topics',
    item: {
      id: 'beyond-chat-ai-agents',
      type: 'article',
      eyebrow: 'Editorial preview',
      title: 'Beyond chat: building AI agents that do real work',
      description:
        'A practical look at moving from conversational AI to useful engineering workflows while keeping technical judgment in the loop.',
      link: {
        label: 'Explore content',
        pageId: 'content',
        variant: 'ghost',
      },
      tags: ['AI Agents', 'Engineering Workflows', 'Technical Judgment'],
    },
  },
  contact: {
    eyebrow: 'Start a conversation',
    title: 'Let’s build something better.',
    description: 'Have a project, opportunity or engineering challenge worth discussing?',
    actions: [
      {
        label: 'Get in touch',
        pageId: 'contact',
        variant: 'primary',
      },
    ],
  },
} as const satisfies PortfolioHomeContent;
