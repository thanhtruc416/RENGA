/* ===== PRODUCT DETAIL PAGE JS ===== */

// ── Image Gallery ──────────────────────────────────
const thumbs = document.querySelectorAll('.product-gallery__thumb');
const mainImg = document.getElementById('mainProductImg');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbs.forEach(t => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
    if (mainImg && thumb.dataset.full) {
      mainImg.src = thumb.dataset.full;
      mainImg.alt = thumb.alt;
    }
  });
});

// ── Size Selector ──────────────────────────────────
document.querySelectorAll('.size-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-option').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});

// ── FAQ Accordion ──────────────────────────────────
document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Wishlist Toggle ────────────────────────────────
document.querySelectorAll('.product-card__wishlist').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.classList.toggle('is-active');
  });
});

// ── Q&A Send ──────────────────────────────────────
const qaInput = document.querySelector('.qa-input-row input');
const qaSendBtn = document.querySelector('.qa-send-btn');
const qaThread = document.querySelector('.qa-thread');

if (qaSendBtn && qaInput && qaThread) {
  qaSendBtn.addEventListener('click', () => {
    const text = qaInput.value.trim();
    if (!text) return;

    const comment = document.createElement('div');
    comment.className = 'qa-comment';
    comment.innerHTML = `
      <div class="qa-comment__avatar-circle">B</div>
      <div class="qa-comment__body">
        <div class="qa-comment__meta">
          <span class="qa-comment__name">Bạn</span>
          <span class="qa-comment__time">Vừa xong</span>
        </div>
        <p class="qa-comment__text">${text}</p>
        <div class="qa-comment__actions">
          <button class="qa-comment__action" type="button">Phản hồi</button>
        </div>
      </div>
    `;
    qaThread.prepend(comment);
    qaInput.value = '';
  });
}
