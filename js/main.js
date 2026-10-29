/* D'Tulia · comportamiento de la página (sirve a index.html y a catalogo.html) */

const CLAVE_EDAD = "dtulia-mayor-de-edad";
const SIN_MOVIMIENTO = matchMedia("(prefers-reduced-motion: reduce)").matches;

function enlaceWhatsapp(mensaje = NEGOCIO.mensajeGeneral) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

function mensajeProducto(producto, presentacion) {
  const pedido = presentacion ? `${producto.nombre.toUpperCase()} · ${presentacion}` : producto.nombre.toUpperCase();
  return `Hola D'Tulia, quiero pedir: ${pedido}. ¿Me confirman precio y disponibilidad?`;
}

function formatearPrecio(monto) {
  return "S/ " + monto.toFixed(2);
}

function datosPresentacion(nombre) {
  return PRESENTACIONES.find((p) => p.nombre === nombre);
}

/** "250 ML" → "250 ml"; las presentaciones del inventario usan su propia etiqueta. */
function etiquetaPresentacion(nombre) {
  return datosPresentacion(nombre)?.etiqueta ?? nombre.replace(" ML", " ml");
}

/** Las presentaciones son las llaves de `fotos`; una foto suelta significa que no hay tamaños. */
function presentacionesDe(producto) {
  if (typeof producto.fotos === "string") return [];
  return producto.fotos ? Object.keys(producto.fotos) : producto.presentaciones;
}

function fotoDe(producto, presentacion) {
  if (typeof producto.fotos === "string") return producto.fotos;
  return producto.fotos?.[presentacion] ?? producto.imagen;
}

/** Texto oscuro u claro según qué tan luminoso es el color de fondo. */
function textoSobre(hex) {
  const v = parseInt(hex.slice(1), 16);
  const [r, g, b] = [v >> 16, (v >> 8) & 255, v & 255];
  return (0.299 * r + 0.587 * g + 0.114 * b) > 165 ? "#2b0a10" : "#ffffff";
}

/** Sin tildes ni mayúsculas, para que "rose" encuentre "Rosé". */
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
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

/* --- Cabecera, progreso de lectura y giro del sello (todo atado al scroll) --- */
function iniciarCabecera() {
  const cabecera = document.getElementById("cabecera");
  const boton = document.getElementById("menu-boton");
  const menu = document.getElementById("menu");
  const progreso = document.querySelector(".progreso-lectura");
  const sello = document.querySelector(".sello");

  let pendiente = false;
  const alDesplazar = () => {
    pendiente = false;
    const y = window.scrollY;
    cabecera.classList.toggle("cabecera--solida", y > 20);
    const recorrido = document.documentElement.scrollHeight - window.innerHeight;
    progreso?.style.setProperty("--avance", recorrido > 0 ? (y / recorrido).toFixed(4) : "0");
    if (sello && !SIN_MOVIMIENTO) sello.style.setProperty("--giro", (y * 0.12).toFixed(1));
  };
  // Un solo cálculo por cuadro, aunque el navegador dispare muchos eventos de scroll
  const pedirCuadro = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(alDesplazar);
  };
  alDesplazar();
  window.addEventListener("scroll", pedirCuadro, { passive: true });
  window.addEventListener("resize", pedirCuadro);

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

