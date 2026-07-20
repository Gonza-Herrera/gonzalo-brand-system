import type {
  PortfolioExperienceContent,
  PortfolioProfessionalExperienceContent,
} from '../models/experience-content.model';

// Los registros laborales permanecen vacíos hasta contar con empresa, rol y fechas en una
// fuente aprobada del repositorio. Esta colección también alimenta el preview de Home.
export const ES_PROFESSIONAL_EXPERIENCES: readonly PortfolioProfessionalExperienceContent[] = [];

export const ES_EXPERIENCE_CONTENT = {
  metaTitle: 'Experiencia',
  metaDescription:
    'Conoce la experiencia de Gonzalo Herrera en ingeniería frontend, arquitectura Angular, liderazgo técnico y desarrollo de software asistido por IA.',
  hero: {
    eyebrow: 'Experiencia',
    title: 'Construyendo productos frontend, sistemas de ingeniería y equipos más sólidos.',
    description:
      'Mi experiencia combina desarrollo frontend, arquitectura Angular, liderazgo técnico y mejora continua de prácticas de ingeniería.',
    visualLabel: 'Áreas de enfoque de la experiencia',
    visualTitle: 'De la implementación al impacto en ingeniería',
    highlights: [
      { id: 'frontend-engineering', label: 'Ingeniería Frontend' },
      { id: 'angular-architecture', label: 'Arquitectura Angular' },
      { id: 'technical-leadership', label: 'Liderazgo Técnico' },
      { id: 'ai-augmented-development', label: 'Desarrollo asistido por IA' },
    ],
  },
  summary: {
    eyebrow: 'Resumen profesional',
    title: 'Un recorrido desde la entrega frontend hacia un impacto más amplio en ingeniería',
    paragraphs: [
      'Mi trayectoria profesional creció desde la implementación frontend práctica hacia la definición de arquitectura, decisiones técnicas y bases reutilizables.',
      'Con el tiempo, mi aporte se amplió hacia la calidad de código, las prácticas de entrega, la colaboración y una mentoría práctica que ayuda a los equipos a trabajar con mayor claridad.',
      'Hoy trabajo en la intersección entre ingeniería frontend, liderazgo técnico y desarrollo responsable asistido por IA.',
    ],
    focusAreasLabel: 'Áreas de enfoque profesional',
    focusAreas: [
      'Entrega de producto',
      'Arquitectura frontend',
      'Calidad de código',
      'Colaboración en equipo',
      'Mentoría técnica',
      'Mejora continua',
    ],
  },
  timeline: {
    eyebrow: 'Experiencia profesional',
    title: 'Línea de tiempo profesional',
    description:
      'Los roles se presentan en el orden provisto por datos verificados; las fechas nunca se infieren, ordenan ni se usan para calcular antigüedad.',
    verificationNotice:
      'Los datos de empresas, roles y fechas todavía no están disponibles en una fuente aprobada del repositorio. Se agregarán aquí únicamente después de su verificación.',
    labels: {
      card: {
        at: 'en',
        responsibilities: 'Responsabilidades',
        achievements: 'Aportes destacados',
        technologies: 'Tecnologías',
      },
      current: 'Actual',
      workModes: {
        remote: 'Remoto',
        hybrid: 'Híbrido',
        onsite: 'Presencial',
      },
    },
    items: ES_PROFESSIONAL_EXPERIENCES,
  },
  leadership: {
    eyebrow: 'Liderazgo e impacto en ingeniería',
    title: 'Impacto más allá de la implementación',
    description:
      'A medida que evolucionaron mis responsabilidades, mi aporte pasó de entregar funcionalidades a mejorar arquitectura, calidad, colaboración y toma de decisiones técnicas.',
    items: [
      {
        id: 'frontend-architecture',
        iconLabel: '01',
        title: 'Arquitectura Frontend',
        description:
          'Definir estructuras mantenibles, patrones reutilizables y límites claros para aplicaciones Angular.',
      },
      {
        id: 'code-review-quality',
        iconLabel: '02',
        title: 'Revisión de código y calidad',
        description:
          'Revisar pull requests con foco en claridad, mantenibilidad, consistencia y aprendizaje compartido.',
      },
      {
        id: 'technical-mentoring',
        iconLabel: '03',
        title: 'Mentoría Técnica',
        description:
          'Ayudar a los ingenieros a comprender decisiones, mejorar la calidad de implementación y ganar confianza.',
      },
      {
        id: 'engineering-standards',
        iconLabel: '04',
        title: 'Estándares de Ingeniería',
        description:
          'Crear convenciones y documentación que reduzcan ambigüedad y mejoren la colaboración.',
      },
      {
        id: 'delivery-collaboration',
        iconLabel: '05',
        title: 'Entrega y Colaboración',
        description:
          'Trabajar con producto, diseño y backend para identificar riesgos y tomar decisiones de implementación con anticipación.',
      },
      {
        id: 'developer-experience',
        iconLabel: '06',
        title: 'Experiencia de Desarrollo',
        description:
          'Mejorar herramientas, bases compartidas y flujos que hagan más claro el trabajo diario de ingeniería.',
      },
    ],
  },
  waysOfWorking: {
    eyebrow: 'Formas de trabajo',
    title: 'Cómo trabajo dentro de equipos de producto e ingeniería',
    description:
      'Prefiero trabajar con contexto claro, estándares compartidos, colaboración temprana y feedback continuo.',
    items: [
      {
        id: 'understand-problem',
        iconLabel: '01',
        title: 'Comprender el problema',
        description:
          'Aclarar el objetivo de producto, los usuarios, las restricciones y los riesgos antes de definir la implementación.',
      },
      {
        id: 'small-decisions',
        iconLabel: '02',
        title: 'Dividir el trabajo en decisiones pequeñas',
        description:
          'Reducir la complejidad separando problemas grandes en decisiones técnicas más pequeñas y revisables.',
      },
      {
        id: 'collaborate-early',
        iconLabel: '03',
        title: 'Colaborar desde el inicio',
        description:
          'Conversar sobre arquitectura, UX e implicancias de API antes de que los cambios sean costosos.',
      },
      {
        id: 'deliver-incrementally',
        iconLabel: '04',
        title: 'Entregar de forma incremental',
        description:
          'Preferir pull requests pequeños y entendibles que cuenten una historia clara.',
      },
      {
        id: 'review-constructively',
        iconLabel: '05',
        title: 'Revisar de forma constructiva',
        description:
          'Utilizar el feedback para mejorar la solución y el entendimiento compartido del equipo.',
      },
      {
        id: 'document-decisions',
        iconLabel: '06',
        title: 'Documentar decisiones relevantes',
        description:
          'Documentar las decisiones que otros ingenieros necesitarán comprender o revisar en el futuro.',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Capacidades seleccionadas',
    title: 'Capacidades desarrolladas a través de la experiencia',
    description:
      'Una mirada enfocada a capacidades de ingeniería, liderazgo y herramientas respaldadas por las fuentes técnicas y de marca aprobadas del repositorio.',
    itemsLabel: 'Capacidades',
    groups: [
      {
        id: 'frontend-engineering',
        title: 'Ingeniería Frontend',
        items: [
          'Desarrollo de aplicaciones Angular',
          'TypeScript',
          'Signals',
          'Interfaces responsive',
          'Accesibilidad',
          'Rendimiento',
        ],
      },
      {
        id: 'architecture-quality',
        title: 'Arquitectura y Calidad',
        items: [
          'Arquitectura Angular',
          'Clean Architecture',
          'Design systems',
          'Componentes reutilizables',
          'Revisión de código',
          'Documentación técnica',
        ],
      },
      {
        id: 'leadership-collaboration',
        title: 'Liderazgo y Colaboración',
        items: [
          'Toma de decisiones técnicas',
          'Mentoría técnica',
          'Estándares de ingeniería compartidos',
          'Feedback claro',
          'Desarrollo de equipos',
        ],
      },
      {
        id: 'delivery-tooling',
        title: 'Entrega y Herramientas',
        items: ['Flujos con Git', 'Tests unitarios', 'Storybook', 'SCSS', 'Design tokens'],
      },
      {
        id: 'ai-augmented-engineering',
        title: 'Ingeniería asistida por IA',
        items: [
          'Revisión de código asistida por IA',
          'Flujos de documentación',
          'Exploración de arquitectura',
          'Soporte para refactorización',
          'Organización del conocimiento',
        ],
      },
    ],
  },
  careerDirection: {
    eyebrow: 'Dirección profesional',
    title: 'Hacia dónde conduce esta experiencia',
    paragraphs: [
      'Mi foco actual es continuar creciendo en roles de liderazgo técnico donde pueda combinar arquitectura frontend, desarrollo de equipos e ingeniería asistida por IA.',
      'Me interesan especialmente los entornos donde la calidad de ingeniería, el pensamiento de producto y la mejora continua se consideran responsabilidades compartidas.',
    ],
    pointsLabel: 'Dirección profesional',
    points: [
      { id: 'frontend-tech-leadership', label: 'Liderazgo Técnico Frontend' },
      { id: 'angular-architecture', label: 'Arquitectura Angular' },
      { id: 'design-systems', label: 'Design Systems' },
      { id: 'developer-experience', label: 'Experiencia de Desarrollo' },
      { id: 'ai-augmented-engineering', label: 'Ingeniería asistida por IA' },
      { id: 'engineering-mentoring', label: 'Mentoría de Ingeniería' },
    ],
    projectsAction: {
      label: 'Explorar proyectos destacados',
      pageId: 'projects',
      variant: 'ghost',
    },
  },
  contact: {
    eyebrow: 'Iniciemos una conversación',
    title: '¿Buscas liderazgo frontend o experiencia en Angular?',
    description:
      'Si estás construyendo una plataforma frontend, evolucionando una arquitectura Angular o mejorando prácticas de ingeniería, conversemos.',
    actions: [
      { label: 'Contactarme', pageId: 'contact', variant: 'primary' },
      { label: 'Ver proyectos destacados', pageId: 'projects', variant: 'secondary' },
    ],
  },
} as const satisfies PortfolioExperienceContent;
