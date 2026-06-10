(function () {
  'use strict';

  var backdrop = document.getElementById('modal-backdrop');
  var timerInterval = null;
  var timerSeconds = 0;

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function tickTimer() {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      document.querySelectorAll('.js-hold-timer').forEach(function (el) {
        el.textContent = '00:00';
      });
      return;
    }
    timerSeconds -= 1;
    var m = Math.floor(timerSeconds / 60);
    var s = timerSeconds % 60;
    var display = pad(m) + ':' + pad(s);
    document.querySelectorAll('.js-hold-timer').forEach(function (el) {
      el.textContent = display;
    });
  }

  function startTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerSeconds = 59 * 60 + 58;
    timerInterval = setInterval(tickTimer, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  /* ── Public API ──────────────────────────────────── */

  /**
   * @param {'success'|'failure'} type
   * @param {'cus'|'guest'} variant
   */
  window.openPaymentModal = function (type, variant) {
    if (!backdrop) return;

    /* Hide all modals */
    document.querySelectorAll('.payment-modal').forEach(function (m) {
      m.classList.remove('is-active');
    });

    var id = 'modal-' + type + '-' + (variant || 'cus');
    var modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add('is-active');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (type === 'failure') {
      startTimer();
    }
  };

  window.closePaymentModal = function () {
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    stopTimer();
  };

  /* ── Close on backdrop click ─────────────────────── */
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        window.closePaymentModal();
      }
    });
  }

  /* ── Keyboard: Escape to close ───────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop && backdrop.classList.contains('is-open')) {
      window.closePaymentModal();
    }
  });

  /* ── Wire up action buttons inside modals ────────── */
  document.addEventListener('DOMContentLoaded', function () {
    /* "Thử lại" — hide modal so user can re-submit the checkout form */
    document.querySelectorAll('.js-retry-payment').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.closePaymentModal();
      });
    });
  });

})();
