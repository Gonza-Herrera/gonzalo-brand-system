import type { PortfolioContactContent } from '../models/contact-content.model';
import { ES_PAGE_METADATA } from './page-metadata.content';

export const ES_CONTACT_CONTENT = {
  ...ES_PAGE_METADATA.contact,
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
    title: 'Elige la forma que prefieras para ponerte en contacto conmigo.',
    description: '',
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
        label: 'LinkedIn',
        description:
          'Conectemos y conversemos sobre Angular, frontend, liderazgo técnico e inteligencia artificial aplicada al desarrollo de software.',
        actionLabel: 'Ver perfil en LinkedIn',
        ariaLabel: 'Abrir el perfil de LinkedIn de Gonzalo Herrera en una nueva pestaña',
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
      '¿Tienes un proyecto, una oportunidad o una idea en mente? Envíame un mensaje y te responderé lo antes posible.',
    requiredFieldsMessage: 'Los campos indicados como obligatorios deben completarse.',
    requiredLabel: 'Obligatorio',
    fieldGroupLabel: 'Datos del mensaje',
    botcheckLabel: 'Deja este campo vacío',
    fallbackEmailLabel: 'También puedes contactarme directamente por correo electrónico en',
    fields: {
      name: {
        label: 'Nombre',
        description: '¿Cómo debería dirigirme a ti?',
        placeholder: 'Tu nombre',
        requiredMessage: 'Ingresa tu nombre.',
        whitespaceMessage: 'Este campo no puede contener solamente espacios.',
        minLengthMessage: 'Tu nombre debe contener al menos 2 caracteres.',
        maxLengthMessage: 'Tu nombre no puede superar los 80 caracteres.',
      },
      email: {
        label: 'Correo electrónico',
        description: 'Utiliza una dirección que pueda recibir una respuesta.',
        placeholder: 'tu@ejemplo.com',
        requiredMessage: 'Ingresa tu correo electrónico.',
        invalidMessage: 'Ingresa un correo electrónico válido.',
        maxLengthMessage: 'Tu correo electrónico no puede superar los 160 caracteres.',
      },
      subject: {
        label: 'Asunto',
        description: 'Resume el tema principal de la conversación.',
        placeholder: '¿Sobre qué te gustaría conversar?',
        requiredMessage: 'Ingresa un asunto.',
        whitespaceMessage: 'Este campo no puede contener solamente espacios.',
        minLengthMessage: 'El asunto debe contener al menos 3 caracteres.',
        maxLengthMessage: 'El asunto no puede superar los 120 caracteres.',
      },
      message: {
        label: 'Mensaje',
        description: 'Incluye suficiente contexto no confidencial para comprender el tema.',
        placeholder: 'Cuéntame un poco sobre tu proyecto, oportunidad o idea.',
        requiredMessage: 'Ingresa un mensaje.',
        whitespaceMessage: 'Este campo no puede contener solamente espacios.',
        minLengthMessage: 'El mensaje debe contener al menos 20 caracteres.',
        maxLengthMessage: 'El mensaje no puede superar los 2000 caracteres.',
      },
    },
    submitLabel: 'Enviar mensaje',
    submittingLabel: 'Enviando…',
    errorSummary: 'Revisa los campos señalados.',
    errorWithoutFallbackDescription: 'Inténtalo nuevamente en unos instantes.',
    unavailable: {
      title: 'El formulario de contacto no está disponible temporalmente',
      description: 'Inténtalo nuevamente más tarde.',
    },
    success: {
      title: 'Mensaje enviado correctamente',
      description: 'Gracias por contactarme. Te responderé lo antes posible.',
      actionLabel: 'Enviar otro mensaje',
    },
    error: {
      title: 'No se pudo enviar el mensaje',
      description: 'Inténtalo nuevamente o contáctame directamente por correo electrónico.',
      actionLabel: 'Intentar nuevamente',
    },
  },
  privacy: {
    eyebrow: 'Privacidad y seguridad',
    title: 'Antes de enviar un mensaje',
    description:
      'Tu mensaje se envía únicamente cuando confirmas el formulario y nunca se almacena en este navegador.',
    details: [
      'Evita incluir información confidencial, credenciales o datos sensibles de clientes.',
      'Comparte suficiente contexto para comprender el tema, pero reserva los detalles técnicos sensibles para una conversación segura.',
      'El formulario envía únicamente tu nombre, correo, asunto y mensaje mediante el proveedor de contacto configurado.',
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
