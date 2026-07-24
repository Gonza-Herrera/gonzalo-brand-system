import type { PortfolioContentDetailRegistry } from '../models/content-hub-content.model';

export const ES_CONTENT_DETAILS: PortfolioContentDetailRegistry = {
  'angular-14-vs-angular-20': {
    introduction: [
      'Una actualización de framework es útil únicamente cuando mejora cómo un equipo construye, comprende y evoluciona el software. La comparación importante es, por lo tanto, arquitectónica y no una lista de novedades.',
      'Esta revisión utiliza como evidencia el workspace actual del portfolio y del design system: los componentes standalone, Signals, routing lazy, SSR, hidratación y límites públicos estrictos son partes reales del repositorio.',
    ],
    sections: [
      {
        type: 'text',
        id: 'architecture-first',
        title: 'Comenzar por la arquitectura, no por la sintaxis',
        paragraphs: [
          'Los codebases Angular más antiguos suelen conservar límites de módulos, imports compartidos y decisiones de estado reactivo que tenían sentido al momento de crearse. Una migración debe identificar primero cuáles de esas decisiones todavía sirven al producto.',
          'El objetivo moderno de este workspace es explícito: páginas y componentes standalone, imports públicos enfocados, Signals para estado local derivado y responsabilidades de aplicación fuera de la librería reutilizable.',
        ],
      },
      {
        type: 'comparison',
        id: 'architecture-comparison',
        title: 'Comparación de arquitectura',
        description: 'Una comparación orientada a migraciones, no un changelog exhaustivo.',
        columns: [
          { id: 'angular-14-baseline', label: 'Base de la era Angular 14' },
          { id: 'modern-angular-target', label: 'Objetivo Angular moderno' },
        ],
        rows: [
          {
            id: 'composition',
            label: 'Composición',
            cells: [
              'Los NgModules de features y compartidos suelen coordinar los imports.',
              'Los componentes standalone declaran imports enfocados de forma directa.',
            ],
          },
          {
            id: 'local-state',
            label: 'Estado local derivado',
            cells: [
              'Pueden utilizarse pipelines de Observables incluso para estado de UI pequeño y sincrónico.',
              'Signals y computed mantienen explícito el estado sincrónico de UI.',
            ],
          },
          {
            id: 'templates',
            label: 'Templates',
            cells: [
              'Las directivas estructurales coordinan contenido condicional y repetido.',
              'El control flow integrado hace visibles las ramas y el tracking estable.',
            ],
          },
          {
            id: 'delivery',
            label: 'Entrega',
            cells: [
              'El renderizado y la hidratación pueden quedar como temas separados de migración.',
              'SSR, hidratación y URLs localizadas se validan como un único flujo determinista.',
            ],
          },
        ],
      },
      {
        type: 'code',
        id: 'signal-derived-state',
        title: 'Mantener local el estado derivado de UI',
        language: 'TypeScript',
        code: "readonly activeFilter = signal<PortfolioContentFilter>('all');\n\nreadonly visibleContent = computed(() =>\n  filterContent(this.publishedItems(), this.activeFilter()),\n);",
        caption:
          'El Content Hub utiliza Signals para un estado de filtro sincrónico y determinista, sin suscripciones manuales.',
      },
      {
        type: 'list',
        id: 'migration-sequence',
        title: 'Una secuencia de migración sostenible',
        introduction:
          'Hacé que cada paso sea revisable y preservá el comportamiento mientras mejoran los límites.',
        style: 'ordered',
        items: [
          'Documentar las rutas, los límites de estado y las restricciones de renderizado actuales.',
          'Mover componentes hoja a imports standalone antes de cambiar límites de features más grandes.',
          'Usar Signals para estado local sincrónico y mantener RxJS donde los flujos asíncronos sigan aportando valor.',
          'Incluir rutas lazy, salida SSR e hidratación en el mismo ciclo de validación.',
          'Eliminar estructura obsoleta solo cuando los consumidores y tests demuestren el reemplazo.',
        ],
      },
      {
        type: 'callout',
        id: 'migration-principle',
        title: 'Principio de migración',
        text: 'Las funcionalidades modernas de Angular crean valor cuando aclaran responsabilidades y reducen acoplamiento accidental, no cuando se adoptan como cambios aislados de sintaxis.',
        tone: 'insight',
      },
    ],
    takeaways: {
      title: 'Ideas principales',
      items: [
        'Tratar las actualizaciones de framework como trabajo de arquitectura con resultados explícitos.',
        'Preferir límites standalone e imports públicos enfocados.',
        'Usar Signals para estado local sincrónico sin reemplazar todos los flujos asíncronos.',
        'Validar rutas, SSR e hidratación durante toda la migración.',
      ],
    },
    relatedContentIds: ['lessons-from-code-reviews', 'building-ai-agents'],
  },
  'lessons-from-code-reviews': {
    introduction: [
      'Una revisión de código es un control de calidad y también una conversación técnica. Su valor surge de mejorar el cambio mientras ayuda al equipo a construir contexto compartido.',
      'Las prácticas siguientes reflejan los principios de liderazgo del repositorio: claridad, feedback constructivo, decisiones pequeñas, estándares compartidos y soluciones sostenibles.',
    ],
    sections: [
      {
        type: 'text',
        id: 'review-for-understanding',
        title: 'Revisar para comprender',
        paragraphs: [
          'Comenzá por el objetivo de producto y las restricciones detrás del cambio. Un comentario técnicamente válido puede ser poco útil si ignora el problema que el pull request busca resolver.',
          'El feedback debe explicar por qué una observación importa. Ese contexto permite mejorar el cambio actual y reutilizar el razonamiento en trabajo futuro.',
        ],
      },
      {
        type: 'list',
        id: 'review-practices',
        title: 'Prácticas que mejoran la revisión',
        style: 'unordered',
        items: [
          'Preferir pull requests pequeños que cuenten una historia entendible.',
          'Separar problemas de corrección de sugerencias opcionales y preferencias personales.',
          'Conectar el feedback con mantenibilidad, accesibilidad, rendimiento o un estándar compartido.',
          'Hacer preguntas cuando falta contexto en lugar de asumir la intención.',
          'Reconocer las buenas decisiones además de las áreas que necesitan revisión.',
          'Llevar preguntas amplias de arquitectura a una conversación directa cuando los comentarios dejen de ser eficientes.',
        ],
      },
      {
        type: 'callout',
        id: 'feedback-principle',
        title: 'Un estándar útil',
        text: 'Revisar con empatía y precisión: ser específico sobre el código, respetuoso con la persona y claro sobre el resultado que importa.',
        tone: 'insight',
      },
      {
        type: 'list',
        id: 'team-system',
        title: 'Mejorar el sistema, no solo el pull request',
        introduction:
          'Los comentarios repetidos son evidencia de que el equipo puede necesitar una base compartida más sólida.',
        style: 'ordered',
        items: [
          'Identificar feedback que aparece repetidamente en distintas revisiones.',
          'Convertir expectativas estables en convenciones documentadas o componentes reutilizables.',
          'Automatizar verificaciones mecánicas cuando una herramienta pueda dar una respuesta consistente.',
          'Mantener el criterio de arquitectura y la mentoría dentro de la conversación humana.',
        ],
      },
    ],
    takeaways: {
      title: 'Ideas principales',
      items: [
        'El contexto hace que el feedback sea más fácil de comprender y reutilizar.',
        'Los cambios pequeños reducen la ambigüedad de la revisión.',
        'Los estándares compartidos son más efectivos que las preferencias personales repetidas.',
        'Una buena revisión mejora la solución y el entendimiento del equipo.',
      ],
    },
    relatedContentIds: ['angular-14-vs-angular-20', 'building-ai-agents'],
  },
  'building-ai-agents': {
    introduction: [
      'La ingeniería asistida por IA útil comienza con un flujo real, no con una interfaz de chat. El sistema necesita contexto claro, una tarea acotada y un resultado que una persona pueda revisar.',
      'El objetivo no es transferir la responsabilidad a un modelo. Es reducir trabajo repetitivo, organizar contexto y brindar más tiempo para tomar mejores decisiones.',
    ],
    sections: [
      {
        type: 'text',
        id: 'workflow-over-chat',
        title: 'Diseñar un flujo, no una conversación',
        paragraphs: [
          'Un agente confiable tiene una responsabilidad explícita. Puede comparar un cambio con los estándares del proyecto, resumir fallas de tests, organizar documentación o explorar un plan de refactoring.',
          'Cada responsabilidad necesita inputs conocidos, acciones permitidas, un resultado revisable y una condición de finalización. Esos límites facilitan la evaluación y el mantenimiento.',
        ],
      },
      {
        type: 'list',
        id: 'agent-boundaries',
        title: 'Definir los límites de ingeniería',
        style: 'ordered',
        items: [
          'Expresar el problema y la decisión que el flujo debe acompañar.',
          'Proveer estándares específicos del proyecto y únicamente el contexto necesario para la tarea.',
          'Separar el análisis de solo lectura de las acciones que modifican código o sistemas externos.',
          'Exigir validaciones deterministas como builds, tests o controles de contenido.',
          'Mantener a una persona responsable de revisar decisiones técnicas y cambios finales.',
        ],
      },
      {
        type: 'callout',
        id: 'human-judgment',
        title: 'Adopción responsable',
        text: 'La IA debe potenciar el criterio de ingeniería, no reemplazarlo.',
        tone: 'insight',
      },
      {
        type: 'list',
        id: 'practical-use-cases',
        title: 'Puntos de partida prácticos',
        introduction: 'Comenzá donde el resultado sea revisable y el riesgo permanezca acotado.',
        style: 'unordered',
        items: [
          'Asistencia en code review contra estándares documentados del proyecto.',
          'Análisis de fallas de tests que acote la investigación sin ocultar evidencia.',
          'Asistencia en documentación que convierta contexto técnico en guías compartidas.',
          'Exploración de arquitectura que registre alternativas y compromisos.',
          'Soporte para refactoring organizado en cambios pequeños que preserven la intención.',
          'Organización del conocimiento que facilite reutilizar contexto existente de ingeniería.',
        ],
      },
    ],
    takeaways: {
      title: 'Ideas principales',
      items: [
        'Comenzar con una responsabilidad de ingeniería acotada.',
        'Hacer explícitos inputs, acciones, resultados y condiciones de finalización.',
        'Utilizar herramientas deterministas para validar el trabajo generado.',
        'Mantener el criterio técnico humano y la responsabilidad dentro del proceso.',
      ],
    },
    relatedContentIds: ['lessons-from-code-reviews', 'angular-14-vs-angular-20'],
  },
};
