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
  {
    label: 'Layout',
    path: '/layout',
    description: 'Responsive composition primitives',
  },
  {
    label: 'Buttons',
    path: '/buttons',
    description: 'Action variants, states and usage',
  },
  {
    label: 'Badges',
    path: '/badges',
    description: 'Status, categories and counts',
  },
  {
    label: 'Tags',
    path: '/tags',
    description: 'Metadata, selection and removal',
  },
  {
    label: 'Cards',
    path: '/cards',
    description: 'Content surfaces and typed compositions',
  },
];
