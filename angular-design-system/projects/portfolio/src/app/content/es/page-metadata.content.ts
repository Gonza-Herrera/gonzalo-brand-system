import type { PortfolioPageId, PortfolioPageMetadata } from '../models/page-content.model';

export const ES_PAGE_METADATA = {
  home: {
    metaTitle: 'Gonzalo Herrera | Frontend Tech Lead e Ingeniero Aumentado por IA',
    metaDescription:
      'Frontend Tech Lead e Ingeniero Aumentado por IA especializado en Angular, arquitectura frontend escalable, liderazgo técnico y mejores procesos de desarrollo.',
    metaTitleIsAbsolute: true,
  },
  about: {
    metaTitle: 'Sobre mí',
    metaDescription:
      'Conoce la trayectoria de Gonzalo Herrera en ingeniería frontend, su experiencia en liderazgo y su enfoque para construir software mantenible con Angular e IA.',
  },
  experience: {
    metaTitle: 'Experiencia',
    metaDescription:
      'Explora la experiencia profesional de Gonzalo Herrera en ingeniería frontend, desarrollo con Angular, liderazgo técnico y entrega de software.',
  },
  projects: {
    metaTitle: 'Proyectos',
    metaDescription:
      'Explora proyectos seleccionados de Gonzalo Herrera sobre Angular, arquitectura frontend, sistemas de diseño, experiencia de desarrollo e ingeniería asistida por IA.',
  },
  content: {
    metaTitle: 'Contenido',
    metaDescription:
      'Artículos, ideas y aprendizajes prácticos sobre Angular, ingeniería frontend, liderazgo técnico, calidad de código y desarrollo de software aumentado por IA.',
  },
  contact: {
    metaTitle: 'Contacto',
    metaDescription:
      'Contacta a Gonzalo Herrera para conversar sobre ingeniería frontend, Angular, liderazgo técnico, colaboración y oportunidades de software.',
  },
  'not-found': {
    metaTitle: 'Página no encontrada',
    metaDescription:
      'No se pudo encontrar la página que buscas. Regresa al portfolio de Gonzalo Herrera y continúa explorando.',
  },
} as const satisfies Readonly<Record<PortfolioPageId, PortfolioPageMetadata>>;
