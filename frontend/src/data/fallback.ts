import postsJson from './posts.json'
import type {
  AvisoPrivacidadPageData,
  CategoryItem,
  ContactoPageData,
  HomePageData,
  MarcaItem,
  NosotrosPageData,
  PostItem,
  ProyectoItem,
  ServicioItem,
  ServiciosPageData,
  SiteSettingsData,
} from '@/lib/payload'

export const FALLBACK_SITE_SETTINGS: SiteSettingsData = {
  siteName: 'Avintech',
  logoLight: '/imagenes/white-logo.png',
  logoDark: '/imagenes/avintech-logo.png',
  creditsLogo: '/imagenes/credits-logo-gray.png',
  phones: [{ number: '844-432-3785' }, { number: '844-727-9408' }],
  email: 'contacto@avintech.com.mx',
  address: 'Calle Juan Cabello Siller #195, Col. Los Doctores Saltillo Coah. CP: 25050',
  schedule: 'Lun - Vie: 9:00 am - 6:00 pm',
  copyrightText: 'Todos los derechos reservados - 2026',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Calle%20Juan%20Cabello%20Siller%20%23195%2C%20Col.%20Los%20Doctores%20Saltillo%20Coah.%20CP%3A%2025050&t=m&z=15&output=embed&iwloc=near',
  socialLinks: {
    facebook: 'https://facebook.com/avintech/',
    instagram: 'https://instagram.com/avintech.mx/',
    tiktok: 'https://www.tiktok.com/@avintech.mx?_r=1&_t=ZS-93QYGWxUwtQ',
    youtube: 'https://www.youtube.com/@AVINTECHTechnologyforlife',
  },
}

export const FALLBACK_HOME_PAGE: HomePageData = {
  heroTitlePrimary: 'Soluciones creativas',
  heroTitleSecondary: 'para el desarrollo de espacios inteligentes',
  heroCtaLabel: 'Más Información',
  heroCtaHref: '#soluciones-inteligentes',
  heroVideo: '/video/hero-banner-finale.webm',
  introEyebrow: 'SOLUCIONES INTELIGENTES',
  introHeading: 'Para espacios modernos',
  introParagraph1:
    'Creamos entornos automatizados que combinan confort, eficiencia y tecnología. Nuestro enfoque está dirigido a residencias, complejos habitacionales y desarrollos comerciales, donde la integración de audio, video, iluminación, seguridad y control se convierte en una experiencia fluida y personalizada.',
  introParagraph2:
    'Hacemos que tus espacios respondan a ti, mejorando tu calidad de vida y optimizando el uso de la energía con sistemas inteligentes de última generación.',
  specialtiesTitle: 'ESPECIALIDADES',
  specialtiesCtaLabel: 'Ver TodoS LOS SERVICIOS',
  whyUsTitle: '¿Por qué elegirnos?',
  whyUsItems: [
    {
      title: 'Experiencia Comprobada',
      description:
        'Contamos con más de 15 años de trayectoria en el sector del audio, video y automatización. Hemos participado en proyectos residenciales y comerciales de distintos niveles de complejidad, ofreciendo siempre resultados de alto desempeño.',
      icon: 'trophy',
    },
    {
      title: 'Servicio al cliente',
      description:
        'Nuestro compromiso comienza y termina contigo. Diseñamos soluciones a la medida de tus necesidades, cuidando cada detalle y priorizando la calidad del servicio en cada etapa del proyecto.',
      icon: 'handshake',
    },
    {
      title: 'Garantía y Confianza',
      description:
        'Trabajamos con las mejores marcas del mercado, lo que nos permite ofrecer garantías reales y soporte técnico confiable. Así aseguramos tu satisfacción y la durabilidad de cada instalación.',
      icon: 'shield',
    },
    {
      title: 'Calidad en cada proyecto',
      description:
        'Nuestra misión es entregar excelencia técnica y estética en cada desarrollo. Cumplimos con los estándares y lineamientos de cada producto o marca, garantizando resultados funcionales, seguros y visualmente armónicos.',
      icon: 'lightbulb',
    },
  ],
  bannerTitle: 'Tu espacio, conectado y a tu medida',
  bannerText:
    'En cada proyecto buscamos la <strong>solución ideal</strong>, no solo basada en preferencias personales, sino en la <strong>tecnología adecuada para cada necesidad</strong>. Así logramos espacios inteligentes que se adaptan a tu estilo de vida o modelo de negocio.',
  bannerVideo: '/video/blog-video-sample.webm',
  contactTitle: 'Contáctanos para más información',
  contactSubtitle:
    'A través de nuestros teléfonos y medios de contacto o en nuestras redes sociales',
  formTitle: 'Envíanos un Mensaje',
  formSubtitle:
    'Escríbenos a través del siguiente formulario y te contactaremos a la brevedad',
}

