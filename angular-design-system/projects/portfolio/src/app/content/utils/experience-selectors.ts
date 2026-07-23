import type { PortfolioProfessionalExperienceContent } from '../models/experience-content.model';

export function selectOrderedExperiences(
  experiences: readonly PortfolioProfessionalExperienceContent[],
): readonly PortfolioProfessionalExperienceContent[] {
  return [...experiences].sort((left, right) => left.order - right.order);
}

export function selectCurrentExperience(
  experiences: readonly PortfolioProfessionalExperienceContent[],
): PortfolioProfessionalExperienceContent | undefined {
  return experiences.find((experience) => experience.current);
}

export function selectExperiencePreview(
  experiences: readonly PortfolioProfessionalExperienceContent[],
  limit = 3,
): readonly PortfolioProfessionalExperienceContent[] {
  return selectOrderedExperiences(experiences).slice(0, Math.max(0, limit));
}
