(function () {
  'use strict';

  /* ── Filters apply button ────────────────────────── */
  var applyBtn = document.querySelector('.order-list-filters__apply');
  if (applyBtn) {
    applyBtn.addEventListener('click', function () {
      var selects = document.querySelectorAll('.order-list-filter__select');
      var params = {};
      selects.forEach(function (sel) {
        if (sel.name && sel.value) params[sel.name] = sel.value;
      });
      /* Placeholder — replace with real filter/API call */
      console.log('Apply filters:', params);
    });
  }

  /* ── Pagination ──────────────────────────────────── */
  var paginationWrap = document.querySelector('.order-list-pagination__pages');
  if (paginationWrap) {
    var pageButtons = paginationWrap.querySelectorAll('.order-list-pagination__btn[data-page]');
    var prevBtn = paginationWrap.querySelector('.order-list-pagination__btn--prev');
    var nextBtn = paginationWrap.querySelector('.order-list-pagination__btn--next');

    var currentPage = 1;
    var totalPages = pageButtons.length;

    function getActivePage() {
      for (var i = 0; i < pageButtons.length; i++) {
        if (pageButtons[i].classList.contains('is-active')) {
          return parseInt(pageButtons[i].dataset.page, 10);
        }
      }
      return 1;
    }

    function goToPage(page) {
      if (page < 1 || page > totalPages) return;
      currentPage = page;
      pageButtons.forEach(function (btn) {
        var p = parseInt(btn.dataset.page, 10);
        btn.classList.toggle('is-active', p === currentPage);
      });
      if (prevBtn) prevBtn.disabled = currentPage <= 1;
      if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
      /* Placeholder — load page data */
      console.log('Go to page:', currentPage);
    }

    pageButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToPage(parseInt(btn.dataset.page, 10));
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToPage(currentPage - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToPage(currentPage + 1);
      });
    }

    /* Init */
    currentPage = getActivePage();
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = totalPages <= 1 || currentPage >= totalPages;
  }

  /* ── Chat FAB ─────────────────────────────────────── */
  var chatFab = document.querySelector('.chat-fab');
  if (chatFab) {
    chatFab.addEventListener('click', function () {
      console.log('Open chat');
    });
  }

})();
