/**
 * Sistema de Internacionalización (i18n) - Emisoras Latinas
 * Diccionarios de traducción para la interfaz de usuario
 */

export type Language = "es" | "en" | "fr" | "pt" | "it" | "da" | "uk";

export interface Translations {
  // Navegación y general
  home: string;
  search_placeholder: string;
  genres: string;
  live: string;
  free: string;
  now_listening: string;
  stations: string;

  // Buscador
  filtering_by: string;
  clear: string;

  // Footer
  about_us: string;
  privacy_policy: string;
  cookie_policy: string;
  terms: string;
  legal_notice: string;
  contact: string;
  all_rights_reserved: string;
  radio_disclaimer: string;
  tagline: string;

  // Player
  loading: string;
  play: string;
  pause: string;
  volume: string;

  // Cabecera dinámica
  stations_of: string; // "Emisoras de {país}"

  // SEO y Sección "Por qué elegirnos"
  why_choose_title: string;
  why_choose_items: {
    fast_load: string;
    no_ads: string;
    continuous_play: string;
    premium_free: string;
    mobile_friendly: string;
  };
  seo_title: string; // "Escuchar Radio {país} Gratis Online..."
  seo_description_1: string; // "Bienvenido al directorio más completo..."
  seo_description_2: string;
  faq_how_question: string;
  faq_how_answer: string;
  faq_count_question: string;
  faq_count_answer: string;
  faq_free_question: string;
  faq_free_answer: string;
}

/**
 * Diccionarios de traducción por idioma
 */
