import type { PortfolioContactContent } from '../models/contact-content.model';

export const EN_CONTACT_CONTENT = {
  metaTitle: 'Contact',
  metaDescription:
    'Contact Gonzalo Herrera to discuss frontend engineering, Angular architecture, technical leadership and AI-augmented software development.',
  hero: {
    eyebrow: 'Contact',
    title: 'Let’s talk about building better software.',
    description:
      'Have a frontend challenge, an Angular platform, a technical leadership opportunity or an AI-assisted engineering idea worth discussing?',
    visualLabel: 'Conversation focus areas',
    visualTitle: 'A thoughtful conversation can connect',
    highlights: [
      {
        id: 'engineering',
        label: 'Frontend Engineering',
        description: 'Platforms, architecture and maintainable application foundations.',
      },
      {
        id: 'leadership',
        label: 'Technical Leadership',
        description: 'Standards, mentoring, technical decisions and team enablement.',
      },
      {
        id: 'ai',
        label: 'AI-Augmented Development',
        description: 'Practical workflows that keep engineering judgment explicit.',
      },
    ],
  },
  topics: {
    eyebrow: 'Conversation topics',
    title: 'What we can discuss',
    description:
      'I’m especially interested in conversations where frontend engineering, architecture, team enablement and practical AI adoption come together.',
    items: [
      {
        id: 'frontend-platforms',
        title: 'Frontend Platforms',
        description:
          'Building or evolving maintainable frontend platforms and shared application foundations.',
      },
      {
        id: 'angular-architecture',
        title: 'Angular Architecture',
        description:
          'Application structure, migrations, performance, state patterns and long-term maintainability.',
      },
      {
        id: 'design-systems',
        title: 'Design Systems',
        description:
          'Reusable components, design tokens, accessibility and consistent developer experience.',
      },
      {
        id: 'technical-leadership',
        title: 'Technical Leadership',
        description:
          'Engineering standards, code reviews, mentoring, technical decisions and collaboration.',
      },
      {
        id: 'ai-engineering',
        title: 'AI-Augmented Engineering',
        description:
          'Using AI to improve development workflows, documentation, review processes and technical exploration.',
      },
      {
        id: 'professional-opportunities',
        title: 'Professional Opportunities',
        description:
          'Frontend leadership, senior frontend engineering and collaboration opportunities aligned with these areas.',
      },
    ],
  },
  channels: {
    eyebrow: 'Contact channels',
    title: 'Choose the best way to connect',
    description:
      'Public contact destinations appear here only after they have been verified and approved for publication.',
    unavailableTitle: 'No public contact channel is configured yet',
    unavailableDescription:
      'Email, LinkedIn and GitHub destinations are intentionally omitted until a verified source is added to the central configuration.',
    items: [
      {
        id: 'email',
        label: 'Send an email',
        description: 'Start a direct professional conversation by email.',
        ariaLabel: 'Send Gonzalo Herrera an email',
        external: false,
      },
      {
        id: 'linkedin',
        label: 'Connect on LinkedIn',
        description: 'Connect through a verified professional profile.',
        ariaLabel: 'Open Gonzalo Herrera’s LinkedIn profile',
        external: true,
      },
      {
        id: 'github',
        label: 'Explore my work on GitHub',
        description: 'Review public engineering work and repositories.',
        ariaLabel: 'Open Gonzalo Herrera’s GitHub profile',
        external: true,
      },
    ],
  },
  form: {
    eyebrow: 'Message form',
    title: 'Share some context',
    description:
      'The form interface and validation rules are ready, but online submission remains disabled until a reviewed endpoint or provider is configured.',
    requiredFieldsMessage: 'Fields marked as required must be completed.',
    requiredLabel: 'Required',
    fieldGroupLabel: 'Message details',
    fields: {
      name: {
        label: 'Name',
        description: 'How should I address you?',
        requiredMessage: 'Name is required.',
        whitespaceMessage: 'Name cannot contain only spaces.',
        maxLengthMessage: 'Name cannot exceed 100 characters.',
      },
      email: {
        label: 'Email',
        description: 'Use an address that can receive a reply.',
        requiredMessage: 'Email is required.',
        invalidMessage: 'Enter a valid email address.',
        maxLengthMessage: 'Email cannot exceed 254 characters.',
      },
      company: {
        label: 'Company or organization',
        optionalLabel: 'Optional',
        description: 'Add this only when it helps explain the context.',
        maxLengthMessage: 'Company or organization cannot exceed 150 characters.',
      },
      subject: {
        label: 'What would you like to discuss?',
        description: 'Summarize the main topic of the conversation.',
        requiredMessage: 'Subject is required.',
        whitespaceMessage: 'Subject cannot contain only spaces.',
        maxLengthMessage: 'Subject cannot exceed 160 characters.',
      },
      message: {
        label: 'Tell me a little about the context, challenge or opportunity.',
        description: 'Include enough non-confidential context to understand the topic.',
        requiredMessage: 'Message is required.',
        whitespaceMessage: 'Message cannot contain only spaces.',
        minLengthMessage: 'Message must contain at least 20 characters.',
        maxLengthMessage: 'Message cannot exceed 3000 characters.',
      },
    },
    submitLabel: 'Send message',
    submittingLabel: 'Sending message…',
    errorSummary: 'Please review the highlighted fields.',
    unavailable: {
      title: 'Online form submission is not configured yet',
      description:
        'The fields are disabled and no information is sent or stored. A real submission service must be reviewed and configured before this form can be activated.',
    },
    success: {
      title: 'Message sent',
      description: 'Thank you for reaching out. Your message was sent successfully.',
      actionLabel: 'Send another message',
    },
    error: {
      title: 'The message could not be sent',
      description:
        'Please review your connection and try again. You can also use one of the available contact channels.',
      actionLabel: 'Try again',
    },
  },
  privacy: {
    eyebrow: 'Privacy and security',
    title: 'Before you send a message',
    description:
      'This form is currently disabled and does not transmit or store information in the browser or through an external service.',
    details: [
      'Please avoid including confidential information, credentials or sensitive customer data in any future message.',
      'Provide enough context to understand the topic, but keep sensitive technical details for a secure conversation.',
      'Any future submission integration must document how data is transmitted, handled and protected before activation.',
    ],
  },
  explore: {
    eyebrow: 'Explore more',
    title: 'Explore more before we connect',
    description: 'Review the experience, projects and ideas that frame these conversations.',
    actions: [
      {
        label: 'View experience',
        description:
          'Explore professional focus, leadership practices and engineering capabilities.',
        pageId: 'experience',
        variant: 'secondary',
      },
      {
        label: 'Explore projects',
        description: 'See selected projects, architecture decisions and case studies.',
        pageId: 'projects',
        variant: 'secondary',
      },
      {
        label: 'Read articles and resources',
        description:
          'Continue with practical writing about Angular, leadership and AI engineering.',
        pageId: 'content',
        variant: 'secondary',
      },
    ],
  },
} as const satisfies PortfolioContactContent;
