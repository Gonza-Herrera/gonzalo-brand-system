export const GH_EXPERIENCE_WORK_MODES = ['remote', 'hybrid', 'onsite'] as const;

export type GhExperienceWorkMode = (typeof GH_EXPERIENCE_WORK_MODES)[number];

export const GH_EXPERIENCE_CARD_HEADING_LEVELS = [2, 3] as const;

export type GhExperienceCardHeadingLevel = (typeof GH_EXPERIENCE_CARD_HEADING_LEVELS)[number];

export interface GhExperienceCardLabels {
  readonly at: string;
  readonly responsibilities: string;
  readonly achievements: string;
  readonly technologies: string;
}

export const GH_EXPERIENCE_CARD_DEFAULT_LABELS: GhExperienceCardLabels = {
  at: 'at',
  responsibilities: 'Responsibilities',
  achievements: 'Key achievements',
  technologies: 'Technologies',
};

export interface GhExperienceCardData {
  readonly id?: string;
  readonly role: string;
  readonly company: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly current?: boolean;
  readonly currentLabel?: string;
  readonly location?: string;
  readonly workMode?: GhExperienceWorkMode;
  readonly workModeLabel?: string;
  readonly description?: string;
  readonly responsibilities?: readonly string[];
  readonly achievements?: readonly string[];
  readonly technologies?: readonly string[];
  readonly companyLogoSrc?: string;
  readonly companyLogoAlt?: string;
}