export const translations: Record<Language, Translations> = {
  es: {
    home: "Inicio",
    search_placeholder: "Buscar emisora...",
    genres: "Géneros",
    live: "En vivo",
    free: "Gratis",
    now_listening: "Estás escuchando",
    stations: "emisoras",
    filtering_by: "Filtrando por",
    clear: "Limpiar",
    about_us: "Quiénes Somos",
    privacy_policy: "Política de Privacidad",
    cookie_policy: "Política de Cookies",
    terms: "Términos de Uso",
    legal_notice: "Aviso Legal",
    contact: "Contacto",
    all_rights_reserved: "Todos los derechos reservados",
    radio_disclaimer:
      "Las emisoras de radio pertenecen a sus respectivos propietarios.",
    tagline:
      "El directorio de radio online más completo de Latinoamérica. Conectando la cultura latina a través de la música.",
    loading: "Cargando...",
    play: "Reproducir",
    pause: "Pausar",
    volume: "Volumen",
    stations_of: "Emisoras de",
    why_choose_title: "¿Por qué elegir Emisoras Latinas?",
    why_choose_items: {
      fast_load: "Carga instantánea - La música suena en menos de 2 segundos.",
      no_ads:
        "Publicidad mínima - Solo anuncios necesarios para mantener el servicio gratuito.",
      continuous_play:
        "Reproducción continua - Navega por el sitio sin que la música se detenga.",
      premium_free:
        "Experiencia Premium Gratis - Diseño limpio, moderno y sin distracciones.",
      mobile_friendly:
        "Compatible con móviles - Instala nuestra app desde el navegador (PWA).",
    },
    seo_title:
      "Escuchar Radio {country} Gratis Online - Sin Cortes ni Publicidad",
    seo_description_1:
      "Bienvenido al directorio más completo de emisoras de radio de {country}. Aquí puedes escuchar transmisiones en vivo de tus estaciones favoritas sin interrupciones, sin pop-ups molestos y con carga instantánea.",
    seo_description_2:
      "Nuestro catálogo incluye más de {count} radios de {country}. Disfruta de géneros como noticias, deportes, música pop, rock y mucho más. El reproductor nunca se detiene mientras navegas.",
    faq_how_question: "¿Cómo escuchar radio de {country} online gratis?",
    faq_how_answer:
      "Elige cualquier emisora de la lista y haz clic en el botón de play. El reproductor integrado comenzará la transmisión en vivo al instante, sin necesidad de registro ni descargas.",
    faq_count_question:
      "¿Cuántas emisoras de {country} hay disponibles en Emisoras Latinas?",
    faq_count_answer:
      "Actualmente contamos con más de {count} emisoras de {country} en vivo. Cubrimos géneros como noticias, deportes, música pop, rock, salsa, vallenato y mucho más.",
    faq_free_question: "¿Es gratis escuchar radio online en Emisoras Latinas?",
    faq_free_answer:
      "Sí, completamente gratis. No necesitas registro ni suscripción. Solo elige una emisora y dale play. Escucha ilimitado 24 horas al día, 7 días a la semana.",
  },

  en: {
    home: "Home",
    search_placeholder: "Search station...",
    genres: "Genres",
    live: "Live",
    free: "Free",
    now_listening: "Now playing",
    stations: "stations",
    filtering_by: "Filtering by",
    clear: "Clear",
    about_us: "About Us",
    privacy_policy: "Privacy Policy",
    cookie_policy: "Cookie Policy",
    terms: "Terms of Use",
    legal_notice: "Legal Notice",
    contact: "Contact",
    all_rights_reserved: "All rights reserved",
    radio_disclaimer: "Radio stations are property of their respective owners.",
    tagline:
      "The most complete online radio directory. Connecting you through music.",
    loading: "Loading...",
    play: "Play",
    pause: "Pause",
    volume: "Volume",
    stations_of: "Stations from",
    why_choose_title: "Why choose Emisoras Latinas?",
    why_choose_items: {
      fast_load: "Instant load - Music starts in less than 2 seconds.",
      no_ads:
        "Minimal ads - Only essential ads to keep the service free.",
      continuous_play:
        "Continuous play - Browse the site without music stopping.",
      premium_free:
        "Free Premium Experience - Clean, modern, distraction-free design.",
      mobile_friendly:
        "Mobile friendly - Install our app from your browser (PWA).",
    },
    seo_title: "Listen to Radio {country} Free Online - No Cuts or Ads",
    seo_description_1:
      "Welcome to the most complete directory of radio stations from {country}. Here you can listen to live broadcasts of your favorite stations without interruptions, annoying pop-ups, and with instant loading.",
    seo_description_2:
      "Our catalog includes over {count} radios from {country}. Enjoy genres like news, sports, pop music, rock, and much more. The player never stops while you browse.",
    faq_how_question: "How to listen to {country} radio online for free?",
    faq_how_answer:
      "Choose any station from the list and click the play button. The integrated player will start live streaming instantly, with no registration or downloads needed.",
    faq_count_question:
      "How many {country} radio stations are available on Emisoras Latinas?",
    faq_count_answer:
      "We currently have over {count} live radio stations from {country}. We cover genres such as news, sports, pop, rock, salsa, vallenato and much more.",
    faq_free_question: "Is it free to listen to radio online on Emisoras Latinas?",
    faq_free_answer:
      "Yes, completely free. No registration or subscription required. Just choose a station and hit play. Unlimited listening 24 hours a day, 7 days a week.",
  },

  fr: {
    home: "Accueil",
    search_placeholder: "Rechercher une station...",
    genres: "Genres",
    live: "En direct",
    free: "Gratuit",
    now_listening: "Vous écoutez",
    stations: "stations",
    filtering_by: "Filtré par",
    clear: "Effacer",
    about_us: "À propos",
    privacy_policy: "Politique de confidentialité",
    cookie_policy: "Politique des cookies",
    terms: "Conditions d'utilisation",
    legal_notice: "Mentions légales",
    contact: "Contact",
    all_rights_reserved: "Tous droits réservés",
    radio_disclaimer:
      "Les stations de radio appartiennent à leurs propriétaires respectifs.",
    tagline:
      "Le répertoire radio en ligne le plus complet. Vous connecter à travers la musique.",
    loading: "Chargement...",
    play: "Lecture",
    pause: "Pause",
    volume: "Volume",
    stations_of: "Radios de",
    why_choose_title: "Pourquoi choisir Emisoras Latinas ?",
    why_choose_items: {
      fast_load:
        "Chargement instantané - La musique démarre en moins de 2 secondes.",
      no_ads:
        "Publicité minimale - Uniquement les annonces nécessaires pour maintenir le service gratuit.",
      continuous_play:
        "Lecture continue - Naviguez sur le site sans arrêt de la musique.",
      premium_free:
        "Expérience Premium Gratuite - Design épuré, moderne et sans distraction.",
      mobile_friendly:
        "Compatible mobile - Installez notre application depuis votre navigateur (PWA).",
    },
    seo_title:
      "Écouter Radio {country} Gratuitement en Ligne - Sans Coupures ni Pubs",
    seo_description_1:
      "Bienvenue dans le répertoire le plus complet de stations de radio de {country}. Ici, vous pouvez écouter les émissions en direct de vos stations préférées sans interruptions, sans pop-ups gênants et avec un chargement instantané.",
    seo_description_2:
      "Notre catalogue comprend plus de {count} radios de {country}. Profitez de genres comme les actualités, le sport, la musique pop, le rock et bien plus encore. Le lecteur ne s'arrête jamais pendant que vous naviguez.",
    faq_how_question: "Comment écouter la radio de {country} en ligne gratuitement ?",
    faq_how_answer:
      "Choisissez n'importe quelle station de la liste et cliquez sur le bouton play. Le lecteur intégré démarrera la diffusion en direct instantanément, sans inscription ni téléchargement.",
    faq_count_question:
      "Combien de stations de radio de {country} sont disponibles sur Emisoras Latinas ?",
    faq_count_answer:
      "Nous avons actuellement plus de {count} stations de radio en direct de {country}. Nous couvrons des genres comme l'actualité, le sport, la pop, le rock, la salsa et bien plus.",
    faq_free_question: "Est-ce gratuit d'écouter la radio en ligne sur Emisoras Latinas ?",
    faq_free_answer:
      "Oui, totalement gratuit. Aucune inscription ni abonnement requis. Choisissez simplement une station et lancez la lecture. Écoute illimitée 24h/24 et 7j/7.",
  },

  pt: {
    home: "Início",
    search_placeholder: "Buscar estação...",
    genres: "Gêneros",
    live: "Ao vivo",
    free: "Grátis",
    now_listening: "Você está ouvindo",
    stations: "estações",
    filtering_by: "Filtrando por",
    clear: "Limpar",
    about_us: "Quem Somos",
    privacy_policy: "Política de Privacidade",
    cookie_policy: "Política de Cookies",
    terms: "Termos de Uso",
    legal_notice: "Aviso Legal",
    contact: "Contato",
    all_rights_reserved: "Todos os direitos reservados",
    radio_disclaimer:
      "As estações de rádio pertencem aos seus respectivos proprietários.",
    tagline:
      "O diretório de rádio online mais completo. Conectando você através da música.",
    loading: "Carregando...",
    play: "Reproduzir",
    pause: "Pausar",
    volume: "Volume",
    stations_of: "Estações de",
    why_choose_title: "Por que escolher Emisoras Latinas?",
    why_choose_items: {
      fast_load:
        "Carregamento instantâneo - A música começa em menos de 2 segundos.",
      no_ads:
        "Publicidade mínima - Apenas anúncios necessários para manter o serviço gratuito.",
      continuous_play:
        "Reprodução contínua - Navegue pelo site sem que a música pare.",
      premium_free:
        "Experiência Premium Grátis - Design limpo, moderno e sem distrações.",
      mobile_friendly:
        "Compatível com dispositivos móveis - Instale nosso app pelo navegador (PWA).",
    },
    seo_title: "Ouvir Rádio {country} Grátis Online - Sem Cortes ou Anúncios",
    seo_description_1:
      "Bem-vindo ao diretório mais completo de estações de rádio de {country}. Aqui você pode ouvir transmissões ao vivo de suas estações favoritas sem interrupções, sem pop-ups irritantes e com carregamento instantâneo.",
    seo_description_2:
      "Nosso catálogo inclui mais de {count} rádios de {country}. Desfrute de gêneros como notícias, esportes, música pop, rock e muito mais. O player nunca para enquanto você navega.",
    faq_how_question: "Como ouvir rádio de {country} online grátis?",
    faq_how_answer:
      "Escolha qualquer estação da lista e clique no botão play. O player integrado iniciará a transmissão ao vivo instantaneamente, sem necessidade de registro ou downloads.",
    faq_count_question:
      "Quantas estações de rádio de {country} estão disponíveis no Emisoras Latinas?",
    faq_count_answer:
      "Atualmente temos mais de {count} estações de rádio ao vivo de {country}. Cobrimos gêneros como notícias, esportes, pop, rock, salsa e muito mais.",
    faq_free_question: "É grátis ouvir rádio online no Emisoras Latinas?",
    faq_free_answer:
      "Sim, completamente grátis. Sem necessidade de registro ou assinatura. Basta escolher uma estação e dar play. Audição ilimitada 24 horas por dia, 7 dias por semana.",
  },

  it: {
    home: "Home",
    search_placeholder: "Cerca stazione...",
    genres: "Generi",
    live: "In diretta",
    free: "Gratis",
    now_listening: "Stai ascoltando",
    stations: "stazioni",
    filtering_by: "Filtrando per",
    clear: "Cancella",
    about_us: "Chi Siamo",
    privacy_policy: "Informativa sulla Privacy",
    cookie_policy: "Cookie Policy",
    terms: "Termini di Utilizzo",
    legal_notice: "Note Legali",
    contact: "Contatti",
    all_rights_reserved: "Tutti i diritti riservati",
    radio_disclaimer:
      "Le stazioni radio appartengono ai rispettivi proprietari.",
    tagline:
      "La directory radio online più completa. Connettendoti attraverso la musica.",
    loading: "Caricamento...",
    play: "Riproduci",
    pause: "Pausa",
    volume: "Volume",
    stations_of: "Stazioni di",
    why_choose_title: "Perché scegliere Emisoras Latinas?",
    why_choose_items: {
      fast_load:
        "Caricamento istantaneo - La musica inizia in meno di 2 secondi.",
      no_ads:
        "Pubblicità minima - Solo annunci necessari per mantenere il servizio gratuito.",
      continuous_play:
        "Riproduzione continua - Naviga nel sito senza che la musica si fermi.",
      premium_free:
        "Esperienza Premium Gratuita - Design pulito, moderno e senza distrazioni.",
      mobile_friendly:
        "Mobile friendly - Installa la nostra app dal browser (PWA).",
    },
    seo_title:
      "Ascolta Radio {country} Gratis Online - Senza Tagli o Pubblicità",
    seo_description_1:
      "Benvenuto nella directory più completa di stazioni radio di {country}. Qui puoi ascoltare le trasmissioni in diretta delle tue stazioni preferite senza interruzioni, senza pop-up fastidiosi e con caricamento istantaneo.",
    seo_description_2:
      "Il nostro catalogo include oltre {count} radio di {country}. Goditi generi come notizie, sport, musica pop, rock e molto altro. Il player non si ferma mai mentre navighi.",
    faq_how_question: "Come ascoltare la radio di {country} online gratis?",
    faq_how_answer:
      "Scegli qualsiasi stazione dalla lista e clicca sul pulsante play. Il player integrato avvierà la trasmissione in diretta istantaneamente, senza registrazione né download.",
    faq_count_question:
      "Quante stazioni radio di {country} sono disponibili su Emisoras Latinas?",
    faq_count_answer:
      "Attualmente abbiamo oltre {count} stazioni radio in diretta da {country}. Copriamo generi come notizie, sport, pop, rock, salsa e molto altro.",
    faq_free_question: "È gratis ascoltare la radio online su Emisoras Latinas?",
    faq_free_answer:
      "Sì, completamente gratis. Nessuna registrazione o abbonamento richiesto. Basta scegliere una stazione e premere play. Ascolto illimitato 24 ore su 24, 7 giorni su 7.",
  },

  da: {
    home: "Hjem",
    search_placeholder: "Søg station...",
    genres: "Genrer",
    live: "Live",
    free: "Gratis",
    now_listening: "Du lytter til",
    stations: "stationer",
    filtering_by: "Filtrerer efter",
    clear: "Ryd",
    about_us: "Om Os",
    privacy_policy: "Privatlivspolitik",
    cookie_policy: "Cookie Politik",
    terms: "Vilkår for Brug",
    legal_notice: "Juridisk Meddelelse",
    contact: "Kontakt",
    all_rights_reserved: "Alle rettigheder forbeholdes",
    radio_disclaimer: "Radiostationer tilhører deres respektive ejere.",
    tagline:
      "Den mest komplette online radioguide. Forbinder dig gennem musik.",
    loading: "Indlæser...",
    play: "Afspil",
    pause: "Pause",
    volume: "Lydstyrke",
    stations_of: "Stationer fra",
    why_choose_title: "Hvorfor vælge Emisoras Latinas?",
    why_choose_items: {
      fast_load:
        "Øjeblikkelig indlæsning - Musikken starter på under 2 sekunder.",
      no_ads:
        "Minimal reklame - Kun nødvendige annoncer for at holde tjenesten gratis.",
      continuous_play:
        "Kontinuerlig afspilning - Naviger rundt på siden uden at musikken stopper.",
      premium_free:
        "Gratis Premium Oplevelse - Rent, moderne design uden distraktioner.",
      mobile_friendly: "Mobilvenlig - Installer vores app fra browseren (PWA).",
    },
    seo_title: "Lyt til Radio {country} Gratis Online - Uden Afbrydelser",
    seo_description_1:
      "Velkommen til den mest komplette oversigt over radiostationer fra {country}. Her kan du lytte til live-udsendelser fra dine favoritstationer uden afbrydelser, irriterende pop-ups og med øjeblikkelig indlæsning.",
    seo_description_2:
      "Vores katalog indeholder over {count} radioer fra {country}. Nyd genrer som nyheder, sport, popmusik, rock og meget mere. Afspilleren stopper aldrig mens du browser.",
    faq_how_question: "Hvordan lytter man til {country} radio online gratis?",
    faq_how_answer:
      "Vælg en hvilken som helst station fra listen og klik på play-knappen. Den integrerede afspiller starter live-streaming øjeblikkeligt uden registrering eller downloads.",
    faq_count_question:
      "Hvor mange {country} radiostationer er tilgængelige på Emisoras Latinas?",
    faq_count_answer:
      "Vi har i øjeblikket over {count} live radiostationer fra {country}. Vi dækker genrer som nyheder, sport, pop, rock, salsa og meget mere.",
    faq_free_question: "Er det gratis at lytte til radio online på Emisoras Latinas?",
    faq_free_answer:
      "Ja, helt gratis. Ingen registrering eller abonnement påkrævet. Vælg blot en station og tryk play. Ubegrænset lytning 24 timer i døgnet, 7 dage om ugen.",
  },

  uk: {
    home: "Головна",
    search_placeholder: "Пошук станції...",
    genres: "Жанри",
    live: "Наживо",
    free: "Безкоштовно",
    now_listening: "Ви слухаєте",
    stations: "станцій",
    filtering_by: "Фільтр за",
    clear: "Очистити",
    about_us: "Про Нас",
    privacy_policy: "Політика Конфіденційності",
    cookie_policy: "Політика Cookies",
    terms: "Умови Використання",
    legal_notice: "Правова Інформація",
    contact: "Контакти",
    all_rights_reserved: "Усі права захищені",
    radio_disclaimer: "Радіостанції є власністю їхніх власників.",
    tagline: "Найповніший онлайн-радіодовідник. Зв'язуємо вас через музику.",
    loading: "Завантаження...",
    play: "Відтворити",
    pause: "Пауза",
    volume: "Гучність",
    stations_of: "Станції",
    why_choose_title: "Чому обирають Emisoras Latinas?",
    why_choose_items: {
      fast_load:
        "Миттєве завантаження - Музика починається менш ніж за 2 секунди.",
      no_ads:
        "Мінімум реклами - Лише необхідні оголошення для підтримки безкоштовного сервісу.",
      continuous_play:
        "Безперервне відтворення - Переглядайте сайт, не зупиняючи музику.",
      premium_free:
        "Безкоштовний Преміум Досвід - Чистий, сучасний дизайн без відволікань.",
      mobile_friendly:
        "Мобільна версія - Встановіть наш додаток з браузера (PWA).",
    },
    seo_title: "Слухати Радіо {country} Безкоштовно Онлайн - Без Реклами",
    seo_description_1:
      "Ласкаво просимо до найповнішого каталогу радіостанцій {country}. Тут ви можете слухати прямі трансляції ваших улюблених станцій без перерв, без дратівливих спливаючих вікон і з миттєвим завантаженням.",
    seo_description_2:
      "Наш каталог включає понад {count} радіостанцій {country}. Насолоджуйтесь такими жанрами, як новини, спорт, поп-музика, рок та багато іншого. Плеєр ніколи не зупиняється під час навігації.",
    faq_how_question: "Як слухати радіо {country} онлайн безкоштовно?",
    faq_how_answer:
      "Виберіть будь-яку станцію зі списку та натисніть кнопку відтворення. Вбудований плеєр миттєво розпочне пряму трансляцію без реєстрації та завантажень.",
    faq_count_question:
      "Скільки радіостанцій {country} доступно на Emisoras Latinas?",
    faq_count_answer:
      "Наразі у нас понад {count} прямих радіостанцій з {country}. Ми охоплюємо такі жанри, як новини, спорт, поп, рок, сальса та багато іншого.",
    faq_free_question: "Чи безкоштовно слухати радіо онлайн на Emisoras Latinas?",
    faq_free_answer:
      "Так, повністю безкоштовно. Реєстрація або підписка не потрібні. Просто виберіть станцію та натисніть відтворення. Необмежене прослуховування 24 години на добу, 7 днів на тиждень.",
  },
};

