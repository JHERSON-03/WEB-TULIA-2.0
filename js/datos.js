/*
 * D'Tulia · datos de la página
 *
 * Todo lo que cambia con frecuencia está aquí: contacto, redes y catálogo.
 * Para agregar un producto copia un bloque de PRODUCTOS y cambia sus valores.
 * Los productos de abajo son de EJEMPLO: reemplázalos por los reales.
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
 * imagen:   foto de la botella (fondo blanco, encuadre vertical 2:5, en img/productos)
 * liquido:  color de la bebida; se usa en la ilustración si el producto no tiene foto
 * tipo:     agrupa los filtros del catálogo (solo aparecen si hay más de un tipo)
 * precios:  opcional, por presentación. Si un precio falta, se muestra "Consultar precio"
 *           ejemplo → precios: { "750 ML": 18, "4 L": 70 }
 */
const PRODUCTOS = [
  {
    nombre: "Vino Rosé",
    corto: "Rosé",
    tipo: "Vinos",
    imagen: "img/productos/rose.jpg",
    descripcion: "Fresco, ligero y de color intenso. Se disfruta mejor bien helado.",
    notas: ["Dulce", "Refrescante"],
    liquido: "#d9364a",
    presentaciones: ["CHATA", "750 ML", "1 L", "2 L", "4 L"],
    precios: {},
  },
  {
    nombre: "Vino de Maracuyá",
    corto: "Maracuyá",
    tipo: "Vinos",
    imagen: "img/productos/maracuya.jpg",
    descripcion: "El sabor tropical de la maracuyá: dulce, con un toque ácido y muy aromático.",
    notas: ["Frutal", "Tropical"],
    liquido: "#e9a21f",
    presentaciones: ["CHATA", "750 ML", "1 L", "2 L", "4 L"],
    precios: {},
  },
  {
    nombre: "Vino de Durazno",
    corto: "Durazno",
    tipo: "Vinos",
    imagen: "img/productos/durazno.jpg",
    descripcion: "Suave y delicado, con todo el aroma del durazno maduro.",
    notas: ["Frutal", "Suave"],
    liquido: "#e8c46a",
    presentaciones: ["CHATA", "750 ML", "1 L", "2 L", "4 L"],
    precios: {},
  },
  {
    nombre: "Vino de Piña",
    corto: "Piña",
    tipo: "Vinos",
    imagen: "img/productos/pina.jpg",
    descripcion: "Dulce y vibrante, con el sabor fresco de la piña.",
    notas: ["Frutal", "Dulce"],
    liquido: "#f2c21b",
    presentaciones: ["CHATA", "750 ML", "1 L", "2 L", "4 L"],
    precios: {},
  },
];