export const FALLBACK_SERVICIOS: ServicioItem[] = [
  {
    id: 1,
    title: 'Audio / Video',
    slug: 'audio-video',
    subtitle: 'Vive una experiencia sensorial en cada rincón',
    excerpt:
      'Vive una experiencia sensorial en cada rincón Creamos entornos audiovisuales que combinan tecnología, diseño y confort,...',
    description:
      'Creamos entornos audiovisuales que combinan tecnología, diseño y confort, permitiendo disfrutar de contenido en alta definición, 4K UHD o streaming en cualquier habitación.',
    secondaryDescription:
      'Integramos sistemas multiroom, home theater y soluciones comerciales adaptadas a tus necesidades.',
    features: [
      { text: 'Audio multi-zona y sonido ambiental' },
      { text: 'Sistemas de cine en casa' },
      { text: 'Distribución de video 4K UHD' },
      { text: 'Integración con plataformas de streaming y control centralizado' },
    ],
    heroImage: '/imagenes/audio-video-hero-scaled.webp',
    gallery: [],
    order: 1,
    showOnHome: true,
  },
  {
    id: 2,
    title: 'Control',
    slug: 'control',
    subtitle: 'El poder de tu hogar o negocio en la palma de tu mano',
    excerpt:
      'El poder de tu hogar o negocio en la palma de tu mano Con nuestros sistemas...',
    description:
      'Con nuestros sistemas de control inteligente, puedes supervisar, ajustar y automatizar todos los aspectos de tu espacio: iluminación, audio, clima, seguridad y más.',
    secondaryDescription:
      'Además, permiten que nuestros integradores ofrezcan asistencia remota, resolviendo incidencias sin necesidad de visitas técnicas, para una experiencia más cómoda y eficiente.',
    features: [
      { text: 'Control centralizado desde dispositivos móviles o pantallas táctiles' },
      { text: 'Monitoreo en tiempo real del estado de tus sistemas' },
      { text: 'Ajustes y automatizaciones personalizadas' },
      { text: 'Soporte técnico remoto sin interrupciones' },
    ],
    heroImage: '/imagenes/control-hero-scaled.webp',
    gallery: [],
    order: 2,
    showOnHome: true,
  },
  {
    id: 3,
    title: 'Iluminación',
    slug: 'iluminacion',
    subtitle: 'Eficiencia y confort que iluminan cada momento',
    excerpt:
      'Eficiencia y confort que iluminan cada momento Un sistema de iluminación inteligente transforma tus espacios, combinando...',
    description:
      'Un sistema de iluminación inteligente transforma tus espacios, combinando ahorro energético, comodidad y diseño.',
    secondaryDescription:
      'Creamos ambientes adaptados a cada ocasión —desde la relajación hasta la productividad— con escenarios programables y control total desde tu smartphone o panel táctil.',
    features: [
      { text: 'Diseño de escenas de iluminación personalizadas' },
      { text: 'Control automático por horarios, presencia o sensores de luz' },
      { text: 'Integración con sistemas de audio, clima y seguridad' },
      { text: 'Soluciones LED de bajo consumo y larga duración' },
    ],
    heroImage: '/imagenes/iluminacion.webp',
    gallery: [
      { image: '/imagenes/iluminacion-galeria-2.png' },
      { image: '/imagenes/iluminacion-galeria-1.png' },
    ],
    order: 3,
    showOnHome: true,
  },
  {
    id: 4,
    title: 'Redes',
    slug: 'redes',
    subtitle: 'Tu red es el corazón de un espacio inteligente',
    excerpt:
      'Tu red es el corazón de un espacio inteligente Diseñamos e implementamos infraestructuras de red de...',
    description:
      'Diseñamos e implementamos infraestructuras de red de alto rendimiento, combinando internet de banda ancha con cableado estructurado profesional para garantizar velocidad, estabilidad y cobertura total.',
    secondaryDescription:
      'Ya sea en tu hogar o empresa, te preparamos para recibir los servicios digitales más avanzados de la nueva era conectada.',
    features: [
      { text: 'Diseño y montaje de cableado estructurado (voz, datos y video)' },
      { text: 'Configuración de redes WiFi de alta densidad' },
      { text: 'Optimización de señal en toda la propiedad' },
      { text: 'Integración con sistemas de automatización, audio y video' },
    ],
    heroImage: '/imagenes/redes-hero-scaled.webp',
    gallery: [],
    order: 4,
    showOnHome: true,
  },
  {
    id: 5,
    title: 'Seguridad',
    slug: 'seguridad',
    subtitle: 'Protege lo que más valoras con tecnología inteligente',
    excerpt:
      'Protege lo que más valoras con tecnología inteligente Diseñamos e instalamos sistemas integrales de seguridad que se adaptan a tu estilo de vida, brindando monitoreo en tiempo real...',
    description:
      'Diseñamos e instalamos sistemas integrales de seguridad que se adaptan a tu estilo de vida, brindando monitoreo en tiempo real y control total desde cualquier lugar.',
    secondaryDescription:
      'Desde alarmas y sensores de movimiento hasta cámaras con visión nocturna o detección avanzada, nuestras soluciones ofrecen tranquilidad, prevención y confianza.',
    features: [
      { text: 'Cámaras IP y sistemas de videovigilancia en alta resolución' },
      { text: 'Alarmas contra intrusión y detección de movimiento' },
      { text: 'Sensores de ruptura, humo o inundación' },
      { text: 'Protección perimetral con rayos infrarrojos' },
      { text: 'Integración con plataformas móviles y sistemas de automatización' },
    ],
    heroImage: '/imagenes/seguridad.webp',
    gallery: [],
    order: 5,
    showOnHome: false,
  },
]

