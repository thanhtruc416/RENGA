(function () {
  'use strict';

  /* ── Payment method selection ────────────────────── */
  document.querySelectorAll('.stu-pay-method').forEach(function (method) {
    method.addEventListener('click', function () {
      document.querySelectorAll('.stu-pay-method').forEach(function (m) {
        m.classList.remove('is-selected');
      });
      this.classList.add('is-selected');
    });
  });

  /* ── Address select button ───────────────────────── */
  var addrBtn = document.querySelector('.stu-section-label__action');
  if (addrBtn) {
    addrBtn.addEventListener('click', function () {
      /* Placeholder — wire to saved addresses modal */
      console.log('Open address picker');
    });
  }

  /* ── Form validation & submit ────────────────────── */
  var payBtn = document.querySelector('.stu-summary__pay-btn');
  if (payBtn) {
    payBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var name = document.getElementById('stu-name');
      var phone = document.getElementById('stu-phone');

      if (name && !name.value.trim()) {
        name.focus();
        return;
      }
      if (phone && !phone.value.trim()) {
        phone.focus();
        return;
      }

      var selectedMethod = document.querySelector('.stu-pay-method.is-selected');
      if (!selectedMethod) {
        alert('Vui lòng chọn phương thức thanh toán.');
        return;
      }

      payBtn.disabled = true;
      console.log('Process payment');
    });
  }

  /* ── Voucher apply ───────────────────────────────── */
  var voucherBtn = document.querySelector('.stu-summary__voucher-btn');
  if (voucherBtn) {
    voucherBtn.addEventListener('click', function () {
      var input = document.querySelector('.stu-summary__voucher-input');
      if (input && input.value.trim()) {
        console.log('Apply voucher:', input.value.trim());
      }
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
