/*
 * D'Tulia · datos de la página
 *
 * Todo lo que cambia con frecuencia está aquí: contacto, redes y catálogo.
 * Para agregar un producto copia un bloque de PRODUCTOS y cambia sus valores.
 */

const NEGOCIO = {
  // Número con código de país, sin "+" ni espacios (Perú = 51)
  whatsapp: "51944660904",
  mensajeGeneral: "Hola D'Tulia, quiero hacer un pedido.",
  direccion: "Trujillo, La Libertad",
  horario: "Lunes a sábado · 9:00 a. m. – 7:00 p. m.",
  // Texto que se busca en Google Maps para el mapa
  mapa: "Trujillo, La Libertad, Perú",
  // Deja una red vacía ("") para que no aparezca en la página
  redes: {
    facebook: "",
    instagram: "https://www.instagram.com/dtulia.peru/",
    tiktok: "",
  },
};

// Unidades por caja de cada presentación (las mismas del sistema de inventario)
// titulo: nombre en la sección de presentaciones · ocasion: para qué se suele pedir
const PRESENTACIONES = [
  { nombre: "CHATA",  etiqueta: "Chata",    titulo: "Chata",          porCaja: 24, uso: "Para llevar",    ocasion: "Bolsillo y brindis rápido" },
  { nombre: "750 ML", etiqueta: "750 ml",   titulo: "Clásica 750 ml", porCaja: 12, uso: "La clásica",     ocasion: "Cenas y regalos" },
  { nombre: "1 L",    etiqueta: "1 L",      titulo: "Litro 1 L",      porCaja: 12, uso: "Para la mesa",   ocasion: "Almuerzos en familia" },
  { nombre: "2 L",    etiqueta: "2 L",      titulo: "Botellón 2 L",   porCaja: 9,  uso: "Para compartir", ocasion: "Reuniones con amigos" },
  { nombre: "4 L",    etiqueta: "4 L",      titulo: "Galonera 4 L",   porCaja: 4,  uso: "Para la fiesta", ocasion: "Matrimonios y fiestas" },
];

/*
 * tipo:     la categoría. Cada tipo es un botón de filtro, en el orden en que aparece aquí
 * fotos:    una foto por presentación (en img/catalogo). Al elegir el tamaño cambia la foto.
 *           Si el producto no tiene tamaños, basta una sola ruta → fotos: "img/catalogo/x.jpg"
 * liquido:  color de la bebida; tiñe la tarjeta y el botón del tamaño elegido
 * notas:    opcional, la insignia sobre la foto
 * precios:  opcional, por presentación. Si un precio falta, se muestra "Consultar precio"
 *           ejemplo → precios: { "750 ML": 18, "4 L": 70 }
 */
