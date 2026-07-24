import type { PortfolioAboutContent } from '../models/about-content.model';

export const ES_ABOUT_CONTENT = {
  metaTitle: 'Sobre mí',
  metaDescription:
    'Conoce la trayectoria de Gonzalo Herrera en ingeniería frontend, su experiencia en liderazgo y su enfoque para construir software mantenible con Angular e IA.',
  hero: {
    eyebrow: 'Sobre mí',
    title: 'Ingeniería, liderazgo y mejores formas de construir software.',
    role: 'Frontend Tech Lead & AI-Augmented Engineer',
    description:
      'Me enfoco en ayudar a los equipos a crear productos mantenibles, sistemas más claros y mejores prácticas de ingeniería.',
    secondaryText:
      'Mi trabajo conecta arquitectura frontend, liderazgo técnico y adopción práctica de IA alrededor de un objetivo: ayudar a los equipos a construir mejor software.',
    visualLabel: 'Áreas de enfoque profesional',
    focuses: [
      { id: 'frontend-engineering', label: 'Ingeniería Frontend' },
      { id: 'technical-leadership', label: 'Liderazgo Técnico' },
      { id: 'angular-architecture', label: 'Arquitectura Angular' },
      { id: 'ai-augmented-development', label: 'Desarrollo Asistido por IA' },
      { id: 'design-systems', label: 'Design Systems' },
      { id: 'developer-experience', label: 'Experiencia de Desarrollo' },
    ],
  },
  story: {
    eyebrow: 'Historia profesional',
    title: 'De construir interfaces a ayudar a los equipos a crear mejores sistemas',
    paragraphs: [
      'Comencé enfocándome en la implementación frontend: construyendo interfaces, integrando APIs y resolviendo necesidades de producto.',
      'Con el tiempo, mi rol fue más allá de escribir código. Empecé a involucrarme en arquitectura, revisiones de código, decisiones técnicas, mentoring y mejoras en la forma de trabajar de los equipos.',
      'Hoy combino ingeniería frontend, liderazgo técnico y adopción práctica de inteligencia artificial para ayudar a construir software más fácil de entender, mantener y evolucionar.',
    ],
    highlights: [
      {
        id: 'frontend-foundations',
        label: 'Fundamentos frontend',
        description: 'Construcción de aplicaciones escalables, accesibles y mantenibles.',
      },
      {
        id: 'technical-leadership',
        label: 'Liderazgo técnico',
        description: 'Mejora de decisiones, colaboración y estándares de ingeniería compartidos.',
      },
      {
        id: 'ai-augmented-workflows',
        label: 'Flujos asistidos por IA',
        description: 'Uso de IA para reducir fricción y acompañar un mejor trabajo de ingeniería.',
      },
      {
        id: 'developer-experience',
        label: 'Experiencia de desarrollo',
        description:
          'Creación de herramientas, documentación y sistemas que ayudan a trabajar con claridad.',
      },
    ],
    experienceAction: {
      label: 'Ver mi experiencia',
      pageId: 'experience',
      variant: 'ghost',
    },
  },
  philosophy: {
    eyebrow: 'Filosofía de ingeniería',
    title: 'Cómo entiendo la ingeniería de software',
    description:
      'El buen software no es solamente código que funciona. También debe ser entendible, mantenible y útil para quienes lo construyen y lo utilizan.',
    items: [
      {
        id: 'clarity',
        iconLabel: '01',
        title: 'Claridad antes que ingenio innecesario',
        description: 'Preferir soluciones que el equipo pueda entender, explicar y evolucionar.',
      },
      {
        id: 'simplicity',
        iconLabel: '02',
        title: 'Simplicidad antes que abstracción',
        description: 'Introducir complejidad solo cuando el problema y la evidencia la requieran.',
      },
      {
        id: 'consistency',
        iconLabel: '03',
        title: 'Consistencia antes que preferencia',
        description:
          'Las convenciones compartidas reducen fricción y hacen la colaboración más predecible.',
      },
      {
        id: 'maintainability',
        iconLabel: '04',
        title: 'La mantenibilidad es un requisito de producto',
        description: 'La entrega importa, al igual que la capacidad de sostener lo que sigue.',
      },
      {
        id: 'accessibility',
        iconLabel: '05',
        title: 'Accesibilidad desde el inicio',
        description:
          'El comportamiento inclusivo pertenece a los fundamentos, no a una corrección final.',
      },
      {
        id: 'change-ready-architecture',
        iconLabel: '06',
        title: 'La arquitectura debe facilitar el cambio',
        description:
          'Estructurar sistemas con límites claros y caminos realistas para su evolución.',
      },
    ],
  },
  leadership: {
    eyebrow: 'Enfoque de liderazgo',
    title: 'El liderazgo técnico consiste en generar claridad',
    paragraphs: [
      'Para mí, el liderazgo técnico no significa tener todas las respuestas. Significa ayudar al equipo a comprender el problema, evaluar alternativas y tomar decisiones con suficiente contexto.',
      'También implica crear un entorno donde el feedback sea útil, los estándares sean compartidos y cada persona pueda asumir responsabilidad sobre su trabajo.',
    ],
    practices: [
      {
        id: 'context',
        iconLabel: '01',
        title: 'Contexto antes que instrucciones',
        description:
          'Explicar por qué una decisión importa, en lugar de definir únicamente qué debe hacerse.',
      },
      {
        id: 'feedback',
        iconLabel: '02',
        title: 'El feedback como herramienta',
        description:
          'Utilizar las revisiones de código y las conversaciones para mejorar la solución y acompañar el crecimiento profesional.',
      },
      {
        id: 'shared-standards',
        iconLabel: '03',
        title: 'Estándares compartidos',
        description:
          'Crear convenciones que reduzcan decisiones innecesarias y faciliten la colaboración.',
      },
      {
        id: 'ownership',
        iconLabel: '04',
        title: 'Responsabilidad con contexto',
        description:
          'Brindar suficiente contexto y confianza para que cada persona pueda tomar decisiones responsables.',
      },
      {
        id: 'practical-mentoring',
        iconLabel: '05',
        title: 'Mentoring práctico',
        description: 'Convertir los desafíos técnicos en oportunidades de aprendizaje y mejora.',
      },
    ],
  },
  aiEngineering: {
    eyebrow: 'Ingeniería asistida por IA',
    title: 'Utilizar IA como multiplicador de la ingeniería',
    description:
      'Utilizo inteligencia artificial para acelerar tareas repetitivas, explorar alternativas, mejorar documentación y acompañar flujos de ingeniería.',
    supportingText:
      'El objetivo no es reemplazar el criterio técnico. Es brindar más tiempo y contexto para tomar mejores decisiones.',
    useCases: [
      {
        id: 'code-review-support',
        iconLabel: '01',
        title: 'Asistencia en revisión de código',
        description:
          'Comparar decisiones de implementación con los estándares del proyecto y señalar áreas que requieren revisión humana.',
      },
      {
        id: 'documentation-assistance',
        iconLabel: '02',
        title: 'Asistencia en documentación',
        description:
          'Transformar contexto técnico en guías, ejemplos y referencias compartidas más claras.',
      },
      {
        id: 'test-analysis',
        iconLabel: '03',
        title: 'Análisis de tests',
        description:
          'Resumir fallas, identificar patrones y enfocar la investigación en causas relevantes.',
      },
      {
        id: 'architecture-exploration',
        iconLabel: '04',
        title: 'Exploración de arquitectura',
        description: 'Evaluar alternativas y compromisos antes de avanzar con una implementación.',
      },
      {
        id: 'refactoring-support',
        iconLabel: '05',
        title: 'Asistencia en refactoring',
        description:
          'Explorar cambios pequeños y revisables preservando el comportamiento y la intención.',
      },
      {
        id: 'knowledge-organization',
        iconLabel: '06',
        title: 'Organización del conocimiento',
        description:
          'Estructurar contexto de ingeniería disperso para que el equipo pueda encontrarlo y reutilizarlo.',
      },
    ],
    principleLabel: 'Un principio para una adopción responsable',
    principle: 'La IA debe potenciar el criterio de ingeniería, no reemplazarlo.',
  },
  principles: {
    eyebrow: 'Principios fundamentales',
    title: 'Principios que guían mi trabajo',
    description:
      'Estos principios ayudan a convertir decisiones técnicas en software y prácticas de equipo que mantienen su valor en el tiempo.',
    items: [
      {
        id: 'understand-before-building',
        iconLabel: '01',
        title: 'Comprender antes de construir',
        description:
          'La calidad de una solución depende de comprender correctamente el problema y sus restricciones.',
      },
      {
        id: 'explicit-decisions',
        iconLabel: '02',
        title: 'Hacer explícitas las decisiones',
        description:
          'Documentar el razonamiento, las alternativas y los compromisos detrás de decisiones técnicas importantes.',
      },
      {
        id: 'sustainable-solutions',
        iconLabel: '03',
        title: 'Preferir soluciones sostenibles',
        description:
          'Optimizar para entregar, mantener, evolucionar y facilitar la propiedad del equipo.',
      },
      {
        id: 'clear-communication',
        iconLabel: '04',
        title: 'Comunicar con claridad',
        description:
          'La comunicación clara reduce ambigüedad, retrabajo y complejidad innecesaria.',
      },
      {
        id: 'build-for-people',
        iconLabel: '05',
        title: 'Construir para las personas',
        description:
          'El software debe ser útil para quienes lo usan y entendible para quienes lo mantienen.',
      },
      {
        id: 'continuous-learning',
        iconLabel: '06',
        title: 'Seguir aprendiendo',
        description:
          'Aprender y adaptarse forma parte del trabajo de ingeniería a medida que cambia la tecnología.',
      },
    ],
  },
  technicalFocus: {
    eyebrow: 'Capacidades',
    title: 'Enfoque técnico',
    description:
      'Las tecnologías importan, pero las decisiones, la arquitectura y las prácticas que las rodean importan todavía más.',
    itemsLabel: 'Áreas de enfoque',
    groups: [
      {
        id: 'frontend-engineering',
        title: 'Ingeniería Frontend',
        items: [
          'TypeScript',
          'JavaScript',
          'HTML',
          'CSS',
          'SCSS',
          'Diseño Responsive',
          'Accesibilidad',
        ],
      },
      {
        id: 'angular-architecture',
        title: 'Arquitectura Angular',
        items: [
          'Angular',
          'Componentes Standalone',
          'Signals',
          'RxJS',
          'Routing',
          'Lazy Loading',
          'Formularios Reactivos',
          'Integración HTTP',
          'Design Systems',
          'Testing',
          'Performance',
        ],
      },
      {
        id: 'engineering-practices',
        title: 'Prácticas de Ingeniería',
        items: [
          'Revisión de Código',
          'Documentación Técnica',
          'Decisiones de Arquitectura',
          'Estrategia de Testing',
          'CI/CD',
          'Git',
          'Entrega Ágil',
        ],
      },
      {
        id: 'ai-augmented-development',
        title: 'Desarrollo Asistido por IA',
        items: [
          'Diseño de Prompts',
          'Revisión de Código Asistida por IA',
          'Flujos de Documentación',
          'Exploración con Agentes',
          'Automatización del Desarrollo',
          'Sistemas de Conocimiento',
        ],
      },
    ],
  },
  workingStyle: {
    eyebrow: 'Forma de trabajo',
    title: 'Cómo trabajo con los equipos',
    description:
      'Prefiero un proceso colaborativo donde el contexto se comparte, las decisiones son visibles y el feedback mejora tanto el trabajo como la forma de trabajar.',
    items: [
      {
        id: 'start-with-context',
        iconLabel: '01',
        title: 'Comenzar por el contexto',
        description:
          'Comprender el objetivo de producto, las restricciones técnicas y las personas involucradas antes de proponer una solución.',
      },
      {
        id: 'smaller-decisions',
        iconLabel: '02',
        title: 'Dividir problemas en decisiones más pequeñas',
        description:
          'Hacer que el trabajo complejo sea más fácil de conversar, validar y cambiar a medida que crece el entendimiento.',
      },
      {
        id: 'collaborate-early',
        iconLabel: '03',
        title: 'Colaborar desde el inicio',
        description:
          'Compartir ideas y riesgos antes de que la implementación sea costosa de modificar.',
      },
      {
        id: 'empathetic-review',
        iconLabel: '04',
        title: 'Revisar con empatía y precisión',
        description:
          'Brindar feedback técnicamente útil, respetuoso y enfocado en mejorar el resultado.',
      },
      {
        id: 'shared-documentation',
        iconLabel: '05',
        title: 'Documentar lo que debe permanecer compartido',
        description:
          'Mantener el contexto importante disponible más allá de una reunión, un mensaje o la memoria individual.',
      },
      {
        id: 'improve-the-system',
        iconLabel: '06',
        title: 'Mejorar el sistema, no solo la tarea',
        description: 'Usar cada entrega para reducir fricción y fortalecer el próximo trabajo.',
      },
    ],
  },
  contact: {
    eyebrow: 'Iniciemos una conversación',
    title: 'Construyamos algo mejor.',
    description:
      'Si estás trabajando en una plataforma frontend, arquitectura Angular, un design system o un flujo de ingeniería asistido por IA, será un gusto conversar.',
    actions: [
      { label: 'Contactarme', pageId: 'contact', variant: 'primary' },
      { label: 'Ver experiencia', pageId: 'experience', variant: 'secondary' },
    ],
  },
} as const satisfies PortfolioAboutContent;
