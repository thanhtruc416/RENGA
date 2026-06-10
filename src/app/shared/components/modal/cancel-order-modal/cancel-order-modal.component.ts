(function () {
  'use strict';

  var backdrop = document.getElementById('order-modal-backdrop');
  var activeModal = null;

  function openOrderModal(id) {
    var modal = document.getElementById(id);
    if (!modal || !backdrop) return;
    if (activeModal) activeModal.classList.remove('is-active');
    modal.classList.add('is-active');
    backdrop.classList.add('is-open');
    activeModal = modal;
    document.body.style.overflow = 'hidden';
  }

  function closeOrderModal() {
    if (activeModal) {
      activeModal.classList.remove('is-active');
      activeModal = null;
    }
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* Backdrop click */
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeOrderModal();
    });
  }

  /* Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOrderModal();
  });

  /* Close buttons inside modals */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-order-modal]')) closeOrderModal();
  });

  /* Warranty tabs */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.warranty-tab');
    if (!tab) return;
    var tabs = tab.closest('.warranty-tabs');
    if (!tabs) return;
    tabs.querySelectorAll('.warranty-tab').forEach(function (t) {
      t.classList.remove('is-active');
    });
    tab.classList.add('is-active');
    /* Show matching tab panel */
    var panel = tab.dataset.tab;
    var container = tab.closest('.order-modal--warranty');
    if (!container) return;
    container.querySelectorAll('.warranty-panel').forEach(function (p) {
      p.hidden = p.dataset.panel !== panel;
    });
  });

  /* Cancel reason: "other" textarea toggle */
  document.addEventListener('change', function (e) {
    var checkbox = e.target.closest('input[type="checkbox"][value="other"]');
    if (!checkbox) return;
    var modal = checkbox.closest('.order-modal--cancel, .order-modal--cancel-bespoke');
    if (!modal) return;
    var otherField = modal.querySelector('.cancel-reasons__other');
    if (otherField) {
      otherField.hidden = !checkbox.checked;
      if (checkbox.checked) otherField.focus();
    }
  });

  /* Cancel form submit guard — prevent double submit */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('.cancel-modal__form, .cancel-bespoke__form');
    if (!form) return;
    var btn = form.querySelector('[type="submit"]');
    if (btn) btn.disabled = true;
  });

  window.openOrderModal = openOrderModal;
  window.closeOrderModal = closeOrderModal;

})();
