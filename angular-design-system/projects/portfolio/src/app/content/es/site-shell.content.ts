import type { PortfolioSiteShellContent } from '../models/site-content.model';

export const ES_SITE_SHELL_CONTENT = {
  identity: {
    name: 'Gonzalo Herrera',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    tagline: 'Think bigger. Build smarter.',
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
} as const satisfies PortfolioSiteShellContent;