export const FALLBACK_MARCAS: MarcaItem[] = [
  {
    id: 1,
    name: 'FARZ',
    slug: 'farz',
    logo: '/imagenes/marcas/farz.png',
    websiteUrl: 'https://www.farz.mx/',
    order: 1,
    showInFooter: true,
    description:
      'Con más de 20 años de experiencia, Farz es una marca líder en soluciones de control solar y diseño de interiores en México. Nos apasiona crear espacios cómodos, elegantes y funcionales a través de persianas, cortinas, toldos y pérgolas diseñadas a la medida de cada proyecto.\n\nOfrecemos productos de alta calidad y diseño vanguardista, ideales para hogares, oficinas y desarrollos arquitectónicos. En Farz, combinamos tecnología, estilo y servicio personalizado para transformar tus espacios con soluciones que brindan confort, estética y protección solar en todo el país.',
  },
  {
    id: 2,
    name: 'Panduit',
    slug: 'panduit',
    logo: '/imagenes/marcas/panduit.png',
    websiteUrl: 'https://www.panduit.com/latam/es.html',
    order: 2,
    showInFooter: true,
    description:
      'Fundada en 1955, Panduit se ha convertido en un líder global en soluciones de infraestructura y conectividad, reconocido por la alta calidad de nuestros productos y nuestra innovación continua. Como empresa tecnológica y centrada en el cliente, nuestra pasión por la innovación impulsa todo lo que hacemos. Priorizamos sus necesidades en nuestra estrategia, realizando inversiones específicas en I+D y colaborando estrechamente con usted para ofrecer y desarrollar productos que impulsen la innovación, satisfaciendo sus necesidades específicas y contribuyendo al crecimiento de su negocio.',
  },
  {
    id: 3,
    name: 'Nexus21',
    slug: 'nexus21',
    logo: '/imagenes/marcas/nexus21.png',
    websiteUrl: 'https://www.tvlift.com/',
    order: 3,
    showInFooter: true,
    description: '',
  },
  {
    id: 4,
    name: 'Lutron',
    slug: 'lutron',
    logo: '/imagenes/marcas/lutron.png',
    websiteUrl: 'https://www.lutron.com/us/en',
    order: 4,
    showInFooter: true,
    description: '',
  },
  {
    id: 5,
    name: 'DBX',
    slug: 'dbx',
    logo: '/imagenes/marcas/dbx.png',
    websiteUrl: 'https://dbxpro.com/en',
    order: 5,
    showInFooter: true,
    description: '',
  },
  {
    id: 6,
    name: 'Araknis',
    slug: 'araknis',
    logo: '/imagenes/marcas/araknis.png',
    websiteUrl: 'https://araknisnetworks.com/',
    order: 6,
    showInFooter: true,
    description:
      'Los productos Araknis están diseñados por expertos para ofrecer el mejor rendimiento y satisfacer una amplia variedad de necesidades de red para integradores profesionales. Con Araknis, obtendrá una fiabilidad excepcional, incluso en los entornos más exigentes.',
  },
  {
    id: 7,
    name: 'AMX',
    slug: 'amx',
    logo: '/imagenes/marcas/amx.png',
    websiteUrl: 'https://www.amx.com/en',
    order: 7,
    showInFooter: false,
    description: '',
  },
  {
    id: 8,
    name: 'AKG',
    slug: 'akg',
    logo: '/imagenes/marcas/akg.png',
    websiteUrl: 'https://www.akg.com/home',
    order: 8,
    showInFooter: false,
    description:
      'Desde 1947, AKG ha estado en el corazón de la música y la narrativa, creando micrófonos y auriculares legendarios que marcan la pauta en cuanto a sonido natural y auténtico.\n\nDesde innovaciones pioneras a nivel mundial hasta diseños icónicos en los que confían artistas tanto en el escenario como en el estudio, AKG empodera a los creadores para capturar cada matiz, cada emoción y cada momento inolvidable.',
  },
  {
    id: 9,
    name: 'Hikvision',
    slug: 'hikvision',
    logo: '/imagenes/marcas/hikvision.png',
    websiteUrl: 'https://www.hikvision.com/mx/',
    order: 9,
    showInFooter: false,
    description:
      'Hikvision se compromete a servir a diversas industrias a través de sus tecnologías de vanguardia de percepción de máquinas, inteligencia artificial y big data, liderando el futuro de AIoT. A través de tecnologías integrales de percepción de máquinas, nuestro objetivo es ayudar a las personas a conectarse mejor con el mundo que las rodea; con una gran cantidad de productos inteligentes, nos esforzamos por identificar y satisfacer diversas demandas al brindar inteligencia al alcance de su mano',
  },
  {
    id: 10,
    name: 'Control4',
    slug: 'control4',
    logo: '/imagenes/marcas/control4.png',
    websiteUrl: 'https://www.control4.com/',
    order: 10,
    showInFooter: false,
    description:
      'Control4 es un sistema de automatización líder para hogares y empresas, que ofrece una plataforma inteligente, personalizada y unificada para automatizar y controlar dispositivos conectados, incluyendo iluminación, audio, video, control de climatización, intercomunicadores, seguridad y más. Fundada en 2003 por Eric Smith, Will West y Mark Morgan, Control4 debutó en la feria comercial de tecnología para el hogar CEDIA Expo de 2004. Lanzó sus primeros productos más tarde ese mismo año, posicionándose como uno de los primeros participantes en el mercado de la domótica.',
  },
  {
    id: 11,
    name: 'Bose',
    slug: 'bose',
    logo: '/imagenes/marcas/bose-pro.png',
    websiteUrl: 'https://boseprofessional.com/',
    order: 11,
    showInFooter: false,
    description:
      'Bose Professional es un líder mundial en audio profesional en el que confían integradores, consultores y diseñadores de todo el mundo. Con más de 50 años de innovación y un renovado enfoque independiente, estamos creando mejores herramientas, sistemas y experiencias para las personas que dan forma al sonido cada día.',
  },
]

