import { provideHttpClient, withFetch } from '@angular/common/http';
import type { Routes } from '@angular/router';

import { ContactService } from './services/contact.service';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    data: { pageId: 'contact' },
    providers: [provideHttpClient(withFetch()), ContactService],
    loadComponent: () => import('./contact.page').then((module) => module.ContactPage),
  },
];
