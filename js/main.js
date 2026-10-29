/* D'Tulia · comportamiento de la página */

const CLAVE_EDAD = "dtulia-mayor-de-edad";

function enlaceWhatsapp(mensaje = NEGOCIO.mensajeGeneral) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

function mensajeProducto(producto, presentacion) {
  return `Hola D'Tulia, quiero pedir: ${producto.nombre.toUpperCase()} · ${presentacion}. ¿Me confirman precio y disponibilidad?`;
}

function formatearPrecio(monto) {
  return "S/ " + monto.toFixed(2);
}

function datosPresentacion(nombre) {
  return PRESENTACIONES.find((p) => p.nombre === nombre);
}

/** Texto oscuro u claro según qué tan luminoso es el color de fondo. */
function textoSobre(hex) {
  const v = parseInt(hex.slice(1), 16);
  const [r, g, b] = [v >> 16, (v >> 8) & 255, v & 255];
  return (0.299 * r + 0.587 * g + 0.114 * b) > 165 ? "#2b0a10" : "#ffffff";
}

/* --- Aviso de mayoría de edad --- */
function iniciarAvisoEdad() {
  const aviso = document.getElementById("aviso-edad");
  let confirmado = false;
  try {
    confirmado = localStorage.getItem(CLAVE_EDAD) === "si";
  } catch { /* almacenamiento bloqueado: se vuelve a preguntar */ }
  if (confirmado) return;

  aviso.hidden = false;
  document.body.classList.add("sin-scroll");
  document.getElementById("edad-si").focus();

  document.getElementById("edad-si").addEventListener("click", () => {
    try { localStorage.setItem(CLAVE_EDAD, "si"); } catch { /* sin almacenamiento */ }
    aviso.classList.add("aviso-edad--saliendo");
    document.body.classList.remove("sin-scroll");
    setTimeout(() => { aviso.hidden = true; }, 400);
  });
  document.getElementById("edad-no").addEventListener("click", () => {
    document.getElementById("edad-rechazo").hidden = false;
  });
}

/* --- Cabecera y menú móvil --- */
function iniciarCabecera() {
  const cabecera = document.getElementById("cabecera");
  const boton = document.getElementById("menu-boton");
  const menu = document.getElementById("menu");

  const alDesplazar = () => cabecera.classList.toggle("cabecera--solida", window.scrollY > 20);
  alDesplazar();
  window.addEventListener("scroll", alDesplazar, { passive: true });

  const cerrarMenu = () => {
    cabecera.classList.remove("cabecera--abierta");
    boton.setAttribute("aria-expanded", "false");
  };
  boton.addEventListener("click", () => {
    const abierto = cabecera.classList.toggle("cabecera--abierta");
    boton.setAttribute("aria-expanded", String(abierto));
  });
  menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) cerrarMenu();
  });
}

/* --- Catálogo --- */
function crearTarjeta(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta revelar";
  tarjeta.dataset.tipo = producto.tipo;
  // El color del sabor tiñe la tarjeta, la insignia y el formato elegido
  tarjeta.style.setProperty("--acento", producto.liquido);
  tarjeta.style.setProperty("--sobre-acento", textoSobre(producto.liquido));

  tarjeta.innerHTML = `
    <div class="tarjeta__escena">
      <span class="tarjeta__perfil">${producto.notas.join(" & ")}</span>
      ${producto.imagen
        ? `<img class="tarjeta__foto" src="${producto.imagen}" alt="Botella de ${producto.nombre} D'Tulia" loading="lazy" width="480" height="1200">`
        : `<div class="tarjeta__botella"></div>`}
    </div>
    <div class="tarjeta__cuerpo">
      <h3>${producto.nombre}</h3>
      <p class="tarjeta__descripcion">${producto.descripcion}</p>
      <p class="tarjeta__rotulo" id="formato-${producto.corto}">Seleccionar formato</p>
      <div class="tarjeta__tamanos" role="radiogroup" aria-labelledby="formato-${producto.corto}">
        ${producto.presentaciones.map((p) => `<button type="button" role="radio" data-presentacion="${p}">${datosPresentacion(p).etiqueta}</button>`).join("")}
      </div>
      <div class="tarjeta__pie">
        <p class="tarjeta__caja"></p>
        <p class="tarjeta__precio"></p>
      </div>
      <a class="boton boton--ancho" target="_blank" rel="noopener">
        <svg class="icono" aria-hidden="true"><use href="#i-whatsapp"/></svg>
        Pedir por WhatsApp
      </a>
    </div>`;

  const escena = tarjeta.querySelector(".tarjeta__botella");
  const precio = tarjeta.querySelector(".tarjeta__precio");
  const caja = tarjeta.querySelector(".tarjeta__caja");
  const pedir = tarjeta.querySelector(".boton");
  const botones = tarjeta.querySelectorAll("[data-presentacion]");

  const elegir = (presentacion, animar) => {
    botones.forEach((b) => {
      const activo = b.dataset.presentacion === presentacion;
      b.setAttribute("aria-checked", String(activo));
      b.tabIndex = activo ? 0 : -1;
    });
    // Sin foto, la ilustración cambia de forma según la presentación
    if (escena) {
      const pintar = () => {
        escena.innerHTML = crearBotella({ forma: presentacion, liquido: producto.liquido, etiqueta: producto.corto });
        escena.classList.remove("tarjeta__botella--cambiando");
      };
      if (animar) {
        escena.classList.add("tarjeta__botella--cambiando");
        setTimeout(pintar, 160);
      } else {
        pintar();
      }
    }
    const monto = producto.precios?.[presentacion];
    precio.textContent = monto ? formatearPrecio(monto) : "Consultar precio";
    precio.classList.toggle("tarjeta__precio--consultar", !monto);
    caja.textContent = `Unidad o caja de ${datosPresentacion(presentacion).porCaja}`;
    pedir.href = enlaceWhatsapp(mensajeProducto(producto, presentacion));
    pedir.setAttribute("aria-label", `Pedir ${producto.nombre} ${presentacion} por WhatsApp`);
  };

  botones.forEach((boton, indice) => {
    boton.addEventListener("click", () => elegir(boton.dataset.presentacion, true));
    // Flechas para moverse entre presentaciones, como en un grupo de radios
    boton.addEventListener("keydown", (evento) => {
      const paso = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[evento.key];
      if (!paso) return;
      evento.preventDefault();
      const siguiente = botones[(indice + paso + botones.length) % botones.length];
      siguiente.focus();
      elegir(siguiente.dataset.presentacion, true);
    });
  });

  // Empieza en la clásica de 750 ml si existe
  const inicial = producto.presentaciones.includes("750 ML") ? "750 ML" : producto.presentaciones[0];
  elegir(inicial, false);
  return tarjeta;
}

