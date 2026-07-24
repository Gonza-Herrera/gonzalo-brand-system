import type { PortfolioPageContent } from '../models/page-content.model';
import { ES_PAGE_METADATA } from './page-metadata.content';

export const ES_NOT_FOUND_CONTENT = {
  ...ES_PAGE_METADATA['not-found'],
  eyebrow: '404',
  title: 'Página no encontrada',
  description: 'La página que buscás no existe o pudo haber cambiado de ubicación.',
  stage: 'Usá el enlace siguiente para continuar navegando el portfolio.',
  actionLabel: 'Volver al inicio',
} as const satisfies PortfolioPageContent;
