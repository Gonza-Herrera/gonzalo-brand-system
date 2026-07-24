import type { PortfolioContentDetailRegistry } from '../models/content-hub-content.model';

export const EN_CONTENT_DETAILS: PortfolioContentDetailRegistry = {
  'angular-14-vs-angular-20': {
    introduction: [
      'A framework upgrade is useful only when it improves how a team builds, understands and evolves software. The important comparison is therefore architectural rather than a checklist of release notes.',
      'This review uses the current portfolio and design-system workspace as its evidence: standalone components, Signals, lazy routing, SSR, hydration and strict public boundaries are working parts of the repository.',
    ],
    sections: [
      {
        type: 'text',
        id: 'architecture-first',
        title: 'Start with architecture, not syntax',
        paragraphs: [
          'Older Angular codebases often carry module boundaries, shared imports and reactive state choices that made sense when they were introduced. A migration should first identify which of those decisions still serve the product.',
          'The modern target in this workspace is explicit: standalone pages and components, focused public imports, Signals for local derived state, and application concerns kept outside the reusable library.',
        ],
      },
      {
        type: 'comparison',
        id: 'architecture-comparison',
        title: 'Architecture comparison',
        description: 'A migration-oriented comparison, not an exhaustive version changelog.',
        columns: [
          { id: 'angular-14-baseline', label: 'Angular 14-era baseline' },
          { id: 'modern-angular-target', label: 'Modern Angular target' },
        ],
        rows: [
          {
            id: 'composition',
            label: 'Composition',
            cells: [
              'Feature and shared NgModules commonly coordinate imports.',
              'Standalone components declare focused imports directly.',
            ],
          },
          {
            id: 'local-state',
            label: 'Local derived state',
            cells: [
              'Observable pipelines may be used even for small synchronous UI state.',
              'Signals and computed values keep synchronous UI state explicit.',
            ],
          },
          {
            id: 'templates',
            label: 'Templates',
            cells: [
              'Structural directives coordinate conditional and repeated content.',
              'Built-in control flow makes branches and stable tracking visible.',
            ],
          },
          {
            id: 'delivery',
            label: 'Delivery',
            cells: [
              'Rendering and hydration can remain separate migration concerns.',
              'SSR, hydration and localized URLs are validated as one deterministic flow.',
            ],
          },
        ],
      },
      {
        type: 'code',
        id: 'signal-derived-state',
        title: 'Keep derived UI state local',
        language: 'TypeScript',
        code: "readonly activeFilter = signal<PortfolioContentFilter>('all');\n\nreadonly visibleContent = computed(() =>\n  filterContent(this.publishedItems(), this.activeFilter()),\n);",
        caption:
          'The Content Hub uses Signals for deterministic, synchronous filter state without manual subscriptions.',
      },
      {
        type: 'list',
        id: 'migration-sequence',
        title: 'A sustainable migration sequence',
        introduction: 'Make each step reviewable and preserve behavior while boundaries improve.',
        style: 'ordered',
        items: [
          'Document the current routes, state boundaries and rendering constraints.',
          'Move leaf components to standalone imports before changing larger feature boundaries.',
          'Use Signals for local synchronous state and keep RxJS where asynchronous streams remain valuable.',
          'Make lazy routes, SSR output and hydration part of the same validation loop.',
          'Remove obsolete structure only after consumers and tests prove the replacement.',
        ],
      },
      {
        type: 'callout',
        id: 'migration-principle',
        title: 'Migration principle',
        text: 'Modern Angular features create value when they clarify ownership and reduce accidental coupling—not when they are adopted as isolated syntax changes.',
        tone: 'insight',
      },
    ],
    takeaways: {
      title: 'Key takeaways',
      items: [
        'Treat framework upgrades as architecture work with explicit outcomes.',
        'Prefer standalone boundaries and focused public imports.',
        'Use Signals for synchronous local state without replacing every asynchronous stream.',
        'Validate routes, SSR and hydration throughout the migration.',
      ],
    },
    relatedContentIds: ['lessons-from-code-reviews', 'building-ai-agents'],
  },
  'lessons-from-code-reviews': {
    introduction: [
      'A code review is both a quality checkpoint and a technical conversation. Its value comes from improving the change while helping the team build shared context.',
      'The practices here reflect the repository’s leadership principles: clarity, constructive feedback, small decisions, shared standards and sustainable solutions.',
    ],
    sections: [
      {
        type: 'text',
        id: 'review-for-understanding',
        title: 'Review for understanding',
        paragraphs: [
          'Begin with the product goal and the constraints behind the change. A technically valid comment can still be unhelpful when it ignores the problem the pull request is solving.',
          'Feedback should explain why a concern matters. That context lets the author improve the current change and apply the reasoning in future work.',
        ],
      },
      {
        type: 'list',
        id: 'review-practices',
        title: 'Practices that improve the review',
        style: 'unordered',
        items: [
          'Prefer small pull requests that tell one understandable story.',
          'Separate correctness issues from optional suggestions and personal preference.',
          'Connect feedback to maintainability, accessibility, performance or a shared standard.',
          'Ask questions when context is missing instead of assuming intent.',
          'Recognize sound decisions as well as areas that need revision.',
          'Move broad architecture questions into a direct conversation when comments stop being efficient.',
        ],
      },
      {
        type: 'callout',
        id: 'feedback-principle',
        title: 'A useful standard',
        text: 'Review with empathy and precision: be specific about the code, respectful toward the person and clear about the outcome that matters.',
        tone: 'insight',
      },
      {
        type: 'list',
        id: 'team-system',
        title: 'Improve the system, not only the pull request',
        introduction:
          'Repeated comments are evidence that the team may need a stronger shared foundation.',
        style: 'ordered',
        items: [
          'Identify feedback that appears repeatedly across reviews.',
          'Turn stable expectations into documented conventions or reusable components.',
          'Automate mechanical checks when tooling can provide a consistent answer.',
          'Keep architectural judgment and mentoring in the human conversation.',
        ],
      },
    ],
    takeaways: {
      title: 'Key takeaways',
      items: [
        'Context makes feedback easier to understand and reuse.',
        'Small changes reduce review ambiguity.',
        'Shared standards are more effective than repeated personal preferences.',
        'A good review improves both the solution and the team’s understanding.',
      ],
    },
    relatedContentIds: ['angular-14-vs-angular-20', 'building-ai-agents'],
  },
  'building-ai-agents': {
    introduction: [
      'Useful AI-assisted engineering starts with a real workflow, not a chat interface. The system needs clear context, a bounded task and an output that a person can review.',
      'The goal is not to transfer accountability to a model. It is to reduce repetitive work, organize context and give engineers more time to make better decisions.',
    ],
    sections: [
      {
        type: 'text',
        id: 'workflow-over-chat',
        title: 'Design a workflow, not a conversation',
        paragraphs: [
          'A dependable agent has an explicit responsibility. It may compare a change against project standards, summarize test failures, organize documentation or explore a refactoring plan.',
          'Each responsibility needs known inputs, permitted actions, a reviewable output and a stopping condition. Those boundaries make the result easier to evaluate and maintain.',
        ],
      },
      {
        type: 'list',
        id: 'agent-boundaries',
        title: 'Define the engineering boundaries',
        style: 'ordered',
        items: [
          'State the problem and the decision the workflow should support.',
          'Provide project-specific standards and only the context needed for the task.',
          'Separate read-only analysis from actions that modify code or external systems.',
          'Require deterministic validation such as builds, tests or content checks.',
          'Keep a human responsible for reviewing technical trade-offs and final changes.',
        ],
      },
      {
        type: 'callout',
        id: 'human-judgment',
        title: 'Responsible adoption',
        text: 'AI should amplify engineering judgment, not replace it.',
        tone: 'insight',
      },
      {
        type: 'list',
        id: 'practical-use-cases',
        title: 'Practical starting points',
        introduction: 'Begin where the output is reviewable and the risk is contained.',
        style: 'unordered',
        items: [
          'Code-review support against documented project standards.',
          'Test-failure analysis that narrows the investigation without hiding evidence.',
          'Documentation assistance that converts technical context into shared guidance.',
          'Architecture exploration that records alternatives and trade-offs.',
          'Refactoring support organized as small changes that preserve intent.',
          'Knowledge organization that makes existing engineering context easier to reuse.',
        ],
      },
    ],
    takeaways: {
      title: 'Key takeaways',
      items: [
        'Start with a bounded engineering responsibility.',
        'Make inputs, actions, outputs and stopping conditions explicit.',
        'Use deterministic tools to validate generated work.',
        'Keep human technical judgment and accountability in the loop.',
      ],
    },
    relatedContentIds: ['lessons-from-code-reviews', 'angular-14-vs-angular-20'],
  },
};
