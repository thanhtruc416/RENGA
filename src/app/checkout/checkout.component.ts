(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     Countdown timer
  ───────────────────────────────────────────────── */
  var countdownEl = document.getElementById('countdown');
  var totalSeconds = 24 * 60 * 60 - 4; // 23:59:56

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function renderTime(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  if (countdownEl) {
    countdownEl.textContent = renderTime(totalSeconds);

    var timerInterval = setInterval(function () {
      totalSeconds -= 1;
      if (totalSeconds <= 0) {
        totalSeconds = 0;
        clearInterval(timerInterval);
      }
      countdownEl.textContent = renderTime(totalSeconds);
    }, 1000);
  }

  /* ─────────────────────────────────────────────────
     Payment method selection
  ───────────────────────────────────────────────── */
  var paymentOpts = document.querySelectorAll('.payment-opt');

  paymentOpts.forEach(function (opt) {
    var radio = opt.querySelector('.payment-opt__radio');
    var radioUi = opt.querySelector('.payment-opt__radio-ui');
    var radioImg = radioUi ? radioUi.querySelector('img') : null;

    opt.addEventListener('click', function () {
      /* Deactivate all */
      paymentOpts.forEach(function (o) {
        o.classList.remove('is-active');
        var ui = o.querySelector('.payment-opt__radio-ui');
        if (ui) {
          ui.classList.add('payment-opt__radio-ui--empty');
          ui.style.background = '';
          var img = ui.querySelector('img');
          if (img) img.style.display = 'none';
        }
        var r = o.querySelector('.payment-opt__radio');
        if (r) r.checked = false;
      });

      /* Activate this one */
      opt.classList.add('is-active');
      if (radio) radio.checked = true;
      if (radioUi) {
        radioUi.classList.remove('payment-opt__radio-ui--empty');
        radioUi.style.background = '#9a3f5c';
        if (radioImg) radioImg.style.display = '';
      }
    });

    /* Keyboard support */
    opt.setAttribute('tabindex', '0');
    opt.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        opt.click();
      }
    });
  });

  /* ─────────────────────────────────────────────────
     Voucher apply
  ───────────────────────────────────────────────── */
  var applyBtn = document.getElementById('apply-voucher');
  var voucherInput = document.getElementById('voucher-input');

  if (applyBtn && voucherInput) {
    applyBtn.addEventListener('click', function () {
      var code = voucherInput.value.trim().toUpperCase();
      if (!code) return;
      /* Placeholder — wire to real discount logic when backend is ready */
      console.log('Apply voucher:', code);
    });

    voucherInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') applyBtn.click();
    });
  }

  /* ─────────────────────────────────────────────────
     Province → district dependency (placeholder)
  ───────────────────────────────────────────────── */
  var provinceSelect = document.getElementById('province');
  var districtSelect = document.getElementById('district');

  var districtMap = {
    hcm: ['Quận 1', 'Quận 3', 'Bình Thạnh', 'Phú Nhuận', 'Tân Bình', 'Gò Vấp'],
    hn: ['Ba Đình', 'Hoàn Kiếm', 'Đống Đa', 'Cầu Giấy', 'Tây Hồ'],
    dn: ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu']
  };

  if (provinceSelect && districtSelect) {
    provinceSelect.addEventListener('change', function () {
      var districts = districtMap[provinceSelect.value] || [];

      districtSelect.innerHTML = '<option value="" disabled selected>Chọn Phường/Xã</option>';
      districts.forEach(function (d) {
        var opt = document.createElement('option');
        opt.value = d.toLowerCase().replace(/\s+/g, '-');
        opt.textContent = d;
        districtSelect.appendChild(opt);
      });
    });
  }

  /* ─────────────────────────────────────────────────
     Form submit
  ───────────────────────────────────────────────── */
  var form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      /* Demo: detect guest (no user session) by checking data-user attribute on <body> */
      var isGuest = !document.body.dataset.user;
      var variant = isGuest ? 'guest' : 'cus';
      /* Placeholder — replace 'success' with 'failure' based on real API response */
      if (typeof window.openPaymentModal === 'function') {
        window.openPaymentModal('success', variant);
      }
    });
  }

  /* ─────────────────────────────────────────────────
     Chat FAB
  ───────────────────────────────────────────────── */
  var chatFab = document.querySelector('.chat-fab');
  if (chatFab) {
    chatFab.addEventListener('click', function () {
      console.log('Open chat');
    });
  }

})();
