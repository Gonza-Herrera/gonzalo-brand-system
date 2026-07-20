import type { GhProjectCardData } from 'gh-design-system';

import type { PortfolioLocale } from '../models/portfolio-locale.type';
import type {
  PortfolioProjectCardLabels,
  PortfolioProjectContent,
} from '../models/projects-content.model';
import { createLocalizedProjectPath } from './project-selectors';

export function mapProjectToCard(
  project: PortfolioProjectContent,
  locale: PortfolioLocale,
  labels: PortfolioProjectCardLabels,
): GhProjectCardData {
  const repository = project.links?.find((link) => link.kind === 'repository');

  return {
    title: project.title,
    description: project.shortDescription,
    status: project.status,
    statusLabel: project.statusLabel,
    category: project.categoryLabel,
    technologies: project.technologies.length ? project.technologies : undefined,
    imageSrc: project.image?.src,
    imageAlt: project.image?.alt,
    imageWidth: project.image?.width,
    imageHeight: project.image?.height,
    featured: project.featured,
    projectUrl: project.caseStudy.available
      ? createLocalizedProjectPath(locale, project.slug)
      : undefined,
    projectLinkLabel: project.caseStudy.available ? labels.caseStudy : undefined,
    repositoryUrl: repository?.href,
    repositoryExternal: repository?.external,
    repositoryLinkLabel: repository ? labels.repository : undefined,
  };
}
