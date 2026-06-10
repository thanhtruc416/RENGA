(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     State
  ───────────────────────────────────────────────── */
  var activeTab = 'available';
  var isSelecting = false;

  /* ─────────────────────────────────────────────────
     DOM refs
  ───────────────────────────────────────────────── */
  var cartList      = document.getElementById('cart-list');
  var itemCount     = document.getElementById('item-count');
  var summaryAmt    = document.getElementById('summary-amount');
  var selectManyBtn = document.getElementById('select-many-btn');
  var addStudioBtn  = document.getElementById('add-studio-btn');

  /* ─────────────────────────────────────────────────
     Helpers
  ───────────────────────────────────────────────── */
  function getVisibleItems() {
    return Array.prototype.slice.call(
      cartList.querySelectorAll('.cart-item:not(.is-hidden)')
    );
  }

  function formatPrice(n) {
    return n.toLocaleString('vi-VN') + '₫';
  }

  function recalc() {
    var visible = getVisibleItems();
    var total = 0;
    visible.forEach(function (item) {
      var base = parseInt(item.dataset.price, 10) || 0;
      /* Studio items have no qty stepper — always qty 1 */
      var qtyEl = item.querySelector('.qty-stepper__value');
      var qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      total += base * qty;
    });
    if (itemCount) itemCount.textContent = visible.length;
    if (summaryAmt) summaryAmt.textContent = formatPrice(total);
  }

  /* ─────────────────────────────────────────────────
     Tab switching
  ───────────────────────────────────────────────── */
  var tabs = document.querySelectorAll('.cart-tab');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activeTab = tab.dataset.tab;

      tabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      var allItems = cartList.querySelectorAll('.cart-item');
      allItems.forEach(function (item) {
        if (item.dataset.type === activeTab) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });

      /* Show "+" button only on the studio tab */
      if (addStudioBtn) {
        addStudioBtn.classList.toggle('is-visible', activeTab === 'studio');
      }

      recalc();
    });
  });

  /* ─────────────────────────────────────────────────
     Qty steppers (available items only)
  ───────────────────────────────────────────────── */
  if (cartList) {
    cartList.addEventListener('click', function (e) {
      var btn = e.target.closest('.qty-stepper__btn');
      if (!btn) return;

      var stepper = btn.closest('.qty-stepper');
      var valueEl = stepper.querySelector('.qty-stepper__value');
      var qty = parseInt(valueEl.textContent, 10);

      if (btn.classList.contains('qty-stepper__btn--plus')) {
        qty = Math.min(qty + 1, 99);
      } else if (btn.classList.contains('qty-stepper__btn--minus')) {
        qty = Math.max(qty - 1, 1);
      }

      valueEl.textContent = qty;

      var cartItem = btn.closest('.cart-item');
      var base = parseInt(cartItem.dataset.price, 10) || 0;
      var priceEl = cartItem.querySelector('.cart-item__price');
      if (priceEl) priceEl.textContent = formatPrice(base * qty);

      recalc();
    });
  }

  /* ─────────────────────────────────────────────────
     Remove item
  ───────────────────────────────────────────────── */
  if (cartList) {
    cartList.addEventListener('click', function (e) {
      var removeBtn = e.target.closest('.cart-item__remove');
      if (!removeBtn) return;

      var item = removeBtn.closest('.cart-item');
      item.style.transition = 'opacity 0.2s';
      item.style.opacity = '0';
      setTimeout(function () {
        item.remove();
        recalc();
      }, 200);
    });
  }

  /* ─────────────────────────────────────────────────
     Multi-select mode
  ───────────────────────────────────────────────── */
  if (selectManyBtn) {
    selectManyBtn.addEventListener('click', function () {
      isSelecting = !isSelecting;
      cartList.classList.toggle('is-selecting', isSelecting);
      selectManyBtn.classList.toggle('is-active', isSelecting);

      if (!isSelecting) {
        cartList.querySelectorAll('.cart-item.is-selected').forEach(function (item) {
          item.classList.remove('is-selected');
        });
      }
    });
  }

  if (cartList) {
    cartList.addEventListener('click', function (e) {
      if (!isSelecting) return;
      if (e.target.closest('.cart-item__remove')) return;
      if (e.target.closest('.cart-item__continue-btn')) return;
      var item = e.target.closest('.cart-item');
      if (!item) return;
      item.classList.toggle('is-selected');
    });
  }

  /* ─────────────────────────────────────────────────
     Add studio design (placeholder)
  ───────────────────────────────────────────────── */
  if (addStudioBtn) {
    addStudioBtn.addEventListener('click', function () {
      window.location.href = '../studio/the-studio.html';
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
  recalc();

})();
