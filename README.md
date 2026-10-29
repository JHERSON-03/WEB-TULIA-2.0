# D'Tulia · Vinos de fruta

Página web de **D'Tulia**, una bodega de Trujillo (La Libertad, Perú) que elabora y embotella vinos de fruta: Rosé, Maracuyá, Durazno y Piña. Los pedidos se hacen por unidad o por caja directamente por WhatsApp.

## Secciones

- **Aviso de edad:** pregunta si el visitante es mayor de 18 años antes de mostrar el sitio.
- **Nosotros:** la historia de la bodega.
- **Productos:** el catálogo de vinos, con un filtro por tipo y las presentaciones disponibles.
- **Presentaciones:** Chata, 750 ml, 1 L, 2 L y 4 L, con cuántas unidades trae cada caja.
- **Personalizados:** vinos con etiqueta propia para eventos.
- **Cómo pedir:** el pedido por WhatsApp y los precios por caja para negocios.
- **Dónde estamos:** dirección, horario y mapa.
- **Preguntas frecuentes**

## Tecnologías

HTML, CSS y JavaScript puros. No usa frameworks ni dependencias, y no necesita compilarse.

## Estructura

```
├── index.html          Página principal
├── css/
│   └── estilos.css     Estilos del sitio
├── js/
│   ├── datos.js        Contacto, redes, presentaciones y catálogo de productos
│   ├── botellas.js     Ilustraciones SVG de las botellas (cuando un producto no tiene foto)
│   └── main.js         Lógica: aviso de edad, menú, catálogo y enlaces de WhatsApp
└── img/
    ├── logo.jpg
    ├── favicon.svg
    └── productos/      Fotos de las botellas
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
- **`PRODUCTOS`:** el catálogo. Para agregar un vino, copia un bloque existente y cambia sus valores. Si un precio no está definido, la página muestra "Consultar precio".

Las fotos de los productos van en `img/productos/`, con fondo blanco y encuadre vertical en proporción 2:5.
