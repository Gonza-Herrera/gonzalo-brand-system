import type { PortfolioLocale } from '../models/portfolio-locale.type';
import type {
  PortfolioProjectContent,
  PortfolioProjectSlug,
} from '../models/projects-content.model';

export function createLocalizedProjectPath(
  locale: PortfolioLocale,
  slug: PortfolioProjectSlug,
): string {
  return `/${locale}/projects/${slug}`;
}

export function selectProjectsInEditorialOrder(
  projects: readonly PortfolioProjectContent[],
): readonly PortfolioProjectContent[] {
  return [...projects].sort((first, second) => first.order - second.order);
}

export function selectFeaturedProjects(
  projects: readonly PortfolioProjectContent[],
): readonly PortfolioProjectContent[] {
  return selectProjectsInEditorialOrder(projects).filter((project) => project.featured);
}

export function findProjectBySlug(
  projects: readonly PortfolioProjectContent[],
  slug: string,
): PortfolioProjectContent | undefined {
  return projects.find((project) => project.slug === slug);
}

export function selectRelatedProjects(
  current: PortfolioProjectContent,
  projects: readonly PortfolioProjectContent[],
  limit = 3,
): readonly PortfolioProjectContent[] {
  if (limit <= 0) {
    return [];
  }

  const candidates = selectProjectsInEditorialOrder(projects).filter(
    (project) => project.id !== current.id,
  );
  const related = candidates.filter(
    (project) =>
      project.category === current.category ||
      project.technologies.some((technology) => current.technologies.includes(technology)),
  );
  const remaining = candidates.filter(
    (project) => !related.some((relatedProject) => relatedProject.id === project.id),
  );

  return [...related, ...remaining].slice(0, limit);
}