export const FALLBACK_CATEGORIES: CategoryItem[] = [
  { id: 1, name: 'Comercial', slug: 'comercial' },
  { id: 2, name: 'Corporativo', slug: 'corporativo' },
  { id: 3, name: 'Industrial', slug: 'industrial' },
  { id: 4, name: 'Residencial', slug: 'residencial' },
  { id: 5, name: 'Servicios Especializados', slug: 'servicios-especializados' },
]

export const FALLBACK_POSTS: PostItem[] = [...postsJson].reverse().map((p, idx) => ({
  id: idx + 1,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  contentHtml: p.contentHtml,
  featuredImage: `/imagenes/${p.featuredImage}`,
  category: p.category,
  authorName: 'Avintech',
  publishedDate: p.date,
}))

export const FALLBACK_PROYECTOS: ProyectoItem[] = [
  {
    id: 1,
    title: 'II Mercato 2017',
    slug: 'ii-mercato-2017',
    year: '2017',
    description:
      'La elección perfecta para un restaurante, amplia gama de tamaños de altavoces que nos permiten el diseño perfecto de audio y estética de acuerdo a cada espacio, un controlador que da a la compañía la función para transmitir su mensaje, pero al mismo tiempo permite a los gerentes locales ajustar el sonido y cambios durante el día.\n\nExcelente sonido, funcionalidad y las marcas de la más alta calidad.',
    featuredImage: '/imagenes/explanada-ilmercato.jpg',
    logo: '/imagenes/logo-il-mercato.png',
  },
]

