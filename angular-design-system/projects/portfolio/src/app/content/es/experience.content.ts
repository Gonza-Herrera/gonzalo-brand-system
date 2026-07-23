import type {
  PortfolioExperienceContent,
  PortfolioProfessionalExperienceContent,
} from '../models/experience-content.model';

// Trayectoria profesional aprobada. Esta colección también es la única fuente para el preview de Home.
export const ES_PROFESSIONAL_EXPERIENCES: readonly PortfolioProfessionalExperienceContent[] = [
  {
    id: 'icbc-frontend-developer',
    order: 1,
    company: 'Banco ICBC',
    role: 'Frontend Developer',
    startDate: 'Febrero de 2023',
    endDate: 'Actualidad',
    current: true,
    summary: [
      'Como Frontend Developer participo en el desarrollo y evolución de aplicaciones financieras empresariales. Mi trabajo se enfoca en construir soluciones mantenibles con Angular, ofrecer experiencias de usuario consistentes y colaborar con equipos multidisciplinarios.',
      'Además del desarrollo de funcionalidades, participo en discusiones técnicas, revisiones de código e iniciativas de mejora continua que contribuyen a mantener prácticas de ingeniería confiables dentro del proyecto.',
    ],
    responsibilities: [
      'Desarrollar y mantener aplicaciones empresariales con Angular.',
      'Construir componentes de interfaz reutilizables.',
      'Integrar aplicaciones frontend con APIs REST.',
      'Colaborar con equipos de backend, QA y producto.',
      'Participar en revisiones de código y discusiones técnicas.',
      'Mejorar la mantenibilidad y la calidad del código.',
      'Trabajar bajo prácticas ágiles y Scrum.',
      'Contribuir a estándares compartidos de ingeniería frontend.',
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Material',
      'REST APIs',
      'Git',
      'Azure DevOps',
      'Scrum',
    ],
  },
  {
    id: 'endava-team-leader',
    order: 2,
    company: 'Endava',
    role: 'Team Leader',
    startDate: 'Junio de 2021',
    endDate: 'Enero de 2023',
    current: false,
    summary: [
      'Como Team Leader lideré equipos de ingeniería de software combinando liderazgo de personas, coordinación de entregas y colaboración técnica. Me enfoqué en construir un entorno donde la comunicación, el aprendizaje continuo y la calidad de ingeniería fueran parte del trabajo diario.',
      'Trabajé junto a ingenieros, Project Managers y stakeholders para organizar las entregas, acompañar el crecimiento profesional y promover una colaboración efectiva dentro del equipo.',
    ],
    responsibilities: [
      'Liderar y acompañar equipos de ingeniería de software.',
      'Brindar feedback, mentoring y orientación profesional.',
      'Coordinar actividades de planificación y entrega.',
      'Facilitar la comunicación entre stakeholders técnicos y de negocio.',
      'Promover prácticas de ingeniería y estándares de código.',
      'Participar en revisiones técnicas y discusiones de arquitectura.',
      'Fomentar la colaboración y la mejora continua.',
      'Ayudar a los equipos a trabajar con objetivos claros y compartidos.',
    ],
    technologies: ['Angular', 'TypeScript', 'Git', 'Azure DevOps'],
    capabilities: ['Liderazgo técnico', 'Liderazgo de equipos', 'Mentoring', 'Agile', 'Scrum'],
  },
  {
    id: 'vortex-frontend-developer',
    order: 3,
    company: 'Vortex',
    role: 'Frontend Developer',
    startDate: 'Febrero de 2020',
    endDate: 'Mayo de 2021',
    current: false,
    summary: [
      'Formé parte de equipos multidisciplinarios desarrollando aplicaciones web desde el relevamiento inicial de requerimientos hasta las entregas en producción. Colaboré estrechamente con desarrolladores frontend y backend para construir soluciones mantenibles y resolver desafíos de integración antes de que afectaran las entregas.',
      'Durante esta etapa fortalecí mi experiencia en desarrollo con Angular, integración de APIs REST e ingeniería frontend colaborativa a lo largo del ciclo de vida del software.',
    ],
    responsibilities: [
      'Desarrollar aplicaciones web con Angular.',
      'Construir componentes frontend reutilizables y mantenibles.',
      'Integrar aplicaciones frontend con APIs REST.',
      'Colaborar con desarrolladores backend.',
      'Participar en planificación técnica y análisis de requerimientos.',
      'Mejorar la calidad y mantenibilidad de las aplicaciones.',
      'Acompañar entregas a producción.',
      'Resolver defectos e incidencias técnicas.',
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'Git', 'Scrum'],
  },
  {
    id: 'develative-frontend-developer',
    order: 4,
    company: 'Develative',
    role: 'Frontend Developer',
    startDate: 'Agosto de 2019',
    endDate: 'Enero de 2020',
    current: false,
    summary: [
      'Desarrollé aplicaciones web responsivas colaborando con otros desarrolladores para construir soluciones frontend reutilizables y mantenibles. Mi trabajo incluyó identificar defectos, mejorar la calidad del software y participar en actividades de testing y despliegue.',
      'Esta experiencia fortaleció mis bases en desarrollo frontend y mis prácticas de trabajo colaborativo dentro de equipos de ingeniería.',
    ],
    responsibilities: [
      'Desarrollar interfaces web responsivas.',
      'Construir componentes frontend reutilizables.',
      'Identificar y resolver defectos de software.',
      'Mejorar la calidad y mantenibilidad del código.',
      'Colaborar con otros desarrolladores.',
      'Participar en actividades de testing y despliegue.',
    ],
    technologies: ['Angular', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    id: 'develative-project-manager',
    order: 5,
    company: 'Develative',
    role: 'Project Manager',
    startDate: 'Abril de 2017',
    endDate: 'Julio de 2019',
    current: false,
    summary: [
      'Comencé mi carrera profesional coordinando proyectos de software y trabajando estrechamente con clientes y equipos de desarrollo. Este rol me permitió desarrollar habilidades de comunicación, planificación y liderazgo que luego se convirtieron en una base importante para mi carrera en ingeniería.',
      'Realicé el seguimiento de presupuestos y cronogramas, acompañé a los equipos de desarrollo y mantuve la comunicación con distintos stakeholders para contribuir al avance de los proyectos y al cumplimiento de sus objetivos.',
    ],
    responsibilities: [
      'Coordinar proyectos de desarrollo de software.',
      'Planificar cronogramas y prioridades.',
      'Realizar seguimiento de presupuestos y avances.',
      'Mantener comunicación con clientes y stakeholders.',
      'Acompañar a los equipos de desarrollo.',
      'Ayudar a mantener el foco en los objetivos del proyecto.',
      'Contribuir a la mejora de procesos y entregas.',
    ],
    capabilities: [
      'Gestión de proyectos',
      'Agile',
      'Scrum',
      'Planificación',
      'Comunicación con stakeholders',
      'Coordinación de equipos',
    ],
  },
];

export const ES_EXPERIENCE_CONTENT = {
  metaTitle: 'Experiencia',
  metaDescription:
    'Conoce la trayectoria profesional de Gonzalo Herrera en ingeniería frontend, liderazgo técnico y coordinación de proyectos de software.',
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
    eyebrow: 'Trayectoria',
    title: 'Experiencia profesional',
    description:
      'Un recorrido desde la coordinación de proyectos hasta la ingeniería frontend y el liderazgo técnico, construido a través de la colaboración, el aprendizaje continuo y el enfoque en crear software mantenible.',
    labels: {
      card: {
        at: 'en',
        responsibilities: 'Responsabilidades',
        achievements: 'Aportes destacados',
        technologies: 'Tecnologías',
        capabilities: 'Capacidades',
      },
      current: 'Actualidad',
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
