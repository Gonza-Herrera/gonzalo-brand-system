import { Component } from '@angular/core';
import {
  GhAmbientBackgroundComponent,
  GhArticleCardComponent,
  type GhArticleCardData,
  GhButtonComponent,
  GhCardComponent,
  type GhCardPadding,
  type GhCardRadius,
  type GhCardVariant,
  GhExperienceCardComponent,
  type GhExperienceCardData,
  GhIconButtonComponent,
  GhProjectCardComponent,
  type GhProjectCardData,
  GhSurfaceComponent,
} from 'gh-design-system';

import { CodePreview } from '../../shared/components/code-preview/code-preview';
import { DocumentationSection } from '../../shared/components/documentation-section/documentation-section';

interface CardVariantExample {
  readonly label: string;
  readonly description: string;
  readonly variant: GhCardVariant;
}

@Component({
  selector: 'showcase-cards-page',
  standalone: true,
  imports: [
    CodePreview,
    DocumentationSection,
    GhAmbientBackgroundComponent,
    GhArticleCardComponent,
    GhButtonComponent,
    GhCardComponent,
    GhExperienceCardComponent,
    GhIconButtonComponent,
    GhProjectCardComponent,
    GhSurfaceComponent,
  ],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class CardsPage {
  protected readonly variants = [
    {
      label: 'Outlined · Solid',
      description: 'Safe default for dense or critical content.',
      variant: 'outlined',
    },
    {
      label: 'Subtle · Glass Subtle',
      description: 'Soft hierarchy for editorial grids and previews.',
      variant: 'subtle',
    },
    {
      label: 'Glass · Glass',
      description: 'Feature emphasis over a meaningful ambient context.',
      variant: 'glass',
    },
    {
      label: 'Elevated · Glass Elevated',
      description: 'Controlled depth for prominent summaries and actions.',
      variant: 'elevated',
    },
  ] as const satisfies readonly CardVariantExample[];
  protected readonly paddings = [
    'none',
    'sm',
    'md',
    'lg',
  ] as const satisfies readonly GhCardPadding[];
  protected readonly radii = ['sm', 'md', 'lg', 'xl'] as const satisfies readonly GhCardRadius[];

  protected readonly articles: readonly GhArticleCardData[] = [
    {
      title: 'Reactive Forms vs Signal Forms',
      href: '/articles/reactive-forms-vs-signal-forms',
      excerpt: 'A practical, demonstrative comparison of both approaches for modern Angular teams.',
      imageSrc: 'cards/article-angular-forms.svg',
      imageAlt: 'Abstract Angular forms interface',
      publishedAt: 'July 2026',
      readingTime: '6 min read',
      category: 'Angular',
      featured: true,
    },
    {
      title: 'Leading frontend systems with clarity',
      href: 'https://example.com/demonstration-article',
      excerpt: 'Demonstration content about architecture, communication and sustainable delivery.',
      publishedAt: 'June 2026',
      readingTime: '8 min read',
      category: 'Leadership',
      external: true,
    },
  ];

  protected readonly experiences: readonly GhExperienceCardData[] = [
    {
      role: 'Frontend Tech Lead',
      company: 'Demonstration Engineering Studio',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      location: 'Argentina',
      workMode: 'remote',
      description:
        'Demonstration experience focused on Angular architecture, mentoring and delivery clarity.',
      achievements: [
        'Introduced reusable frontend architecture guidance.',
        'Created mentoring practices for sustainable team growth.',
      ],
      technologies: ['Angular', 'Leadership', 'AI-Augmented Engineering'],
      companyLogoSrc: 'cards/demonstration-company.svg',
      companyLogoAlt: 'Demonstration Engineering Studio monogram',
    },
    {
      role: 'Senior Frontend Engineer',
      company: 'Example Product Team',
      startDate: '2021',
      endDate: '2024',
      location: 'Remote collaboration',
      workMode: 'hybrid',
      description:
        'Clearly demonstrative content for product engineering and design-system adoption.',
      technologies: ['TypeScript', 'Design Systems', 'Accessibility'],
    },
  ];

  protected readonly projects: readonly GhProjectCardData[] = [
    {
      title: 'Angular Design System',
      description: 'A reusable token-driven Angular component library with accessible foundations.',
      technologies: ['Angular', 'TypeScript', 'Signals', 'SCSS'],
      imageSrc: 'cards/project-design-system.svg',
      imageAlt: 'Abstract Design System component collection',
      projectUrl: '/projects/angular-design-system',
      repositoryUrl: 'https://example.com/angular-design-system',
      status: 'completed',
      featured: true,
    },
    {
      title: 'AI Code Review Assistant',
      description: 'A demonstrative experiment for structured feedback and developer productivity.',
      technologies: ['AI', 'Agents', 'TypeScript'],
      repositoryUrl: 'https://example.com/ai-code-review',
      status: 'in-progress',
    },
    {
      title: 'Developer Portfolio',
      description: 'A concept for presenting engineering, leadership and educational content.',
      technologies: ['Angular', 'Content', 'Accessibility', 'Performance', 'Design Tokens'],
      status: 'concept',
    },
  ];

  protected readonly baseCardExample = `<gh-card variant="glass" interactive>
  <div ghCardHeader>
    <h2>Engineering Leadership</h2>
  </div>

  <div ghCardContent>
    <p>Helping teams build better software.</p>
  </div>

  <div ghCardFooter>
    <gh-button>Explore</gh-button>
  </div>
</gh-card>`;
  protected readonly articleExample = `<gh-article-card [article]="article" />`;
  protected readonly experienceExample = `<gh-experience-card
  [experience]="experience"
  [highlighted]="true"
/>`;
  protected readonly projectExample = `<gh-project-card
  [project]="project"
  orientation="horizontal"
/>`;
}