export const FALLBACK_NOSOTROS_PAGE: NosotrosPageData = {
  pageTitle: 'Nosotros',
  playlistTitle: 'Avintech',
  videos: [
    {
      title: 'Los inicios de AVINTECH: la visión que dio vida a la empresa | Capítulo 1',
      youtubeId: 'VvJSWEYFy88',
      duration: '1:57',
    },
    {
      title: 'El gran salto | Capítulo 2',
      youtubeId: 'SweP31EfEMs',
      duration: '1:53',
    },
    {
      title: 'Lo que no se ve: la tecnología detrás de cada experiencia | Capítulo 3 AVINTECH',
      youtubeId: 'm9zvAbvKqaw',
      duration: '2:41',
    },
    {
      title: 'Los Retos | Capítulo 4 AVINTECH',
      youtubeId: '-dYaZ1ZESIg',
      duration: '6:19',
    },
    {
      title: 'Hoy y el Futuro de Avintech | Capítulo 5 Final',
      youtubeId: 'XphbCGXtP7w',
      duration: '4:01',
    },
  ],
  valuesTitle: 'Soluciones creativas para el desarrollo de espacios inteligentes',
  valuesLead1:
    'Dedicados a la automatización de residencias, complejos habitacionales y desarrollos comerciales.',
  valuesLead2:
    'Volvemos tus espacios más cómodos y eficientes, diseñamos espacios con integración de audio, video, iluminación seguridad y control.',
  values: [
    {
      title: 'Experiencia',
      description:
        'Mas de 15 años de experiencia en los ramos de audio y video, iluminación, seguridad y control, redes y telecomunicaciones.',
    },
    {
      title: 'Servicio',
      description:
        'Nuestro punto de partida es y será siempre nuestros clientes, por ello es que nuestro empeño esta puesto en la calidad del servicio que otorgamos en cada proyecto.',
    },
    {
      title: 'Garantías',
      description:
        'Al manejar las mejores marcas del mercado tenemos la posibilidad de soportar cualquier garantía para así siempre mantener a nuestros clientes satisfechos.',
    },
    {
      title: 'Calidad y servicio',
      description:
        'Nuestra meta es la de satisfacer cada proyecto con servicio y calidad, sustentado en compromiso, entrega y seriedad en cada una de nuestras etapas de trabajo.',
    },
  ],
  goalTitle: 'Nuestra Meta',
  goalParagraph1:
    'Satisfacer cada proyecto con excelencia, calidad y un servicio personalizado, respaldados por nuestro compromiso, seriedad y dedicación en cada etapa del proceso. Ofrecemos soluciones reales, no decisiones basadas en gustos personales. Trabajamos respetando los alcances, lineamientos técnicos y especificaciones de cada marca y producto para garantizar resultados óptimos.',
  goalParagraph2:
    'Tenemos la solución real y no solo basada en un gusto personal, respetando los alcances y lineamientos de cada marca o producto que se utilizan para asi satisfacer las necesidades y lineamientos requeridos.',
  processBlocks: [
    {
      title: 'Asesoría en Proyectos',
      paragraph1:
        'Brindamos asesoría especializada a integradores, constructoras y contratistas para la creación, consolidación y desarrollo de proyectos de audio, video, iluminación y control.',
      paragraph2:
        'Con más de 15 años de experiencia, ayudamos a nuestros clientes en la conceptualización técnica y operativa de cada proyecto, considerando las necesidades únicas de cada espacio, su funcionalidad y su operación diaria como elementos prioritarios del diseño.',
      image: '/imagenes/asesoria-en-proyectos.webp',
    },
    {
      title: 'Acústica',
      paragraph1:
        'La acústica de un espacio debe responder a su propósito. Aunque la estética arquitectónica es importante —colores, iluminación, materiales y proporciones—, el diseño acústico debe complementar esa estética y, al mismo tiempo, ofrecer la experiencia sonora ideal. Nuestro objetivo es crear soluciones acústicas que armonicen con el entorno y proporcionen el efecto aural adecuado para cada tipo de recinto.',
      image: '/imagenes/acustica.webp',
    },
    {
      title: 'Diseño y Desarrollo de Ingenierías',
      paragraph1:
        'Trabajamos sobre los planos proporcionados por el cliente, definiendo y diseñando no solo lo que se solicita, sino lo que realmente requiere el proyecto para su funcionamiento óptimo.',
      paragraph2:
        'Cada diseño técnico es elaborado con criterios profesionales y sustentado en normativas y buenas prácticas de la industria.',
      image: '/imagenes/diseno-y-desarrollo-de-ingenierias.webp',
    },
    {
      title: 'Suministro y Ejecución de Proyectos',
      subtitle: 'COMERCIAL / PROFESIONAL / INDUSTRIAL / RESIDENCIAL',
      paragraph1:
        'Proveemos equipos, instalación, programación y puesta en marcha de cada solución diseñada.',
      paragraph2:
        'Todos nuestros diseños son respaldados mediante software especializado, garantizando exactitud, rendimiento y confiabilidad en la ejecución.',
      image: '/imagenes/suministro-y-ejecucion-de-proyectos.webp',
    },
    {
      title: 'Capacitación de Usuario Final',
      paragraph1:
        'Cada proyecto es único, por lo que desarrollamos un manual personalizado, el cual es entregado y explicado al cliente durante la etapa de capacitación, asegurando que el sistema sea comprendido y aprovechado al máximo.',
      image: '/imagenes/capacitacion-de-usuario.webp',
    },
    {
      title: 'Servicio Post-Venta',
      paragraph1:
        'Nuestro compromiso no termina con la entrega del proyecto. Ofrecemos atención continua, monitoreo y mantenimiento, respaldados por técnicos altamente capacitados.',
      paragraph2:
        'Garantizamos reparaciones con costos justos y calidad avalada, manteniendo la confianza y satisfacción de nuestros clientes a largo plazo.',
      image: '/imagenes/servicio-post-venta.webp',
    },
  ],
}

