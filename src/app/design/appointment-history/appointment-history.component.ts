(function () {
  'use strict';

  /* ── Tabs ────────────────────────────────────────── */
  var tabs = document.querySelectorAll('.appt-tab');
  var panels = document.querySelectorAll('.appt-tab-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.dataset.tab;

      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      this.classList.add('is-active');

      panels.forEach(function (p) {
        p.hidden = p.dataset.tabPanel !== target;
      });
    });
  });

  /* ── Modals ──────────────────────────────────────── */
  var rescheduleBackdrop = document.getElementById('ltv-reschedule-backdrop');
  var cancelBackdrop = document.getElementById('ltv-cancel-backdrop');

  function openModal(backdrop) {
    if (!backdrop) return;
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(backdrop) {
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* Open reschedule modal */
  document.querySelectorAll('[data-action="open-reschedule"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(rescheduleBackdrop);
    });
  });

  /* Open cancel modal */
  document.querySelectorAll('[data-action="open-cancel"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(cancelBackdrop);
    });
  });

  /* Close on backdrop click */
  [rescheduleBackdrop, cancelBackdrop].forEach(function (backdrop) {
    if (!backdrop) return;
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  /* Close buttons inside modals */
  document.querySelectorAll('[data-action="close-modal"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = this.closest('.ltv-modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  /* Confirm reschedule */
  var rescheduleConfirmBtn = document.getElementById('ltv-confirm-reschedule');
  if (rescheduleConfirmBtn) {
    rescheduleConfirmBtn.addEventListener('click', function () {
      console.log('Reschedule confirmed');
      closeModal(rescheduleBackdrop);
    });
  }

  /* Confirm cancel */
  var cancelConfirmBtn = document.getElementById('ltv-confirm-cancel');
  if (cancelConfirmBtn) {
    cancelConfirmBtn.addEventListener('click', function () {
      var checked = document.querySelectorAll('.ltv-cancel-modal input[type="checkbox"]:checked');
      if (checked.length === 0) {
        alert('Vui lòng chọn lý do hủy lịch.');
        return;
      }
      console.log('Cancellation confirmed');
      closeModal(cancelBackdrop);
    });
  }

  /* Cancel hero button triggers cancel modal */
  var heroCancelBtn = document.querySelector('.appt-hero__cancel-btn');
  if (heroCancelBtn) {
    heroCancelBtn.addEventListener('click', function () {
      openModal(cancelBackdrop);
    });
  }

  /* ── Chat FAB ────────────────────────────────────── */
  var chatFab = document.querySelector('.chat-fab');
  if (chatFab) {
    chatFab.addEventListener('click', function () {
      console.log('Open chat');
    });
  }

})();
