import type { PortfolioHomeContent } from '../models/home-content.model';
import {
  mapPortfolioExperiencesToTimeline,
  selectFeaturedExperiences,
} from '../utils/experience-card.mapper';
import { ES_EXPERIENCE_CONTENT } from './experience.content';

export const ES_HOME_CONTENT = {
  metaTitle: 'Gonzalo Herrera | Frontend Tech Lead & AI-Augmented Engineer',
  metaDescription:
    'Liderazgo frontend, arquitectura Angular, design systems e ingeniería asistida por IA por Gonzalo Herrera.',
  metaTitleIsAbsolute: true,
  hero: {
    eyebrow: 'Liderazgo frontend · Angular · IA',
    title: 'Think bigger. Build smarter.',
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
    },
    items: [
      {
        id: 'angular-design-system',
        title: 'Angular Design System',
        description:
          'Un Design System reutilizable en Angular basado en design tokens, accesibilidad, composición y consistencia de marca.',
        status: 'in-progress',
        statusLabel: 'En desarrollo',
        technologies: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'Design Tokens'],
        featured: true,
      },
      {
        id: 'ai-code-review-assistant',
        title: 'AI Code Review Assistant',
        description:
          'Un concepto para revisar pull requests según estándares de ingeniería y reglas específicas del proyecto.',
        status: 'concept',
        statusLabel: 'Concepto',
      },
      {
        id: 'angular-accelerator-kit',
        title: 'Angular Accelerator Kit',
        description:
          'Un concepto de starter kit práctico para bases Angular consistentes, arquitectura y estándares de desarrollo.',
        status: 'concept',
        statusLabel: 'Concepto',
        technologies: ['Angular', 'TypeScript'],
      },
      {
        id: 'ai-toolkit-for-developers',
        title: 'AI Toolkit for Developers',
        description:
          'Un concepto para reunir prompts, flujos de trabajo y recursos reutilizables para desarrollo de software asistido por IA.',
        status: 'concept',
        statusLabel: 'Concepto',
      },
    ],
  },
  experience: {
    eyebrow: 'Resumen de experiencia',
    title: 'Experiencia',
    description:
      'Una trayectoria enfocada en ingeniería frontend, liderazgo técnico y mejores formas de construir software.',
    verificationNotice:
      'Los datos de empresas, roles y fechas se publicarán aquí cuando estén disponibles desde una fuente verificada.',
    viewAllAction: {
      label: 'Ver experiencia completa',
      pageId: 'experience',
      variant: 'ghost',
    },
    cardLabels: ES_EXPERIENCE_CONTENT.timeline.labels.card,
    items: mapPortfolioExperiencesToTimeline(
      selectFeaturedExperiences(ES_EXPERIENCE_CONTENT.timeline.items),
      ES_EXPERIENCE_CONTENT.timeline.labels,
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
    item: {
      id: 'beyond-chat-ai-agents',
      type: 'article',
      eyebrow: 'Preview editorial',
      title: 'Más allá del chat: agentes de IA que hacen trabajo real',
      description:
        'Una mirada práctica al paso de la IA conversacional a flujos de ingeniería útiles, manteniendo siempre el criterio técnico.',
      link: {
        label: 'Explorar contenido',
        pageId: 'content',
        variant: 'ghost',
      },
      tags: ['Agentes de IA', 'Flujos de ingeniería', 'Criterio técnico'],
    },
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