export const FALLBACK_SERVICIOS_PAGE: ServiciosPageData = {
  pageTitle: 'Servicios',
  introParagraphs: [
    {
      text: 'Todas nuestras especialidades están diseñadas para atender grandes y complejos espacios arquitectónicos, tales como estadios, iglesias, escuelas, hoteles, aeropuertos, teatros, auditorios y muchos otros recintos de uso público.',
    },
    {
      text: 'Estos entornos se caracterizan por recibir altas concentraciones de personas y por requerir soluciones que cumplan con normativas estrictas de seguridad, infraestructura y construcción. Cada proyecto demanda una planeación precisa, equipos de alta confiabilidad y una instalación que garantice funcionamiento óptimo en condiciones de uso intensivo.',
    },
    {
      text: 'En Avintech somos expertos en integrar sistemas que se adaptan a las necesidades técnicas de este tipo de espacios, ofreciendo soluciones robustas, seguras y totalmente alineadas a los estándares profesionales que exige la industria.',
    },
  ],
}

export const FALLBACK_CONTACTO_PAGE: ContactoPageData = {
  pageTitle: 'Contacto',
  subtitle: 'Transforma tu espacio con soluciones tecnológicas pensadas para ti.',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Avintech%2C%20Calle%20Juan%20Cabello%20Siller%20195%2C%20Los%20Doctores%20Saltillo%20Coah.%20CP%2025050&t=m&z=16&output=embed&iwloc=near',
}

