# D'Tulia · Vinos de fruta

Página web de **D'Tulia**, una bodega de Trujillo (La Libertad, Perú) que elabora y embotella vinos de fruta: Rosé, Maracuyá, Durazno y Piña. Los pedidos se hacen por unidad o por caja directamente por WhatsApp.

## Secciones

- **Aviso de edad:** pregunta si el visitante es mayor de 18 años antes de mostrar el sitio.
- **Nosotros:** la historia de la bodega.
- **Catálogo:** vinos, piscos, cremas y macerados de pisco, licores y jarabes, con filtros por categoría. Cada producto muestra la foto del tamaño elegido.
- **Presentaciones:** Chata, 750 ml, 1 L, 2 L y 4 L, con cuántas unidades trae cada caja.
- **Personalizados:** vinos con etiqueta propia para eventos.
- **Cómo pedir:** el pedido por WhatsApp y los precios por caja para negocios.
- **Dónde estamos:** dirección, horario y mapa.
- **Preguntas frecuentes**

## Tecnologías

HTML, CSS y JavaScript puros. No usa frameworks ni dependencias, y no necesita compilarse.

## Estructura

```
├── index.html          Página principal (con el carrusel del catálogo)
├── catalogo.html       Catálogo completo, con buscador y filtros
├── css/
│   └── estilos.css     Estilos del sitio
├── js/
│   ├── datos.js        Contacto, redes, presentaciones y catálogo de productos
│   ├── botellas.js     Ilustraciones SVG de las botellas (cuando un producto no tiene foto)
│   └── main.js         Lógica: aviso de edad, menú, catálogo y enlaces de WhatsApp
└── img/
    ├── logo.jpg
    ├── favicon.svg
    ├── catalogo/       Fotos del catálogo, una por producto y tamaño
    └── productos/      Fotos recortadas de la portada
```

## Cómo verlo en local

Puedes abrir `index.html` directamente en el navegador, o levantar un servidor local con Python:

```bash
python -m http.server 5500
```

Y después entrar a <http://localhost:5500>.

## Cómo editar el contenido

Casi todo lo que cambia con frecuencia está en [`js/datos.js`](js/datos.js), así que no hace falta tocar el HTML:

- **`NEGOCIO`:** número de WhatsApp (con código de país, sin `+` ni espacios), mensaje predeterminado, dirección, horario, búsqueda del mapa y redes sociales. Si dejas una red vacía (`""`), no aparece en la página.
- **`PRESENTACIONES`:** los tamaños de botella y cuántas unidades trae cada caja.
- **`PRODUCTOS`:** el catálogo. Para agregar un producto, copia un bloque existente y cambia sus valores:
  - `tipo` es la categoría; cada categoría distinta aparece como un botón de filtro.
  - `fotos` lleva una foto por tamaño, por ejemplo `{ "750 ML": "img/catalogo/x-750.jpg", "4 L": "img/catalogo/x-4l.jpg" }`. Si el producto no tiene tamaños, basta una sola ruta.
  - `precios` es opcional. Si un precio no está definido, la página muestra "Consultar precio".

Las fotos del catálogo van en `img/catalogo/`, en vertical y en proporción 2:3 (por ejemplo, 480 × 720 px).
