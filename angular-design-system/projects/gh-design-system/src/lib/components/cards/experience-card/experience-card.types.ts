export const GH_EXPERIENCE_WORK_MODES = ['remote', 'hybrid', 'onsite'] as const;

export type GhExperienceWorkMode = (typeof GH_EXPERIENCE_WORK_MODES)[number];

export interface GhExperienceCardData {
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
  readonly achievements?: readonly string[];
  readonly technologies?: readonly string[];
  readonly companyLogoSrc?: string;
  readonly companyLogoAlt?: string;
}
