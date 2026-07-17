import { Routes } from '@angular/router';

import { PORTFOLIO_SITE_NAME, portfolioPageTitle } from './core/config/site-metadata';
import { PortfolioShellComponent } from './layout/portfolio-shell/portfolio-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: PORTFOLIO_SITE_NAME,
        loadComponent: () => import('./pages/home/home.page').then((module) => module.HomePage),
      },
      {
        path: 'about',
        title: portfolioPageTitle('About'),
        loadComponent: () => import('./pages/about/about.page').then((module) => module.AboutPage),
      },
      {
        path: 'experience',
        title: portfolioPageTitle('Experience'),
        loadComponent: () =>
          import('./pages/experience/experience.page').then((module) => module.ExperiencePage),
      },
      {
        path: 'projects',
        title: portfolioPageTitle('Projects'),
        loadComponent: () =>
          import('./pages/projects/projects.page').then((module) => module.ProjectsPage),
      },
      {
        path: 'content',
        title: portfolioPageTitle('Content'),
        loadComponent: () =>
          import('./pages/content/content.page').then((module) => module.ContentPage),
      },
      {
        path: 'contact',
        title: portfolioPageTitle('Contact'),
        loadComponent: () =>
          import('./pages/contact/contact.page').then((module) => module.ContactPage),
      },
      {
        path: '**',
        title: portfolioPageTitle('Page not found'),
        loadComponent: () =>
          import('./pages/not-found/not-found.page').then((module) => module.NotFoundPage),
      },
    ],
  },
];
