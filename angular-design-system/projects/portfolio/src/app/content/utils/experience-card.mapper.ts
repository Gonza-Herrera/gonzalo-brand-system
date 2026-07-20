import type { GhExperienceCardData } from 'gh-design-system';

import type {
  PortfolioExperienceTimelineLabels,
  PortfolioProfessionalExperienceContent,
} from '../models/experience-content.model';

export function mapPortfolioExperiencesToTimeline(
  items: readonly PortfolioProfessionalExperienceContent[],
  labels: PortfolioExperienceTimelineLabels,
): readonly (GhExperienceCardData & { readonly id: string })[] {
  return items.map((item) => ({
    id: item.id,
    role: item.role,
    company: item.company,
    startDate: item.startDate,
    endDate: item.endDate,
    current: item.current,
    currentLabel: item.current ? labels.current : undefined,
    location: item.location,
    workMode: item.workMode,
    workModeLabel: item.workMode ? labels.workModes[item.workMode] : undefined,
    description: item.confidentialityNote
      ? `${item.summary} ${item.confidentialityNote}`
      : item.summary,
    responsibilities: item.responsibilities,
    achievements: item.achievements,
    technologies: item.technologies,
    companyLogoSrc: item.logo?.src,
    companyLogoAlt: item.logo?.alt,
  }));
}

export function selectFeaturedExperiences(
  items: readonly PortfolioProfessionalExperienceContent[],
  limit = 3,
): readonly PortfolioProfessionalExperienceContent[] {
  return items.slice(0, Math.max(0, limit));
}
