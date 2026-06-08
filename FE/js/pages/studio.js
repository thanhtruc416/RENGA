(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     State
  ───────────────────────────────────────────────── */
  var state = {
    currentStep: 1,
    selectedCategory: null,
    selectedMaterial: null,
    materialPrice: '15 triệu',
    materialLabel: 'Vàng 18K'
  };

  /* ─────────────────────────────────────────────────
     DOM references
  ───────────────────────────────────────────────── */
  var stepBubbles   = document.querySelectorAll('.step-progress__step');
  var stepPanels    = document.querySelectorAll('.studio-flow__step');
  var priceSummary  = document.getElementById('price-summary');
  var priceAmount   = document.getElementById('price-amount');
  var priceDetail   = document.getElementById('price-detail');
  var colorOverlay  = document.getElementById('color-overlay');

  /* ─────────────────────────────────────────────────
     Step engine
  ───────────────────────────────────────────────── */
  function goToStep(n) {
    state.currentStep = n;

    /* Update progress bubbles */
    stepBubbles.forEach(function (bubble, i) {
      bubble.classList.remove('is-active', 'is-done');
      if (i + 1 < n) bubble.classList.add('is-done');
      if (i + 1 === n) {
        bubble.classList.add('is-active');
        bubble.setAttribute('aria-current', 'step');
      } else {
        bubble.removeAttribute('aria-current');
      }
    });

    /* Show matching step panel */
    stepPanels.forEach(function (panel) {
      var panelStep = parseInt(panel.getAttribute('data-step'), 10);
      panel.classList.toggle('is-active', panelStep === n);
    });

    /* Price summary visible from step 2 onwards */
    if (priceSummary) {
      priceSummary.classList.toggle('is-visible', n >= 2);
    }

    /* Sync step 3 prices on enter */
    if (n === 3 && typeof recalcPrice === 'function') {
      recalcPrice();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ─────────────────────────────────────────────────
     Step 1 — product grid
  ───────────────────────────────────────────────── */
  var grid = document.getElementById('studio-grid');

  if (grid) {
    /* CHỌN button → advance to step 2 */
    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('.studio-card__btn');
      if (!btn) return;

      var card = btn.closest('.studio-card');
      state.selectedCategory = btn.dataset.category;

      grid.querySelectorAll('.studio-card').forEach(function (c) {
        c.classList.remove('is-selected');
      });
      card.classList.add('is-selected');

      goToStep(2);
    });

    /* Wishlist toggle */
    grid.addEventListener('click', function (e) {
      var wishBtn = e.target.closest('.studio-card__wishlist');
      if (!wishBtn) return;
      e.stopPropagation();
      wishBtn.classList.toggle('is-active');
      var img = wishBtn.querySelector('img');
      if (img) {
        img.style.filter = wishBtn.classList.contains('is-active')
          ? 'invert(40%) sepia(80%) saturate(500%) hue-rotate(300deg)'
          : '';
      }
    });
  }

  /* ─────────────────────────────────────────────────
     Step 2 — material selection
  ───────────────────────────────────────────────── */
  var materialList = document.querySelector('.studio-options__list');

  if (materialList) {
    materialList.addEventListener('click', function (e) {
      var option = e.target.closest('.material-option');
      if (!option) return;

      /* Deselect all, select clicked */
      materialList.querySelectorAll('.material-option').forEach(function (o) {
        o.classList.remove('is-selected');
      });
      option.classList.add('is-selected');

      /* Read data */
      state.selectedMaterial = option.dataset.material;
      state.materialLabel    = option.dataset.label;
      state.materialPrice    = option.dataset.price.replace(' VNĐ', '');

      /* Update color overlay */
      var color = option.dataset.color;
      if (colorOverlay) {
        colorOverlay.style.background = color;
      }

      /* Update price summary */
      updatePriceSummary(state.materialPrice, state.materialLabel);
    });
  }

  function updatePriceSummary(price, label) {
    if (priceAmount) priceAmount.textContent = price;
    if (priceDetail) priceDetail.textContent = label;
  }

  /* ─────────────────────────────────────────────────
     Navigation buttons (Trước đó / Tiếp theo)
  ───────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var navBtn = e.target.closest('[data-target-step]');
    if (!navBtn) return;
    var target = parseInt(navBtn.getAttribute('data-target-step'), 10);
    goToStep(target);
  });

  /* Step bubble click */
  stepBubbles.forEach(function (bubble) {
    bubble.addEventListener('click', function () {
      var idx = parseInt(bubble.getAttribute('data-step-index'), 10);
      goToStep(idx + 1);
    });
    bubble.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var idx = parseInt(bubble.getAttribute('data-step-index'), 10);
        goToStep(idx + 1);
      }
    });
  });

  /* ─────────────────────────────────────────────────
     Step 3 — Gemstone customization
  ───────────────────────────────────────────────── */
  var PRICES = {
    mount:    4000000,   /* Heritage Mount Phôi */
    material: 8000000    /* 18K White Gold (from step 2) */
  };

  var stoneState = {
    stoneKey:   'diamond',
    stoneLabel: 'Kim cương',
    stonePricePerCarat: 10000000,
    carat: 1.0
  };

  var stoneSelector  = document.getElementById('stone-selector');
  var caratInput     = document.getElementById('carat-input');
  var stoneLabel     = document.getElementById('stone-label');
  var caratLabel     = document.getElementById('carat-label');
  var priceStoneLbl  = document.getElementById('price-stone-label');
  var priceStone     = document.getElementById('price-stone');
  var priceTotal     = document.getElementById('price-total');

  function formatVND(n) {
    return n.toLocaleString('vi-VN').replace(/\./g, '.') + '';
  }

  function recalcPrice() {
    var stonePrice = Math.round(stoneState.stonePricePerCarat * stoneState.carat);
    var total = PRICES.mount + PRICES.material + stonePrice;

    if (stoneLabel)    stoneLabel.textContent    = stoneState.stoneLabel;
    if (caratLabel)    caratLabel.textContent    = stoneState.carat.toFixed(1) + ' Carat';
    if (priceStoneLbl) priceStoneLbl.textContent =
      (stoneState.stoneKey === 'none')
        ? 'Không đá'
        : stoneState.stoneLabel + ' (' + stoneState.carat.toFixed(1) + 'ct)';
    if (priceStone)    priceStone.textContent    = stonePrice.toLocaleString('vi-VN');
    if (priceTotal)    priceTotal.textContent    = total.toLocaleString('vi-VN') + ' VNĐ';

    /* Sync bottom price summary */
    var displayTotal = Math.round(total / 1000000);
    updatePriceSummary(displayTotal + ' triệu', stoneState.stoneLabel);
  }

  if (stoneSelector) {
    stoneSelector.addEventListener('click', function (e) {
      var opt = e.target.closest('.stone-option');
      if (!opt) return;

      stoneSelector.querySelectorAll('.stone-option').forEach(function (o) {
        o.classList.remove('is-selected');
        o.setAttribute('aria-pressed', 'false');
      });
      opt.classList.add('is-selected');
      opt.setAttribute('aria-pressed', 'true');

      stoneState.stoneKey   = opt.dataset.stone;
      stoneState.stoneLabel = opt.dataset.stoneLabel;
      stoneState.stonePricePerCarat = parseInt(opt.dataset.stonePrice, 10);

      recalcPrice();
    });
  }

  if (caratInput) {
    caratInput.addEventListener('input', function () {
      stoneState.carat = parseFloat(caratInput.value);
      recalcPrice();
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

  /* ─────────────────────────────────────────────────
     Init
  ───────────────────────────────────────────────── */
  goToStep(1);

})();
