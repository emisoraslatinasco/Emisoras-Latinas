/**
 * Sistema de Internacionalización (i18n) - Emisoras Latinas
 * Diccionarios de traducción para la interfaz de usuario
 */

export type Language = 'es' | 'en' | 'fr' | 'pt' | 'it' | 'da' | 'uk';

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
}

/**
 * Diccionarios de traducción por idioma
 */
export const translations: Record<Language, Translations> = {
  es: {
    home: 'Inicio',
    search_placeholder: 'Buscar emisora...',
    genres: 'Géneros',
    live: 'En vivo',
    free: 'Gratis',
    now_listening: 'Estás escuchando',
    stations: 'emisoras',
    filtering_by: 'Filtrando por',
    clear: 'Limpiar',
    about_us: 'Quiénes Somos',
    privacy_policy: 'Política de Privacidad',
    cookie_policy: 'Política de Cookies',
    terms: 'Términos de Uso',
    legal_notice: 'Aviso Legal',
    contact: 'Contacto',
    all_rights_reserved: 'Todos los derechos reservados',
    radio_disclaimer: 'Las emisoras de radio pertenecen a sus respectivos propietarios.',
    tagline: 'El directorio de radio online más completo de Latinoamérica. Conectando la cultura latina a través de la música.',
    loading: 'Cargando...',
    play: 'Reproducir',
    pause: 'Pausar',
    volume: 'Volumen',
    stations_of: 'Emisoras de',
    why_choose_title: '¿Por qué elegir Emisoras Latinas?',
    why_choose_items: {
      fast_load: 'Carga instantánea - La música suena en menos de 2 segundos.',
      no_ads: 'Sin publicidad intrusiva - Cero pop-ups, cero banners que tapan el reproductor.',
      continuous_play: 'Reproducción continua - Navega por el sitio sin que la música se detenga.',
      premium_free: 'Experiencia Premium Gratis - Diseño limpio, moderno y sin distracciones.',
      mobile_friendly: 'Compatible con móviles - Instala nuestra app desde el navegador (PWA).',
    },
    seo_title: 'Escuchar Radio {country} Gratis Online - Sin Cortes ni Publicidad',
    seo_description_1: 'Bienvenido al directorio más completo de emisoras de radio de {country}. Aquí puedes escuchar transmisiones en vivo de tus estaciones favoritas sin interrupciones, sin pop-ups molestos y con carga instantánea.',
    seo_description_2: 'Nuestro catálogo incluye más de {count} radios de {country}. Disfruta de géneros como noticias, deportes, música pop, rock y mucho más. El reproductor nunca se detiene mientras navegas.',
  },
  
  en: {
    home: 'Home',
    search_placeholder: 'Search station...',
    genres: 'Genres',
    live: 'Live',
    free: 'Free',
    now_listening: 'Now playing',
    stations: 'stations',
    filtering_by: 'Filtering by',
    clear: 'Clear',
    about_us: 'About Us',
    privacy_policy: 'Privacy Policy',
    cookie_policy: 'Cookie Policy',
    terms: 'Terms of Use',
    legal_notice: 'Legal Notice',
    contact: 'Contact',
    all_rights_reserved: 'All rights reserved',
    radio_disclaimer: 'Radio stations are property of their respective owners.',
    tagline: 'The most complete online radio directory. Connecting you through music.',
    loading: 'Loading...',
    play: 'Play',
    pause: 'Pause',
    volume: 'Volume',
    stations_of: 'Stations from',
    why_choose_title: 'Why choose Emisoras Latinas?',
    why_choose_items: {
      fast_load: 'Instant load - Music starts in less than 2 seconds.',
      no_ads: 'No intrusive ads - Zero pop-ups, zero banners blocking the player.',
      continuous_play: 'Continuous play - Browse the site without music stopping.',
      premium_free: 'Free Premium Experience - Clean, modern, distraction-free design.',
      mobile_friendly: 'Mobile friendly - Install our app from your browser (PWA).',
    },
    seo_title: 'Listen to Radio {country} Free Online - No Cuts or Ads',
    seo_description_1: 'Welcome to the most complete directory of radio stations from {country}. Here you can listen to live broadcasts of your favorite stations without interruptions, annoying pop-ups, and with instant loading.',
    seo_description_2: 'Our catalog includes over {count} radios from {country}. Enjoy genres like news, sports, pop music, rock, and much more. The player never stops while you browse.',
  },
  
  fr: {
    home: 'Accueil',
    search_placeholder: 'Rechercher une station...',
    genres: 'Genres',
    live: 'En direct',
    free: 'Gratuit',
    now_listening: 'Vous écoutez',
    stations: 'stations',
    filtering_by: 'Filtré par',
    clear: 'Effacer',
    about_us: 'À propos',
    privacy_policy: 'Politique de confidentialité',
    cookie_policy: 'Politique des cookies',
    terms: 'Conditions d\'utilisation',
    legal_notice: 'Mentions légales',
    contact: 'Contact',
    all_rights_reserved: 'Tous droits réservés',
    radio_disclaimer: 'Les stations de radio appartiennent à leurs propriétaires respectifs.',
    tagline: 'Le répertoire radio en ligne le plus complet. Vous connecter à travers la musique.',
    loading: 'Chargement...',
    play: 'Lecture',
    pause: 'Pause',
    volume: 'Volume',
    stations_of: 'Radios de',
    why_choose_title: 'Pourquoi choisir Emisoras Latinas ?',
    why_choose_items: {
      fast_load: 'Chargement instantané - La musique démarre en moins de 2 secondes.',
      no_ads: 'Pas de publicités intrusives - Zéro pop-ups, zéro bannières bloquant le lecteur.',
      continuous_play: 'Lecture continue - Naviguez sur le site sans arrêt de la musique.',
      premium_free: 'Expérience Premium Gratuite - Design épuré, moderne et sans distraction.',
      mobile_friendly: 'Compatible mobile - Installez notre application depuis votre navigateur (PWA).',
    },
    seo_title: 'Écouter Radio {country} Gratuitement en Ligne - Sans Coupures ni Pubs',
    seo_description_1: 'Bienvenue dans le répertoire le plus complet de stations de radio de {country}. Ici, vous pouvez écouter les émissions en direct de vos stations préférées sans interruptions, sans pop-ups gênants et avec un chargement instantané.',
    seo_description_2: 'Notre catalogue comprend plus de {count} radios de {country}. Profitez de genres comme les actualités, le sport, la musique pop, le rock et bien plus encore. Le lecteur ne s\'arrête jamais pendant que vous naviguez.',
  },
  
  pt: {
    home: 'Início',
    search_placeholder: 'Buscar estação...',
    genres: 'Gêneros',
    live: 'Ao vivo',
    free: 'Grátis',
    now_listening: 'Você está ouvindo',
    stations: 'estações',
    filtering_by: 'Filtrando por',
    clear: 'Limpar',
    about_us: 'Quem Somos',
    privacy_policy: 'Política de Privacidade',
    cookie_policy: 'Política de Cookies',
    terms: 'Termos de Uso',
    legal_notice: 'Aviso Legal',
    contact: 'Contato',
    all_rights_reserved: 'Todos os direitos reservados',
    radio_disclaimer: 'As estações de rádio pertencem aos seus respectivos proprietários.',
    tagline: 'O diretório de rádio online mais completo. Conectando você através da música.',
    loading: 'Carregando...',
    play: 'Reproduzir',
    pause: 'Pausar',
    volume: 'Volume',
    stations_of: 'Estações de',
    why_choose_title: 'Por que escolher Emisoras Latinas?',
    why_choose_items: {
      fast_load: 'Carregamento instantâneo - A música começa em menos de 2 segundos.',
      no_ads: 'Sem anúncios intrusivos - Zero pop-ups, zero banners bloqueando o player.',
      continuous_play: 'Reprodução contínua - Navegue pelo site sem que a música pare.',
      premium_free: 'Experiência Premium Grátis - Design limpo, moderno e sem distrações.',
      mobile_friendly: 'Compatível com dispositivos móveis - Instale nosso app pelo navegador (PWA).',
    },
    seo_title: 'Ouvir Rádio {country} Grátis Online - Sem Cortes ou Anúncios',
    seo_description_1: 'Bem-vindo ao diretório mais completo de estações de rádio de {country}. Aqui você pode ouvir transmissões ao vivo de suas estações favoritas sem interrupções, sem pop-ups irritantes e com carregamento instantâneo.',
    seo_description_2: 'Nosso catálogo inclui mais de {count} rádios de {country}. Desfrute de gêneros como notícias, esportes, música pop, rock e muito mais. O player nunca para enquanto você navega.',
  },
  
  it: {
    home: 'Home',
    search_placeholder: 'Cerca stazione...',
    genres: 'Generi',
    live: 'In diretta',
    free: 'Gratis',
    now_listening: 'Stai ascoltando',
    stations: 'stazioni',
    filtering_by: 'Filtrando per',
    clear: 'Cancella',
    about_us: 'Chi Siamo',
    privacy_policy: 'Informativa sulla Privacy',
    cookie_policy: 'Cookie Policy',
    terms: 'Termini di Utilizzo',
    legal_notice: 'Note Legali',
    contact: 'Contatti',
    all_rights_reserved: 'Tutti i diritti riservati',
    radio_disclaimer: 'Le stazioni radio appartengono ai rispettivi proprietari.',
    tagline: 'La directory radio online più completa. Connettendoti attraverso la musica.',
    loading: 'Caricamento...',
    play: 'Riproduci',
    pause: 'Pausa',
    volume: 'Volume',
    stations_of: 'Stazioni di',
    why_choose_title: 'Perché scegliere Emisoras Latinas?',
    why_choose_items: {
      fast_load: 'Caricamento istantaneo - La musica inizia in meno di 2 secondi.',
      no_ads: 'Nessuna pubblicità invadente - Zero pop-up, zero banner che bloccano il player.',
      continuous_play: 'Riproduzione continua - Naviga nel sito senza che la musica si fermi.',
      premium_free: 'Esperienza Premium Gratuita - Design pulito, moderno e senza distrazioni.',
      mobile_friendly: 'Mobile friendly - Installa la nostra app dal browser (PWA).',
    },
    seo_title: 'Ascolta Radio {country} Gratis Online - Senza Tagli o Pubblicità',
    seo_description_1: 'Benvenuto nella directory più completa di stazioni radio di {country}. Qui puoi ascoltare le trasmissioni in diretta delle tue stazioni preferite senza interruzioni, senza pop-up fastidiosi e con caricamento istantaneo.',
    seo_description_2: 'Il nostro catalogo include oltre {count} radio di {country}. Goditi generi come notizie, sport, musica pop, rock e molto altro. Il player non si ferma mai mentre navighi.',
  },
  
  da: {
    home: 'Hjem',
    search_placeholder: 'Søg station...',
    genres: 'Genrer',
    live: 'Live',
    free: 'Gratis',
    now_listening: 'Du lytter til',
    stations: 'stationer',
    filtering_by: 'Filtrerer efter',
    clear: 'Ryd',
    about_us: 'Om Os',
    privacy_policy: 'Privatlivspolitik',
    cookie_policy: 'Cookie Politik',
    terms: 'Vilkår for Brug',
    legal_notice: 'Juridisk Meddelelse',
    contact: 'Kontakt',
    all_rights_reserved: 'Alle rettigheder forbeholdes',
    radio_disclaimer: 'Radiostationer tilhører deres respektive ejere.',
    tagline: 'Den mest komplette online radioguide. Forbinder dig gennem musik.',
    loading: 'Indlæser...',
    play: 'Afspil',
    pause: 'Pause',
    volume: 'Lydstyrke',
    stations_of: 'Stationer fra',
    why_choose_title: 'Hvorfor vælge Emisoras Latinas?',
    why_choose_items: {
      fast_load: 'Øjeblikkelig indlæsning - Musikken starter på under 2 sekunder.',
      no_ads: 'Ingen påtrængende reklamer - Nul pop-ups, nul bannere der blokerer afspilleren.',
      continuous_play: 'Kontinuerlig afspilning - Naviger rundt på siden uden at musikken stopper.',
      premium_free: 'Gratis Premium Oplevelse - Rent, moderne design uden distraktioner.',
      mobile_friendly: 'Mobilvenlig - Installer vores app fra browseren (PWA).',
    },
    seo_title: 'Lyt til Radio {country} Gratis Online - Uden Afbrydelser',
    seo_description_1: 'Velkommen til den mest komplette oversigt over radiostationer fra {country}. Her kan du lytte til live-udsendelser fra dine favoritstationer uden afbrydelser, irriterende pop-ups og med øjeblikkelig indlæsning.',
    seo_description_2: 'Vores katalog indeholder over {count} radioer fra {country}. Nyd genrer som nyheder, sport, popmusik, rock og meget mere. Afspilleren stopper aldrig mens du browser.',
  },
  
  uk: {
    home: 'Головна',
    search_placeholder: 'Пошук станції...',
    genres: 'Жанри',
    live: 'Наживо',
    free: 'Безкоштовно',
    now_listening: 'Ви слухаєте',
    stations: 'станцій',
    filtering_by: 'Фільтр за',
    clear: 'Очистити',
    about_us: 'Про Нас',
    privacy_policy: 'Політика Конфіденційності',
    cookie_policy: 'Політика Cookies',
    terms: 'Умови Використання',
    legal_notice: 'Правова Інформація',
    contact: 'Контакти',
    all_rights_reserved: 'Усі права захищені',
    radio_disclaimer: 'Радіостанції є власністю їхніх власників.',
    tagline: 'Найповніший онлайн-радіодовідник. Зв\'язуємо вас через музику.',
    loading: 'Завантаження...',
    play: 'Відтворити',
    pause: 'Пауза',
    volume: 'Гучність',
    stations_of: 'Станції',
    why_choose_title: 'Чому обирають Emisoras Latinas?',
    why_choose_items: {
      fast_load: 'Миттєве завантаження - Музика починається менш ніж за 2 секунди.',
      no_ads: 'Без нав\'язливої реклами - Нуль спливаючих вікон, нуль банерів.',
      continuous_play: 'Безперервне відтворення - Переглядайте сайт, не зупиняючи музику.',
      premium_free: 'Безкоштовний Преміум Досвід - Чистий, сучасний дизайн без відволікань.',
      mobile_friendly: 'Мобільна версія - Встановіть наш додаток з браузера (PWA).',
    },
    seo_title: 'Слухати Радіо {country} Безкоштовно Онлайн - Без Реклами',
    seo_description_1: 'Ласкаво просимо до найповнішого каталогу радіостанцій {country}. Тут ви можете слухати прямі трансляції ваших улюблених станцій без перерв, без дратівливих спливаючих вікон і з миттєвим завантаженням.',
    seo_description_2: 'Наш каталог включає понад {count} радіостанцій {country}. Насолоджуйтесь такими жанрами, як новини, спорт, поп-музика, рок та багато іншого. Плеєр ніколи не зупиняється під час навігації.',
  },
};

