/* =========================
   0) Utilidades y constantes
   ========================= */
const MESES_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const toMesLegible = (ym) => { const [y, m] = ym.split('-').map(Number); return `${MESES_ES[m - 1]} ${y}`; };

/* Año en el footer */
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

/* =========================
   1) DATASET DE FOTOS
   ========================= */
const FOTOS = [
  { month: '2025-08', src: 'images/agosto_of_relator.jpg', alt: 'Portada mes de agosto', caption: '' },
  { month: '2025-08', src: 'images/agosto_01.jpg', alt: 'Momento cívico agosto', caption: 'Momento cívico por conmemorarse el CCXVI aniversario del primer grito de la independencia' },
  { month: '2025-08', src: 'images/agosto_02.jpg', alt: 'Momento cívico agosto', caption: 'Personal de Docentes, Servidores Públicos y administrativos entonando las Sagradas notas de nuestro himno Nacional de la República del Ecuador' },
  { month: '2025-08', src: 'images/agosto_03.jpg', alt: 'Taller Convivencia Digital Segura', caption: 'La Lic. Iralda Acosta dirigiendo el Taller de Prevención de Violencia “Convivencia Digital Segura” 💻🔒 para estudiantes de Nivelación de la UFA ESPE SD' },
  { month: '2025-08', src: 'images/agosto_04.jpg', alt: 'Taller Convivencia Digital Segura', caption: 'Participación de estudiantes y docentes en el taller de Convivencia Digital Segura “Convivencia Digital Segura” 💻🔒 para estudiantes de Nivelación de la UFA ESPE SD' },
  { month: '2025-08', src: 'images/agosto_05.jpg', alt: 'VIII Feria de Emprendedores ESPE', caption: 'Estudiantes de la carrera de ITIN en la VIII Feria de Emprendedores ESPE — Ideas que inspiran realizada en las instalaciones de nuestra sede' },
  { month: '2025-08', src: 'images/agosto_06.jpg', alt: 'VIII Feria de Emprendedores ESPE', caption: 'Estudiantes de la carrera de Agropecuaria en la VIII Feria de Emprendedores ESPE — Ideas que inspiran realizada en las instalaciones de nuestra sede' },
  { month: '2025-08', src: 'images/agosto_07.jpg', alt: 'VIII Feria de Emprendedores ESPE', caption: 'Estudiantes de la carrera de Biotecnología en la VIII Feria de Emprendedores ESPE — Ideas que inspiran realizada en las instalaciones de nuestra sede' },
  { month: '2025-08', src: 'images/agosto_08.jpg', alt: 'Pósters científicos — Congreso', caption: 'Presentación de pósters científicos en el XX Congreso Internacional de Ciencia y Tecnología (ESPE Matriz)' },
  { month: '2025-08', src: 'images/agosto_09.jpg', alt: 'Pósters científicos — Congreso', caption: 'Estudiantes de la carera de ITIN junto al Mgs. Paulo Galarza docente de la sede, en el XX Congreso Internacional (ESPE Matriz)' },
  { month: '2025-08', src: 'images/agosto_10.jpg', alt: 'Defensa de tesis', caption: 'Defensa de Tesis de las Ing. Castellano Beltran Mishell y Carvajal Araujo Kiara con el tema "DESARROLLO DE UN RECORRIDO VIRTUAL INTERACTIVO PARA LA UNIVERSIDAD DE LAS FUERZAS ARMADAS ESPE SEDE SANTO DOMINGO, FASE 2 Y TOMAS AÉREAS"' },
  { month: '2025-08', src: 'images/agosto_11.jpg', alt: 'Defensa de tesis', caption: 'Defensa de tesis de los Ing. Azua Cedeño Kevin y Guanin Acosta Jean Pierre con el tema "DESARROLLO E IMPLEMENTACIÓN DE UN SISTEMA MÓVIL Y WEB PARA LA GESTIÓN Y ADOPCIÓN DE MASCOTAS EN EL CLUB ESPETS"' },
  { month: '2025-08', src: 'images/agosto_12.jpg', alt: 'Defensa de tesis', caption: 'Colocación de la estola, birrete y toga a los estudiantes de la Espe Sede Santo Domingo que culminaron su trabajo de titulación' },
  { month: '2025-08', src: 'images/agosto_13.jpg', alt: 'Defensa de tesis', caption: 'Colocación de la estola, birrete y toga a los estudiantes de la Espe Sede Santo Domingo que culminaron su trabajo de titulación' },
];