/* --- Portada: cifras que cuentan y botellas que se apartan del mouse --- */
function iniciarPortada() {
  const vitrina = document.querySelector(".portada__vitrina");
  if (!vitrina || SIN_MOVIMIENTO) return;

  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    // Van en sentido contrario al cursor: -1 cuando el mouse está a la derecha o abajo
    vitrina.addEventListener("pointermove", (evento) => {
      const caja = vitrina.getBoundingClientRect();
      vitrina.style.setProperty("--px", (1 - ((evento.clientX - caja.left) / caja.width) * 2).toFixed(3));
      vitrina.style.setProperty("--py", (1 - ((evento.clientY - caja.top) / caja.height) * 2).toFixed(3));
    });
    vitrina.addEventListener("pointerleave", () => {
      vitrina.style.setProperty("--px", "0");
      vitrina.style.setProperty("--py", "0");
    });
  }

  const contar = () => {
    // Arranca cuando las cifras empiezan a aparecer
    const inicio = performance.now() + 450;
    document.querySelectorAll("[data-contar]").forEach((cifra) => {
      const meta = Number(cifra.dataset.contar);
      cifra.textContent = "0";
      const paso = (ahora) => {
        const avance = Math.min(Math.max((ahora - inicio) / 1100, 0), 1);
        cifra.textContent = Math.round(meta * (1 - (1 - avance) ** 3));
        if (avance < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    });
  };
  // Con el aviso de edad abierto, la portada espera a que se confirme
  if (document.body.classList.contains("sin-scroll")) {
    document.getElementById("edad-si").addEventListener("click", contar, { once: true });
  } else {
    contar();
  }
}

/* --- Tarjeta de producto --- */
function crearTarjeta(producto, indice) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta revelar revelar--tarjeta";
  tarjeta.dataset.tipo = producto.tipo;
  // El color del sabor tiñe la tarjeta, la insignia y el formato elegido
  tarjeta.style.setProperty("--acento", producto.liquido);
  tarjeta.style.setProperty("--sobre-acento", textoSobre(producto.liquido));

  const presentaciones = presentacionesDe(producto);
  // Empieza en la clásica de 750 ml si existe
  const inicial = presentaciones.includes("750 ML") ? "750 ML" : presentaciones[0] ?? "";
  const foto = fotoDe(producto, inicial);
  // Con un solo tamaño no hay nada que elegir: se muestra como dato
  const formatos = presentaciones.length > 1
    ? `<p class="tarjeta__rotulo" id="formato-${indice}">Seleccionar formato</p>
      <div class="tarjeta__tamanos" role="radiogroup" aria-labelledby="formato-${indice}">
        ${presentaciones.map((p) => `<button type="button" role="radio" data-presentacion="${p}">${etiquetaPresentacion(p)}</button>`).join("")}
      </div>`
    : presentaciones.length === 1
      ? `<p class="tarjeta__rotulo">Presentación</p>
      <div class="tarjeta__tamanos"><span class="tarjeta__unica">${etiquetaPresentacion(presentaciones[0])}</span></div>`
      : "";

  tarjeta.innerHTML = `
    <div class="tarjeta__escena${foto ? " tarjeta__escena--foto" : ""}">
      ${producto.notas?.length ? `<span class="tarjeta__perfil">${producto.notas.join(" & ")}</span>` : ""}
      ${foto
        ? `<img class="tarjeta__foto" src="${foto}" alt="${producto.nombre}" loading="lazy" width="480" height="720" draggable="false">`
        : `<div class="tarjeta__botella"></div>`}
    </div>
    <div class="tarjeta__cuerpo">
      <h3>${producto.nombre}</h3>
      <p class="tarjeta__descripcion">${producto.descripcion}</p>
      ${formatos}
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
  const marco = tarjeta.querySelector(".tarjeta__escena--foto");
  const imagen = tarjeta.querySelector(".tarjeta__foto");
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
    if (imagen) {
      const nueva = fotoDe(producto, presentacion);
      if (animar && !imagen.src.endsWith(nueva)) {
        marco.classList.add("tarjeta__escena--cambiando");
        setTimeout(() => { imagen.src = nueva; }, 160);
      }
      imagen.alt = presentacion ? `${producto.nombre}, ${etiquetaPresentacion(presentacion)}` : producto.nombre;
    }
    if (escena) {
      const pintar = () => {
        escena.innerHTML = crearBotella({ forma: presentacion, liquido: producto.liquido, etiqueta: producto.corto ?? producto.nombre });
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
    const porCaja = datosPresentacion(presentacion)?.porCaja;
    caja.textContent = porCaja ? `Unidad o caja de ${porCaja}` : "Por unidad o por caja";
    pedir.href = enlaceWhatsapp(mensajeProducto(producto, presentacion));
    pedir.setAttribute("aria-label", `Pedir ${[producto.nombre, presentacion].filter(Boolean).join(" ")} por WhatsApp`);
  };

  if (imagen) {
    // El fondo desenfocado usa la misma foto, y solo se pide cuando la foto ya cargó
    imagen.addEventListener("load", () => {
      marco.style.setProperty("--foto", `url("${imagen.currentSrc || imagen.src}")`);
      marco.classList.remove("tarjeta__escena--cambiando");
    });
    imagen.addEventListener("error", () => marco.classList.remove("tarjeta__escena--cambiando"));
  }

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

  elegir(inicial, false);
  return tarjeta;
}

/*
 * --- Carrusel de la portada ---
 * El deslizamiento es el scroll nativo de la pista (con el dedo funciona solo);
 * aquí se suman el arrastre con mouse, las flechas, la barra de avance y el auto-play.
 */
function crearCarrusel(pista) {
  const seccion = pista.closest(".contenedor");
  const avance = seccion.querySelector(".carrusel__avance");
  const [anterior, siguiente] = seccion.querySelectorAll(".carrusel__flecha");
  const zonas = [pista.parentElement, seccion.querySelector(".carrusel__controles")];
  const comportamiento = SIN_MOVIMIENTO ? "auto" : "smooth";

  const anchoPaso = () => {
    const tarjeta = pista.querySelector(".tarjeta:not([hidden])");
    return tarjeta ? tarjeta.offsetWidth + parseFloat(getComputedStyle(pista).columnGap) : pista.clientWidth;
  };
  const alInicio = () => pista.scrollLeft <= 4;
  const alFinal = () => pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 4;

  const actualizar = () => {
    const fraccion = pista.scrollWidth > 0 ? Math.min(pista.clientWidth / pista.scrollWidth, 1) : 1;
    avance.style.setProperty("--ancho-avance", `${fraccion * 100}%`);
    avance.style.setProperty("--paso-avance", `${(pista.scrollLeft / pista.clientWidth) * 100}%`);
    anterior.disabled = alInicio();
    siguiente.disabled = alFinal();
  };

  // Al llegar al final, el auto-play vuelve al principio
  const mover = (direccion, volverAlInicio = false) => {
    if (direccion > 0 && alFinal()) {
      if (volverAlInicio) pista.scrollTo({ left: 0, behavior: comportamiento });
      return;
    }
    pista.scrollBy({ left: direccion * anchoPaso(), behavior: comportamiento });
  };

  // Auto-play: avanza cada 3.5 s salvo con el mouse encima, el foco dentro,
  // fuera de pantalla o durante unos segundos después de que el usuario interactúe
  let encima = false;
  let enPantalla = false;
  let esperarHasta = 0;
  const interaccion = () => { esperarHasta = performance.now() + 6000; };
  if (!SIN_MOVIMIENTO) {
    setInterval(() => {
      if (encima || !enPantalla || document.hidden || performance.now() < esperarHasta) return;
      mover(1, true);
    }, 3500);
  }
  zonas.forEach((zona) => {
    zona.addEventListener("mouseenter", () => { encima = true; });
    zona.addEventListener("mouseleave", () => { encima = false; });
    zona.addEventListener("focusin", () => { encima = true; });
    zona.addEventListener("focusout", () => { encima = false; });
  });
  new IntersectionObserver(([entrada]) => { enPantalla = entrada.isIntersecting; }, { threshold: 0.3 }).observe(pista);
  ["pointerdown", "touchstart", "wheel", "keydown"].forEach((tipo) => pista.addEventListener(tipo, interaccion, { passive: true }));

  [anterior, siguiente].forEach((flecha) => flecha.addEventListener("click", () => {
    interaccion();
    mover(Number(flecha.dataset.direccion));
  }));

  // Arrastrar con el mouse (con el dedo ya lo hace el scroll nativo)
  let arrastre = null;
  pista.addEventListener("dragstart", (evento) => evento.preventDefault());
  pista.addEventListener("pointerdown", (evento) => {
    if (evento.pointerType !== "mouse" || evento.button !== 0) return;
    arrastre = { x: evento.clientX, inicio: pista.scrollLeft, movido: false };
  });
  window.addEventListener("pointermove", (evento) => {
    if (!arrastre) return;
    const dx = evento.clientX - arrastre.x;
    if (!arrastre.movido && Math.abs(dx) > 5) {
      arrastre.movido = true;
      pista.classList.add("catalogo--arrastrando");
    }
    if (arrastre.movido) pista.scrollLeft = arrastre.inicio - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!arrastre) return;
    const movido = arrastre.movido;
    arrastre = null;
    if (!movido) return;
    pista.classList.remove("catalogo--arrastrando");
    // Al soltar se acomoda en la tarjeta más cercana, y el clic del final no cuenta
    const paso = anchoPaso();
    pista.scrollTo({ left: Math.round(pista.scrollLeft / paso) * paso, behavior: comportamiento });
    const anular = (evento) => { evento.preventDefault(); evento.stopPropagation(); };
    pista.addEventListener("click", anular, { capture: true, once: true });
    setTimeout(() => pista.removeEventListener("click", anular, { capture: true }), 0);
  });

  let pendiente = false;
  pista.addEventListener("scroll", () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; actualizar(); });
  }, { passive: true });
  window.addEventListener("resize", actualizar);

  return {
    reiniciar() {
      pista.scrollTo({ left: 0, behavior: "auto" });
      actualizar();
    },
  };
}

/* --- Catálogo: carrusel en la portada, cuadrícula con buscador en catalogo.html --- */
function iniciarCatalogo() {
  const catalogo = document.getElementById("catalogo");
  if (!catalogo) return;
  const filtros = document.getElementById("filtros");
  const buscador = document.getElementById("buscador");
  const contador = document.getElementById("contador");
  const vacio = document.getElementById("sin-resultados");
  const irCatalogo = document.getElementById("ir-catalogo");
  const carrusel = catalogo.classList.contains("catalogo--carrusel") ? crearCarrusel(catalogo) : null;

  const tarjetas = PRODUCTOS.map((producto, indice) => {
    const tarjeta = crearTarjeta(producto, indice);
    tarjeta.dataset.busqueda = normalizar(`${producto.nombre} ${producto.tipo}`);
    catalogo.appendChild(tarjeta);
    return tarjeta;
  });

  // La categoría puede llegar en la dirección: catalogo.html?categoria=Piscos
  const tipos = ["Todos", ...new Set(PRODUCTOS.map((p) => p.tipo))];
  const pedida = new URLSearchParams(location.search).get("categoria");
  let tipo = tipos.includes(pedida) ? pedida : "Todos";
  let texto = "";

  filtros.innerHTML = `<span class="filtros__indicador" aria-hidden="true"></span>` + tipos.map((t) =>
    `<button type="button" role="tab" aria-selected="${t === tipo}" data-tipo="${t}">${t}</button>`).join("");
  const indicador = filtros.querySelector(".filtros__indicador");
  const moverIndicador = () => {
    const activo = filtros.querySelector('[aria-selected="true"]');
    indicador.style.width = `${activo.offsetWidth}px`;
    indicador.style.height = `${activo.offsetHeight}px`;
    indicador.style.transform = `translate3d(${activo.offsetLeft}px, ${activo.offsetTop}px, 0)`;
    filtros.classList.add("filtros--medidos");
  };
  moverIndicador();
  document.fonts?.ready.then(moverIndicador);
  window.addEventListener("resize", moverIndicador);

  const mostrar = (animar) => {
    let visibles = 0;
    tarjetas.forEach((tarjeta) => {
      const ver = (tipo === "Todos" || tarjeta.dataset.tipo === tipo) && (!texto || tarjeta.dataset.busqueda.includes(texto));
      tarjeta.hidden = !ver;
      tarjeta.classList.remove("tarjeta--entrando");
      if (!ver) return;
      if (animar && !SIN_MOVIMIENTO) {
        // La entrada propia reemplaza a la del scroll
        terminarRevelado(tarjeta);
        tarjeta.style.setProperty("--orden", Math.min(visibles, 8));
        void tarjeta.offsetWidth; // reinicia la animación si ya la tenía
        tarjeta.classList.add("tarjeta--entrando");
      }
      visibles++;
    });
    if (contador) contador.innerHTML = `Mostrando <strong>${visibles}</strong> ${visibles === 1 ? "producto" : "productos"}`;
    if (vacio) vacio.hidden = visibles > 0;
    if (irCatalogo) irCatalogo.href = tipo === "Todos" ? "catalogo.html" : `catalogo.html?categoria=${encodeURIComponent(tipo)}`;
    carrusel?.reiniciar();
  };

  // Al cambiar de categoría las tarjetas salen y vuelven a entrar
  const cambiar = () => {
    if (SIN_MOVIMIENTO) return mostrar(false);
    catalogo.classList.add("catalogo--saliendo");
    setTimeout(() => {
      catalogo.classList.remove("catalogo--saliendo");
      mostrar(true);
    }, 250);
  };

  filtros.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button");
    if (!boton || boton.dataset.tipo === tipo) return;
    tipo = boton.dataset.tipo;
    filtros.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b === boton)));
    moverIndicador();
    // En celular la fila de categorías se desliza: lleva la elegida a la vista
    if (filtros.scrollWidth > filtros.clientWidth) {
      filtros.scrollTo({ left: boton.offsetLeft - (filtros.clientWidth - boton.offsetWidth) / 2, behavior: SIN_MOVIMIENTO ? "auto" : "smooth" });
    }
    if (buscador) {
      const url = new URL(location.href);
      if (tipo === "Todos") url.searchParams.delete("categoria");
      else url.searchParams.set("categoria", tipo);
      history.replaceState(null, "", url);
    }
    cambiar();
  });

  buscador?.addEventListener("input", () => {
    texto = normalizar(buscador.value.trim());
    mostrar(true);
  });
  document.getElementById("limpiar-busqueda")?.addEventListener("click", () => {
    buscador.value = "";
    texto = "";
    tipo = "Todos";
    filtros.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tipo === "Todos")));
    moverIndicador();
    mostrar(true);
    buscador.focus();
  });

  mostrar(false);
}

function iniciarPresentaciones() {
  const lista = document.getElementById("presentaciones");
  if (!lista) return;
  lista.innerHTML = PRESENTACIONES.map((p) => `
    <li class="presentacion revelar revelar--tarjeta">
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

  // Cada página tiene solo algunos de estos datos
  const poner = (id, valor) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = valor;
  };
  poner("dato-whatsapp", NEGOCIO.whatsapp.replace(/^51(\d{3})(\d{3})(\d{3})$/, "+51 $1 $2 $3"));
  poner("dato-direccion", NEGOCIO.direccion);
  poner("dato-horario", NEGOCIO.horario);
  poner("anio", new Date().getFullYear());
  const mapa = document.getElementById("mapa");
  if (mapa) mapa.src = `https://maps.google.com/maps?q=${encodeURIComponent(NEGOCIO.mapa)}&z=13&output=embed`;

  const iconos = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok" };
  document.getElementById("redes").innerHTML = Object.entries(NEGOCIO.redes).filter(([, url]) => url).map(([red, url]) =>
    `<a href="${url}" target="_blank" rel="noopener" aria-label="${iconos[red]}"><svg aria-hidden="true"><use href="#i-${red}"/></svg></a>`).join("");
}

