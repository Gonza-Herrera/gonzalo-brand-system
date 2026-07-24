import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Overview · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/overview/overview').then((module) => module.OverviewPage),
  },
  {
    path: 'colors',
    title: 'Colors · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/colors/colors').then((module) => module.ColorsPage),
  },
  {
    path: 'typography',
    title: 'Typography · Gonzalo Herrera Design System',
    loadComponent: () =>
      import('./pages/typography/typography').then((module) => module.TypographyPage),
  },
  {
    path: 'spacing',
    title: 'Spacing · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/spacing/spacing').then((module) => module.SpacingPage),
  },
  {
    path: 'radii',
    title: 'Radii · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/radii/radii').then((module) => module.RadiiPage),
  },
  {
    path: 'shadows',
    title: 'Shadows · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/shadows/shadows').then((module) => module.ShadowsPage),
  },
  {
    path: 'layout',
    title: 'Layout · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/layout/layout').then((module) => module.LayoutPage),
  },
  {
    path: 'buttons',
    title: 'Button · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/buttons/buttons').then((module) => module.ButtonsPage),
  },
  {
    path: 'badges',
    title: 'Badges · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/badges/badges').then((module) => module.BadgesPage),
  },
  {
    path: 'tags',
    title: 'Tags · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/tags/tags').then((module) => module.TagsPage),
  },
  {
    path: 'cards',
    title: 'Cards · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/cards/cards').then((module) => module.CardsPage),
  },
  {
    path: 'patterns',
    title: 'Patterns · Gonzalo Herrera Design System',
    loadComponent: () => import('./pages/patterns/patterns').then((module) => module.PatternsPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
