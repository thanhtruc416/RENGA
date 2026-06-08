/* ===== HOMEPAGE JS ===== */

// Wishlist toggle
document.querySelectorAll('.product-card__wishlist').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.classList.toggle('is-active');
  });
});

// Best sellers carousel (simple show/hide pages)
const track = document.querySelector('.best-sellers__track');
const nextBtn = document.querySelector('.carousel-arrow--next');
const prevBtn = document.querySelector('.carousel-arrow--prev');

if (track && nextBtn) {
  const cards = Array.from(track.children);
  let page = 0;
  const perPage = 4;
  const totalPages = Math.ceil(cards.length / perPage);

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.style.display = (i >= page * perPage && i < (page + 1) * perPage) ? '' : 'none';
    });
    if (prevBtn) prevBtn.style.display = page === 0 ? 'none' : 'flex';
    nextBtn.style.display = page >= totalPages - 1 ? 'none' : 'flex';
  }

  nextBtn.addEventListener('click', () => {
    if (page < totalPages - 1) { page++; updateCarousel(); }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (page > 0) { page--; updateCarousel(); }
    });
  }

  updateCarousel();
}
