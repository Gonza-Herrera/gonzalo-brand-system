import type {
  PortfolioExperienceContent,
  PortfolioProfessionalExperienceContent,
} from '../models/experience-content.model';
import {
  EN_EXPERIENCE_TIMELINE_LABELS,
  EN_HOME_EXPERIENCE_IDENTITIES,
} from './home-previews.content';
import { EN_PAGE_METADATA } from './page-metadata.content';

// Approved professional history. This collection is also the single source for Home's preview.
export const EN_PROFESSIONAL_EXPERIENCES: readonly PortfolioProfessionalExperienceContent[] = [
  {
    ...EN_HOME_EXPERIENCE_IDENTITIES[0],
    summary: [
      'As a Frontend Developer, I contribute to the development and evolution of enterprise financial applications. My work focuses on building maintainable Angular solutions, delivering consistent user experiences and collaborating with multidisciplinary teams.',
      'Beyond feature development, I participate in technical discussions, code reviews and continuous improvement initiatives that help maintain reliable engineering practices across the project.',
    ],
    responsibilities: [
      'Develop and maintain enterprise Angular applications.',
      'Build reusable user interface components.',
      'Integrate frontend applications with REST APIs.',
      'Collaborate with backend, QA and product teams.',
      'Participate in code reviews and technical discussions.',
      'Improve application maintainability and code quality.',
      'Work within Agile and Scrum development practices.',
      'Contribute to shared frontend engineering standards.',
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Material',
      'REST APIs',
      'Git',
      'Azure DevOps',
      'Scrum',
    ],
  },
  {
    ...EN_HOME_EXPERIENCE_IDENTITIES[1],
    summary: [
      'As a Team Leader, I led software engineering teams while balancing people leadership, delivery coordination and technical collaboration. I focused on creating an environment where communication, continuous learning and engineering quality could become part of the team’s daily work.',
      'I worked closely with engineers, project managers and stakeholders to organize delivery, support professional growth and promote effective collaboration across the team.',
    ],
    responsibilities: [
      'Lead and support software engineering teams.',
      'Provide regular feedback, mentoring and professional guidance.',
      'Coordinate project planning and delivery activities.',
      'Facilitate communication between technical and business stakeholders.',
      'Promote engineering practices and coding standards.',
      'Participate in technical reviews and architecture discussions.',
      'Encourage collaboration and continuous improvement.',
      'Help teams work toward clear and shared objectives.',
    ],
    technologies: ['Angular', 'TypeScript', 'Git', 'Azure DevOps'],
    capabilities: ['Technical Leadership', 'Team Leadership', 'Mentoring', 'Agile', 'Scrum'],
  },
  {
    ...EN_HOME_EXPERIENCE_IDENTITIES[2],
    summary: [
      'I worked as part of multidisciplinary teams delivering web applications from initial requirements through production releases. I collaborated closely with frontend and backend engineers to build maintainable solutions and resolve integration challenges before they affected delivery.',
      'During this period, I strengthened my experience in Angular development, REST API integration and collaborative frontend engineering throughout the software development lifecycle.',
    ],
    responsibilities: [
      'Develop web applications with Angular.',
      'Build reusable and maintainable frontend components.',
      'Integrate frontend applications with REST APIs.',
      'Collaborate with backend developers.',
      'Participate in technical planning and requirement analysis.',
      'Improve application quality and maintainability.',
      'Support production releases.',
      'Resolve defects and technical issues.',
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'Git', 'Scrum'],
  },
  {
    id: 'develative-frontend-developer',
    order: 4,
    company: 'Develative',
    role: 'Frontend Developer',
    startDate: 'August 2019',
    endDate: 'January 2020',
    current: false,
    summary: [
      'I developed responsive web applications while collaborating with other developers to deliver reusable and maintainable frontend solutions. My work included identifying defects, improving software quality and supporting testing and deployment activities.',
      'This experience helped strengthen my frontend development foundations and collaborative engineering practices.',
    ],
    responsibilities: [
      'Develop responsive web interfaces.',
      'Build reusable frontend components.',
      'Identify and resolve software defects.',
      'Improve code quality and maintainability.',
      'Collaborate with other developers.',
      'Participate in testing and deployment activities.',
    ],
    technologies: ['Angular', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    id: 'develative-project-manager',
    order: 5,
    company: 'Develative',
    role: 'Project Manager',
    startDate: 'April 2017',
    endDate: 'July 2019',
    current: false,
    summary: [
      'I began my professional career coordinating software projects and working closely with clients and development teams. This role helped me develop communication, planning and leadership skills that later became an important foundation for my engineering career.',
      'I monitored project budgets and timelines, supported development teams and maintained communication with stakeholders to help projects progress toward their objectives.',
    ],
    responsibilities: [
      'Coordinate software development projects.',
      'Plan project timelines and priorities.',
      'Monitor project budgets and delivery progress.',
      'Communicate with clients and stakeholders.',
      'Support development teams.',
      'Help teams stay focused on project objectives.',
      'Contribute to delivery and process improvements.',
    ],
    capabilities: [
      'Project Management',
      'Agile',
      'Scrum',
      'Planning',
      'Stakeholder Communication',
      'Team Coordination',
    ],
  },
];

export const EN_EXPERIENCE_CONTENT = {
  ...EN_PAGE_METADATA.experience,
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
    eyebrow: 'Career',
    title: 'Professional experience',
    description:
      'A journey from project coordination to frontend engineering and technical leadership, shaped by collaboration, continuous learning and a focus on building maintainable software.',
    labels: EN_EXPERIENCE_TIMELINE_LABELS,
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
