import type { PortfolioSiteContent } from '../models/site-content.model';
import { EN_ABOUT_CONTENT } from './about.content';
import { EN_CONTENT_HUB_CONTENT } from './content-hub.content';
import { EN_EXPERIENCE_CONTENT } from './experience.content';
import { EN_HOME_CONTENT } from './home.content';
import { EN_NOT_FOUND_CONTENT } from './not-found.content';
import { EN_PAGE_METADATA } from './page-metadata.content';
import { EN_PROJECTS_CONTENT } from './projects.content';
import { EN_SITE_SHELL_CONTENT } from './site-shell.content';

export const EN_SITE_CONTENT = {
  ...EN_SITE_SHELL_CONTENT,
  pages: {
    home: EN_HOME_CONTENT,
    about: EN_ABOUT_CONTENT,
    experience: EN_EXPERIENCE_CONTENT,
    projects: EN_PROJECTS_CONTENT,
    content: EN_CONTENT_HUB_CONTENT,
    contact: EN_PAGE_METADATA.contact,
    'not-found': EN_NOT_FOUND_CONTENT,
  },
} as const satisfies PortfolioSiteContent;
