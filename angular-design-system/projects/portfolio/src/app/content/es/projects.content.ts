import type { PortfolioProjectsContent } from '../models/projects-content.model';

export const ES_PROJECTS_CONTENT = {
  metaTitle: 'Proyectos',
  metaDescription:
    'Explora proyectos seleccionados de Gonzalo Herrera sobre Angular, arquitectura frontend, sistemas de diseño, experiencia de desarrollo e ingeniería asistida por IA.',
  hero: {
    eyebrow: 'Proyectos',
    title: 'Construyendo sistemas, herramientas e ideas para desarrollar mejor software.',
    description:
      'Una selección de proyectos enfocados en Angular, design systems, experiencia de desarrollo e ingeniería asistida por IA.',
    visualLabel: 'Áreas de enfoque de los proyectos',
    focuses: ['Angular', 'Design Systems', 'Experiencia de desarrollo', 'Ingeniería con IA'],
  },
  overview: {
    eyebrow: 'Trabajo destacado',
    title: 'Bases reutilizables e ideas prácticas de ingeniería',
    description:
      'Proyectos que exploran bases frontend reutilizables, flujos técnicos y aplicaciones prácticas de IA en ingeniería de software.',
    statusNote:
      'Cada proyecto muestra su estado actual según la evidencia disponible. Los conceptos se distinguen del trabajo que ya está en desarrollo.',
    categoriesLabel: 'Categorías de proyectos',
  },
  grid: {
    eyebrow: 'Catálogo de proyectos',
    title: 'Proyectos y casos de estudio',
    description:
      'Angular Design System incluye un caso de estudio completo. Las demás entradas documentan conceptos sin presentarlos como productos implementados.',
    cardLabels: {
      projectPrefix: 'Proyecto',
      featured: 'Destacado',
      technologies: 'Tecnologías',
      links: 'Enlaces del proyecto',
      caseStudy: 'Ver caso de estudio',
      repository: 'Ver repositorio',
    },
  },
  detail: {
    backToProjects: 'Volver a proyectos',
    summaryTitle: 'Resumen del proyecto',
    summaryDescription: 'Una vista concisa del alcance actual y el enfoque técnico del proyecto.',
    status: 'Estado',
    type: 'Tipo',
    role: 'Rol',
    focus: 'Enfoque',
    technologies: 'Tecnologías',
    responsibilities: 'Responsabilidades',
    aiDisclosure: 'Colaboración con IA',
    decisionContext: 'Contexto',
    decision: 'Decisión',
    rationale: 'Por qué',
    tradeOffs: 'Trade-offs',
    phaseItems: 'Elementos principales',
    phaseOutcome: 'Resultado actual',
    challengeResponse: 'Respuesta',
    relatedEyebrow: 'Seguir explorando',
    relatedTitle: 'Proyectos relacionados',
    relatedDescription: 'Otros proyectos conectados por tecnología o enfoque de ingeniería.',
    notFoundEyebrow: 'Proyectos',
    notFoundTitle: 'Proyecto no encontrado',
    notFoundDescription: 'El proyecto que buscas no existe o no está disponible.',
    notFoundMetaTitle: 'Proyecto no encontrado',
    notFoundMetaDescription: 'No se pudo encontrar el proyecto solicitado del portfolio.',
  },
  contact: {
    eyebrow: 'Iniciemos una conversación',
    title: '¿Tienes un proyecto o desafío de ingeniería que valga la pena conversar?',
    description:
      'Si estás trabajando en arquitectura Angular, un design system o un flujo de ingeniería asistido por IA, conversemos.',
    actions: [
      { label: 'Contactarme', pageId: 'contact', variant: 'primary' },
      { label: 'Ver experiencia', pageId: 'experience', variant: 'secondary' },
    ],
  },
  items: [
    {
      id: 'angular-design-system',
      slug: 'angular-design-system',
      title: 'Angular Design System',
      shortDescription:
        'Un Design System reutilizable en Angular construido alrededor de design tokens, accesibilidad, composición y fundamentos consistentes de marca.',
      status: 'in-progress',
      statusLabel: 'En desarrollo',
      category: 'design-system',
      categoryLabel: 'Design System',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'Design Tokens'],
      capabilities: ['Accesibilidad', 'SSR', 'Temas claro y oscuro', 'APIs públicas tipadas'],
      featured: true,
      order: 1,
      caseStudy: {
        available: true,
        eyebrow: 'Caso de estudio · Design System',
        summary: {
          title: 'Resumen del proyecto',
          description:
            'Un workspace Angular en evolución que conecta fundamentos de marca, tokens generados, componentes reutilizables y aplicaciones consumidoras reales.',
          type: 'Workspace abierto de Design System',
          role: 'Product owner, diseñador e ingeniero frontend',
          focus: 'Bases Angular reutilizables y experiencia de desarrollo',
        },
        context: {
          id: 'context',
          title: 'Contexto',
          paragraphs: [
            'El proyecto fue creado para establecer una base visual y técnica reutilizable para la marca personal, el portfolio y futuros productos Angular de Gonzalo Herrera.',
            'La dirección de marca, las decisiones de diseño y la implementación viven en el mismo repositorio para que la librería pública evolucione desde una fuente de verdad explícita y no desde decisiones visuales aisladas.',
          ],
        },
        problem: {
          id: 'problem',
          title: 'Problema',
          paragraphs: [
            'Sin un sistema compartido, las decisiones visuales, los componentes y los patrones de aplicación tienden a duplicarse, perder consistencia y resultar más difíciles de mantener.',
            'El proyecto también necesitaba un límite claro entre la presentación reutilizable y responsabilidades de aplicación como routing, contenido localizado y metadata del portfolio.',
          ],
        },
        goals: {
          id: 'goals',
          title: 'Objetivos',
          items: [
            'Crear una librería reutilizable de componentes Angular.',
            'Conectar las decisiones de marca con design tokens generados.',
            'Soportar preferencias de tema claro, oscuro y del sistema.',
            'Establecer APIs de componentes accesibles y fuertemente tipadas.',
            'Documentar componentes reutilizables mediante Storybook.',
            'Validar integraciones mediante las aplicaciones Showcase y Portfolio.',
          ],
        },
        constraints: {
          id: 'constraints',
          title: 'Restricciones',
          items: [
            'Mantener las fuentes editables de marca y tokens en un único repositorio.',
            'Usar TypeScript estricto y componentes standalone de Angular.',
            'Preservar compatibilidad con SSR e hidratación en Portfolio.',
            'Evitar dependencias innecesarias de frameworks de UI.',
            'Exponer comportamiento reutilizable únicamente mediante una API pública intencional.',
            'Soportar accesibilidad y ambos temas visuales desde la capa de fundamentos.',
          ],
        },
        role: {
          id: 'role',
          title: 'Rol y responsabilidades',
          paragraphs: [
            'Gonzalo está a cargo de la dirección de producto, el sistema visual y la arquitectura frontend del proyecto.',
          ],
          responsibilities: [
            'Definir los fundamentos de marca y visuales.',
            'Diseñar la arquitectura del workspace y de la librería.',
            'Mantener tokens, temas y APIs públicas de componentes.',
            'Documentar el sistema en Storybook, Showcase y las guías del repositorio.',
            'Integrar la librería en la aplicación bilingüe Portfolio.',
          ],
          aiDisclosure:
            'La IA se utiliza para acelerar exploración, documentación e implementación, manteniendo las decisiones técnicas bajo revisión humana.',
        },
        approach: {
          id: 'approach',
          title: 'Enfoque',
          description:
            'El trabajo avanza desde una intención de marca durable hacia código reutilizable y finalmente hacia aplicaciones consumidoras reales.',
          flowLabel: 'Flujo de implementación del Design System',
          steps: [
            'Fundamentos de marca',
            'Design tokens',
            'Temas',
            'Componentes',
            'Primitivas de layout',
            'Patrones de marca',
            'Storybook y Showcase',
            'Aplicación Portfolio',
          ],
        },
        architecture: {
          id: 'architecture',
          title: 'Arquitectura',
          description:
            'La documentación del repositorio y los tokens JSON alimentan la capa de temas y la librería Angular standalone. Storybook documenta APIs aisladas, Showcase valida la integración y Portfolio consume el mismo paquete público para el sitio productivo.',
          flowLabel: 'Flujo de arquitectura del Design System',
          stages: ['Documentación de marca', 'Design Tokens', 'Capa de temas', 'gh-design-system'],
          consumersLabel: 'Consumidores de la librería',
          consumers: ['Storybook', 'Showcase', 'Portfolio'],
        },
        decisions: {
          id: 'decisions',
          title: 'Decisiones clave',
          description:
            'Las decisiones más importantes establecen límites para mantener el sistema reutilizable y predecible.',
          items: [
            {
              id: 'tokens-source',
              title: 'Design tokens como fuente de verdad',
              context:
                'Colores, espaciado, tipografía, radios, sombras y temas deben mantener consistencia entre múltiples superficies.',
              decision:
                'Mantener el JSON editable de tokens en el nivel del repositorio y generar de forma determinista el SCSS de la librería y el catálogo de Showcase.',
              rationale:
                'Un contrato generado evita diferencias entre documentación e implementación y ofrece variables CSS semánticas a los consumidores.',
              tradeOffs: [
                'Los archivos generados nunca deben editarse manualmente.',
                'Los builds y tests incluyen una validación de sincronización de tokens.',
              ],
            },
            {
              id: 'standalone-components',
              title: 'Componentes standalone',
              context:
                'Los consumidores necesitan imports específicos sin acoplamiento a módulos o dependencias ocultas de aplicación.',
              decision: 'Construir cada componente Angular público como componente standalone.',
              rationale:
                'Las APIs standalone reducen boilerplate de módulos y se alinean con la arquitectura Angular actual del workspace.',
              tradeOffs: [
                'Los consumidores administran explícitamente los componentes que importan.',
              ],
            },
            {
              id: 'composition',
              title: 'Composición sobre herencia',
              context:
                'Cards, layouts y patrones de marca comparten comportamiento visual pero tienen responsabilidades semánticas diferentes.',
              decision:
                'Componer componentes públicos enfocados y estilos compartidos basados en tokens en lugar de heredar clases de componentes Angular.',
              rationale:
                'La composición mantiene ciclos de vida y detalles privados de implementación fuera del contrato público.',
              tradeOffs: [
                'La composición requiere APIs de proyección e inputs diseñadas con intención.',
              ],
            },
            {
              id: 'consumer-boundaries',
              title: 'Las responsabilidades de aplicación quedan en los consumidores',
              context:
                'Portfolio es dueño del routing y contenido localizado, mientras que la librería debe ser reutilizable fuera de este sitio.',
              decision:
                'Mantener routing, estado de locale, metadata y contenido editorial fuera de gh-design-system.',
              rationale:
                'La librería conserva portabilidad y Portfolio puede evolucionar sin ampliar la API pública de UI.',
              tradeOffs: [
                'Las aplicaciones consumidoras necesitan pequeños adapters y mappers tipados.',
              ],
            },
          ],
        },
        implementation: {
          id: 'implementation',
          title: 'Implementación',
          description:
            'El workspace se construyó en capas para que cada superficie pública pudiera validar la capa anterior.',
          phases: [
            {
              id: 'foundations',
              title: 'Fundamentos',
              description: 'Traducir la dirección de marca a un contrato visual verificable.',
              items: [
                'Tokens primitivos',
                'Tokens semánticos',
                'Temas claro y oscuro',
                'SCSS global',
              ],
              outcome: 'Una base generada y consciente del tema compartida por cada consumidor.',
            },
            {
              id: 'components-layout',
              title: 'Componentes y layout',
              description: 'Construir bloques enfocados antes de componer páginas de producto.',
              items: [
                'Componentes base',
                'Familia de Cards',
                'Primitivas de layout',
                'Patrones de marca',
              ],
              outcome: 'Una librería pública standalone con APIs tipadas y componibles.',
            },
            {
              id: 'documentation',
              title: 'Documentación e integración',
              description: 'Ejercitar las APIs públicas en entornos aislados y con routing.',
              items: ['READMEs de componentes', 'Storybook', 'Showcase', 'Tests unitarios'],
              outcome:
                'Un catálogo documentado y una superficie de integración para mantenimiento.',
            },
            {
              id: 'portfolio',
              title: 'Adopción en Portfolio',
              description: 'Usar el Design System en un producto bilingüe con SSR.',
              items: [
                'Shell localizado',
                'Contenido tipado',
                'SSR e hidratación',
                'Páginas de producto',
              ],
              outcome: 'Un consumidor real que valida el sistema más allá de los ejemplos.',
            },
          ],
        },
        challenges: {
          id: 'challenges',
          title: 'Desafíos',
          description:
            'Los desafíos recurrentes consisten en mantener límites claros mientras el sistema crece.',
          items: [
            {
              id: 'source-alignment',
              title: 'Mantener documentación y código alineados',
              description:
                'La guía de marca, los tokens JSON, los estilos generados y la documentación de componentes pueden divergir si se mantienen por separado.',
              response:
                'Usar salidas generadas, validaciones de sincronización y documentación cercana al código como parte de builds y tests.',
            },
            {
              id: 'consumer-duplication',
              title: 'Evitar implementaciones duplicadas entre consumidores',
              description:
                'Storybook, Showcase y Portfolio necesitan los mismos fundamentos sin convertirse en copias entre sí.',
              response:
                'Asignar una responsabilidad distinta a cada superficie y exigir que todas consuman la API pública del paquete.',
            },
            {
              id: 'reusability',
              title: 'Equilibrar reutilización y necesidades específicas',
              description:
                'Un componente puede resultar demasiado acotado para reutilizarse o demasiado configurable para comprenderse.',
              response:
                'Mantener la librería presentacional, usar composición y dejar la lógica de producto en Portfolio.',
            },
            {
              id: 'ssr',
              title: 'Preservar un SSR determinista',
              description:
                'Las preferencias de tema, rutas localizadas y controles interactivos no deben producir contenido distinto en servidor y cliente.',
              response:
                'Mantener la URL como autoridad, proteger APIs de navegador y evitar contenido u orden generados en runtime.',
            },
          ],
        },
        results: {
          id: 'results',
          title: 'Resultados actuales',
          description:
            'Los resultados son cualitativos y se limitan a artefactos que existen en este repositorio.',
          items: [
            {
              id: 'library',
              title: 'Librería Angular reutilizable',
              description:
                'Componentes, layouts y patrones standalone se exponen mediante una única API pública.',
            },
            {
              id: 'tokens-themes',
              title: 'Tokens y temas compartidos',
              description:
                'Los fundamentos generados soportan preferencias claro, oscuro y del sistema.',
            },
            {
              id: 'catalogue',
              title: 'Catálogo de componentes documentado',
              description:
                'Storybook y las guías de componentes documentan estados y APIs reutilizables.',
            },
            {
              id: 'showcase',
              title: 'Showcase de integración',
              description:
                'Una aplicación con routing ejercita fundamentos y componentes públicos en conjunto.',
            },
            {
              id: 'portfolio',
              title: 'Consumidor orientado a producción',
              description:
                'El Portfolio bilingüe con SSR consume la misma librería y contrato de tokens.',
            },
          ],
        },
        lessons: {
          id: 'lessons',
          title: 'Aprendizajes',
          items: [
            'Un Design System es más que una colección de componentes.',
            'Las APIs públicas requieren límites definidos.',
            'Los tokens aportan más valor cuando se conectan con aplicaciones reales.',
            'La documentación y la implementación deben evolucionar juntas.',
            'La reutilización mejora cuando los componentes priorizan composición.',
          ],
        },
        nextSteps: {
          id: 'next-steps',
          title: 'Próximos pasos',
          items: [
            'Completar las páginas de producto restantes del Portfolio.',
            'Agregar más casos de estudio cuando exista evidencia verificada de proyectos.',
            'Realizar auditorías específicas de accesibilidad y rendimiento.',
            'Preparar la configuración aprobada de despliegue productivo.',
            'Evaluar la distribución del paquete cuando la API pública esté lista.',
          ],
        },
      },
    },
    {
      id: 'ai-code-review-assistant',
      slug: 'ai-code-review-assistant',
      title: 'AI Code Review Assistant',
      shortDescription:
        'Un concepto de flujo asistido por IA diseñado para revisar pull requests según estándares de ingeniería y reglas específicas del proyecto.',
      status: 'concept',
      statusLabel: 'Concepto',
      category: 'ai-engineering',
      categoryLabel: 'Ingeniería con IA',
      technologies: [],
      capabilities: ['Flujos de code review', 'Guías de ingeniería'],
      featured: false,
      order: 2,
      caseStudy: {
        available: false,
        title: 'Caso de estudio no disponible',
        description:
          'Este proyecto está documentado como concepto. Se agregará un caso completo únicamente cuando exista un flujo implementado y decisiones técnicas verificables.',
      },
    },
    {
      id: 'angular-accelerator-kit',
      slug: 'angular-accelerator-kit',
      title: 'Angular Accelerator Kit',
      shortDescription:
        'Un concepto de base práctica para equipos que necesitan arquitectura Angular consistente, convenciones reutilizables y estándares de desarrollo.',
      status: 'concept',
      statusLabel: 'Concepto',
      category: 'angular',
      categoryLabel: 'Angular',
      technologies: ['Angular', 'TypeScript'],
      capabilities: ['Convenciones de arquitectura', 'Experiencia de desarrollo'],
      featured: false,
      order: 3,
      caseStudy: {
        available: false,
        title: 'Caso de estudio no disponible',
        description:
          'Esta entrada registra un concepto de producto, no un starter kit finalizado. El detalle técnico y los resultados se omiten de forma intencional.',
      },
    },
    {
      id: 'ai-toolkit-for-developers',
      slug: 'ai-toolkit-for-developers',
      title: 'AI Toolkit for Developers',
      shortDescription:
        'Un concepto de toolkit de prompts, flujos de trabajo y recursos reutilizables para desarrollo de software asistido por IA.',
      status: 'concept',
      statusLabel: 'Concepto',
      category: 'developer-tools',
      categoryLabel: 'Herramientas para developers',
      technologies: [],
      capabilities: ['Flujos de prompts', 'Recursos reutilizables de ingeniería'],
      featured: false,
      order: 4,
      caseStudy: {
        available: false,
        title: 'Caso de estudio no disponible',
        description:
          'Este proyecto continúa como concepto documentado. No se afirma la existencia de una publicación, un repositorio o un toolkit implementado.',
      },
    },
  ],
} as const satisfies PortfolioProjectsContent;