/* =========================
   2) Construcción del menú de meses
   ========================= */
const mesesMenu = document.getElementById('mesesMenu');
const mesesUnicos = [...new Set(FOTOS.map(f => f.month))].sort().reverse();

// Opción "Todas"
const liTodos = document.createElement('li');
liTodos.innerHTML = `<a class="dropdown-item" href="#" data-month="all"><i class="bi bi-images me-2"></i>Todas las fotografías</a>`;
mesesMenu.appendChild(liTodos);

// Resto de meses
mesesUnicos.forEach(m => {
  const li = document.createElement('li');
  li.innerHTML = `<a class="dropdown-item" href="#" data-month="${m}"><i class="bi bi-calendar3 me-2"></i>${toMesLegible(m)}</a>`;
  mesesMenu.appendChild(li);
});

/* =========================
   3) Construcción de slides
   ========================= */
const wrapper = document.getElementById('swiperWrapper');

function buildSlides(fotos) {
  wrapper.innerHTML = '';
  fotos.forEach(f => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="img-wrap">
        <img src="${f.src}" alt="${f.alt}">
      </div>
      <div class="caption-date">
        <span class="badge">${toMesLegible(f.month)}</span>
      </div>
      <div class="caption-text">
        <span>${f.caption || ''}</span>
      </div>
    `;
    wrapper.appendChild(slide);
  });

  // Ajuste de fit según aspecto y tamaño de pantalla
  ajustarFitImagenes();
}
// Por defecto: todas las fotos
buildSlides(FOTOS);

/* =========================
   3.1) Detección del aspecto y ajuste de fit en móviles
   ========================= */
function ajustarFitImagenes() {
  const isPhone = window.matchMedia('(max-width: 576px)').matches;
  const imgs = document.querySelectorAll('#swiperWrapper img');

  imgs.forEach(img => {
    img.classList.remove('fit-contain', 'fit-width'); // limpiar

    if (!isPhone) return; // desktop: dejamos object-fit: cover

    const evaluar = () => {
      const w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) return;
      const ratio = w / h;

      // Retrato pronunciado -> mostrar completa (contain)
      if (ratio < 0.8) img.classList.add('fit-contain');

      // Panorámica extrema -> también contain en móviles (opcional)
      if (ratio > 2.2) img.classList.add('fit-width');
    };

    if (img.complete) evaluar();
    else img.addEventListener('load', evaluar, { once: true });
  });
}

/* =========================
   4) Inicialización del Swiper (carrusel)
   ========================= */
let swiper = new Swiper('#galeriaSwiper', {
  loop: true,
  speed: 1000,
  effect: 'slide',
  autoplay: { delay: 12000, disableOnInteraction: false },
  keyboard: { enabled: true },
  grabCursor: true,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

/* =========================
   5) Filtro por mes (reconstruye slides y reinicia Swiper)
   ========================= */
mesesMenu.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-month]');
  if (!link) return;
  e.preventDefault();

  const month = link.getAttribute('data-month');
  const dropdownToggle = document.getElementById('mesesDropdown');

  if (month === 'all') {
    dropdownToggle.textContent = 'Seleccionar mes';
    buildSlides(FOTOS);
  } else {
    dropdownToggle.textContent = toMesLegible(month);
    buildSlides(FOTOS.filter(f => f.month === month));
  }

  // Reiniciar Swiper tras reconstruir
  swiper.destroy(true, true);
  swiper = new Swiper('#galeriaSwiper', {
    loop: true,
    speed: 1000,
    effect: 'slide',
    autoplay: { delay: 5000, disableOnInteraction: false },
    keyboard: { enabled: true },
    grabCursor: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });

  // re‑evaluar el fit en el nuevo set
  ajustarFitImagenes();
});

/* =========================
   6) Fix animación/stacking context
   ========================= */
document.querySelectorAll('.drop-in').forEach(el => {
  el.addEventListener('animationend', () => { el.style.transform = 'none'; });
});

/* =========================
   7) Recalcular carrusel y fit en resize/orientation
   ========================= */
const refreshSwiper = () => {
  if (!swiper) return;
  swiper.updateAutoHeight?.();
  swiper.update?.();
  ajustarFitImagenes();
};

window.addEventListener('resize', () => {
  clearTimeout(window.__rsz_t);
  window.__rsz_t = setTimeout(refreshSwiper, 150);
});
window.addEventListener('orientationchange', () => {
  setTimeout(refreshSwiper, 250);
});