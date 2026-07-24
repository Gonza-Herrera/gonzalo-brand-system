import type { GhExperienceCardData } from 'gh-design-system';

import type {
  PortfolioExperienceTimelineLabels,
  PortfolioProfessionalExperienceId,
  PortfolioProfessionalExperienceContent,
} from '../models/experience-content.model';

export type PortfolioExperienceCardData = GhExperienceCardData & {
  readonly id: PortfolioProfessionalExperienceId;
};

export function mapPortfolioExperienceToCard(
  item: PortfolioProfessionalExperienceContent,
  labels: PortfolioExperienceTimelineLabels,
): PortfolioExperienceCardData {
  return {
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
      ? [...item.summary, item.confidentialityNote]
      : item.summary,
    responsibilities: item.responsibilities,
    achievements: item.achievements,
    technologies: item.technologies,
    capabilities: item.capabilities,
    companyLogoSrc: item.logo?.src,
    companyLogoAlt: item.logo?.alt,
  };
}

export function mapPortfolioExperiencesToTimeline(
  items: readonly PortfolioProfessionalExperienceContent[],
  labels: PortfolioExperienceTimelineLabels,
): readonly PortfolioExperienceCardData[] {
  return items.map((item) => mapPortfolioExperienceToCard(item, labels));
}

export function mapPortfolioExperiencesToPreview(
  items: readonly PortfolioProfessionalExperienceContent[],
  labels: PortfolioExperienceTimelineLabels,
): readonly PortfolioExperienceCardData[] {
  return items.map((item) => {
    const card = mapPortfolioExperienceToCard(item, labels);

    return {
      id: card.id,
      role: card.role,
      company: card.company,
      startDate: card.startDate,
      endDate: card.endDate,
      current: card.current,
      currentLabel: card.currentLabel,
    };
  });
}
