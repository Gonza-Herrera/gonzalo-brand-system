import { Routes } from '@angular/router';

import { portfolioLocaleGuard } from './core/routing/portfolio-locale.guard';
import { PortfolioShellComponent } from './layout/portfolio-shell/portfolio-shell.component';

const unlocalizedRedirects: Routes = [
  { path: 'about', pathMatch: 'full', redirectTo: 'en/about' },
  { path: 'experience', pathMatch: 'full', redirectTo: 'en/experience' },
  { path: 'projects', pathMatch: 'full', redirectTo: 'en/projects' },
  { path: 'content', pathMatch: 'full', redirectTo: 'en/content' },
  { path: 'contact', pathMatch: 'full', redirectTo: 'en/contact' },
];

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'en',
  },
  ...unlocalizedRedirects,
  {
    path: ':locale',
    canActivate: [portfolioLocaleGuard],
    component: PortfolioShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: { pageId: 'home' },
        loadComponent: () => import('./pages/home/home.page').then((module) => module.HomePage),
      },
      {
        path: 'about',
        data: { pageId: 'about' },
        loadComponent: () => import('./pages/about/about.page').then((module) => module.AboutPage),
      },
      {
        path: 'experience',
        data: { pageId: 'experience' },
        loadComponent: () =>
          import('./pages/experience/experience.page').then((module) => module.ExperiencePage),
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            pathMatch: 'full',
            data: { pageId: 'projects' },
            loadComponent: () =>
              import('./pages/projects/projects.page').then((module) => module.ProjectsPage),
          },
          {
            path: ':slug',
            data: { pageId: 'projects', projectDetail: true },
            loadComponent: () =>
              import('./pages/projects/project-detail/project-detail.page').then(
                (module) => module.ProjectDetailPage,
              ),
          },
        ],
      },
      {
        path: 'content',
        data: { pageId: 'content' },
        loadComponent: () =>
          import('./pages/content/content.page').then((module) => module.ContentPage),
      },
      {
        path: 'contact',
        data: { pageId: 'contact' },
        loadComponent: () =>
          import('./pages/contact/contact.page').then((module) => module.ContactPage),
      },
      {
        path: '**',
        data: { pageId: 'not-found' },
        loadComponent: () =>
          import('./pages/not-found/not-found.page').then((module) => module.NotFoundPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'en',
  },
];