/* --- Aparición al hacer scroll --- */

/** Quita las clases de aparición: el elemento vuelve a sus propias transiciones (hover, etc.). */
function terminarRevelado(elemento) {
  elemento.classList.remove("revelar", "revelar--visible", "revelar--tarjeta", "revelar--imagen");
  elemento.style.removeProperty("--retraso");
}

function iniciarRevelado() {
  const elementos = document.querySelectorAll(".revelar");
  if (SIN_MOVIMIENTO || !("IntersectionObserver" in window)) {
    elementos.forEach(terminarRevelado);
    return;
  }
  const observador = new IntersectionObserver((entradas) => {
    // Las tarjetas que entran juntas aparecen en cascada, 120 ms una tras otra,
    // en orden de lectura (de arriba abajo y de izquierda a derecha)
    let orden = 0;
    entradas
      .filter((entrada) => entrada.isIntersecting)
      .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left))
      .forEach(({ target }) => {
        observador.unobserve(target);
        if (!target.classList.contains("revelar")) return;
        const retraso = target.classList.contains("revelar--tarjeta") ? orden++ * 120 : 0;
        target.style.setProperty("--retraso", `${retraso}ms`);
        target.classList.add("revelar--visible");
        setTimeout(() => terminarRevelado(target), retraso + 1900);
      });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  elementos.forEach((elemento) => observador.observe(elemento));
}

iniciarAvisoEdad();
iniciarCabecera();
iniciarPortada();
iniciarCatalogo();
iniciarPresentaciones();
iniciarContacto();
iniciarRevelado();
