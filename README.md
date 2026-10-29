# D'Tulia · Vinos, piscos y licores

Sitio web de **D'Tulia**, una bodega de Trujillo (La Libertad, Perú). Muestra el catálogo completo de vinos, piscos, cremas y macerados de pisco, licores y jarabes para cócteles. Los pedidos se hacen por unidad o por caja directamente por WhatsApp: cada producto arma el mensaje con el nombre y el tamaño elegidos.

## Páginas

### Página principal (`index.html`)

- **Aviso de edad:** pregunta si el visitante es mayor de 18 años antes de mostrar el sitio, y recuerda la respuesta.
- **Portada:** entra completa en la primera pantalla, con el título, los botones de pedido, las cifras del negocio y la vitrina de botellas.
- **Nosotros:** cómo se elaboran, embotellan y despachan los productos.
- **Catálogo:** un carrusel de una fila con todos los productos y filtros por categoría. El botón "Ir al catálogo" abre la página completa en la categoría elegida.
- **Presentaciones:** los tamaños de botella y cuántas unidades trae cada caja.
- **Personalizados:** vinos con etiqueta propia para eventos.
- **Cómo pedir:** los pasos del pedido por WhatsApp y los precios por caja para negocios.
- **Dónde estamos:** dirección, horario y mapa.
- **Preguntas frecuentes**

### Catálogo completo (`catalogo.html`)

- **Buscador en tiempo real:** ignora tildes y mayúsculas, así que "rose" encuentra "Rosé".
- **Contador de resultados** y mensaje cuando no hay coincidencias.
- **Filtros por categoría,** que también se pueden abrir desde un enlace, por ejemplo `catalogo.html?categoria=Piscos`.
- **Cuadrícula de 4 columnas** en computadora, 2 en tablet y 1 en celular.

## Catálogo

37 productos en 9 categorías:

| Categoría | Productos |
|---|---|
| Vinos | Maracuyá, Durazno, Tinto La Reserva, Arándano, Higo, Misa, Perfecto Amor, Rosé, Borgoña, Cavasutra, Purito, Torres y Pack Purito |
| Piscos | Quebranta, Acholado, Mosto Verde y Pancha Paula |
| Cremas de pisco | Maracuyá, Fresa, Coco, Algarrobina y Café |
| Macerados de pisco | Maracuyá, Fresa, Pasas y Aguaymanto |
| Jarabes | Granadina, Blue Curaçao, Goma y Crema de Menta |
| Ron, Coñac, Anisado y Fernet | Uno por categoría |

Cada tarjeta muestra la foto del tamaño elegido, de 250 ml a 4 L. Si un producto no tiene precio definido, la tarjeta muestra "Consultar precio".

## Experiencia y animaciones

- **Portada:** el título emerge de una máscara y pasa de borroso a nítido. Las botellas levitan y se mueven al lado contrario del mouse, el sello entra con un rebote y gira al hacer scroll, y las cifras cuentan desde 0.
- **Scroll:**
  - Una barra de progreso de lectura recorre el borde superior.
  - La cabecera se vuelve de cristal al bajar.
  - Los títulos pasan de borrosos a nítidos.
  - Las tarjetas aparecen en cascada.
  - Las fotos se descubren al entrar en pantalla.
- **Carrusel:**
  - Avanza solo cada 3.5 segundos y se pausa con el mouse encima o cuando el usuario interactúa.
  - Se puede arrastrar con el mouse o deslizar con el dedo.
  - Tiene flechas y una barra de avance.
- **Tarjetas:** al pasar el mouse se elevan, el borde brilla en dorado, la botella se acerca y un destello cruza la foto.
- **Accesibilidad:** si el sistema tiene activada la opción de reducir el movimiento, la página se muestra quieta y completa desde el inicio.

## Tecnologías

HTML, CSS y JavaScript puros. No usa frameworks ni dependencias, y no necesita compilarse.

## Estructura

```
├── index.html          Página principal
├── catalogo.html       Catálogo completo, con buscador y filtros
├── css/
│   └── estilos.css     Estilos y animaciones de las dos páginas
├── js/
│   ├── datos.js        Contacto, redes, presentaciones y productos
│   ├── botellas.js     Ilustraciones SVG de botellas (para productos sin foto)
│   └── main.js         Aviso de edad, cabecera, portada, catálogo, carrusel y animaciones
└── img/
    ├── logo.jpg
    ├── favicon.svg
    ├── catalogo/       Fotos del catálogo, una por producto y tamaño
    └── productos/      Fotos recortadas de la portada
```

## Cómo verlo en local

Levanta un servidor local con Python desde la carpeta del proyecto:

```bash
python -m http.server 5500
```

Entra a <http://localhost:5500>. El servidor funciona mientras la terminal siga abierta, y se detiene con `Ctrl + C`.

## Cómo editar el contenido

Casi todo lo que cambia con frecuencia está en [`js/datos.js`](js/datos.js), así que no hace falta tocar el HTML:

- **`NEGOCIO`:** número de WhatsApp (con código de país, sin `+` ni espacios), mensaje predeterminado, dirección, horario, búsqueda del mapa y redes sociales. Si dejas una red vacía (`""`), no aparece en la página.
- **`PRESENTACIONES`:** los tamaños de botella y cuántas unidades trae cada caja.
- **`PRODUCTOS`:** el catálogo. Para agregar un producto, copia un bloque existente y cambia sus valores:
  - `tipo` es la categoría. Cada categoría distinta aparece como un filtro, en el orden de la lista.
  - `fotos` lleva una foto por tamaño, por ejemplo `{ "750 ML": "img/catalogo/x-750.jpg", "4 L": "img/catalogo/x-4l.jpg" }`. Si el producto no tiene tamaños, basta una sola ruta.
  - `notas` es opcional y se muestra como insignia sobre la foto.
  - `precios` es opcional, por ejemplo `{ "750 ML": 18, "4 L": 70 }`.

El carrusel, la página del catálogo, el buscador y el contador se actualizan solos con lo que haya en `PRODUCTOS`. Lo único fijo en el HTML son las cifras de la portada ("+35 productos" y "7 formatos"): si cambias el catálogo, revísalas en `index.html`.

Las fotos del catálogo van en `img/catalogo/`, en vertical y en proporción 2:3 (por ejemplo, 480 × 720 px).

### Cabecera y pie de página

`index.html` y `catalogo.html` tienen cada una su propia copia de la cabecera, el pie de página, el aviso de edad y los íconos. Si cambias alguna de esas partes, hazlo en las dos páginas.
