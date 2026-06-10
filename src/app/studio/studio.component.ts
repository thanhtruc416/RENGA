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
    materialLabel: 'Vàng 18K',
    materialPriceVnd: 15000000
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

    /* Sync step 4 engraving fee on enter */
    if (n === 4 && typeof updateEngrave === 'function') {
      updateEngrave();
    }

    /* Build order summary on step 5 */
    if (n === 5 && typeof buildOrderSummary === 'function') {
      buildOrderSummary();
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

      /* Update numeric material price */
      state.materialPriceVnd = parseInt(option.dataset.priceVnd, 10) || 15000000;
      PRICES.material = state.materialPriceVnd;

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
    mount:    4000000,
    material: state.materialPriceVnd  /* updated when user picks material in step 2 */
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
     Step 4 — Engraving customization
  ───────────────────────────────────────────────── */
  var engraveInput   = document.getElementById('engrave-input');
  var engraveCounter = document.getElementById('engrave-counter');
  var engraveFee     = document.getElementById('engrave-fee');
  var fontSelector   = document.getElementById('font-selector');
  var engraveGallery = document.getElementById('engrave-gallery');

  var engraveState = { text: '', font: 'serif-italic' };
  var FEE_PER_CHAR = 50000;

  function updateEngrave() {
    var len = engraveState.text.length;
    var extra = len > 10 ? len - 10 : 0;
    var fee = extra * FEE_PER_CHAR;
    if (engraveCounter) engraveCounter.textContent = len + ' / 25 KÝ TỰ';
    if (engraveFee) engraveFee.textContent = fee.toLocaleString('vi-VN') + ' VNĐ';
  }

  if (engraveInput) {
    engraveInput.addEventListener('input', function () {
      engraveState.text = engraveInput.value;
      updateEngrave();
    });
  }

  if (fontSelector) {
    fontSelector.addEventListener('click', function (e) {
      var btn = e.target.closest('.font-btn');
      if (!btn) return;
      fontSelector.querySelectorAll('.font-btn').forEach(function (b) {
        b.classList.remove('is-selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
      engraveState.font = btn.dataset.font;
    });
  }

  if (engraveGallery) {
    var mainImg = document.getElementById('engrave-main-img');
    engraveGallery.addEventListener('click', function (e) {
      var thumb = e.target.closest('.engrave-gallery__thumb');
      if (!thumb) return;
      engraveGallery.querySelectorAll('.engrave-gallery__thumb').forEach(function (t) {
        t.classList.remove('is-selected');
        t.setAttribute('aria-pressed', 'false');
      });
      thumb.classList.add('is-selected');
      thumb.setAttribute('aria-pressed', 'true');
      var thumbImg = thumb.querySelector('img');
      if (mainImg && thumbImg) {
        mainImg.src = thumbImg.src;
        mainImg.alt = thumbImg.alt;
      }
    });
  }

  /* ─────────────────────────────────────────────────
     Step 5 — Order summary
  ───────────────────────────────────────────────── */
  var CRAFT_FEE = 5000000;

  function formatVi(n) {
    return n.toLocaleString('vi-VN') + '₫';
  }

  function buildOrderSummary() {
    var items = [];

    /* Material */
    items.push({
      name: state.materialLabel + '\n(Heritage)',
      price: state.materialPriceVnd
    });

    /* Stone (skip if "none") */
    if (stoneState.stoneKey !== 'none') {
      var stonePrice = Math.round(stoneState.stonePricePerCarat * stoneState.carat);
      items.push({
        name: stoneState.stoneLabel + ' ' + stoneState.carat.toFixed(1) + 'ct',
        price: stonePrice
      });
    }

    /* Mount */
    items.push({
      name: 'Heritage Mount Phôi',
      price: PRICES.mount
    });

    /* Craft fee */
    items.push({
      name: 'Công chế tác thủ công',
      price: CRAFT_FEE
    });

    /* Engraving surcharge */
    var engraveLen = engraveState.text.length;
    var engravingSurcharge = engraveLen > 10 ? (engraveLen - 10) * FEE_PER_CHAR : 0;
    if (engravingSurcharge > 0) {
      items.push({
        name: 'Khắc chữ (' + engraveLen + ' ký tự)',
        price: engravingSurcharge
      });
    }

    /* Compute total */
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      total += items[i].price;
    }

    /* Render rows */
    var itemsEl = document.getElementById('order-items');
    if (itemsEl) {
      itemsEl.innerHTML = items.map(function (item) {
        var nameParts = item.name.split('\n');
        var nameHtml = nameParts.length > 1
          ? nameParts[0] + '<br><span style="font-size:14px">' + nameParts[1] + '</span>'
          : item.name;
        return '<div class="order-item">' +
          '<span class="order-item__name">' + nameHtml + '</span>' +
          '<span class="order-item__price">' + formatVi(item.price) + '</span>' +
          '</div>';
      }).join('');
    }

    /* Render total */
    var totalEl = document.getElementById('order-total');
    if (totalEl) totalEl.textContent = formatVi(total);

    /* Sync bottom price summary */
    updatePriceSummary(Math.round(total / 1000000) + ' triệu', 'Tổng giá trị');
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
