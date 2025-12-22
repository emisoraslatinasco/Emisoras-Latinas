// Base de datos de emisoras
// Imágenes locales: /img/Nombre_Sin_Espacios_Ni_Tildes.jpg

export interface Station {
  id: number;
  name: string;
  category: string;
  logoUrl: string;
  streamUrl: string;
  description: string;
}

export const stations: Station[] = [
  // ========== EMISORAS DE NOTICIAS ==========
  {
    id: 1,
    name: "Caracol Radio",
    category: "Noticias",
    logoUrl: "/img/Caracol_Radio.jpg",
    streamUrl: "https://playerservices.streamtheworld.com/api/livestream-redirect/CARACOL_RADIOAAC_SC?csegid=2000",
    description: "Más compañía. Noticias y deportes en vivo."
  },
  {
    id: 2,
    name: "W Radio",
    category: "Noticias",
    logoUrl: "/img/W_Radio.jpg",
    streamUrl: "https://27413.live.streamtheworld.com/WRADIOAAC_SC?csegid=10000",
    description: "La radio más influyente de Colombia."
  },
  {
    id: 3,
    name: "La FM Bogotá",
    category: "Noticias",
    logoUrl: "/img/La_FM_Bogota.jpg",
    streamUrl: "https://co-e7-p-e-cl2-audio.cdn.mdstrm.com/live-audio-aw/632c9b23d1dcd7027f32f7fe?aid=6271a4d5d206c3172f3c9a9c&pid=6fMKsyg0oPVDVELTEneECqAAThSQkP1x&sid=nsOIhRL6jc8FyEJ0xtoUwfTE0Bp0k5kR&uid=rFMckdqF6Z0nR5RQgb22uz3l3HVuM8su&es=co-e7-p-e-cl2-audio.cdn.mdstrm.com&ote=1765978544108&ot=WpkrdX9RxW_bhWo0U3jC7w&proto=https&pz=us&cP=128000&awCollectionId=6271a4d5d206c3172f3c9a9c&aw_0_1st.playerId=demo-rcn-app-web&liveId=632c9b23d1dcd7027f32f7fe&referer=https%3A%2F%2Fwww.emisorascolombianas.co%2F&propertyName=demo-rcn-app-web&listenerId=rFMckdqF6Z0nR5RQgb22uz3l3HVuM8su",
    description: "Noticias, música y tendencias."
  },
  {
    id: 4,
    name: "Antena 2",
    category: "Deportes",
    logoUrl: "/img/Antena_2.jpg",
    streamUrl: "https://co-e7-p-e-cl2-audio.cdn.mdstrm.com/live-audio-aw/632c9b439234f869e9a50e2b?aid=6271a4d5d206c3172f3c9a9c&pid=z8ZxQuiXcp3y4My8VAmWLDDZ4ANdZc6x&sid=zh8uNOVnOSFHXBqOhdNIRhw7ow6khnql&uid=sHAZbxjnmE9vI8KttMk3Bw0IQr84A9db&es=co-e7-p-e-cl2-audio.cdn.mdstrm.com&ote=1765979685739&ot=UEqp635MeAyDqnNk4_X8mA&proto=https&pz=us&cP=128000&awCollectionId=6271a4d5d206c3172f3c9a9c&liveId=632c9b439234f869e9a50e2b&referer=https%3A%2F%2Fwww.emisorascolombianas.co%2F&listenerId=sHAZbxjnmE9vI8KttMk3Bw0IQr84A9db",
    description: "La cadena deportiva de Colombia."
  },
  {
    id: 5,
    name: "Radio Santa Fe",
    category: "Popular",
    logoUrl: "/img/Radio_Santa_Fe.jpg",
    streamUrl: "https://27343.live.streamtheworld.com/QHUBO_BOGOTA_SC",
    description: "La emisora de la capital."
  },
  {
    id: 6,
    name: "Blu Radio",
    category: "Noticias",
    logoUrl: "/img/Blu_Radio.jpg",
    streamUrl: "https://21633.live.streamtheworld.com/BLURADIO_SC",
    description: "La nueva alternativa."
  },

  // ========== OLÍMPICA STEREO (VARIAS CIUDADES) ==========
  {
    id: 7,
    name: "Olímpica Stereo Medellín",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Medellin.jpg",
    streamUrl: "https://27243.live.streamtheworld.com/OLP_MEDELLINAAC_SC?dist=oro_web",
    description: "¡Se metió! Desde Medellín."
  },
  {
    id: 8,
    name: "Olímpica Stereo Bogotá",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Bogota.jpg",
    streamUrl: "https://26593.live.streamtheworld.com/OLP_BOGOTAAAC_SC?dist=oro_web",
    description: "¡Se metió! Bogotá."
  },
  {
    id: 9,
    name: "Olímpica Stereo Cali",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Cali.jpg",
    streamUrl: "https://26483.live.streamtheworld.com/OLP_CALIAAC_SC?dist=oro_web",
    description: "¡Se metió! Cali."
  },
  {
    id: 10,
    name: "Olímpica Stereo Barranquilla",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Barranquilla.jpg",
    streamUrl: "https://27573.live.streamtheworld.com/RNA_BARRANQUILLA_SC",
    description: "¡Se metió! La original."
  },
  {
    id: 11,
    name: "Olímpica Stereo Cartagena",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Cartagena.jpg",
    streamUrl: "https://26643.live.streamtheworld.com/OLP_CARTAGENAAAC_SC?dist=oro_web",
    description: "¡Se metió! Cartagena."
  },
  {
    id: 12,
    name: "Olímpica Stereo Bucaramanga",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Bucaramanga.jpg",
    streamUrl: "https://27443.live.streamtheworld.com/OLP_BUCARAMANGAAAC_SC?dist=oro_web",
    description: "¡Se metió! Bucaramanga."
  },
  {
    id: 13,
    name: "Olímpica Stereo Montería",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Monteria.jpg",
    streamUrl: "https://24273.live.streamtheworld.com/OLP_MONTERIAAAC_SC?dist=oro_web",
    description: "¡Se metió! Montería."
  },
  {
    id: 14,
    name: "Olímpica Stereo Villavicencio",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Villavicencio.jpg",
    streamUrl: "https://24223.live.streamtheworld.com/OLP_VILLAVICENCIOAAC_SC?dist=oro_web",
    description: "¡Se metió! Villavicencio."
  },
  {
    id: 15,
    name: "Olímpica Stereo Neiva",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Neiva.jpg",
    streamUrl: "https://26183.live.streamtheworld.com/OLP_NEIVAAAC_SC?dist=oro_web",
    description: "¡Se metió! Neiva."
  },
  {
    id: 16,
    name: "Olímpica Stereo Ibagué",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Ibague.jpg",
    streamUrl: "https://27343.live.streamtheworld.com/OLP_IBAGUEAAC_SC?dist=oro_web",
    description: "¡Se metió! Ibagué."
  },
  {
    id: 17,
    name: "Olímpica Stereo Sincelejo",
    category: "Variada",
    logoUrl: "/img/Olimpica_Stereo_Sincelejo.jpg",
    streamUrl: "https://19473.live.streamtheworld.com/OLP_SINCELEJOAAC_SC?dist=oro_web",
    description: "¡Se metió! Sincelejo."
  },

  // ========== TROPICANA Y SALSA ==========
  {
    id: 18,
    name: "Tropicana Bogotá",
    category: "Salsa",
    logoUrl: "/img/Tropicana_Bogota.jpg",
    streamUrl: "https://27693.live.streamtheworld.com/TROPICANAAAC_SC?csegid=2000&dist=tropicana_co-web-live_streaming_play&pname=TDSdk",
    description: "La más bacana. Salsa y vallenato."
  },
  {
    id: 19,
    name: "Tropicana Medellín",
    category: "Salsa",
    logoUrl: "/img/Tropicana_Medellin.jpg",
    streamUrl: "https://27433.live.streamtheworld.com/TR_MEDELLINAAC_SC?csegid=2000",
    description: "La más bacana Medellín."
  },
  {
    id: 20,
    name: "El Sol Bogotá",
    category: "Salsa",
    logoUrl: "/img/El_Sol_Bogota.jpg",
    streamUrl: "https://co-e7-p-e-cl2-audio.cdn.mdstrm.com/live-audio-aw/632c9b89aa9ace684913b815?aid=6271a4d5d206c3172f3c9a9c&pid=FxTcExeflgOgKgyPqUf1ecGOSla5moGt&sid=fYZS1lwQSkVrZUgg3z9iHD0KtSuFOyWS&uid=ICXMrIU7eSMIPzZD4lnukGRSnC8hYCeZ&es=co-e7-p-e-cl2-audio.cdn.mdstrm.com&ote=1765978183666&ot=FXzFtD-V-DpZTGQqb2RY7Q&proto=https&pz=us&cP=128000&awCollectionId=6271a4d5d206c3172f3c9a9c&aw_0_1st.playerId=rcn-mundo-go-app-web&liveId=632c9b89aa9ace684913b815&referer=https%3A%2F%2Fwww.emisorascolombianas.co%2F&propertyName=rcn-mundo-go-app-web&listenerId=ICXMrIU7eSMIPzZD4lnukGRSnC8hYCeZ",
    description: "Asoléate que te conviene."
  },
  {
    id: 21,
    name: "El Sol Cali",
    category: "Salsa",
    logoUrl: "/img/El_Sol_Cali.jpg",
    streamUrl: "https://co-e7-p-e-cl2-audio.cdn.mdstrm.com/live-audio-aw/632cb6ecaa9ace684913bf19?aid=6271a4d5d206c3172f3c9a9c&pid=c4IzFbhQhZPuQqA30wlkJfsOvQx7j5Vb&sid=h9MMEhv6wa5ZLcFt72QxuY31KFrN9AdN&uid=36Z8C34elv4jahQ2H6jJo0gXpmbB3BSP&es=co-e7-p-e-cl2-audio.cdn.mdstrm.com&ote=1765980694857&ot=Jg33qRQg751_3kMox8PysQ&proto=https&pz=us&cP=128000&awCollectionId=6271a4d5d206c3172f3c9a9c&aw_0_1st.playerId=rcn-mundo-go-app-web&liveId=632cb6ecaa9ace684913bf19&referer=https%3A%2F%2Fwww.emisorascolombianas.co%2F&propertyName=rcn-mundo-go-app-web&listenerId=36Z8C34elv4jahQ2H6jJo0gXpmbB3BSP",
    description: "Salsa de la buena en Cali."
  },

  // ========== POPULAR Y VALLENATO ==========
  {
    id: 22,
    name: "La Kalle",
    category: "Popular",
    logoUrl: "/img/La_Kalle.jpg",
    streamUrl: "https://14073.live.streamtheworld.com/LA_KALLE_SC",
    description: "La mandamás. Música popular y regional."
  },
  {
    id: 23,
    name: "Radio Uno Bogotá",
    category: "Popular",
    logoUrl: "/img/Radio_Uno_Bogota.jpg",
    streamUrl: "https://co-e7-p-e-cl2-audio.cdn.mdstrm.com/live-audio-aw/632c9bbcaa9ace684913b81b?aid=6271a4d5d206c3172f3c9a9c&pid=fUTOuHg7d1rEV4vUZ7tZWfcw6MihHWwO&sid=8x06NSxkCYaT9OSyMsECKMDtNDxcla7c&uid=Rw2wQw4s0hftkaVP0HfKTPtw3s0q4DXY&es=co-e7-p-e-cl2-audio.cdn.mdstrm.com&ote=1765979374540&ot=NW8a5UelIotJ32cEi0pS4Q&proto=https&pz=us&cP=128000&awCollectionId=6271a4d5d206c3172f3c9a9c&aw_0_1st.playerId=rcn-mundo-go-app-web&liveId=632c9bbcaa9ace684913b81b&referer=https%3A%2F%2Fwww.emisorascolombianas.co%2F&propertyName=rcn-mundo-go-app-web&listenerId=Rw2wQw4s0hftkaVP0HfKTPtw3s0q4DXY",
    description: "La de uno. Vallenato y popular."
  },
  {
    id: 24,
    name: "La Reina Barranquilla",
    category: "Vallenato",
    logoUrl: "/img/La_Reina_Barranquilla.jpg",
    streamUrl: "https://27573.live.streamtheworld.com/RNA_BARRANQUILLA_SC",
    description: "El vallenato de verdad."
  },
  {
    id: 25,
    name: "La Reina Cartagena",
    category: "Vallenato",
    logoUrl: "/img/La_Reina_Cartagena.jpg",
    streamUrl: "https://24383.live.streamtheworld.com/RNA_CARTAGENA_SC",
    description: "Cartagena 95.5 FM."
  },
  {
    id: 26,
    name: "Vallenata Stereo",
    category: "Vallenato",
    logoUrl: "/img/Vallenata_Stereo.jpg",
    streamUrl: "https://stream-149.zeno.fm/08qxk717fd0uv",
    description: "Puro sentimiento vallenato."
  },
  {
    id: 27,
    name: "La Estación Vallenata",
    category: "Vallenato",
    logoUrl: "/img/La_Estacion_Vallenata.jpg",
    streamUrl: "https://stream-155.zeno.fm/ubk0x8k2znhvv",
    description: "El mejor vallenato en FM."
  },
  {
    id: 28,
    name: "La Vallenata",
    category: "Vallenato",
    logoUrl: "/img/La_Vallenata.jpg",
    streamUrl: "https://streaming.radiosenlinea.com.ar/8256/stream",
    description: "Vallenato las 24 horas."
  },
  {
    id: 29,
    name: "Alerta Bogotá",
    category: "Popular",
    logoUrl: "/img/Alerta_Bogota.jpg",
    streamUrl: "https://co-e7-p-e-cl2-audio.cdn.mdstrm.com/live-audio-aw/632c9c1cbc02c60329991efa?aid=6271a4d5d206c3172f3c9a9c&pid=XTOBNlX406kP4vSN3FQFu5Cjxeb3pECd&sid=FEnF98a0GeHrvYl2oHtgcy5yrTPsDvP5&uid=7RTvhAD56aGSwhIGiGWsFyJJB0Al8prB&es=co-e7-p-e-cl2-audio.cdn.mdstrm.com&ote=1765979329681&ot=YP0hYw9wBktQDvp3WvB0HA&proto=https&pz=us&cP=128000&awCollectionId=6271a4d5d206c3172f3c9a9c&liveId=632c9c1cbc02c60329991efa&referer=https%3A%2F%2Fwww.emisorascolombianas.co%2F&listenerId=7RTvhAD56aGSwhIGiGWsFyJJB0Al8prB",
    description: "La cariñosa del pueblo."
  },
  {
    id: 30,
    name: "La Kontentosa",
    category: "Popular",
    logoUrl: "/img/La_Kontentosa.jpg",
    streamUrl: "https://virtual6.estructuraweb.com:8040/live",
    description: "Música popular pa' beber."
  },
  {
    id: 31,
    name: "Kantinera Kmusic",
    category: "Popular",
    logoUrl: "/img/Kantinera_Kmusic.jpg",
    streamUrl: "https://estructuraweb.com.co:9000/live",
    description: "La cantina en tu radio."
  },

  // ========== URBANO Y JUVENIL ==========
  {
    id: 32,
    name: "La Mega Bogotá",
    category: "Urbano",
    logoUrl: "/img/La_Mega_Bogota.jpg",
    streamUrl: "https://co-e7-p-e-cl2-audio.cdn.mdstrm.com/live-audio-aw/632c9ae6660fef03fe3855fe?aid=6271a4d5d206c3172f3c9a9c&pid=78sXtwauZWN5EhHRXlzVmOkNbu8gPTfg&sid=FXdk1rNL2k5mzSKLBQvfXHnw4D4lVep2&uid=n0b43qCKLp6qOrQnJzCZYkbumqV7kRpX&es=co-e7-p-e-cl2-audio.cdn.mdstrm.com&ote=1765978449336&ot=yaMiRaJQc7wd36RLK6KG_Q&proto=https&pz=us&cP=128000&awCollectionId=6271a4d5d206c3172f3c9a9c&aw_0_1st.playerId=rcn-mundo-go-app-web&liveId=632c9ae6660fef03fe3855fe&referer=https%3A%2F%2Fwww.emisorascolombianas.co%2F&propertyName=rcn-mundo-go-app-web&listenerId=n0b43qCKLp6qOrQnJzCZYkbumqV7kRpX",
    description: "Te pega al cielo. Reggaetón y tendencias."
  },
  {
    id: 33,
    name: "Mix 92.9 Bogotá",
    category: "Urbano",
    logoUrl: "/img/Mix_92_Bogota.jpg",
    streamUrl: "https://27573.live.streamtheworld.com/MIX_BOGOTAAAC_SC?dist=oro_web",
    description: "El sonido de la calle."
  },
  {
    id: 34,
    name: "Mix 89.9 Medellín",
    category: "Urbano",
    logoUrl: "/img/Mix_89_Medellin.jpg",
    streamUrl: "https://24283.live.streamtheworld.com/MIX_MEDELLINAAC_SC?dist=MixMedWeb",
    description: "El sonido de la calle Medellín."
  },
  {
    id: 35,
    name: "Los 40 Colombia",
    category: "Urbano",
    logoUrl: "/img/Los_40_Colombia.jpg",
    streamUrl: "https://26523.live.streamtheworld.com/LOS40_COLOMBIAAAC_SC?csegid=10000",
    description: "Todos los éxitos."
  },
  {
    id: 36,
    name: "La X Más Música",
    category: "Urbano",
    logoUrl: "/img/La_X_Mas_Musica.jpg",
    streamUrl: "https://s5.radio.co/s980fc5249/listen",
    description: "103.9 FM. Más música, menos bla bla bla."
  },
  {
    id: 37,
    name: "RadioUnik",
    category: "Urbano",
    logoUrl: "/img/RadioUnik.jpg",
    streamUrl: "https://virtual1.emisorasvirtuales.com:8100/live",
    description: "La emisora diferente."
  },

  // ========== ROCK ==========
  {
    id: 38,
    name: "Radioacktiva",
    category: "Rock",
    logoUrl: "/img/Radioacktiva.jpg",
    streamUrl: "https://27693.live.streamtheworld.com/RADIO_ACTIVA_SC",
    description: "El planeta rock de Colombia."
  },
  {
    id: 39,
    name: "El Tunel",
    category: "Rock",
    logoUrl: "/img/El_Tunel.jpg",
    streamUrl: "https://play10.tikast.com/proxy/eltunel?mp=/stream",
    description: "Rock y cultura alternativa."
  },
  {
    id: 40,
    name: "Espíritu Rock",
    category: "Rock",
    logoUrl: "/img/Espiritu_Rock.jpg",
    streamUrl: "https://centova92.instainternet.com/proxy/santiago/stream",
    description: "El espíritu del rock vive."
  },

  // ========== ROMÁNTICA Y BALADAS ==========
  {
    id: 41,
    name: "Bésame Bogotá",
    category: "Romántica",
    logoUrl: "/img/Besame_Bogota.jpg",
    streamUrl: "https://27343.live.streamtheworld.com/BESAME_BOGOTAAAC_SC?csegid=2000",
    description: "Radio apasionada."
  },
  {
    id: 42,
    name: "Bésame Medellín",
    category: "Romántica",
    logoUrl: "/img/Besame_Medellin.jpg",
    streamUrl: "https://24253.live.streamtheworld.com/BESAME_MEDELLINAAC_SC?csegid=2000&dist=besameco-web-tod-player&pname=TDSdk",
    description: "Los clásicos románticos."
  },
  {
    id: 43,
    name: "Bésame Cali",
    category: "Romántica",
    logoUrl: "/img/Besame_Cali.jpg",
    streamUrl: "https://23043.live.streamtheworld.com/BESAME_CALIAAC_SC?csegid=2000",
    description: "Apasionada en Cali."
  },
  {
    id: 44,
    name: "Vibra FM",
    category: "Romántica",
    logoUrl: "/img/Vibra_FM.jpg",
    streamUrl: "https://26563.live.streamtheworld.com/VIBRA_SC?dist=mytunerradiopuntocom",
    description: "Tu corazón no late, vibra."
  },
  {
    id: 45,
    name: "Baladas Clásicas",
    category: "Clásicos",
    logoUrl: "/img/Baladas_Clasicas.jpg",
    streamUrl: "https://stream-170.zeno.fm/dossnihtsrytv",
    description: "Recordar es vivir."
  },
  {
    id: 46,
    name: "Radio Tiempo Medellín",
    category: "Romántica",
    logoUrl: "/img/Radio_Tiempo_Medellin.jpg",
    streamUrl: "https://27353.live.streamtheworld.com/RT_MEDELLINAAC_SC?dist=oro_web",
    description: "Todo el tiempo."
  },

  // ========== FIESTA Y DICIEMBRE ==========
  {
    id: 47,
    name: "Candela Estéreo",
    category: "Fiesta",
    logoUrl: "/img/Candela_Estereo.jpg",
    streamUrl: "https://27393.live.streamtheworld.com/CANDELAESTEREO_SC?dist=mytunerradiopuntocom",
    description: "Solo éxitos, familia y fiesta."
  },
  {
    id: 48,
    name: "Viejoteca",
    category: "Fiesta",
    logoUrl: "/img/Viejoteca.jpg",
    streamUrl: "https://stream-170.zeno.fm/n89ryz2day8uv",
    description: "Para beber y gozar."
  },
  {
    id: 49,
    name: "Diciembre Stereo",
    category: "Fiesta",
    logoUrl: "/img/Diciembre_Stereo.jpg",
    streamUrl: "https://c23.radioboss.fm:8195/stream",
    description: "Fiesta de fin de año todo el año."
  },
  {
    id: 50,
    name: "Diciembre Radio",
    category: "Fiesta",
    logoUrl: "/img/Diciembre_Radio.jpg",
    streamUrl: "https://stream-156.zeno.fm/8mklmefaucjuv",
    description: "El sabor de la navidad colombiana."
  },
  {
    id: 51,
    name: "La Viejoteca de Richy",
    category: "Fiesta",
    logoUrl: "/img/La_Viejoteca_de_Richy.jpg",
    streamUrl: "https://play10.tikast.com/proxy/viejotecarichy?mp=/stream",
    description: "Los clásicos de la fiesta."
  },
  {
    id: 52,
    name: "Crossover Estereo",
    category: "Variada",
    logoUrl: "/img/Crossover_Estereo.jpg",
    streamUrl: "https://stream-160.zeno.fm/76skg1fndkeuv",
    description: "De todo para todos."
  },
  {
    id: 53,
    name: "La Bebeta",
    category: "Fiesta",
    logoUrl: "/img/La_Bebeta.jpg",
    streamUrl: "https://play10.tikast.com/proxy/zlabebeta?mp=/stream",
    description: "Pura rumba."
  },

  // ========== OTRAS REGIONALES ==========
  {
    id: 54,
    name: "Radio Bolivariana",
    category: "Cultural",
    logoUrl: "/img/Radio_Bolivariana.jpg",
    streamUrl: "http://streaming.radiobolivarianavirtual.com:7630/;",
    description: "Desde la UPB Medellín."
  },
  {
    id: 55,
    name: "Armonías Boyacenses",
    category: "Cultural",
    logoUrl: "/img/Armonias_Boyacenses.jpg",
    streamUrl: "https://virtualtronics.net/proxy/armoniasboyacenses?mp=/;",
    description: "La voz de Boyacá."
  },
  {
    id: 56,
    name: "Caucana Stereo",
    category: "Regional",
    logoUrl: "/img/Caucana_Stereo.jpg",
    streamUrl: "https://fire.doscast.com:8090/stream",
    description: "Desde el Valle del Cauca."
  },
  {
    id: 57,
    name: "Maravilla Stereo",
    category: "Regional",
    logoUrl: "/img/Maravilla_Stereo.jpg",
    streamUrl: "https://sonic.paulatina.co/7056/stream",
    description: "Valledupar 98.6 FM."
  },

  // ========== EMISORAS CRISTIANAS ==========
  {
    id: 58,
    name: "Radio Maria Colombia",
    category: "Cristiana",
    logoUrl: "/img/Radio_Maria_Colombia.jpg",
    streamUrl: "https://dreamsiteradiocp2.com/proxy/rmcolombia2?mp=/stream",
    description: "Una voz católica en tu hogar."
  },
  {
    id: 59,
    name: "Radio Cristiana Colombia",
    category: "Cristiana",
    logoUrl: "/img/Radio_Cristiana_Colombia.jpg",
    streamUrl: "https://stream-154.zeno.fm/a3y646rxcfhvv",
    description: "Alabanza y adoración 24/7."
  },
  {
    id: 60,
    name: "Pasion Cristiana",
    category: "Cristiana",
    logoUrl: "/img/Pasion_Cristiana.jpg",
    streamUrl: "https://stream-151.zeno.fm/mzs0x146ctzuv",
    description: "Pasión por la palabra de Dios."
  },
  {
    id: 61,
    name: "Cristiana Radio",
    category: "Cristiana",
    logoUrl: "/img/Cristiana_Radio.jpg",
    streamUrl: "https://virtual6.estructuraweb.com:8070/live",
    description: "Tu conexión con el cielo."
  },
  {
    id: 62,
    name: "Emisora Vallenata Cristiana",
    category: "Cristiana",
    logoUrl: "/img/Emisora_Vallenata_Cristiana.jpg",
    streamUrl: "https://virtual4.emisorasvirtuales.com:8280/live",
    description: "Vallenato para alabar a Dios."
  },
  {
    id: 63,
    name: "Voces Cristianas",
    category: "Cristiana",
    logoUrl: "/img/Voces_Cristianas.jpg",
    streamUrl: "https://cloud11.vsgtech.co/proxy/vocescristianas/stream",
    description: "Voces que edifican tu vida."
  },
  {
    id: 64,
    name: "Tropisalsa Cristiana",
    category: "Cristiana",
    logoUrl: "/img/Tropisalsa_Cristiana.jpg",
    streamUrl: "https://stream-160.zeno.fm/zstuc2ev88quv",
    description: "Salsa con mensaje de vida."
  },
  {
    id: 65,
    name: "Radio Cristiano Biblico",
    category: "Cristiana",
    logoUrl: "/img/Radio_Cristiano_Biblico.jpg",
    streamUrl: "https://stream-160.zeno.fm/jth8it4lbfmuv",
    description: "La Biblia en tu radio."
  },
  {
    id: 66,
    name: "Radio Uno en Cristo",
    category: "Cristiana",
    logoUrl: "/img/Radio_Uno_en_Cristo.jpg",
    streamUrl: "https://stream-179.zeno.fm/wupqqzar0wzuv",
    description: "Unidos en un solo espíritu."
  },
  {
    id: 67,
    name: "Radio Cristiana JEG",
    category: "Cristiana",
    logoUrl: "/img/Radio_Cristiana_JEG.jpg",
    streamUrl: "https://estructuraweb.com.co:9306/live",
    description: "Jesús es el Gran Rey."
  },
  {
    id: 68,
    name: "Radio Popular Cristiana",
    category: "Cristiana",
    logoUrl: "/img/Radio_Popular_Cristiana.jpg",
    streamUrl: "https://stream-155.zeno.fm/782h6mq96p8uv",
    description: "Música popular para el alma."
  },
  {
    id: 69,
    name: "Cristalina Stereo 103 FMM",
    category: "Cristiana",
    logoUrl: "/img/Cristalina_Stereo_103_FMM.jpg",
    streamUrl: "https://radiohd.streaminghd.co:7400/stream",
    description: "Señal que bendice."
  },
  {
    id: 70,
    name: "Radio Emancipacion Cristiana Colombiana Afro",
    category: "Cristiana",
    logoUrl: "/img/Radio_Emancipacion_Cristiana_Colombiana_Afro.jpg",
    streamUrl: "https://a12.asurahosting.com/listen/dilinger/radio.mp3",
    description: "Identidad y fe afrocolombiana."
  },
  {
    id: 71,
    name: "Uno Más Para Cristo Radio",
    category: "Cristiana",
    logoUrl: "/img/Uno_Mas_Para_Cristo_Radio.jpg",
    streamUrl: "https://virtual2.emisorasvirtuales.com:8120/live",
    description: "Ganando almas para el reino."
  },
  {
    id: 72,
    name: "Radio Online Cristo Roca Fuerte",
    category: "Cristiana",
    logoUrl: "/img/Radio_Online_Cristo_Roca_Fuerte.jpg",
    streamUrl: "https://server.streamingradios.net/8284/stream",
    description: "Fundamentados en la roca."
  },
  {
    id: 73,
    name: "Radio Cristo Roca Fuerte Colombia",
    category: "Cristiana",
    logoUrl: "/img/Radio_Cristo_Roca_Fuerte_Colombia.jpg",
    streamUrl: "https://my.apptunner.com/8006/live",
    description: "Fortaleza espiritual para ti."
  }
];

// Obtener categorías únicas
export const getCategories = (): string[] => {
  return [...new Set(stations.map(s => s.category))];
};

// Filtrar emisoras por categoría
export const filterByCategory = (category: string): Station[] => {
  if (category === 'all') return stations;
  return stations.filter(s => s.category === category);
};

// Buscar emisoras
export const searchStations = (query: string): Station[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return stations;
  
  return stations.filter(station =>
    station.name.toLowerCase().includes(lowerQuery) ||
    station.category.toLowerCase().includes(lowerQuery) ||
    station.description.toLowerCase().includes(lowerQuery)
  );
};