/**
 * Mapeo de código de país a idioma
 */
export const countryToLanguage: Record<string, Language> = {
  // Español
  CO: 'es', AR: 'es', MX: 'es', PE: 'es', EC: 'es', VE: 'es',
  CL: 'es', GT: 'es', BO: 'es', SV: 'es', HN: 'es', NI: 'es',
  PR: 'es', DO: 'es', UY: 'es', CR: 'es', ES: 'es',
  
  // Inglés
  US: 'en', GB: 'en', JM: 'en', TT: 'en',
  
  // Francés
  FR: 'fr',
  
  // Portugués
  BR: 'pt', PT: 'pt',
  
  // Italiano
  IT: 'it',
  
  // Danés
  DK: 'da',
  
  // Ucraniano
  UA: 'uk',
};

/**
 * Obtiene las traducciones para un código de país dado
 */
export function getTranslations(countryCode: string): Translations {
  const lang = countryToLanguage[countryCode.toUpperCase()] || 'es';
  return translations[lang];
}

/**
 * Obtiene el código de idioma para un país
 */
export function getLanguageCode(countryCode: string): Language {
  return countryToLanguage[countryCode.toUpperCase()] || 'es';
}

/**
 * Versión del hook para componentes de servidor (Server Components)
 * Recibe el countryCode como parámetro en lugar de leerlo del router
 */
export function getI18nFromCountry(countryCode: string): { t: Translations; lang: Language } {
  const code = countryCode.toUpperCase();
  return {
    t: getTranslations(code),
    lang: getLanguageCode(code),
  };
}
