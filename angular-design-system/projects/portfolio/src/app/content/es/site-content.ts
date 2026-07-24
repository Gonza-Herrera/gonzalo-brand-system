import type { PortfolioSiteContent } from '../models/site-content.model';
import { ES_ABOUT_CONTENT } from './about.content';
import { ES_CONTENT_HUB_CONTENT } from './content-hub.content';
import { ES_EXPERIENCE_CONTENT } from './experience.content';
import { ES_HOME_CONTENT } from './home.content';
import { ES_NOT_FOUND_CONTENT } from './not-found.content';
import { ES_PAGE_METADATA } from './page-metadata.content';
import { ES_PROJECTS_CONTENT } from './projects.content';
import { ES_SITE_SHELL_CONTENT } from './site-shell.content';

export const ES_SITE_CONTENT = {
  ...ES_SITE_SHELL_CONTENT,
  pages: {
    home: ES_HOME_CONTENT,
    about: ES_ABOUT_CONTENT,
    experience: ES_EXPERIENCE_CONTENT,
    projects: ES_PROJECTS_CONTENT,
    content: ES_CONTENT_HUB_CONTENT,
    contact: ES_PAGE_METADATA.contact,
    'not-found': ES_NOT_FOUND_CONTENT,
  },
} as const satisfies PortfolioSiteContent;
