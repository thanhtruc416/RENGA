/* ===== CATEGORY PAGE JS ===== */

// Wishlist toggle
document.querySelectorAll('.product-card__wishlist').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.classList.toggle('is-active');
  });
});

// Load more button (simulated)
const loadMoreBtn = document.getElementById('loadMoreBtn');
const productGrid = document.getElementById('productGrid');
let shown = 8;
const total = 50;

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    shown = Math.min(shown + 8, total);

    // Update count text
    const countEl = loadMoreBtn.previousElementSibling.previousElementSibling;
    if (countEl) countEl.textContent = `Hiển thị ${shown} trên ${total} sản phẩm`;

    // Update progress bar ratio
    const bar = loadMoreBtn.previousElementSibling;
    if (bar && bar.classList.contains('load-more__bar')) {
      bar.style.setProperty('--progress', `${(shown / total) * 100}%`);
    }

    if (shown >= total) loadMoreBtn.style.display = 'none';
  });
}
