import { Component } from '@angular/core';
import {
  GhContactCalloutComponent,
  type GhContactAction,
  GhContainerComponent,
  GhContentHighlightComponent,
  type GhContentHighlightData,
  GhExperienceTimelineComponent,
  type GhExperienceCardData,
  GhFeatureGridComponent,
  type GhFeatureItem,
  GhFooterComponent,
  type GhFooterGroup,
  GhGridComponent,
  GhHeroComponent,
  type GhHeroAction,
  GhHeroVisualDirective,
  GhNavigationComponent,
  type GhNavigationItem,
  GhProjectCardComponent,
  type GhProjectCardData,
  GhSectionComponent,
  GhSectionHeadingComponent,
  GhStackComponent,
} from 'gh-design-system';

import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'showcase-patterns-page',
  standalone: true,
  imports: [
    DocumentationSection,
    GhContactCalloutComponent,
    GhContainerComponent,
    GhContentHighlightComponent,
    GhExperienceTimelineComponent,
    GhFeatureGridComponent,
    GhFooterComponent,
    GhGridComponent,
    GhHeroComponent,
    GhHeroVisualDirective,
    GhNavigationComponent,
    GhProjectCardComponent,
    GhSectionComponent,
    GhSectionHeadingComponent,
    GhStackComponent,
    ThemeToggle,
  ],
  templateUrl: './patterns.html',
  styleUrl: './patterns.scss',
})
export class PatternsPage {
  protected readonly navigationItems: readonly GhNavigationItem[] = [
    { label: 'Home', href: '#landing-home', active: true },
    { label: 'Capabilities', href: '#landing-capabilities' },
    { label: 'Experience', href: '#landing-experience' },
    { label: 'Writing', href: '#landing-writing' },
  ];

  protected readonly heroActions: readonly GhHeroAction[] = [
    { label: 'Explore selected work', href: '#landing-projects', variant: 'primary' },
    { label: 'Start a conversation', href: '#landing-contact', variant: 'secondary' },
  ];

  protected readonly capabilities: readonly GhFeatureItem[] = [
    {
      title: 'Frontend Engineering',
      description:
        'Accessible Angular systems designed for clarity, scale and long-term ownership.',
      eyebrow: 'Engineering',
      iconLabel: 'FE',
    },
    {
      title: 'Technical Leadership',
      description: 'Practical direction, mentoring and communication that help teams deliver well.',
      eyebrow: 'Leadership',
      iconLabel: 'TL',
    },
    {
      title: 'AI-Augmented Development',
      description:
        'Responsible AI workflows that improve feedback, focus and developer productivity.',
      eyebrow: 'AI',
      iconLabel: 'AI',
    },
    {
      title: 'Architecture',
      description: 'Explicit boundaries and reusable foundations for evolving frontend products.',
      iconLabel: 'AR',
    },
    {
      title: 'Developer Experience',
      description:
        'Tooling and conventions that reduce friction without hiding important decisions.',
      iconLabel: 'DX',
    },
    {
      title: 'Mentoring',
      description:
        'Human, actionable guidance that supports autonomy and sustainable career growth.',
      iconLabel: 'ME',
    },
  ];

  protected readonly experiences: readonly GhExperienceCardData[] = [
    {
      role: 'Demonstration Frontend Lead',
      company: 'Example Product Studio',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      currentLabel: 'Demonstration current role',
      location: 'Remote example',
      workMode: 'remote',
      workModeLabel: 'Remote example',
      description:
        'Demonstration-only experience focused on architecture, mentoring and delivery clarity.',
      achievements: [
        'Introduced reusable frontend foundations.',
        'Created practical mentoring and review practices.',
      ],
      technologies: ['Angular', 'Leadership', 'Design Systems'],
    },
    {
      role: 'Demonstration Senior Engineer',
      company: 'Sample Engineering Team',
      startDate: '2021',
      endDate: '2024',
      location: 'Example location',
      description: 'Demonstration-only product engineering and design-system adoption work.',
      technologies: ['TypeScript', 'Accessibility', 'Developer Experience'],
    },
  ];

  protected readonly highlights: readonly GhContentHighlightData[] = [
    {
      type: 'article',
      eyebrow: 'Angular',
      title: 'Reactive Forms vs Signal Forms',
      description: 'A demonstrative editorial comparison for modern Angular teams.',
      href: 'https://example.com/reactive-vs-signal-forms',
      linkLabel: 'Read the demonstration article',
      external: true,
      imageSrc: 'cards/article-angular-forms.svg',
      imageAlt: 'Abstract Angular forms interface',
      tags: ['Angular', 'Forms', 'Architecture'],
    },
    {
      type: 'project',
      eyebrow: 'Selected project',
      title: 'Angular Design System',
      description: 'Token-driven components, Layout Primitives and Brand Patterns in one library.',
      href: '#landing-projects',
      linkLabel: 'View the project section',
      tags: ['Angular', 'Signals', 'SCSS'],
    },
    {
      type: 'linkedin',
      eyebrow: 'Leadership notes',
      title: 'Engineering Leadership Notes',
      description: 'A demonstrative content series about clarity, feedback and team growth.',
      href: 'https://www.linkedin.com/',
      linkLabel: 'Open LinkedIn',
      external: true,
      tags: ['Leadership', 'Mentoring'],
    },
  ];

  protected readonly projects: readonly GhProjectCardData[] = [
    {
      title: 'Angular Design System',
      description: 'A reusable, accessible and token-driven component library.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      imageSrc: 'cards/project-design-system.svg',
      imageAlt: 'Abstract design-system component collection',
      projectUrl: '#patterns-hero',
      status: 'completed',
      featured: true,
    },
    {
      title: 'AI Code Review Assistant',
      description: 'A demonstrative experiment for structured engineering feedback.',
      technologies: ['AI', 'Agents', 'TypeScript'],
      repositoryUrl: 'https://example.com/ai-code-review',
      status: 'in-progress',
    },
  ];

  protected readonly contactActions: readonly GhContactAction[] = [
    { label: 'Email', href: 'mailto:hello@example.com', variant: 'primary' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/',
      external: true,
      variant: 'secondary',
    },
  ];

  protected readonly footerGroups: readonly GhFooterGroup[] = [
    {
      title: 'Explore',
      links: [
        { label: 'Capabilities', href: '#landing-capabilities' },
        { label: 'Experience', href: '#landing-experience' },
        { label: 'Writing', href: '#landing-writing' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Email', href: 'mailto:hello@example.com' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/', external: true },
      ],
    },
  ];
}
