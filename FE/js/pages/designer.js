(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     State
  ───────────────────────────────────────────────── */
  var selectedDesigner = null;

  /* ─────────────────────────────────────────────────
     Card selection
  ───────────────────────────────────────────────── */
  var grid = document.getElementById('designer-grid');

  if (grid) {
    grid.addEventListener('click', function (e) {
      var selectBtn = e.target.closest('.designer-card__select');
      var card = e.target.closest('.designer-card');

      if (!card) return;

      /* Mark selection */
      grid.querySelectorAll('.designer-card').forEach(function (c) {
        c.classList.remove('is-selected');
      });
      card.classList.add('is-selected');
      selectedDesigner = card.dataset.designer;

      /* If the Select button was clicked, advance to next step */
      if (selectBtn) {
        /* Placeholder — wire to booking/step-2 page when ready */
        console.log('Designer selected:', selectedDesigner);
      }
    });

    /* Keyboard: Enter / Space activates the focused card */
    grid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.designer-card');
      if (!card) return;
      e.preventDefault();
      grid.querySelectorAll('.designer-card').forEach(function (c) {
        c.classList.remove('is-selected');
      });
      card.classList.add('is-selected');
      selectedDesigner = card.dataset.designer;
    });
  }

  /* ─────────────────────────────────────────────────
     Load more (placeholder)
  ───────────────────────────────────────────────── */
  var loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      console.log('Load more designers');
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