export const FALLBACK_AVISO_PAGE: AvisoPrivacidadPageData = {
  pageTitle: 'Aviso de Privacidad',
  introText:
    'De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su reglamento, AVINTECH (en adelante «la Empresa»), con domicilio en El Rosario #357 Col. Real de Peña, declara ser una empresa legalmente constituida de conformidad con las leyes mexicanas y ser responsable del tratamiento de sus datos personales, haciendo de su conocimiento lo siguiente:',
  sections: [
    {
      heading: '1. Datos personales recopilados:',
      body: 'La Empresa recaba y trata los siguientes datos personales de sus clientes:\n– Nombre completo.\n– Dirección.\n– Teléfonos de hogar, oficina y móviles.\n– Correo electrónico.',
    },
    {
      heading: '2. Finalidades del tratamiento de datos:',
      body: 'Los datos personales mencionados anteriormente son utilizados exclusivamente para los siguientes fines:\n– Información y prestación de servicios.\n– Actualización de la base de datos.\n– Cualquier finalidad análoga o compatible con las anteriores.',
    },
    {
      heading: '3. Confidencialidad y seguridad de los datos:',
      body: 'La Empresa trata los datos personales de sus clientes de forma estrictamente confidencial y ha implementado las medidas de seguridad necesarias para proteger dichos datos contra el acceso no autorizado, la divulgación, alteración o destrucción.',
    },
    {
      heading: '4. Transferencia de datos:',
      body: 'La Empresa no transfiere los datos personales de sus clientes a terceros, salvo que sea necesario para cumplir con las finalidades descritas en el apartado 2, siempre y cuando dichos terceros se comprometan a respetar este Aviso de Privacidad y se implementen las medidas de seguridad correspondientes.',
    },
    {
      heading: '5. Derechos ARCO:',
      body: 'Los clientes tienen derecho de acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales (derechos ARCO), así como de revocar el consentimiento otorgado para el tratamiento de los mismos. Estos derechos pueden ser ejercidos mediante una solicitud por escrito dirigida al Área de Privacidad de la Empresa, a través de los siguientes medios de contacto:\n– Teléfono: +52 844 1392719\n– Correo electrónico: administracion@avintech.com.mx',
    },
    {
      heading: '6. Actualización de datos y preferencias de comunicación:',
      body: 'Los clientes pueden actualizar sus datos personales y especificar el medio por el cual desean recibir información de la Empresa. En caso de no contar con esta especificación, la Empresa establecerá libremente el canal que considere pertinente para enviar información.',
    },
    {
      heading: '7. Modificaciones al aviso de privacidad:',
      body: 'La Empresa se reserva el derecho de efectuar modificaciones o actualizaciones al presente aviso de privacidad. Cualquier modificación se comunicará oportunamente a través de los medios de contacto proporcionados por el cliente.',
    },
  ],
  closing: 'ATENTAMENTE AVINTECH',
}