const PRODUCTOS = [
  // --- Vinos ---
  {
    nombre: "Vino de Maracuyá",
    tipo: "Vinos",
    descripcion: "El sabor tropical de la maracuyá: dulce, con un toque ácido y muy aromático.",
    notas: ["Frutal", "Tropical"],
    liquido: "#e9a21f",
    fotos: {
      "750 ML": "img/catalogo/maracuya-750.jpg",
      "2 L": "img/catalogo/maracuya-2l.jpg",
      "4 L": "img/catalogo/maracuya-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino de Durazno",
    tipo: "Vinos",
    descripcion: "Suave y delicado, con todo el aroma del durazno maduro.",
    notas: ["Frutal", "Suave"],
    liquido: "#e8c46a",
    fotos: { "750 ML": "img/catalogo/durazno-750.jpg" },
    precios: {},
  },
  {
    nombre: "Vino Tinto La Reserva 19/06",
    tipo: "Vinos",
    descripcion: "Tinto semi seco de la línea La Reserva D'Tulia.",
    notas: ["Semi seco"],
    liquido: "#5a1424",
    fotos: { "750 ML": "img/catalogo/tinto-reserva-750.jpg" },
    precios: {},
  },
  {
    nombre: "Vino de Arándano",
    tipo: "Vinos",
    descripcion: "Vino de fruta con el color profundo y el sabor del arándano.",
    notas: ["Frutal"],
    liquido: "#3b2a6b",
    fotos: { "750 ML": "img/catalogo/arandano-750.jpg" },
    precios: {},
  },
  {
    nombre: "Vino de Higo",
    tipo: "Vinos",
    descripcion: "Dulce y aromático, con el sabor del higo maduro.",
    notas: ["Frutal", "Dulce"],
    liquido: "#6b2140",
    fotos: { "750 ML": "img/catalogo/higo-750.jpg" },
    precios: {},
  },
  {
    nombre: "Vino de Misa",
    tipo: "Vinos",
    descripcion: "El tradicional vino de misa D'Tulia.",
    notas: ["Tradicional"],
    liquido: "#b9a548",
    fotos: { "750 ML": "img/catalogo/misa-750.jpg" },
    precios: {},
  },
  {
    nombre: "Vino Perfecto Amor",
    tipo: "Vinos",
    descripcion: "Un rosado con etiqueta romántica, pensado para regalar.",
    notas: ["Para regalar"],
    liquido: "#e0607e",
    fotos: { "750 ML": "img/catalogo/perfecto-amor-750.jpg" },
    precios: {},
  },
  {
    nombre: "Vino Rosé D'Tulia",
    tipo: "Vinos",
    descripcion: "Fresco, ligero y de color intenso. Se disfruta mejor bien helado.",
    notas: ["Semi seco"],
    liquido: "#d9364a",
    fotos: {
      "750 ML": "img/catalogo/rose-750.jpg",
      "1.5 L": "img/catalogo/rose-1-5l.jpg",
      "2 L": "img/catalogo/rose-2l.jpg",
      "4 L": "img/catalogo/rose-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino Borgoña D'Tulia",
    tipo: "Vinos",
    descripcion: "El borgoña de la casa: tinto, semi seco y de cuerpo suave.",
    notas: ["Semi seco"],
    liquido: "#6e1a2c",
    fotos: {
      "750 ML": "img/catalogo/borgona-750.jpg",
      "1.5 L": "img/catalogo/borgona-1-5l.jpg",
      "2 L": "img/catalogo/borgona-2l.jpg",
      "4 L": "img/catalogo/borgona-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino Cavasutra Rosé",
    tipo: "Vinos",
    descripcion: "Rosé de la línea Cavasutra, en botella clásica y en galonera.",
    liquido: "#c8334a",
    fotos: {
      "750 ML": "img/catalogo/cavasutra-rose-750.jpg",
      "4 L": "img/catalogo/cavasutra-rose-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino Cavasutra Borgoña",
    tipo: "Vinos",
    descripcion: "Borgoña de la línea Cavasutra, en botella clásica y en galonera.",
    liquido: "#5e1626",
    fotos: {
      "750 ML": "img/catalogo/cavasutra-borgona-750.jpg",
      "4 L": "img/catalogo/cavasutra-borgona-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino Purito Rosé",
    tipo: "Vinos",
    descripcion: "Rosé de la línea Purito, en botella clásica y en galonera.",
    liquido: "#d04050",
    fotos: {
      "750 ML": "img/catalogo/purito-rose-750.jpg",
      "4 L": "img/catalogo/purito-rose-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino Purito Borgoña",
    tipo: "Vinos",
    descripcion: "Borgoña de la línea Purito, en tres tamaños.",
    liquido: "#64182a",
    fotos: {
      "750 ML": "img/catalogo/purito-borgona-750.jpg",
      "2 L": "img/catalogo/purito-borgona-2l.jpg",
      "4 L": "img/catalogo/purito-borgona-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino Torres Rosé",
    tipo: "Vinos",
    descripcion: "Rosé semi seco de la línea Torres Reserva.",
    notas: ["Semi seco"],
    liquido: "#c62f45",
    fotos: {
      "750 ML": "img/catalogo/torres-rose-750.jpg",
      "2 L": "img/catalogo/torres-rose-2l.jpg",
      "4 L": "img/catalogo/torres-rose-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Vino Torres Borgoña",
    tipo: "Vinos",
    descripcion: "Borgoña semi seco de la línea Torres Reserva.",
    notas: ["Semi seco"],
    liquido: "#5c1525",
    fotos: {
      "750 ML": "img/catalogo/torres-borgona-750.jpg",
      "4 L": "img/catalogo/torres-borgona-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Pack Purito",
    tipo: "Vinos",
    descripcion: "Purito Rosé y Purito Borgoña juntos en un solo pedido.",
    notas: ["Pack"],
    liquido: "#8a2234",
    fotos: "img/catalogo/pack-purito.jpg",
    precios: {},
  },

  // --- Piscos ---
  {
    nombre: "Pisco Quebranta D'Tulia",
    tipo: "Piscos",
    descripcion: "Pisco puro de uva quebranta, del chato de 250 ml a la galonera de 4 L.",
    notas: ["Puro"],
    liquido: "#c9d6dc",
    fotos: {
      "250 ML": "img/catalogo/pisco-quebranta-250.jpg",
      "750 ML": "img/catalogo/pisco-quebranta-750.jpg",
      "2 L": "img/catalogo/pisco-quebranta-2l.jpg",
      "4 L": "img/catalogo/pisco-quebranta-4l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Pisco Acholado D'Tulia",
    tipo: "Piscos",
    descripcion: "Pisco acholado, la mezcla de uvas pisqueras.",
    liquido: "#c9d3d8",
    fotos: { "750 ML": "img/catalogo/pisco-acholado-750.jpg" },
    precios: {},
  },
  {
    nombre: "Pisco Mosto Verde D'Tulia",
    tipo: "Piscos",
    descripcion: "Pisco mosto verde en botellas decoradas. Consulta los modelos disponibles.",
    liquido: "#b9c7b0",
    fotos: "img/catalogo/pisco-mosto-verde.jpg",
    precios: {},
  },
  {
    nombre: "Pisco Pancha Paula",
    tipo: "Piscos",
    descripcion: "Pisco puro quebranta de la marca Pancha Paula.",
    notas: ["Puro"],
    liquido: "#7fae3e",
    fotos: {
      "750 ML": "img/catalogo/pancha-paula-750.jpg",
      "2 L": "img/catalogo/pancha-paula-2l.jpg",
      "4 L": "img/catalogo/pancha-paula-4l.jpg",
    },
    precios: {},
  },

  // --- Licores ---
  {
    nombre: "Fernet D'Tulia",
    tipo: "Fernet",
    descripcion: "Amargo de hierbas, ideal con cola y hielo.",
    liquido: "#3a2118",
    fotos: { "750 ML": "img/catalogo/fernet-750.jpg" },
    precios: {},
  },
  {
    nombre: "Coñac D'Tulia",
    tipo: "Coñac",
    descripcion: "El coñac de la casa, en chato de 250 ml y botella de 750 ml.",
    liquido: "#a8611e",
    fotos: {
      "250 ML": "img/catalogo/conac-250.jpg",
      "750 ML": "img/catalogo/conac-750.jpg",
    },
    precios: {},
  },
  {
    nombre: "Ron Caribean Black",
    tipo: "Ron",
    descripcion: "Ron añejo especial, en chato de 250 ml y botella de 1 L.",
    liquido: "#6a3414",
    fotos: {
      "250 ML": "img/catalogo/ron-caribean-250.jpg",
      "1 L": "img/catalogo/ron-caribean-1l.jpg",
    },
    precios: {},
  },
  {
    nombre: "Anisado D'Tulia",
    tipo: "Anisado",
    descripcion: "Anisado crema especial, en chato de 250 ml y botella de 750 ml.",
    liquido: "#d8343a",
    fotos: {
      "250 ML": "img/catalogo/anisado-250.jpg",
      "750 ML": "img/catalogo/anisado-750.jpg",
    },
    precios: {},
  },

  // --- Jarabes para cócteles ---
  {
    nombre: "Jarabe de Granadina",
    tipo: "Jarabes",
    descripcion: "El rojo clásico de los cócteles y tragos con granadina.",
    liquido: "#c8243a",
    fotos: { "750 ML": "img/catalogo/jarabe-granadina-750.jpg" },
    precios: {},
  },
  {
    nombre: "Blue Curaçao",
    tipo: "Jarabes",
    descripcion: "El toque azul y cítrico de los cócteles.",
    liquido: "#1f4fbf",
    fotos: { "750 ML": "img/catalogo/blue-curacao-750.jpg" },
    precios: {},
  },
  {
    nombre: "Jarabe de Goma",
    tipo: "Jarabes",
    descripcion: "Para endulzar cócteles como el pisco sour.",
    liquido: "#cfd3b8",
    fotos: { "750 ML": "img/catalogo/jarabe-goma-750.jpg" },
    precios: {},
  },
  {
    nombre: "Crema de Menta",
    tipo: "Jarabes",
    descripcion: "Menta fresca para cócteles y bajativos.",
    liquido: "#2f8a3a",
    fotos: { "750 ML": "img/catalogo/crema-menta-750.jpg" },
    precios: {},
  },

  // --- Cremas de pisco ---
  {
    nombre: "Crema de Pisco Maracuyá",
    tipo: "Cremas de pisco",
    descripcion: "Crema de pisco D'Tulia con maracuyá.",
    liquido: "#e8b21c",
    fotos: { "500 ML": "img/catalogo/crema-pisco-maracuya.jpg" },
    precios: {},
  },
  {
    nombre: "Crema de Pisco Fresa",
    tipo: "Cremas de pisco",
    descripcion: "Crema de pisco D'Tulia con fresa.",
    liquido: "#e0362c",
    fotos: { "500 ML": "img/catalogo/crema-pisco-fresa.jpg" },
    precios: {},
  },
  {
    nombre: "Crema de Pisco Coco",
    tipo: "Cremas de pisco",
    descripcion: "Crema de pisco D'Tulia con coco.",
    liquido: "#e9dfbf",
    fotos: { "500 ML": "img/catalogo/crema-pisco-coco.jpg" },
    precios: {},
  },
  {
    nombre: "Crema de Pisco Algarrobina",
    tipo: "Cremas de pisco",
    descripcion: "Crema de pisco D'Tulia con algarrobina.",
    liquido: "#b07a1c",
    fotos: { "500 ML": "img/catalogo/crema-pisco-algarrobina.jpg" },
    precios: {},
  },
  {
    nombre: "Crema de Pisco Café",
    tipo: "Cremas de pisco",
    descripcion: "Crema de pisco D'Tulia con café.",
    liquido: "#9a6a1a",
    fotos: { "500 ML": "img/catalogo/crema-pisco-cafe.jpg" },
    precios: {},
  },

  // --- Macerados de pisco ---
  {
    nombre: "Macerado de Pisco Maracuyá",
    tipo: "Macerados de pisco",
    descripcion: "Pisco macerado con maracuyá.",
    liquido: "#d7b52a",
    fotos: { "500 ML": "img/catalogo/macerado-maracuya.jpg" },
    precios: {},
  },
  {
    nombre: "Macerado de Pisco Fresa",
    tipo: "Macerados de pisco",
    descripcion: "Pisco macerado con fresa.",
    liquido: "#b8243a",
    fotos: { "500 ML": "img/catalogo/macerado-fresa.jpg" },
    precios: {},
  },
  {
    nombre: "Macerado de Pisco Pasas",
    tipo: "Macerados de pisco",
    descripcion: "Pisco macerado con pasas.",
    liquido: "#a0741e",
    fotos: { "500 ML": "img/catalogo/macerado-pasas.jpg" },
    precios: {},
  },
  {
    nombre: "Macerado de Pisco Aguaymanto",
    tipo: "Macerados de pisco",
    descripcion: "Pisco macerado con aguaymanto.",
    liquido: "#e0a72a",
    fotos: { "500 ML": "img/catalogo/macerado-aguaymanto.jpg" },
    precios: {},
  },
];
