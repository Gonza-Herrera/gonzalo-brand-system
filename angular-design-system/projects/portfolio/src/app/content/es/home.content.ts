import type { PortfolioHomeContent } from '../models/home-content.model';
import {
  ES_EXPERIENCE_TIMELINE_LABELS,
  ES_FEATURED_CONTENT_PREVIEW,
  ES_FEATURED_PROJECT_PREVIEW,
  ES_HOME_EXPERIENCE_IDENTITIES,
} from './home-previews.content';
import { ES_PAGE_METADATA } from './page-metadata.content';

export const ES_HOME_CONTENT = {
  ...ES_PAGE_METADATA.home,
  hero: {
    eyebrow: 'Liderazgo frontend · Angular · IA',
    title: 'Pensá en grande. Construí mejor.',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    description:
      'Ayudo a equipos a construir mejor software a través de ingeniería, liderazgo e inteligencia artificial.',
    visualLabel: 'Áreas de enfoque profesional',
    primaryAction: {
      label: 'Ver proyectos destacados',
      pageId: 'projects',
      variant: 'primary',
    },
    secondaryAction: {
      label: 'Sobre mí',
      pageId: 'about',
      variant: 'secondary',
    },
    highlights: [
      { id: 'frontend-engineering', label: 'Ingeniería', value: 'Sistemas frontend' },
      {
        id: 'technical-leadership',
        label: 'Liderazgo',
        value: 'Decisiones de equipo más claras',
      },
      {
        id: 'ai-augmented-development',
        label: 'IA aplicada',
        value: 'Flujos de ingeniería más inteligentes',
      },
    ],
  },
  expertise: {
    eyebrow: 'Áreas de especialización',
    title: 'Qué ayudo a mejorar en los equipos',
    description:
      'Una combinación de ingeniería frontend, liderazgo técnico y adopción práctica de inteligencia artificial.',
    items: [
      {
        id: 'frontend-engineering',
        iconLabel: '01',
        title: 'Ingeniería Frontend',
        description: 'Construcción de aplicaciones mantenibles, accesibles y de alto rendimiento.',
      },
      {
        id: 'technical-leadership',
        iconLabel: '02',
        title: 'Liderazgo Técnico',
        description:
          'Acompañamiento a equipos para decidir con claridad, colaborar mejor y entregar con confianza.',
      },
      {
        id: 'angular-architecture',
        iconLabel: '03',
        title: 'Arquitectura Angular',
        description:
          'Diseño de aplicaciones Angular escalables, sistemas reutilizables y bases frontend sostenibles.',
      },
      {
        id: 'ai-augmented-development',
        iconLabel: '04',
        title: 'Desarrollo asistido por IA',
        description:
          'Uso de IA para mejorar flujos de ingeniería sin reemplazar el criterio técnico.',
      },
      {
        id: 'developer-experience',
        iconLabel: '05',
        title: 'Experiencia de Desarrollo',
        description:
          'Reducción de fricción mediante mejores herramientas, documentación y estándares compartidos.',
      },
      {
        id: 'mentoring-code-quality',
        iconLabel: '06',
        title: 'Mentoría y Calidad de Código',
        description:
          'Acompañamiento a profesionales mediante revisiones de código, feedback y orientación técnica práctica.',
      },
    ],
  },
  selectedProjects: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Proyectos destacados',
    description:
      'Proyectos que combinan arquitectura frontend, sistemas reutilizables e ingeniería asistida por IA.',
    viewAllAction: {
      label: 'Ver todos los proyectos',
      pageId: 'projects',
      variant: 'ghost',
    },
    cardLabels: {
      projectPrefix: 'Proyecto',
      featured: 'Destacado',
      technologies: 'Tecnologías',
      links: 'Enlaces del proyecto',
      caseStudy: 'Ver caso de estudio',
      repository: 'Ver repositorio',
    },
    items: [ES_FEATURED_PROJECT_PREVIEW],
  },
  experience: {
    eyebrow: 'Resumen de experiencia',
    title: 'Experiencia',
    description:
      'Una trayectoria enfocada en ingeniería frontend, liderazgo técnico y mejores formas de construir software.',
    viewAllAction: {
      label: 'Ver experiencia completa',
      pageId: 'experience',
      variant: 'ghost',
    },
    cardLabels: ES_EXPERIENCE_TIMELINE_LABELS.card,
    items: ES_HOME_EXPERIENCE_IDENTITIES.map(
      ({ id, role, company, startDate, endDate, current }) => ({
        id,
        role,
        company,
        startDate,
        endDate,
        current,
        currentLabel: current ? ES_EXPERIENCE_TIMELINE_LABELS.current : undefined,
      }),
    ),
  },
  featuredContent: {
    eyebrow: 'Ideas y práctica',
    title: 'Contenido destacado',
    description:
      'Ideas y aprendizajes prácticos sobre Angular, liderazgo técnico y desarrollo asistido por IA.',
    typeLabels: {
      article: 'Artículo',
      project: 'Proyecto',
      linkedin: 'LinkedIn',
      resource: 'Recurso',
      talk: 'Charla',
    },
    tagsLabel: 'Temas del contenido',
    linkLabel: 'Leer la guía',
    item: ES_FEATURED_CONTENT_PREVIEW,
  },
  contact: {
    eyebrow: 'Iniciemos una conversación',
    title: 'Construyamos algo mejor.',
    description:
      '¿Tenés un proyecto, una oportunidad o un desafío de ingeniería que valga la pena conversar?',
    actions: [
      {
        label: 'Contactarme',
        pageId: 'contact',
        variant: 'primary',
      },
    ],
  },
} as const satisfies PortfolioHomeContent;
