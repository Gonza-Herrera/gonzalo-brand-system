export const PORTFOLIO_PAGE_IDS = [
  'home',
  'about',
  'experience',
  'projects',
  'content',
  'contact',
  'not-found',
] as const;

export const PORTFOLIO_NAVIGATION_PAGE_IDS = [
  'home',
  'about',
  'experience',
  'projects',
  'content',
  'contact',
] as const;

export type PortfolioPageId = (typeof PORTFOLIO_PAGE_IDS)[number];
export type PortfolioNavigationPageId = (typeof PORTFOLIO_NAVIGATION_PAGE_IDS)[number];
export type PortfolioPagePath = '' | 'about' | 'experience' | 'projects' | 'content' | 'contact';

export const PORTFOLIO_PAGE_PATHS = {
  home: '',
  about: 'about',
  experience: 'experience',
  projects: 'projects',
  content: 'content',
  contact: 'contact',
} as const satisfies Readonly<Record<PortfolioNavigationPageId, PortfolioPagePath>>;

export interface PortfolioPageContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly stage: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly actionLabel?: string;
}

export function isPortfolioPageId(value: unknown): value is PortfolioPageId {
  return typeof value === 'string' && PORTFOLIO_PAGE_IDS.some((pageId) => pageId === value);
}
