function updateScrollButtons(card) {
  const gallery = card.querySelector('.gallery');
  const prevBtn = card.querySelector('.scroll-btn.prev');
  const nextBtn = card.querySelector('.scroll-btn.next');

  const scrollLeft = Math.ceil(gallery.scrollLeft);
  const scrollMax = Math.ceil(gallery.scrollWidth - gallery.clientWidth);

  const tolerance = 15;

  prevBtn.disabled = scrollLeft <= tolerance;
  nextBtn.disabled = scrollLeft >= scrollMax - tolerance;
}

function scrollGallery(card, direction) {
  const gallery = card.querySelector('.gallery');
  const item = gallery.querySelector('.gallery-item');
  const gap = parseInt(getComputedStyle(gallery).gap) || 20;
  const itemWidth = item.offsetWidth + gap;

  gallery.scrollBy({
    left: direction * itemWidth,
    behavior: 'smooth'
  });

  setTimeout(() => updateScrollButtons(card), 400);
}

window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const gallery = card.querySelector('.gallery');
    const prevBtn = card.querySelector('.scroll-btn.prev');
    const nextBtn = card.querySelector('.scroll-btn.next');

    // Inicializar botones
    updateScrollButtons(card);

    // Scroll dinámico
    gallery.addEventListener('scroll', () => updateScrollButtons(card));

    // Botones
    prevBtn.addEventListener('click', () => scrollGallery(card, -1));
    nextBtn.addEventListener('click', () => scrollGallery(card, 1));
  });
});
