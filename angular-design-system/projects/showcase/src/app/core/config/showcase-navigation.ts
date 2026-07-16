import type { ShowcaseNavigationItem } from '../models/navigation-item.model';

export const SHOWCASE_NAVIGATION: readonly ShowcaseNavigationItem[] = [
  {
    label: 'Overview',
    path: '/',
    description: 'Brand direction and system status',
    exact: true,
  },
  {
    label: 'Colors',
    path: '/colors',
    description: 'Primitive and semantic color roles',
  },
  {
    label: 'Typography',
    path: '/typography',
    description: 'Families, scale and hierarchy',
  },
  {
    label: 'Spacing',
    path: '/spacing',
    description: 'Rhythm and layout spacing',
  },
  {
    label: 'Radii',
    path: '/radii',
    description: 'Soft geometry and shape',
  },
  {
    label: 'Shadows',
    path: '/shadows',
    description: 'Theme-aware elevation',
  },
];
