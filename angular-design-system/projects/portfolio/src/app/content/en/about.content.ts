import type { PortfolioAboutContent } from '../models/about-content.model';

export const EN_ABOUT_CONTENT = {
  metaTitle: 'About',
  metaDescription:
    'Learn more about Gonzalo Herrera, his frontend engineering journey, leadership experience and approach to building maintainable software with Angular and AI.',
  hero: {
    eyebrow: 'About me',
    title: 'Engineering, leadership and better ways of building software.',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    description:
      'I focus on helping teams create maintainable products, clearer systems and stronger engineering practices.',
    secondaryText:
      'My work connects frontend architecture, technical leadership and practical AI adoption around one goal: helping teams build better software.',
    visualLabel: 'Professional focus areas',
    focuses: [
      { id: 'frontend-engineering', label: 'Frontend Engineering' },
      { id: 'technical-leadership', label: 'Technical Leadership' },
      { id: 'angular-architecture', label: 'Angular Architecture' },
      { id: 'ai-augmented-development', label: 'AI-Augmented Development' },
      { id: 'design-systems', label: 'Design Systems' },
      { id: 'developer-experience', label: 'Developer Experience' },
    ],
  },
  story: {
    eyebrow: 'Professional story',
    title: 'From building interfaces to helping teams build better systems',
    paragraphs: [
      'I started by focusing on frontend implementation: building interfaces, integrating APIs and solving product requirements.',
      'Over time, my role expanded beyond writing code. I became more involved in architecture, code reviews, technical decisions, mentoring and improving how teams work together.',
      'Today, I combine frontend engineering, technical leadership and practical AI adoption to help teams build software that is easier to understand, maintain and evolve.',
    ],
    highlights: [
      {
        id: 'frontend-foundations',
        label: 'Frontend foundations',
        description: 'Building scalable, accessible and maintainable applications.',
      },
      {
        id: 'technical-leadership',
        label: 'Technical leadership',
        description: 'Improving decisions, collaboration and shared engineering standards.',
      },
      {
        id: 'ai-augmented-workflows',
        label: 'AI-augmented workflows',
        description: 'Using AI to reduce friction and support better engineering work.',
      },
      {
        id: 'developer-experience',
        label: 'Developer experience',
        description: 'Creating tools, documentation and systems that help teams move with clarity.',
      },
    ],
    experienceAction: {
      label: 'View my experience',
      pageId: 'experience',
      variant: 'ghost',
    },
  },
  philosophy: {
    eyebrow: 'Engineering philosophy',
    title: 'How I think about software engineering',
    description:
      'Good software is not only code that works. It should also be understandable, maintainable and useful for the people who build and use it.',
    items: [
      {
        id: 'clarity',
        iconLabel: '01',
        title: 'Clarity over cleverness',
        description: 'Prefer solutions that the team can understand, explain and evolve.',
      },
      {
        id: 'simplicity',
        iconLabel: '02',
        title: 'Simplicity before abstraction',
        description: 'Introduce complexity only when the problem and evidence make it necessary.',
      },
      {
        id: 'consistency',
        iconLabel: '03',
        title: 'Consistency over preference',
        description: 'Shared conventions reduce friction and make collaboration more predictable.',
      },
      {
        id: 'maintainability',
        iconLabel: '04',
        title: 'Maintainability is a product requirement',
        description: 'Delivery matters, and so does the ability to safely support what comes next.',
      },
      {
        id: 'accessibility',
        iconLabel: '05',
        title: 'Accessibility from the beginning',
        description:
          'Inclusive behavior belongs in the foundation, not in a final correction pass.',
      },
      {
        id: 'change-ready-architecture',
        iconLabel: '06',
        title: 'Architecture should support change',
        description: 'Structure systems around clear boundaries and realistic paths for evolution.',
      },
    ],
  },
  leadership: {
    eyebrow: 'Leadership approach',
    title: 'Technical leadership is about creating clarity',
    paragraphs: [
      'For me, technical leadership is not about having every answer. It is about helping a team understand the problem, evaluate trade-offs and make decisions with enough context.',
      'It also means creating an environment where feedback is useful, standards are shared and engineers can take ownership of their work.',
    ],
    practices: [
      {
        id: 'context',
        iconLabel: '01',
        title: 'Context before instructions',
        description: 'Explain why a decision matters instead of only defining what must be done.',
      },
      {
        id: 'feedback',
        iconLabel: '02',
        title: 'Feedback as a tool',
        description:
          'Use code reviews and conversations to improve the solution and support professional growth.',
      },
      {
        id: 'shared-standards',
        iconLabel: '03',
        title: 'Shared standards',
        description:
          'Create conventions that reduce unnecessary decisions and make collaboration easier.',
      },
      {
        id: 'ownership',
        iconLabel: '04',
        title: 'Ownership with context',
        description: 'Give engineers enough context and trust to make responsible decisions.',
      },
      {
        id: 'practical-mentoring',
        iconLabel: '05',
        title: 'Practical mentoring',
        description: 'Turn technical challenges into opportunities for learning and improvement.',
      },
    ],
  },
  aiEngineering: {
    eyebrow: 'AI-augmented engineering',
    title: 'Using AI as an engineering multiplier',
    description:
      'I use AI to accelerate repetitive work, explore alternatives, improve documentation and support engineering workflows.',
    supportingText:
      'The goal is not to replace technical judgment. It is to give engineers more time and context to make better decisions.',
    useCases: [
      {
        id: 'code-review-support',
        iconLabel: '01',
        title: 'Code review support',
        description:
          'Compare implementation decisions against project standards and surface areas that need human review.',
      },
      {
        id: 'documentation-assistance',
        iconLabel: '02',
        title: 'Documentation assistance',
        description:
          'Transform technical context into clearer guides, examples and shared references.',
      },
      {
        id: 'test-analysis',
        iconLabel: '03',
        title: 'Test analysis',
        description:
          'Summarize failures, identify patterns and focus investigation on relevant causes.',
      },
      {
        id: 'architecture-exploration',
        iconLabel: '04',
        title: 'Architecture exploration',
        description: 'Evaluate alternatives and trade-offs before committing to an implementation.',
      },
      {
        id: 'refactoring-support',
        iconLabel: '05',
        title: 'Refactoring support',
        description: 'Explore smaller, reviewable changes while preserving behavior and intent.',
      },
      {
        id: 'knowledge-organization',
        iconLabel: '06',
        title: 'Knowledge organization',
        description: 'Structure scattered engineering context so teams can find and reuse it.',
      },
    ],
    principleLabel: 'A principle for responsible adoption',
    principle: 'AI should amplify engineering judgment, not replace it.',
  },
  principles: {
    eyebrow: 'Core principles',
    title: 'Principles that guide my work',
    description:
      'These principles help turn technical decisions into software and team practices that remain useful over time.',
    items: [
      {
        id: 'understand-before-building',
        iconLabel: '01',
        title: 'Understand before building',
        description:
          'The quality of a solution depends on how well the problem and its constraints are understood.',
      },
      {
        id: 'explicit-decisions',
        iconLabel: '02',
        title: 'Make decisions explicit',
        description:
          'Document the reasoning, alternatives and trade-offs behind important technical choices.',
      },
      {
        id: 'sustainable-solutions',
        iconLabel: '03',
        title: 'Prefer sustainable solutions',
        description:
          'Optimize for delivery, maintenance, change and long-term ownership by the team.',
      },
      {
        id: 'clear-communication',
        iconLabel: '04',
        title: 'Communicate with clarity',
        description: 'Clear communication reduces ambiguity, rework and unnecessary complexity.',
      },
      {
        id: 'build-for-people',
        iconLabel: '05',
        title: 'Build for people',
        description:
          'Software should work for users and remain understandable for the engineers who maintain it.',
      },
      {
        id: 'continuous-learning',
        iconLabel: '06',
        title: 'Keep learning',
        description:
          'Learning and adapting are part of the engineering role as technology changes.',
      },
    ],
  },
  technicalFocus: {
    eyebrow: 'Capabilities',
    title: 'Technical focus',
    description:
      'The technologies matter, but the decisions, architecture and practices around them matter even more.',
    itemsLabel: 'Focus areas',
    groups: [
      {
        id: 'frontend-engineering',
        title: 'Frontend Engineering',
        items: [
          'TypeScript',
          'JavaScript',
          'HTML',
          'CSS',
          'SCSS',
          'Responsive Design',
          'Accessibility',
        ],
      },
      {
        id: 'angular-architecture',
        title: 'Angular Architecture',
        items: [
          'Angular',
          'Standalone Components',
          'Signals',
          'RxJS',
          'Routing',
          'Lazy Loading',
          'Reactive Forms',
          'HTTP Integration',
          'Design Systems',
          'Testing',
          'Performance',
        ],
      },
      {
        id: 'engineering-practices',
        title: 'Engineering Practices',
        items: [
          'Code Review',
          'Technical Documentation',
          'Architecture Decisions',
          'Testing Strategy',
          'CI/CD',
          'Git',
          'Agile Delivery',
        ],
      },
      {
        id: 'ai-augmented-development',
        title: 'AI-Augmented Development',
        items: [
          'Prompt Design',
          'AI-assisted Code Review',
          'Documentation Workflows',
          'Agent Exploration',
          'Development Automation',
          'Knowledge Systems',
        ],
      },
    ],
  },
  workingStyle: {
    eyebrow: 'Working style',
    title: 'How I work with teams',
    description:
      'I prefer a collaborative process where context is shared, decisions are visible and feedback improves both the work and the way the team works.',
    items: [
      {
        id: 'start-with-context',
        iconLabel: '01',
        title: 'Start with context',
        description:
          'Understand the product goal, technical constraints and people involved before proposing a solution.',
      },
      {
        id: 'smaller-decisions',
        iconLabel: '02',
        title: 'Break problems into smaller decisions',
        description:
          'Make complex work easier to discuss, validate and change as understanding grows.',
      },
      {
        id: 'collaborate-early',
        iconLabel: '03',
        title: 'Collaborate early',
        description: 'Share ideas and risks before implementation becomes expensive to change.',
      },
      {
        id: 'empathetic-review',
        iconLabel: '04',
        title: 'Review with empathy and precision',
        description:
          'Give feedback that is technically useful, respectful and focused on improving the result.',
      },
      {
        id: 'shared-documentation',
        iconLabel: '05',
        title: 'Document what must remain shared',
        description:
          'Keep important context available beyond a meeting, message or individual memory.',
      },
      {
        id: 'improve-the-system',
        iconLabel: '06',
        title: 'Improve the system, not only the task',
        description: 'Use each delivery to reduce friction and strengthen the next piece of work.',
      },
    ],
  },
  contact: {
    eyebrow: 'Start a conversation',
    title: 'Let’s build something better.',
    description:
      'If you are working on a frontend platform, Angular architecture, design system or AI-assisted engineering workflow, I would be glad to connect.',
    actions: [
      { label: 'Get in touch', pageId: 'contact', variant: 'primary' },
      { label: 'View experience', pageId: 'experience', variant: 'secondary' },
    ],
  },
} as const satisfies PortfolioAboutContent;
