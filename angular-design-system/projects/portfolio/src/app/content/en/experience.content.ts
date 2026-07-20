import type {
  PortfolioExperienceContent,
  PortfolioProfessionalExperienceContent,
} from '../models/experience-content.model';

// Employment records stay empty until employer, role and date data is available from an
// approved repository source. This collection is also the source for Home's preview.
export const EN_PROFESSIONAL_EXPERIENCES: readonly PortfolioProfessionalExperienceContent[] = [];

export const EN_EXPERIENCE_CONTENT = {
  metaTitle: 'Experience',
  metaDescription:
    'Explore Gonzalo Herrera’s experience in frontend engineering, Angular architecture, technical leadership and AI-augmented software development.',
  hero: {
    eyebrow: 'Experience',
    title: 'Building frontend products, engineering systems and stronger teams.',
    description:
      'My experience combines frontend development, Angular architecture, technical leadership and continuous improvement of engineering practices.',
    visualLabel: 'Experience focus areas',
    visualTitle: 'From implementation to engineering impact',
    highlights: [
      { id: 'frontend-engineering', label: 'Frontend Engineering' },
      { id: 'angular-architecture', label: 'Angular Architecture' },
      { id: 'technical-leadership', label: 'Technical Leadership' },
      { id: 'ai-augmented-development', label: 'AI-Augmented Development' },
    ],
  },
  summary: {
    eyebrow: 'Career summary',
    title: 'A path from frontend delivery to broader engineering impact',
    paragraphs: [
      'My professional path has grown from hands-on frontend implementation toward shaping architecture, technical decisions and reusable foundations.',
      'Along the way, my contribution expanded to include code quality, delivery practices, collaboration and practical mentoring that helps teams work with more clarity.',
      'Today, I work at the intersection of frontend engineering, technical leadership and responsible AI-assisted development.',
    ],
    focusAreasLabel: 'Career focus areas',
    focusAreas: [
      'Product delivery',
      'Frontend architecture',
      'Code quality',
      'Team collaboration',
      'Technical mentoring',
      'Continuous improvement',
    ],
  },
  timeline: {
    eyebrow: 'Professional experience',
    title: 'Career timeline',
    description:
      'Roles are presented in the order supplied by verified source data; dates are never inferred, sorted or used to calculate tenure.',
    verificationNotice:
      'Employer, role and date details are not yet available from an approved repository source. They will be added here only after verification.',
    labels: {
      card: {
        at: 'at',
        responsibilities: 'Responsibilities',
        achievements: 'Selected contributions',
        technologies: 'Technologies',
      },
      current: 'Current',
      workModes: {
        remote: 'Remote',
        hybrid: 'Hybrid',
        onsite: 'On-site',
      },
    },
    items: EN_PROFESSIONAL_EXPERIENCES,
  },
  leadership: {
    eyebrow: 'Leadership and engineering impact',
    title: 'Impact beyond implementation',
    description:
      'As my responsibilities evolved, my contribution expanded from delivering features to improving architecture, quality, collaboration and technical decision-making.',
    items: [
      {
        id: 'frontend-architecture',
        iconLabel: '01',
        title: 'Frontend Architecture',
        description:
          'Define maintainable structures, reusable patterns and clear boundaries for Angular applications.',
      },
      {
        id: 'code-review-quality',
        iconLabel: '02',
        title: 'Code Review and Quality',
        description:
          'Review pull requests with a focus on clarity, maintainability, consistency and shared learning.',
      },
      {
        id: 'technical-mentoring',
        iconLabel: '03',
        title: 'Technical Mentoring',
        description:
          'Help engineers understand decisions, improve implementation quality and gain confidence.',
      },
      {
        id: 'engineering-standards',
        iconLabel: '04',
        title: 'Engineering Standards',
        description:
          'Create conventions and documentation that reduce ambiguity and improve collaboration.',
      },
      {
        id: 'delivery-collaboration',
        iconLabel: '05',
        title: 'Delivery and Collaboration',
        description:
          'Work with product, design and backend teams to identify risks and make implementation decisions earlier.',
      },
      {
        id: 'developer-experience',
        iconLabel: '06',
        title: 'Developer Experience',
        description:
          'Improve tooling, shared foundations and workflows that make everyday engineering work clearer.',
      },
    ],
  },
  waysOfWorking: {
    eyebrow: 'Ways of working',
    title: 'How I work in product and engineering teams',
    description:
      'I prefer working with clear context, shared standards, early collaboration and continuous feedback.',
    items: [
      {
        id: 'understand-problem',
        iconLabel: '01',
        title: 'Understand the problem',
        description:
          'Clarify the product goal, users, constraints and risks before defining the implementation.',
      },
      {
        id: 'small-decisions',
        iconLabel: '02',
        title: 'Break work into small decisions',
        description:
          'Reduce complexity by separating large problems into smaller, reviewable technical decisions.',
      },
      {
        id: 'collaborate-early',
        iconLabel: '03',
        title: 'Collaborate early',
        description:
          'Discuss architecture, UX and API implications before changes become expensive.',
      },
      {
        id: 'deliver-incrementally',
        iconLabel: '04',
        title: 'Deliver incrementally',
        description: 'Prefer small, understandable pull requests that tell one clear story.',
      },
      {
        id: 'review-constructively',
        iconLabel: '05',
        title: 'Review constructively',
        description:
          'Use feedback to improve both the solution and the shared understanding of the team.',
      },
      {
        id: 'document-decisions',
        iconLabel: '06',
        title: 'Document relevant decisions',
        description: 'Record decisions that future engineers will need to understand or revisit.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Selected capabilities',
    title: 'Capabilities developed through experience',
    description:
      'A focused view of the engineering, leadership and tooling capabilities supported by the repository’s approved brand and technical sources.',
    itemsLabel: 'Capabilities',
    groups: [
      {
        id: 'frontend-engineering',
        title: 'Frontend Engineering',
        items: [
          'Angular application development',
          'TypeScript',
          'Signals',
          'Responsive interfaces',
          'Accessibility',
          'Performance',
        ],
      },
      {
        id: 'architecture-quality',
        title: 'Architecture and Quality',
        items: [
          'Angular architecture',
          'Clean Architecture',
          'Design systems',
          'Reusable components',
          'Code review',
          'Technical documentation',
        ],
      },
      {
        id: 'leadership-collaboration',
        title: 'Leadership and Collaboration',
        items: [
          'Technical decision-making',
          'Technical mentoring',
          'Shared engineering standards',
          'Clear feedback',
          'Team enablement',
        ],
      },
      {
        id: 'delivery-tooling',
        title: 'Delivery and Tooling',
        items: ['Git workflows', 'Unit testing', 'Storybook', 'SCSS', 'Design tokens'],
      },
      {
        id: 'ai-augmented-engineering',
        title: 'AI-Augmented Engineering',
        items: [
          'AI-assisted code review',
          'Documentation workflows',
          'Architecture exploration',
          'Refactoring support',
          'Knowledge organization',
        ],
      },
    ],
  },
  careerDirection: {
    eyebrow: 'Career direction',
    title: 'Where this experience is leading',
    paragraphs: [
      'My current focus is to continue growing in technical leadership roles where I can combine frontend architecture, team enablement and AI-assisted engineering.',
      'I am especially interested in environments where engineering quality, product thinking and continuous improvement are treated as shared responsibilities.',
    ],
    pointsLabel: 'Professional direction',
    points: [
      { id: 'frontend-tech-leadership', label: 'Frontend Tech Leadership' },
      { id: 'angular-architecture', label: 'Angular Architecture' },
      { id: 'design-systems', label: 'Design Systems' },
      { id: 'developer-experience', label: 'Developer Experience' },
      { id: 'ai-augmented-engineering', label: 'AI-Augmented Engineering' },
      { id: 'engineering-mentoring', label: 'Engineering Mentoring' },
    ],
    projectsAction: {
      label: 'Explore selected projects',
      pageId: 'projects',
      variant: 'ghost',
    },
  },
  contact: {
    eyebrow: 'Start a conversation',
    title: 'Looking for frontend leadership or Angular expertise?',
    description:
      'If you are building a frontend platform, evolving an Angular architecture or improving engineering practices, let’s connect.',
    actions: [
      { label: 'Get in touch', pageId: 'contact', variant: 'primary' },
      { label: 'View selected projects', pageId: 'projects', variant: 'secondary' },
    ],
  },
} as const satisfies PortfolioExperienceContent;
