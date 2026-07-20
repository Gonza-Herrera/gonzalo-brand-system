import type { PortfolioProjectsContent } from '../models/projects-content.model';

export const EN_PROJECTS_CONTENT = {
  metaTitle: 'Projects',
  metaDescription:
    'Explore projects by Gonzalo Herrera focused on Angular, design systems, developer experience and AI-augmented software engineering.',
  hero: {
    eyebrow: 'Projects',
    title: 'Building systems, tools and ideas for better software development.',
    description:
      'A selection of projects focused on Angular, design systems, developer experience and AI-augmented engineering.',
    visualLabel: 'Project focus areas',
    focuses: ['Angular', 'Design Systems', 'Developer Experience', 'AI Engineering'],
  },
  overview: {
    eyebrow: 'Selected work',
    title: 'Reusable foundations and practical engineering ideas',
    description:
      'Projects that explore reusable frontend foundations, technical workflows and practical applications of AI in software engineering.',
    statusNote:
      'Each project shows its current, evidence-based status. Concepts are kept distinct from work already in development.',
    categoriesLabel: 'Project categories',
  },
  grid: {
    eyebrow: 'Project catalogue',
    title: 'Projects and case studies',
    description:
      'The Angular Design System includes a complete case study. The remaining entries document concepts without implying that they are implemented products.',
    cardLabels: {
      projectPrefix: 'Project',
      featured: 'Featured',
      technologies: 'Technologies',
      links: 'Project links',
      caseStudy: 'View case study',
      repository: 'View repository',
    },
  },
  detail: {
    backToProjects: 'Back to projects',
    summaryTitle: 'Project summary',
    summaryDescription: 'A concise view of the project’s current scope and technical focus.',
    status: 'Status',
    type: 'Type',
    role: 'Role',
    focus: 'Focus',
    technologies: 'Technologies',
    responsibilities: 'Responsibilities',
    aiDisclosure: 'AI collaboration',
    decisionContext: 'Context',
    decision: 'Decision',
    rationale: 'Why',
    tradeOffs: 'Trade-offs',
    phaseItems: 'Main elements',
    phaseOutcome: 'Current outcome',
    challengeResponse: 'Response',
    relatedEyebrow: 'Continue exploring',
    relatedTitle: 'Related projects',
    relatedDescription: 'Other projects connected by technology or engineering focus.',
    notFoundEyebrow: 'Projects',
    notFoundTitle: 'Project not found',
    notFoundDescription: 'The project you are looking for does not exist or is not available.',
    notFoundMetaTitle: 'Project not found',
    notFoundMetaDescription: 'The requested portfolio project could not be found.',
  },
  contact: {
    eyebrow: 'Start a conversation',
    title: 'Have a project or engineering challenge worth discussing?',
    description:
      'If you are working on Angular architecture, a design system or an AI-assisted engineering workflow, let’s connect.',
    actions: [
      { label: 'Get in touch', pageId: 'contact', variant: 'primary' },
      { label: 'View experience', pageId: 'experience', variant: 'secondary' },
    ],
  },
  items: [
    {
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
      caseStudy: {
        available: true,
        eyebrow: 'Case study · Design System',
        summary: {
          title: 'Project summary',
          description:
            'An evolving Angular workspace that connects brand foundations, generated tokens, reusable components and real consumer applications.',
          type: 'Open design-system workspace',
          role: 'Product owner, designer and frontend engineer',
          focus: 'Reusable Angular foundations and developer experience',
        },
        context: {
          id: 'context',
          title: 'Context',
          paragraphs: [
            'The project was created to establish a reusable visual and technical foundation for Gonzalo Herrera’s personal brand, portfolio and future Angular products.',
            'Brand direction, design decisions and implementation live in the same repository so the public library can evolve from an explicit source of truth instead of isolated visual choices.',
          ],
        },
        problem: {
          id: 'problem',
          title: 'Problem',
          paragraphs: [
            'Without a shared system, visual decisions, components and application patterns tend to become duplicated, inconsistent and harder to maintain.',
            'The project also needed a clear boundary between reusable presentation and application-specific concerns such as routing, localized content and portfolio metadata.',
          ],
        },
        goals: {
          id: 'goals',
          title: 'Goals',
          items: [
            'Create a reusable Angular component library.',
            'Connect brand decisions with generated design tokens.',
            'Support light, dark and system theme preferences.',
            'Establish accessible, strongly typed component APIs.',
            'Document reusable components through Storybook.',
            'Validate integrations through Showcase and Portfolio applications.',
          ],
        },
        constraints: {
          id: 'constraints',
          title: 'Constraints',
          items: [
            'Keep editable brand and token sources in one repository.',
            'Use strict TypeScript and standalone Angular components.',
            'Preserve SSR and hydration compatibility in the Portfolio.',
            'Avoid unnecessary UI framework dependencies.',
            'Expose reusable behavior only through an intentional public API.',
            'Support accessibility and both visual themes from the foundation layer.',
          ],
        },
        role: {
          id: 'role',
          title: 'Role and responsibilities',
          paragraphs: [
            'Gonzalo owns the product direction, visual system and frontend architecture of the project.',
          ],
          responsibilities: [
            'Define brand and visual foundations.',
            'Design the workspace and library architecture.',
            'Maintain tokens, themes and public component APIs.',
            'Document the system in Storybook, Showcase and repository guides.',
            'Integrate the library into the bilingual Portfolio application.',
          ],
          aiDisclosure:
            'AI is used to accelerate exploration, documentation and implementation while technical decisions remain under human review.',
        },
        approach: {
          id: 'approach',
          title: 'Approach',
          description:
            'The work moves from durable brand intent toward reusable code and finally into real consumer applications.',
          flowLabel: 'Design-system implementation flow',
          steps: [
            'Brand foundations',
            'Design tokens',
            'Themes',
            'Components',
            'Layout primitives',
            'Brand patterns',
            'Storybook and Showcase',
            'Portfolio application',
          ],
        },
        architecture: {
          id: 'architecture',
          title: 'Architecture',
          description:
            'Repository documentation and JSON tokens feed the theme layer and the standalone Angular library. Storybook documents isolated APIs, Showcase validates integration and Portfolio consumes the same public package for the production website.',
          flowLabel: 'Design-system architecture flow',
          stages: ['Brand documentation', 'Design Tokens', 'Theme layer', 'gh-design-system'],
          consumersLabel: 'Library consumers',
          consumers: ['Storybook', 'Showcase', 'Portfolio'],
        },
        decisions: {
          id: 'decisions',
          title: 'Key decisions',
          description:
            'The most important choices establish boundaries that keep the system reusable and predictable.',
          items: [
            {
              id: 'tokens-source',
              title: 'Design tokens as source of truth',
              context:
                'Colors, spacing, typography, radii, shadows and themes need to remain consistent across multiple surfaces.',
              decision:
                'Keep editable token JSON at repository level and generate the library SCSS and Showcase catalogue deterministically.',
              rationale:
                'A generated contract prevents documentation and implementation from drifting while preserving semantic CSS variables for consumers.',
              tradeOffs: [
                'Generated files must never be edited manually.',
                'Builds and tests include a token synchronization check.',
              ],
            },
            {
              id: 'standalone-components',
              title: 'Standalone components',
              context:
                'Consumers need focused imports without module-level coupling or hidden application dependencies.',
              decision: 'Build every public Angular component as a standalone component.',
              rationale:
                'Standalone APIs reduce module boilerplate and align with the workspace’s current Angular architecture.',
              tradeOffs: ['Consumers explicitly manage the components they import.'],
            },
            {
              id: 'composition',
              title: 'Composition over inheritance',
              context:
                'Cards, layouts and brand patterns share visual behavior but have different semantic responsibilities.',
              decision:
                'Compose focused public components and shared token-driven styles instead of inheriting Angular component classes.',
              rationale:
                'Composition keeps lifecycles and private implementation details out of the public contract.',
              tradeOffs: ['Composition requires deliberate projection and input APIs.'],
            },
            {
              id: 'consumer-boundaries',
              title: 'Application concerns stay with consumers',
              context:
                'Portfolio owns localized routing and content, while the library must remain reusable outside this website.',
              decision:
                'Keep router logic, locale state, metadata and editorial content outside gh-design-system.',
              rationale:
                'The library remains portable and Portfolio can evolve product behavior without expanding the public UI API.',
              tradeOffs: ['Consumer applications need small typed adapters and mappers.'],
            },
          ],
        },
        implementation: {
          id: 'implementation',
          title: 'Implementation',
          description:
            'The workspace was built in layers so each public surface could validate the layer below it.',
          phases: [
            {
              id: 'foundations',
              title: 'Foundations',
              description: 'Translate brand direction into an enforceable visual contract.',
              items: [
                'Primitive tokens',
                'Semantic tokens',
                'Light and dark themes',
                'Global SCSS',
              ],
              outcome: 'A generated, theme-aware foundation shared by every consumer.',
            },
            {
              id: 'components-layout',
              title: 'Components and layout',
              description: 'Build focused building blocks before composing application pages.',
              items: ['Core components', 'Card family', 'Layout primitives', 'Brand patterns'],
              outcome: 'A standalone public library with typed, composable APIs.',
            },
            {
              id: 'documentation',
              title: 'Documentation and integration',
              description: 'Exercise public APIs in isolated and routed environments.',
              items: ['Component READMEs', 'Storybook', 'Showcase', 'Unit tests'],
              outcome: 'A documented catalogue and an integration surface for maintainers.',
            },
            {
              id: 'portfolio',
              title: 'Portfolio adoption',
              description: 'Use the Design System in a bilingual SSR-enabled product.',
              items: ['Localized shell', 'Typed content', 'SSR and hydration', 'Product pages'],
              outcome: 'A real consumer that validates the system beyond examples.',
            },
          ],
        },
        challenges: {
          id: 'challenges',
          title: 'Challenges',
          description:
            'The recurring challenges are about maintaining clear boundaries while the system grows.',
          items: [
            {
              id: 'source-alignment',
              title: 'Keeping documentation and code aligned',
              description:
                'Brand guidance, token JSON, generated styles and component documentation can drift when maintained independently.',
              response:
                'Use generated outputs, synchronization checks and colocated documentation as part of builds and tests.',
            },
            {
              id: 'consumer-duplication',
              title: 'Avoiding duplicate consumer implementations',
              description:
                'Storybook, Showcase and Portfolio need the same foundations without becoming copies of one another.',
              response:
                'Give each surface a distinct responsibility and require all of them to consume the package’s public API.',
            },
            {
              id: 'reusability',
              title: 'Balancing reuse and specific needs',
              description:
                'A component can become either too narrow for reuse or too configurable to understand.',
              response:
                'Keep the library presentational, use composition and leave product-specific logic in Portfolio.',
            },
            {
              id: 'ssr',
              title: 'Preserving deterministic SSR',
              description:
                'Theme preferences, localized routes and interactive controls must not produce different server and client content.',
              response:
                'Keep the URL authoritative, guard browser APIs and avoid runtime-generated content or ordering.',
            },
          ],
        },
        results: {
          id: 'results',
          title: 'Current results',
          description:
            'Results are qualitative and limited to artifacts that exist in this repository.',
          items: [
            {
              id: 'library',
              title: 'Reusable Angular library',
              description:
                'Standalone components, layouts and patterns are exposed through one public API.',
            },
            {
              id: 'tokens-themes',
              title: 'Shared tokens and themes',
              description: 'Generated foundations support light, dark and system preferences.',
            },
            {
              id: 'catalogue',
              title: 'Documented component catalogue',
              description: 'Storybook and component guides document reusable states and APIs.',
            },
            {
              id: 'showcase',
              title: 'Integration Showcase',
              description:
                'A routed application exercises foundations and public components together.',
            },
            {
              id: 'portfolio',
              title: 'Production-oriented consumer',
              description:
                'The bilingual SSR Portfolio consumes the same library and token contract.',
            },
          ],
        },
        lessons: {
          id: 'lessons',
          title: 'Lessons learned',
          items: [
            'A Design System is more than a collection of components.',
            'Public APIs require deliberate boundaries.',
            'Tokens are most useful when connected to real applications.',
            'Documentation and implementation must evolve together.',
            'Reusability improves when components focus on composition.',
          ],
        },
        nextSteps: {
          id: 'next-steps',
          title: 'Next steps',
          items: [
            'Complete the remaining Portfolio product pages.',
            'Add more case studies when verified project evidence is available.',
            'Run dedicated accessibility and performance audits.',
            'Prepare the approved production deployment configuration.',
            'Evaluate package distribution after the public API is ready.',
          ],
        },
      },
    },
    {
      id: 'ai-code-review-assistant',
      slug: 'ai-code-review-assistant',
      title: 'AI Code Review Assistant',
      shortDescription:
        'An AI-assisted workflow concept designed to review pull requests against engineering standards and project-specific guidelines.',
      status: 'concept',
      statusLabel: 'Concept',
      category: 'ai-engineering',
      categoryLabel: 'AI Engineering',
      technologies: [],
      capabilities: ['Code review workflows', 'Engineering guidelines'],
      featured: false,
      order: 2,
      caseStudy: {
        available: false,
        title: 'Case study not available',
        description:
          'This project is documented as a concept. A full case study will be added only after an implemented workflow and verifiable technical decisions exist.',
      },
    },
    {
      id: 'angular-accelerator-kit',
      slug: 'angular-accelerator-kit',
      title: 'Angular Accelerator Kit',
      shortDescription:
        'A practical foundation concept for teams that need consistent Angular architecture, reusable conventions and development standards.',
      status: 'concept',
      statusLabel: 'Concept',
      category: 'angular',
      categoryLabel: 'Angular',
      technologies: ['Angular', 'TypeScript'],
      capabilities: ['Architecture conventions', 'Developer experience'],
      featured: false,
      order: 3,
      caseStudy: {
        available: false,
        title: 'Case study not available',
        description:
          'This entry records a product concept, not a completed starter kit. Technical detail and results remain intentionally omitted.',
      },
    },
    {
      id: 'ai-toolkit-for-developers',
      slug: 'ai-toolkit-for-developers',
      title: 'AI Toolkit for Developers',
      shortDescription:
        'A curated toolkit concept of prompts, workflows and reusable resources for AI-augmented software development.',
      status: 'concept',
      statusLabel: 'Concept',
      category: 'developer-tools',
      categoryLabel: 'Developer Tools',
      technologies: [],
      capabilities: ['Prompt workflows', 'Reusable engineering resources'],
      featured: false,
      order: 4,
      caseStudy: {
        available: false,
        title: 'Case study not available',
        description:
          'This project remains a documented concept. No publication, repository or implemented toolkit is claimed.',
      },
    },
  ],
} as const satisfies PortfolioProjectsContent;
