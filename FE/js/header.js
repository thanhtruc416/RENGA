/* ===== HEADER: User menu dropdown ===== */
document.addEventListener('DOMContentLoaded', () => {
  function closeAllUserMenus() {
    document.querySelectorAll('.user-menu.is-open').forEach(m => {
      m.classList.remove('is-open');
      m.querySelector('.user-menu__trigger')?.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('.user-menu__trigger').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const menu = trigger.closest('.user-menu');
      const isOpen = menu.classList.contains('is-open');
      closeAllUserMenus();
      if (!isOpen) {
        menu.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', closeAllUserMenus);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllUserMenus();
  });
});