/**
 * Mapeo de código de país a idioma
 */
export const countryToLanguage: Record<string, Language> = {
  // Español
  CO: "es",
  AR: "es",
  MX: "es",
  PE: "es",
  EC: "es",
  VE: "es",
  CL: "es",
  GT: "es",
  BO: "es",
  SV: "es",
  HN: "es",
  NI: "es",
  PR: "es",
  DO: "es",
  UY: "es",
  CR: "es",
  ES: "es",
  PA: "es",

  // Inglés
  US: "en",
  GB: "en",
  JM: "en",
  TT: "en",
  AU: "en",

  // Francés
  FR: "fr",

  // Portugués
  BR: "pt",
  PT: "pt",

  // Italiano
  IT: "it",

  // Danés
  DK: "da",

  // Ucraniano
  UA: "uk",
};

/**
 * Obtiene las traducciones para un código de país dado
 */
export function getTranslations(countryCode: string): Translations {
  const lang = countryToLanguage[countryCode.toUpperCase()] || "es";
  return translations[lang];
}

/**
 * Obtiene el código de idioma para un país
 */
export function getLanguageCode(countryCode: string): Language {
  return countryToLanguage[countryCode.toUpperCase()] || "es";
}

/**
 * Versión del hook para componentes de servidor (Server Components)
 * Recibe el countryCode como parámetro en lugar de leerlo del router
 */
export function getI18nFromCountry(countryCode: string): {
  t: Translations;
  lang: Language;
} {
  const code = countryCode.toUpperCase();
  return {
    t: getTranslations(code),
    lang: getLanguageCode(code),
  };
}
