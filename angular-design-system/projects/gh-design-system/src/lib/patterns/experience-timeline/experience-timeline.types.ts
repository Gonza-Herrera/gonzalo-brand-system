export type {
  GhExperienceCardData,
  GhExperienceCardHeadingLevel,
  GhExperienceCardLabels,
} from '../../components/cards/experience-card/experience-card.types';

export const GH_EXPERIENCE_TIMELINE_ORIENTATIONS = ['vertical', 'compact'] as const;

export type GhExperienceTimelineOrientation = (typeof GH_EXPERIENCE_TIMELINE_ORIENTATIONS)[number];
