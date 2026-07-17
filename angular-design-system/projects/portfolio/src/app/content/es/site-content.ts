import type { PortfolioSiteContent } from '../models/site-content.model';

export const ES_SITE_CONTENT = {
  identity: {
    name: 'Gonzalo Herrera',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    tagline: 'Pensá en grande. Construí de forma inteligente.',
    description:
      'Ayudo a equipos a construir mejor software mediante ingeniería, liderazgo e inteligencia artificial.',
  },
  shell: {
    accessibility: {
      skipToContent: 'Saltar al contenido principal',
    },
    brand: {
      name: 'Gonzalo Herrera',
      role: 'Frontend Tech Lead & AI-Augmented Engineer',
      homeAriaLabel: 'Gonzalo Herrera, inicio',
    },
    navigation: {
      label: 'Navegación principal',
      openMenuLabel: 'Abrir menú de navegación',
      closeMenuLabel: 'Cerrar menú de navegación',
      externalLinkLabel: 'se abre en una pestaña nueva',
      items: [
        { id: 'home', label: 'Inicio', path: '' },
        { id: 'about', label: 'Sobre mí', path: 'about' },
        { id: 'experience', label: 'Experiencia', path: 'experience' },
        { id: 'projects', label: 'Proyectos', path: 'projects' },
        { id: 'content', label: 'Contenido', path: 'content' },
        { id: 'contact', label: 'Contacto', path: 'contact' },
      ],
    },
    language: {
      label: 'Idioma',
      englishLabel: 'Inglés',
      spanishLabel: 'Español',
    },
    theme: {
      label: 'Tema',
      lightLabel: 'Claro',
      darkLabel: 'Oscuro',
      systemLabel: 'Sistema',
    },
    footer: {
      description:
        'Ayudo a equipos a construir mejor software mediante ingeniería, liderazgo e inteligencia artificial.',
      navigationLabel: 'Navegación del pie',
      socialLabel: 'Redes sociales',
      copyright: '© 2026 Gonzalo Herrera. Todos los derechos reservados.',
    },
  },
  pages: {
    home: {
      eyebrow: 'Base del portfolio',
      title: 'Gonzalo Herrera',
      description: 'Frontend Tech Lead & AI-Augmented Engineer',
      stage: 'La experiencia completa de Inicio se implementará en el PR 12.',
      metaTitle: 'Inicio',
      metaDescription:
        'Gonzalo Herrera es Frontend Tech Lead y AI-Augmented Engineer y ayuda a equipos a construir mejor software.',
    },
    about: {
      eyebrow: 'Sobre mí',
      title: 'Historia profesional',
      description: 'Historia profesional, principios de ingeniería y enfoque de liderazgo.',
      stage: 'La página completa Sobre mí se implementará en el PR 13.',
      metaTitle: 'Sobre mí',
      metaDescription:
        'Conocé la historia profesional, los principios de ingeniería y el enfoque de liderazgo de Gonzalo Herrera.',
    },
    experience: {
      eyebrow: 'Experiencia',
      title: 'Experiencia en ingeniería y liderazgo',
      description: 'Roles, resultados y equipos acompañados a lo largo de una carrera frontend.',
      stage: 'La página completa Experiencia se implementará en el PR 14.',
      metaTitle: 'Experiencia',
      metaDescription: 'Conocé la experiencia de Gonzalo Herrera en ingeniería y liderazgo.',
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Proyectos y casos de estudio seleccionados',
      description: 'Trabajo de producto, decisiones técnicas y resultados representativos.',
      stage: 'Los proyectos y casos de estudio se implementarán en el PR 15.',
      metaTitle: 'Proyectos',
      metaDescription: 'Explorá proyectos de ingeniería y casos de estudio de Gonzalo Herrera.',
    },
    content: {
      eyebrow: 'Contenido',
      title: 'Artículos, charlas e ideas prácticas',
      description: 'Conocimiento práctico sobre frontend, liderazgo e inteligencia artificial.',
      stage: 'El hub completo de Contenido se implementará en el PR 16.',
      metaTitle: 'Contenido',
      metaDescription:
        'Artículos e ideas prácticas sobre ingeniería frontend, liderazgo e inteligencia artificial.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Iniciemos una conversación con propósito',
      description: 'Un futuro espacio para conversar sobre ingeniería, liderazgo y colaboración.',
      stage: 'La experiencia completa de Contacto se implementará en el PR 17.',
      metaTitle: 'Contacto',
      metaDescription:
        'Contactá a Gonzalo Herrera para conversar sobre ingeniería, liderazgo y colaboración.',
    },
    'not-found': {
      eyebrow: '404',
      title: 'Página no encontrada',
      description: 'La página que buscás no existe o pudo haber cambiado de ubicación.',
      stage: 'Usá el enlace siguiente para continuar navegando el portfolio.',
      metaTitle: 'Página no encontrada',
      metaDescription: 'No se pudo encontrar la página solicitada del portfolio.',
      actionLabel: 'Volver al inicio',
    },
  },
} as const satisfies PortfolioSiteContent;
