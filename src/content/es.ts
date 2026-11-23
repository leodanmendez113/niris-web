// Textos en español.
// OJO: cifras, reseñas e historia son DATOS DE MUESTRA para la demo (ver DEMO en config/site.ts).
import type { en } from "./en";

export const es: typeof en = {
  meta: {
    homeTitle: "Niris Professional Services | Limpieza en Miami-Dade y Broward",
    homeDescription:
      "Limpieza de Airbnb, hoteles, oficinas y casas en Miami-Dade y Broward. Empresa latina con licencia y seguro. Obtén un estimado al instante.",
    servicesSuffix: "Miami-Dade y Broward | Niris",
    areasTitle: "Zonas de servicio de limpieza en Miami-Dade y Broward | Niris",
    areasDescription:
      "Niris limpia casas, oficinas, hoteles y rentas vacacionales en Miami-Dade y Broward: Miami, Miami Beach, Doral, Hialeah, Fort Lauderdale, Hollywood y más.",
    storyTitle: "Nuestra historia | Deyanires, fundadora de Niris Professional Services",
    storyDescription:
      "Conoce a Deyanires, la madre latina y fundadora que construyó Niris Professional Services con una regla: limpiar cada espacio como si fuera el suyo.",
    quoteTitle: "Estimado de limpieza al instante | Niris Professional Services",
    quoteDescription:
      "Calcula en vivo el estimado de limpieza de tu Airbnb, casa, oficina u hotel en Miami-Dade y Broward y envíanoslo por WhatsApp.",
    contactTitle: "Contacto | Niris, servicios de limpieza en el sur de Florida",
    contactDescription:
      "Habla con Niris Professional Services por WhatsApp o llama al +1 (786) 523-6287. Atendemos Miami-Dade y Broward.",
  },
  demo: "Versión de demostración · contenido de muestra",
  nav: {
    services: "Servicios",
    areas: "Zonas",
    story: "Nuestra historia",
    quote: "Cotizar",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    switchTo: "English",
    skip: "Saltar al contenido",
  },
  cta: {
    whatsapp: "Escríbenos por WhatsApp",
    call: "Llámanos",
    quote: "Cotiza al instante",
    learnMore: "Ver más",
    allServices: "Todos los servicios",
  },
  hero: {
    eyebrow: "Miami-Dade · Broward",
    titleA: "Espacios impecables.",
    titleB: "Estadías cinco estrellas.",
    subtitle:
      "Limpieza profesional para rentas vacacionales, hoteles, oficinas y hogares, con un equipo que cuida cada espacio como si fuera propio.",
    badges: ["Con licencia y seguro", "Empresa latina", "Limpiezas el mismo día"],
    scroll: "Desliza",
  },
  marquee: [
    "Limpieza de Airbnb",
    "Housekeeping para hoteles",
    "Limpieza de oficinas",
    "Limpieza profunda",
    "Mudanzas",
    "Servicio de lencería",
    "Reposición de insumos",
    "Limpieza post-evento",
  ],
  stats: {
    title: "Excelencia que se puede medir",
    items: [
      { value: 12, suffix: "+", label: "Años de experiencia" },
      { value: 8500, suffix: "+", label: "Limpiezas realizadas" },
      { value: 140, suffix: "+", label: "Clientes activos" },
      { value: 4.9, suffix: "★", label: "Calificación promedio" },
    ],
  },
  servicesSection: {
    eyebrow: "Qué hacemos",
    title: "Un solo equipo para todos tus espacios",
    subtitle:
      "Desde la salida de un huésped hasta un piso completo de hotel, llevamos la misma lista de control, el mismo estándar y el mismo cuidado.",
  },
  services: {
    "airbnb-cleaning": {
      name: "Airbnb y rentas vacacionales",
      tag: "Anfitriones y administradores",
      short: "Limpieza entre huéspedes con lencería, reposición de insumos y reporte con fotos.",
      h1: "Limpieza de Airbnb y rentas vacacionales en Miami",
      intro:
        "Tus reseñas dependen de los primeros treinta segundos después de que el huésped abre la puerta. Dejamos tu propiedad igual que en las fotos del anuncio, entre cada estadía.",
      includes: [
        "Limpieza completa entre huéspedes",
        "Lencería fresca y camas estilo hotel",
        "Reposición de jabón, papel y café",
        "Reporte de daños y faltantes con fotos",
        "Reservas el mismo día y consecutivas",
        "Sincronización con tu calendario de reservas",
      ],
      idealFor: ["Anfitriones de Airbnb y Vrbo", "Administradores de propiedades", "Inversionistas de renta corta"],
      faq: [
        {
          q: "¿Pueden limpiar entre una salida y una entrada el mismo día?",
          a: "Sí. Nos dices la hora de salida y de entrada y programamos la limpieza dentro de ese margen.",
        },
        {
          q: "¿Llevan lencería e insumos?",
          a: "Podemos trabajar con tu inventario o encargarnos de la lencería y los insumos como servicio adicional.",
        },
        {
          q: "¿Cómo sé que la limpieza se hizo?",
          a: "Después de cada limpieza recibes un reporte corto con fotos y una nota de lo que esté dañado o por acabarse.",
        },
      ],
    },
    "hotel-housekeeping": {
      name: "Hoteles y hostelería",
      tag: "Hoteles, boutiques y restaurantes",
      short: "Apoyo de housekeeping para habitaciones, áreas comunes y restaurantes, en tu horario.",
      h1: "Housekeeping para hoteles y hostelería",
      intro:
        "Cuando la ocupación sube o falta personal, entramos con camaristas capacitadas que siguen los estándares de tu marca y entregan las habitaciones a tiempo.",
      includes: [
        "Limpieza de habitaciones de salida y de estadía",
        "Lobby, pasillos y áreas comunes",
        "Limpieza de salón de restaurante y cocina",
        "Manejo de lavandería y lencería",
        "Refuerzo para temporada alta y eventos",
        "Supervisora en sitio para control de calidad",
      ],
      idealFor: ["Hoteles boutique", "Resorts y condo-hoteles", "Restaurantes y salones de eventos"],
      faq: [
        {
          q: "¿Pueden seguir nuestros estándares de housekeeping?",
          a: "Sí. Capacitamos al equipo con tu lista de control y tus estándares antes del primer turno.",
        },
        {
          q: "¿Trabajan fines de semana y feriados?",
          a: "Trabajamos los siete días de la semana, incluidos feriados y temporada alta.",
        },
        {
          q: "¿Hay un mínimo de habitaciones?",
          a: "No hay un mínimo fijo. Armamos el plan según tu ocupación y lo ajustamos cada semana.",
        },
      ],
    },
    "office-cleaning": {
      name: "Oficinas y comercios",
      tag: "Servicio recurrente para empresas",
      short: "Limpieza recurrente para oficinas, clínicas y tiendas, antes o después del horario laboral.",
      h1: "Limpieza de oficinas y locales comerciales en el sur de Florida",
      intro:
        "Un lugar de trabajo limpio habla de tu negocio antes de que alguien diga una palabra. Mantenemos oficinas, clínicas y tiendas listas para tus clientes y cómodas para tu equipo.",
      includes: [
        "Escritorios, pisos y áreas comunes",
        "Limpieza y desinfección de baños",
        "Cocina y área de descanso",
        "Retiro de basura y reciclaje",
        "Vidrios, puertas y recepción",
        "Servicio antes o después del horario laboral",
      ],
      idealFor: ["Oficinas profesionales", "Clínicas médicas y dentales", "Tiendas y salas de exhibición"],
      faq: [
        {
          q: "¿Pueden limpiar fuera del horario laboral?",
          a: "Sí. A la mayoría de nuestros clientes comerciales los atendemos temprano en la mañana o en la noche.",
        },
        {
          q: "¿Hay que firmar un contrato largo?",
          a: "No. Trabajamos con acuerdos mensuales sencillos que puedes ajustar cuando cambien tus necesidades.",
        },
        {
          q: "¿Tienen seguro para trabajar en edificios comerciales?",
          a: "Sí. Tenemos licencia y seguro, y podemos entregar el certificado de seguro que pida tu edificio.",
        },
      ],
    },
    "home-cleaning": {
      name: "Casas y apartamentos",
      tag: "Residencial",
      short: "Limpieza regular, profunda y de mudanza para el lugar que llamas hogar.",
      h1: "Limpieza de casas y apartamentos en Miami-Dade y Broward",
      intro:
        "Llega a una casa que se siente más liviana. Elige una visita regular, una limpieza profunda o un servicio de mudanza, siempre con el mismo equipo de confianza.",
      includes: [
        "Cocina y baños al detalle",
        "Polvo, aspirado y trapeado",
        "Tendido de camas y orden",
        "Limpieza profunda de zonas con acumulación",
        "Limpieza de mudanza (entrada o salida)",
        "Opcional: horno, nevera y ventanas interiores",
      ],
      idealFor: ["Familias ocupadas", "Profesionales", "Inquilinos y dueños que se mudan"],
      faq: [
        {
          q: "¿Viene siempre el mismo equipo?",
          a: "A los clientes recurrentes les asignamos el mismo equipo siempre que es posible, para que conozcan tu casa.",
        },
        {
          q: "¿Tengo que estar en casa?",
          a: "No. Muchos clientes dejan instrucciones de acceso. Cerramos al salir y te avisamos por mensaje.",
        },
        {
          q: "¿Llevan sus propios productos?",
          a: "Sí. Llevamos productos y equipos. Si prefieres productos específicos, usamos los tuyos.",
        },
      ],
    },
  },
  servicePage: {
    includesTitle: "Qué incluye",
    idealTitle: "Ideal para",
    faqTitle: "Preguntas frecuentes",
    ctaTitle: "¿Quieres un número ahora mismo?",
    ctaText: "Usa el cotizador en vivo y envíanos el resultado por WhatsApp.",
    otherTitle: "Otros servicios",
    breadcrumbHome: "Inicio",
  },
  process: {
    eyebrow: "Cómo funciona",
    title: "Del primer mensaje a un espacio impecable, en tres pasos",
    steps: [
      { title: "Cuéntanos de tu espacio", text: "Escríbenos por WhatsApp o usa el cotizador en vivo. Toma menos de un minuto." },
      { title: "Recibe tu plan", text: "Confirmamos alcance, horario y precio, sin cargos sorpresa." },
      { title: "Disfruta el resultado", text: "Un equipo capacitado llega a tiempo, sigue la lista de control y te reporta." },
    ],
  },
  storyTeaser: {
    eyebrow: "Nuestra historia",
    title: "Creada por una madre que no se conformó con “más o menos limpio”",
    text: "Deyanires empezó Niris con una clienta, una aspiradora y una promesa: limpiar cada espacio como si su propia familia estuviera por entrar. Esa promesa sigue dirigiendo la empresa.",
    link: "Lee su historia",
    quote: "La excelencia no es un lujo. Es nuestra forma de agradecer la confianza.",
    role: "Fundadora y dueña",
  },
  story: {
    eyebrow: "Nuestra historia",
    h1: "Deyanires, el corazón de Niris",
    lead: "Madre latina, fundadora y la persona que todavía revisa las esquinas.",
    paragraphs: [
      "Deyanires llegó a Miami con dos hijos, unas pocas maletas y una ética de trabajo que aprendió de su propia madre. Sus primeros trabajos de limpieza fueron turnos de madrugada en negocios ajenos, donde notó algo: casi nadie limpiaba donde nadie mira.",
      "Ella sí. Los clientes lo notaron y una recomendación se convirtió en cinco. Con sus primeros ahorros registró Niris Professional Services, con el diminutivo de su propio nombre, y contrató a dos mujeres de su vecindario que compartían su estándar.",
      "Hoy Niris atiende rentas vacacionales, hoteles, oficinas y hogares en Miami-Dade y Broward. El equipo es más grande, las listas de control son más largas, y la regla es la misma con la que empezó: si no está bien, no está terminado.",
      "Deyanires todavía capacita personalmente a cada nueva integrante. Dice que el verdadero trabajo de la empresa es dar dos cosas: a los clientes, su tiempo de vuelta; y a las mujeres de su equipo, una forma estable y digna de sostener a sus familias.",
    ],
    valuesTitle: "En qué creemos",
    values: [
      { title: "Excelencia", text: "Una lista de control escrita para cada espacio y una supervisora que la firma." },
      { title: "Confianza", text: "Licencia, seguro y verificación de antecedentes. Cuidamos tus llaves como las nuestras." },
      { title: "Respeto", text: "Pago justo y oportunidades reales para las mujeres que forman nuestro equipo." },
      { title: "Puntualidad", text: "Tus huéspedes y tus clientes no esperan, y nosotras tampoco." },
    ],
    photoAlt: "Retrato de Deyanires, fundadora de Niris Professional Services",
    photoNote: "Foto provisional",
  },
  areas: {
    eyebrow: "Dónde trabajamos",
    title: "Atendemos Miami-Dade y Broward",
    subtitle: "Si tu propiedad está entre Homestead y Deerfield Beach, llegamos.",
    h1: "Servicios de limpieza en Miami-Dade y Broward",
    intro:
      "Nuestros equipos viven en el sur de Florida y trabajan en ambos condados todos los días. Estas son las ciudades que más atendemos. ¿No ves la tuya? Pregúntanos.",
    counties: [
      {
        name: "Condado de Miami-Dade",
        cities: [
          "Miami", "Miami Beach", "Brickell", "Doral", "Hialeah", "Coral Gables",
          "Kendall", "Wynwood", "Aventura", "Sunny Isles Beach", "North Miami", "Homestead",
        ],
      },
      {
        name: "Condado de Broward",
        cities: [
          "Fort Lauderdale", "Hollywood", "Pembroke Pines", "Miramar", "Hallandale Beach",
          "Weston", "Davie", "Plantation", "Sunrise", "Pompano Beach", "Coral Springs", "Deerfield Beach",
        ],
      },
    ],
  },
  reviews: {
    eyebrow: "Reseñas de clientes",
    title: "La confianza de anfitriones, administradores y familias",
    items: [
      { name: "Carolina M.", role: "Superanfitriona de Airbnb · Miami Beach", text: "Mi calificación de limpieza subió de 4.6 a 5.0 en dos meses. Mandan fotos después de cada limpieza y nunca tengo que pedir nada dos veces." },
      { name: "James R.", role: "Administrador de propiedades · Brickell", text: "Administramos 22 unidades y Niris se encarga de todas. Las reservas consecutivas antes eran un estrés. Ahora son rutina." },
      { name: "Andrea P.", role: "Gerente de oficina · Doral", text: "La oficina amanece impecable todos los días y nunca las vemos. La comunicación por WhatsApp es rápida y clara." },
      { name: "Luis G.", role: "Hotel boutique · Fort Lauderdale", text: "Cubrieron nuestra temporada alta con camaristas capacitadas que siguieron nuestros estándares desde el primer día." },
      { name: "Sofía T.", role: "Propietaria · Pembroke Pines", text: "El mismo equipo cada dos semanas, siempre puntual. Llego y toda la casa se siente más liviana." },
      { name: "Michelle K.", role: "Anfitriona de Vrbo · Hollywood", text: "Un huésped salió a las 11 y el siguiente llegaba a las 3. Niris lo tuvo listo a las 2. Me salvaron." },
    ],
  },
  finalCta: {
    title: "¿Lista o listo para una semana más limpia y tranquila?",
    text: "Escríbenos ahora y recibe respuesta en minutos, o arma tu propio estimado.",
  },
  quote: {
    eyebrow: "Cotizador en vivo",
    h1: "Tu estimado, en tiempo real",
    intro: "Ajusta las opciones y mira cómo cambia el precio. Cuando estés conforme, envíanoslo por WhatsApp para confirmar.",
    stepService: "1. ¿Qué limpiamos?",
    stepSize: "2. Tamaño",
    stepFrequency: "3. ¿Cada cuánto?",
    stepExtras: "4. Extras",
    serviceNames: { airbnb: "Airbnb / renta", home: "Casa", office: "Oficina", hotel: "Hotel" },
    bedrooms: "Habitaciones",
    studio: "Estudio",
    bathrooms: "Baños",
    sqft: "Pies cuadrados",
    rooms: "Habitaciones por día",
    cleanType: "Tipo de limpieza",
    cleanTypes: { standard: "Regular", deep: "Profunda", move: "Mudanza" },
    frequency: {
      airbnb: { "1-4": "1–4 al mes", "5-10": "5–10 al mes", "11+": "11+ al mes" },
      home: { once: "Una vez", monthly: "Mensual", biweekly: "Cada 2 semanas", weekly: "Semanal" },
      office: { "1": "1× semana", "2": "2× semana", "3": "3× semana", "5": "5× semana" },
      hotel: { "3": "3 días / semana", "5": "5 días / semana", "7": "Todos los días" },
    },
    extras: {
      airbnb: { linen: "Lencería y lavado", restock: "Reposición de insumos", sameDay: "Limpieza el mismo día" },
      home: { oven: "Horno por dentro", fridge: "Nevera por dentro", windows: "Ventanas interiores" },
      office: { restrooms: "Desinfección profunda de baños", kitchen: "Cocina / área de descanso", trash: "Basura y reciclaje" },
      hotel: { common: "Áreas comunes", laundry: "Manejo de lavandería", restaurant: "Área de restaurante" },
    },
    resultTitle: "Precio estimado",
    perVisit: "por visita",
    perDay: "por día",
    perMonth: "Estimado al mes",
    discount: "Descuento por frecuencia aplicado",
    disclaimer: "Esto es un estimado, no un precio final. Confirmamos el monto exacto después de conversar sobre tu espacio.",
    sendShort: "Enviar",
    send: "Enviar estimado por WhatsApp",
    message: {
      hello: "¡Hola Niris! Usé el cotizador de su página web:",
      service: "Servicio",
      size: "Tamaño",
      frequency: "Frecuencia",
      extras: "Extras",
      none: "Ninguno",
      estimate: "Estimado",
      close: "¿Me confirman disponibilidad?",
    },
  },
  contact: {
    eyebrow: "Contacto",
    h1: "Hablemos",
    intro: "La forma más rápida de contactarnos es WhatsApp. Respondemos todos los días de la semana.",
    whatsappTitle: "WhatsApp",
    whatsappText: "Envía fotos, direcciones y fechas. Recibe respuesta en minutos.",
    callTitle: "Teléfono",
    callText: "¿Prefieres hablar? Llámanos directamente.",
    hoursTitle: "Horario",
    hours: ["Lunes a sábado: 7:00 am – 8:00 pm", "Domingo: 8:00 am – 5:00 pm", "Rentas y hoteles: 7 días a la semana"],
    areaTitle: "Zona de servicio",
    areaText: "Condados de Miami-Dade y Broward, Florida.",
  },
  whatsapp: {
    fabLabel: "Escríbenos por WhatsApp",
    popupTitle: "¿Necesitas una cotización?",
    popupText: "¡Hola! Soy Deyanires. Cuéntame de tu espacio y te respondo personalmente por WhatsApp.",
    popupButton: "Iniciar chat",
    popupDismiss: "Ahora no",
    online: "En línea",
    defaultMessage: "¡Hola Niris! Quisiera información sobre sus servicios de limpieza.",
  },
  footer: {
    tagline: "Limpieza profesional para hostelería, empresas y hogares en el sur de Florida.",
    servicesTitle: "Servicios",
    companyTitle: "Empresa",
    contactTitle: "Contacto",
    licensed: "Con licencia y seguro",
    rights: "Todos los derechos reservados.",
  },
  offline: "Estás sin conexión. Llámanos al",
};
