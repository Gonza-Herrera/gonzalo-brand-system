import type { PortfolioContactContent } from '../models/contact-content.model';

export const ES_CONTACT_CONTENT = {
  metaTitle: 'Contacto',
  metaDescription:
    'Contacta a Gonzalo Herrera para conversar sobre ingeniería frontend, arquitectura Angular, liderazgo técnico y desarrollo de software asistido por IA.',
  hero: {
    eyebrow: 'Contacto',
    title: 'Conversemos sobre cómo construir mejor software.',
    description:
      '¿Tienes un desafío frontend, una plataforma Angular, una oportunidad de liderazgo técnico o una idea de ingeniería asistida por IA que valga la pena conversar?',
    visualLabel: 'Áreas de enfoque para conversar',
    visualTitle: 'Una conversación con propósito puede conectar',
    highlights: [
      {
        id: 'engineering',
        label: 'Ingeniería Frontend',
        description: 'Plataformas, arquitectura y bases mantenibles para aplicaciones.',
      },
      {
        id: 'leadership',
        label: 'Liderazgo Técnico',
        description: 'Estándares, mentoring, decisiones técnicas y desarrollo de equipos.',
      },
      {
        id: 'ai',
        label: 'Desarrollo Asistido por IA',
        description: 'Flujos prácticos que mantienen explícito el criterio de ingeniería.',
      },
    ],
  },
  topics: {
    eyebrow: 'Temas de conversación',
    title: 'Sobre qué podemos conversar',
    description:
      'Me interesan especialmente las conversaciones donde se combinan ingeniería frontend, arquitectura, desarrollo de equipos y adopción práctica de IA.',
    items: [
      {
        id: 'frontend-platforms',
        title: 'Plataformas Frontend',
        description:
          'Construcción o evolución de plataformas frontend mantenibles y bases compartidas para aplicaciones.',
      },
      {
        id: 'angular-architecture',
        title: 'Arquitectura Angular',
        description:
          'Estructura de aplicaciones, migraciones, rendimiento, patrones de estado y mantenibilidad.',
      },
      {
        id: 'design-systems',
        title: 'Design Systems',
        description:
          'Componentes reutilizables, design tokens, accesibilidad y una experiencia de desarrollo consistente.',
      },
      {
        id: 'technical-leadership',
        title: 'Liderazgo Técnico',
        description:
          'Estándares de ingeniería, revisiones de código, mentoring, decisiones técnicas y colaboración.',
      },
      {
        id: 'ai-engineering',
        title: 'Ingeniería Asistida por IA',
        description:
          'Uso de IA para mejorar flujos de desarrollo, documentación, revisiones y exploración técnica.',
      },
      {
        id: 'professional-opportunities',
        title: 'Oportunidades Profesionales',
        description:
          'Oportunidades de liderazgo frontend, ingeniería frontend senior y colaboración relacionadas con estas áreas.',
      },
    ],
  },
  channels: {
    eyebrow: 'Canales de contacto',
    title: 'Elige la mejor forma de contactarme',
    description:
      'Los destinos públicos aparecen aquí únicamente después de ser verificados y aprobados para su publicación.',
    unavailableTitle: 'Todavía no hay un canal de contacto público configurado',
    unavailableDescription:
      'Los destinos de correo electrónico, LinkedIn y GitHub se omiten intencionalmente hasta agregar una fuente verificada en la configuración central.',
    items: [
      {
        id: 'email',
        label: 'Enviar un correo electrónico',
        description: 'Iniciar una conversación profesional directa por correo electrónico.',
        ariaLabel: 'Enviar un correo electrónico a Gonzalo Herrera',
        external: false,
      },
      {
        id: 'linkedin',
        label: 'Conectar en LinkedIn',
        description: 'Conectar mediante un perfil profesional verificado.',
        ariaLabel: 'Abrir el perfil de LinkedIn de Gonzalo Herrera',
        external: true,
      },
      {
        id: 'github',
        label: 'Explorar mi trabajo en GitHub',
        description: 'Revisar trabajos y repositorios públicos de ingeniería.',
        ariaLabel: 'Abrir el perfil de GitHub de Gonzalo Herrera',
        external: true,
      },
    ],
  },
  form: {
    eyebrow: 'Formulario de mensaje',
    title: 'Comparte algo de contexto',
    description:
      'La interfaz y las reglas de validación están preparadas, pero el envío online permanece deshabilitado hasta configurar un endpoint o proveedor revisado.',
    requiredFieldsMessage: 'Los campos indicados como obligatorios deben completarse.',
    requiredLabel: 'Obligatorio',
    fieldGroupLabel: 'Datos del mensaje',
    fields: {
      name: {
        label: 'Nombre',
        description: '¿Cómo debería dirigirme a ti?',
        requiredMessage: 'El nombre es obligatorio.',
        whitespaceMessage: 'El nombre no puede contener solo espacios.',
        maxLengthMessage: 'El nombre no puede superar los 100 caracteres.',
      },
      email: {
        label: 'Correo electrónico',
        description: 'Utiliza una dirección que pueda recibir una respuesta.',
        requiredMessage: 'El correo electrónico es obligatorio.',
        invalidMessage: 'Ingresa un correo electrónico válido.',
        maxLengthMessage: 'El correo electrónico no puede superar los 254 caracteres.',
      },
      company: {
        label: 'Empresa u organización',
        optionalLabel: 'Opcional',
        description: 'Agrégala únicamente cuando ayude a explicar el contexto.',
        maxLengthMessage: 'La empresa u organización no puede superar los 150 caracteres.',
      },
      subject: {
        label: '¿Sobre qué te gustaría conversar?',
        description: 'Resume el tema principal de la conversación.',
        requiredMessage: 'El asunto es obligatorio.',
        whitespaceMessage: 'El asunto no puede contener solo espacios.',
        maxLengthMessage: 'El asunto no puede superar los 160 caracteres.',
      },
      message: {
        label: 'Cuéntame brevemente el contexto, desafío u oportunidad.',
        description: 'Incluye suficiente contexto no confidencial para comprender el tema.',
        requiredMessage: 'El mensaje es obligatorio.',
        whitespaceMessage: 'El mensaje no puede contener solo espacios.',
        minLengthMessage: 'El mensaje debe contener al menos 20 caracteres.',
        maxLengthMessage: 'El mensaje no puede superar los 3000 caracteres.',
      },
    },
    submitLabel: 'Enviar mensaje',
    submittingLabel: 'Enviando mensaje…',
    errorSummary: 'Revisa los campos señalados.',
    unavailable: {
      title: 'El envío online del formulario todavía no está configurado',
      description:
        'Los campos están deshabilitados y no se envía ni almacena información. Es necesario revisar y configurar un servicio real antes de activar el formulario.',
    },
    success: {
      title: 'Mensaje enviado',
      description: 'Gracias por contactarme. Tu mensaje fue enviado correctamente.',
      actionLabel: 'Enviar otro mensaje',
    },
    error: {
      title: 'No fue posible enviar el mensaje',
      description:
        'Revisa tu conexión e inténtalo nuevamente. También puedes utilizar alguno de los canales de contacto disponibles.',
      actionLabel: 'Intentar nuevamente',
    },
  },
  privacy: {
    eyebrow: 'Privacidad y seguridad',
    title: 'Antes de enviar un mensaje',
    description:
      'Este formulario está deshabilitado y no transmite ni almacena información en el navegador o mediante un servicio externo.',
    details: [
      'Evita incluir información confidencial, credenciales o datos sensibles de clientes en cualquier mensaje futuro.',
      'Comparte suficiente contexto para comprender el tema, pero reserva los detalles técnicos sensibles para una conversación segura.',
      'Toda integración futura deberá documentar cómo se transmiten, gestionan y protegen los datos antes de activarse.',
    ],
  },
  explore: {
    eyebrow: 'Conoce más',
    title: 'Conoce más antes de contactarme',
    description:
      'Revisa la experiencia, los proyectos y las ideas que enmarcan estas conversaciones.',
    actions: [
      {
        label: 'Ver experiencia',
        description:
          'Explora el enfoque profesional, las prácticas de liderazgo y las capacidades de ingeniería.',
        pageId: 'experience',
        variant: 'secondary',
      },
      {
        label: 'Explorar proyectos',
        description:
          'Conoce proyectos seleccionados, decisiones de arquitectura y casos de estudio.',
        pageId: 'projects',
        variant: 'secondary',
      },
      {
        label: 'Leer artículos y recursos',
        description:
          'Continúa con contenido práctico sobre Angular, liderazgo e ingeniería con IA.',
        pageId: 'content',
        variant: 'secondary',
      },
    ],
  },
} as const satisfies PortfolioContactContent;
