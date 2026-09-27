// src/config.js

export const CONFIG = {
  // Padres, Hermanito y Bebé
  parents: {
    dad: "Alberth",
    mom: "Ammi",
    brother: "Angelito",
    babyTitle: "Nuestro Bebé",
  },

  // Evento
  event: {
    title: "¿Niño o Niña?",
    subtitle: "Nuestra Revelación de Género",
    fullDate: "Sábado, 17 de Octubre de 2026",
    dateFormatted: "17.10.2026",
    day: 17,
    monthName: "OCTUBRE",
    year: 2026,
    time: "4:00 PM", // Hora habitual para granjas familiares
    locationName: "Granja Pa' que Hugo",
    locationCity: "Maracaibo, Zulia",
    mapLink: "https://www.google.com/maps/place/Pa'+q+Hugo,+Maracaibo+4001,+Zulia/data=!4m2!3m1!1s0x8e899b55494cf00b:0xc1b3d195cacae59",
    whatsappPhone: "584246622342", // +58 424-6622342
    whatsappPhoneFormatted: "+58 424-6622342",
  },

  // Paleta de colores oficial (Exclusivamente Neutros Elegantes)
  palette: {
    beige: "#EADBCE",
    beigeLight: "#F5EFEB",
    brown: "#6B4423",
    brownDark: "#4A2E18",
    white: "#FFFFFF",
    cream: "#FAF8F5",
    gold: "#D4AF37",
    goldGradient: "linear-gradient(135deg, #ECC875 0%, #D4AF37 50%, #B8860B 100%)",
  },

  // Código de vestimenta solicitado
  dressCode: {
    title: "Código de Vestimenta",
    colorsText: "Colores Neutros: Beige, Marrón y Blanco",
    description: "Les agradecemos asistir con prendas en tonos neutros y cálidos para armonizar con nuestra temática.",
    swatches: [
      { name: "Blanco Marfil", color: "#FFFFFF", border: "#E2D9CC" },
      { name: "Beige Suave", color: "#EADBCE" },
      { name: "Arena Cálido", color: "#D1BCA8" },
      { name: "Marrón Claro", color: "#A47E5B" },
      { name: "Marrón Chocolate", color: "#5C3A21" },
    ]
  },

  // Dinámica de regalos para el Gender Reveal
  giftDynamics: {
    title: "Dinámica de Regalos",
    subtitle: "¿Cuál es tu predicción?",
    girl: {
      team: "Team Niña 🎀",
      gift: "Pañales",
      description: "Si crees que es niña puedes traer pañales",
      icon: "heart"
    },
    boy: {
      team: "Team Niño 🧸",
      gift: "Kit de higiene o toallitas húmedas",
      description: "Si crees que es niño puedes traer kit de higiene o toallitas húmedas",
      icon: "smile"
    }
  },

  // Canción de cuna (Música de fondo)
  music: {
    url: "/song.m4a",
    title: "Twinkle Twinkle Little Star (Grand Piano Version)",
    artist: "Piano Version",
    youtubeUrl: "https://www.youtube.com/watch?v=FN-0RMxP2YU",
  },

  // Diapositivas tipo Video / Story (8 escenas completas del video)
  storyScenes: [
    {
      id: "intro",
      duration: 5500,
      title: "¿Niño ? Niña",
      subtitle: "Un secreto que está por revelarse...",
      image: "/teddy_intro.jpg",
      badge: "Revelación de Género"
    },
    {
      id: "message",
      duration: 6500,
      badge: "Boy 🧸 Girl",
      title: "ESTAMOS MUY ANSIOSOS POR SABER EL GÉNERO DE NUESTRO BEBÉ Y QUEREMOS QUE NOS ACOMPAÑES EN ESTE HERMOSO MOMENTO",
      image: "/baby_shoes.jpg"
    },
    {
      id: "girl-team",
      duration: 5000,
      title: "Muchos quieren",
      subtitle: "Que sea",
      highlight: "Niña!",
      image: "/teddy_sleeping.jpg",
      badge: "¿Team Niña?"
    },
    {
      id: "boy-team",
      duration: 5000,
      title: "Y otros que",
      highlight: "Sea un niño",
      image: "/teddy_intro.jpg",
      badge: "¿Team Niño?"
    },
    {
      id: "angelito",
      duration: 6500,
      title: "La Dulce Espera",
      parents: "Ammi & Alberth",
      brother: "Angelito",
      text: "Estoy muy feliz que sean Mis papitos y Angelito mi hermanito",
      subtext: "🤎 ? 💛",
      image: "/angelito_ultrasound.jpg",
      badge: "El Milagro Más Grande"
    },
    {
      id: "gifts-team",
      duration: 7000,
      title: "Dinámica de Regalos",
      image: "/clouds_bg.jpg",
      badge: "¿Cuál es tu predicción?"
    },
    {
      id: "event-details",
      duration: 7500,
      title: "Fecha & Ubicación",
      date: "Sábado, 17 de Octubre de 2026",
      time: "4:00 PM",
      place: "Granja Pa' que Hugo",
      city: "Maracaibo, Zulia",
      image: "/teddy_sleeping.jpg",
      badge: "Lugar del Evento"
    },
    {
      id: "rsvp-final",
      duration: 15000,
      title: "Confirma tu asistencia",
      bottomText1: "Te esperamos",
      bottomText2: "No faltes",
      isFinalInteractive: true,
      image: "/clouds_bg.jpg",
      badge: "Confirmación"
    }
  ]
};
