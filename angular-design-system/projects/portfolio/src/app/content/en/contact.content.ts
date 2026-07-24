import type { PortfolioContactContent } from '../models/contact-content.model';

export const EN_CONTACT_CONTENT = {
  metaTitle: 'Contact',
  metaDescription:
    'Contact Gonzalo Herrera to discuss frontend engineering, Angular, technical leadership, collaboration and software opportunities.',
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
    title: 'Choose the way that works best for you to get in touch.',
    description: '',
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
        label: 'LinkedIn',
        description:
          'Let’s connect and talk about Angular, frontend engineering, technical leadership and AI-augmented software development.',
        actionLabel: 'View LinkedIn profile',
        ariaLabel: 'Open Gonzalo Herrera’s LinkedIn profile in a new tab',
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
      'Have a project, opportunity or idea in mind? Send me a message and I’ll get back to you as soon as possible.',
    requiredFieldsMessage: 'Fields marked as required must be completed.',
    requiredLabel: 'Required',
    fieldGroupLabel: 'Message details',
    botcheckLabel: 'Leave this field empty',
    fallbackEmailLabel: 'You can also contact me directly by email at',
    fields: {
      name: {
        label: 'Name',
        description: 'How should I address you?',
        placeholder: 'Your name',
        requiredMessage: 'Enter your name.',
        whitespaceMessage: 'This field cannot contain only spaces.',
        minLengthMessage: 'Your name must contain at least 2 characters.',
        maxLengthMessage: 'Your name cannot exceed 80 characters.',
      },
      email: {
        label: 'Email',
        description: 'Use an address that can receive a reply.',
        placeholder: 'you@example.com',
        requiredMessage: 'Enter your email address.',
        invalidMessage: 'Enter a valid email address.',
        maxLengthMessage: 'Your email address cannot exceed 160 characters.',
      },
      subject: {
        label: 'Subject',
        description: 'Summarize the main topic of the conversation.',
        placeholder: 'What would you like to discuss?',
        requiredMessage: 'Enter a subject.',
        whitespaceMessage: 'This field cannot contain only spaces.',
        minLengthMessage: 'The subject must contain at least 3 characters.',
        maxLengthMessage: 'The subject cannot exceed 120 characters.',
      },
      message: {
        label: 'Message',
        description: 'Include enough non-confidential context to understand the topic.',
        placeholder: 'Tell me a little about your project, opportunity or idea.',
        requiredMessage: 'Enter a message.',
        whitespaceMessage: 'This field cannot contain only spaces.',
        minLengthMessage: 'Message must contain at least 20 characters.',
        maxLengthMessage: 'Message cannot exceed 2000 characters.',
      },
    },
    submitLabel: 'Send message',
    submittingLabel: 'Sending…',
    errorSummary: 'Please review the highlighted fields.',
    errorWithoutFallbackDescription: 'Please try again in a moment.',
    unavailable: {
      title: 'The contact form is temporarily unavailable',
      description: 'Please try again later.',
    },
    success: {
      title: 'Message sent successfully',
      description: 'Thank you for reaching out. I’ll get back to you as soon as possible.',
      actionLabel: 'Send another message',
    },
    error: {
      title: 'The message could not be sent',
      description: 'Please try again or contact me directly by email.',
      actionLabel: 'Try again',
    },
  },
  privacy: {
    eyebrow: 'Privacy and security',
    title: 'Before you send a message',
    description:
      'Your message is sent only when you submit this form and is never stored in this browser.',
    details: [
      'Please avoid including confidential information, credentials or sensitive customer data.',
      'Provide enough context to understand the topic, but keep sensitive technical details for a secure conversation.',
      'The form sends only your name, email, subject and message through the configured contact provider.',
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
