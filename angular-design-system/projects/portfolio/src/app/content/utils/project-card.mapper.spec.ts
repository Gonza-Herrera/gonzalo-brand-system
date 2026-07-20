import type { PortfolioProjectContent } from '../models/projects-content.model';
import { EN_PROJECTS_CONTENT } from '../en/projects.content';
import { mapProjectToCard } from './project-card.mapper';

describe('mapProjectToCard', () => {
  const labels = EN_PROJECTS_CONTENT.grid.cardLabels;

  it('maps editorial content and a localized case-study route without mutation', () => {
    const project = EN_PROJECTS_CONTENT.items[0];
    const snapshot = JSON.stringify(project);

    expect(mapProjectToCard(project, 'es', labels)).toEqual({
      title: 'Angular Design System',
      description:
        'A reusable Angular Design System built around design tokens, accessibility, composition and consistent brand foundations.',
      status: 'in-progress',
      statusLabel: 'In progress',
      category: 'Design System',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'Design Tokens'],
      imageSrc: undefined,
      imageAlt: undefined,
      imageWidth: undefined,
      imageHeight: undefined,
      featured: true,
      projectUrl: '/es/projects/angular-design-system',
      projectLinkLabel: 'View case study',
      repositoryUrl: undefined,
      repositoryExternal: undefined,
      repositoryLinkLabel: undefined,
    });
    expect(JSON.stringify(project)).toBe(snapshot);
  });

  it('omits unavailable case-study, image, technology and repository links', () => {
    const card = mapProjectToCard(EN_PROJECTS_CONTENT.items[1], 'en', labels);

    expect(card.projectUrl).toBeUndefined();
    expect(card.repositoryUrl).toBeUndefined();
    expect(card.imageSrc).toBeUndefined();
    expect(card.technologies).toBeUndefined();
  });

  it('maps optional verified image and repository data', () => {
    const project: PortfolioProjectContent = {
      ...EN_PROJECTS_CONTENT.items[1],
      image: { src: '/projects/review.svg', alt: 'Review workflow', width: 800, height: 450 },
      links: [
        {
          id: 'repository',
          kind: 'repository',
          label: 'Source',
          href: 'https://angular.dev',
          external: true,
        },
      ],
    };

    expect(mapProjectToCard(project, 'en', labels)).toMatchObject({
      imageSrc: '/projects/review.svg',
      imageAlt: 'Review workflow',
      imageWidth: 800,
      imageHeight: 450,
      repositoryUrl: 'https://angular.dev',
      repositoryExternal: true,
      repositoryLinkLabel: 'View repository',
    });
  });
});