function iniciarCatalogo() {
  const catalogo = document.getElementById("catalogo");
  const filtros = document.getElementById("filtros");
  const tipos = ["Todos", ...new Set(PRODUCTOS.map((p) => p.tipo))];

  PRODUCTOS.forEach((producto) => catalogo.appendChild(crearTarjeta(producto)));
  // Con un solo tipo de producto los filtros no aportan nada
  if (tipos.length <= 2) {
    filtros.hidden = true;
    return;
  }

  filtros.innerHTML = tipos.map((tipo, i) =>
    `<button type="button" role="tab" aria-selected="${i === 0}" data-tipo="${tipo}">${tipo}</button>`).join("");

  filtros.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button");
    if (!boton) return;
    filtros.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b === boton)));
    catalogo.querySelectorAll(".tarjeta").forEach((tarjeta) => {
      tarjeta.hidden = boton.dataset.tipo !== "Todos" && tarjeta.dataset.tipo !== boton.dataset.tipo;
    });
  });
}

function iniciarPresentaciones() {
  const lista = document.getElementById("presentaciones");
  lista.innerHTML = PRESENTACIONES.map((p) => `
    <li class="presentacion revelar">
      <div class="presentacion__botella">${crearSilueta(p.nombre)}</div>
      <span class="presentacion__uso">${p.uso}</span>
      <h3>${p.titulo}</h3>
      <p class="presentacion__caja">${p.porCaja} unds. por caja</p>
      <p class="presentacion__ocasion">${p.ocasion}</p>
    </li>`).join("");
}

/* --- Datos de contacto --- */
function iniciarContacto() {
  document.querySelectorAll("[data-whatsapp]").forEach((enlace) => {
    enlace.href = enlaceWhatsapp(enlace.dataset.mensaje);
    enlace.target = "_blank";
    enlace.rel = "noopener";
  });

  const numero = NEGOCIO.whatsapp.replace(/^51(\d{3})(\d{3})(\d{3})$/, "+51 $1 $2 $3");
  document.getElementById("dato-whatsapp").textContent = numero;
  document.getElementById("dato-direccion").textContent = NEGOCIO.direccion;
  document.getElementById("dato-horario").textContent = NEGOCIO.horario;
  document.getElementById("mapa").src =
    `https://maps.google.com/maps?q=${encodeURIComponent(NEGOCIO.mapa)}&z=13&output=embed`;
  document.getElementById("anio").textContent = new Date().getFullYear();

  const iconos = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok" };
  document.getElementById("redes").innerHTML = Object.entries(NEGOCIO.redes).filter(([, url]) => url).map(([red, url]) =>
    `<a href="${url}" target="_blank" rel="noopener" aria-label="${iconos[red]}"><svg aria-hidden="true"><use href="#i-${red}"/></svg></a>`).join("");
}

/* --- Aparición al hacer scroll --- */
function iniciarRevelado() {
  const elementos = document.querySelectorAll(".revelar");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("revelar--visible"));
    return;
  }
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("revelar--visible");
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  elementos.forEach((el) => observador.observe(el));
}

iniciarAvisoEdad();
iniciarCabecera();
iniciarCatalogo();
iniciarPresentaciones();
iniciarContacto();
iniciarRevelado();
