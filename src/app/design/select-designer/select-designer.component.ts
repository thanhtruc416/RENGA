(function () {
  'use strict';

  /* ── State ───────────────────────────────────────── */
  var state = {
    currentStep: 1,
    selectedDesigner: null,
    selectedDate: '2024-12-14',
    selectedTime: '14:30'
  };

  /* ── Designer data ───────────────────────────────── */
  var DESIGNERS = {
    'henri-de-luca': {
      name: 'Master Henri de Luca',
      role: 'Master Diamond Designer',
      bio: 'Chuyên gia thiết kế kim cương hàng đầu với hơn 20 năm kinh nghiệm tại các nhà kim hoàn danh tiếng.',
      photo: 'https://www.figma.com/api/mcp/asset/d331c70c-a7eb-4fd4-925e-5103568cd8f0'
    },
    'isabella-moretti': {
      name: 'Isabella Moretti',
      role: 'Heritage Jewelry Designer',
      bio: 'Nhà thiết kế chuyên về trang sức cổ điển và di sản nghệ thuật Ý, với niềm đam mê viên đá quý.',
      photo: 'https://www.figma.com/api/mcp/asset/b4caeee8-a646-4e0f-bed4-5c2f36e7c974'
    },
    'elena-vance': {
      name: 'Elena Vance',
      role: 'Senior Jewelry Designer',
      bio: 'Chuyên gia thiết kế trang sức cao cấp với phong cách avant-garde và hơn 10 năm kinh nghiệm.',
      photo: 'https://www.figma.com/api/mcp/asset/3fbcec17-e28e-4a1b-be69-0bbff5ae980c'
    }
  };

  /* ── Step engine ─────────────────────────────────── */
  var stepBubbles = document.querySelectorAll('.step-progress__step');
  var stepPanels = document.querySelectorAll('.designer-flow__step');

  function goToStep(n) {
    state.currentStep = n;

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

    stepPanels.forEach(function (panel) {
      var panelStep = parseInt(panel.getAttribute('data-step'), 10);
      panel.classList.toggle('is-active', panelStep === n);
    });

    if (n === 2 && state.selectedDesigner) updateDesignerPanel(state.selectedDesigner);
    if (n === 4) syncPaymentStep();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* data-target-step buttons (back / next) */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-target-step]');
    if (!btn) return;
    var target = parseInt(btn.getAttribute('data-target-step'), 10);
    goToStep(target);
  });

  /* ── Step 1: designer card selection ─────────────── */
  var grid = document.getElementById('designer-grid');

  function selectDesigner(id) {
    state.selectedDesigner = id;
    if (grid) {
      grid.querySelectorAll('.designer-card').forEach(function (card) {
        card.classList.toggle('is-selected', card.getAttribute('data-designer') === id);
      });
    }
  }

  if (grid) {
    grid.addEventListener('click', function (e) {
      var selectBtn = e.target.closest('.designer-card__select');
      var card = e.target.closest('.designer-card');
      if (!card) return;

      selectDesigner(card.getAttribute('data-designer'));

      if (selectBtn) goToStep(2);
    });

    grid.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.designer-card');
      if (!card) return;
      e.preventDefault();
      selectDesigner(card.getAttribute('data-designer'));
    });
  }

  /* ── Step 2: update designer panel ──────────────── */
  var panelPhoto = document.getElementById('panel-photo');
  var panelName = document.getElementById('panel-name');
  var panelRole = document.getElementById('panel-role');
  var panelBio = document.getElementById('panel-bio');

  function updateDesignerPanel(id) {
    var d = DESIGNERS[id];
    if (!d) return;
    if (panelPhoto) { panelPhoto.src = d.photo; panelPhoto.alt = d.name; }
    if (panelName) panelName.textContent = d.name;
    if (panelRole) panelRole.textContent = d.role;
    if (panelBio) panelBio.textContent = d.bio;
    var payDesigner = document.getElementById('pay-designer');
    if (payDesigner) payDesigner.textContent = d.name;
  }

  /* ── Step 2: calendar ─────────────────────────────── */
  var calGrid = document.getElementById('calendar-grid');
  var summaryDate = document.getElementById('summary-date');
  var summaryTime = document.getElementById('summary-time');
  var slotTitle = document.querySelector('.ds-timeslot-section__title');

  var VN_WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  function formatDateShort(dateStr) {
    var p = dateStr.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  function formatDateLong(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return VN_WEEKDAYS[d.getDay()] + ', ' + d.getDate() +
      ' tháng ' + (d.getMonth() + 1) + ' năm ' + d.getFullYear();
  }

  function onDateClick(dateStr) {
    if (calGrid) {
      calGrid.querySelectorAll('.ds-calendar__date[data-date]').forEach(function (btn) {
        btn.classList.toggle('is-selected', btn.getAttribute('data-date') === dateStr);
      });
    }
    state.selectedDate = dateStr;
    if (summaryDate) summaryDate.textContent = formatDateShort(dateStr);
    if (slotTitle) slotTitle.textContent = formatDateLong(dateStr);
  }

  if (calGrid) {
    calGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('.ds-calendar__date[data-date]');
      if (btn) onDateClick(btn.getAttribute('data-date'));
    });
  }

  /* ── Step 2: timeslots ────────────────────────────── */
  var slotGrid = document.querySelector('.ds-timeslot-grid');

  function onSlotClick(timeStr) {
    if (slotGrid) {
      slotGrid.querySelectorAll('.ds-timeslot:not(.is-unavailable)').forEach(function (btn) {
        var sel = btn.getAttribute('data-time') === timeStr;
        btn.classList.toggle('is-selected', sel);
        btn.setAttribute('aria-selected', sel ? 'true' : 'false');
      });
    }
    state.selectedTime = timeStr;
    if (summaryTime) summaryTime.textContent = timeStr;
  }

  if (slotGrid) {
    slotGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('.ds-timeslot:not(.is-unavailable)[data-time]');
      if (btn) onSlotClick(btn.getAttribute('data-time'));
    });
  }

  /* ── Step 4: sync payment details from state ─────── */
  function syncPaymentStep() {
    var payDate = document.getElementById('pay-date');
    var payTime = document.getElementById('pay-time');
    var payDesigner = document.getElementById('pay-designer');
    if (payDate && state.selectedDate) payDate.textContent = formatDateShort(state.selectedDate);
    if (payTime && state.selectedTime) payTime.textContent = state.selectedTime;
    if (payDesigner && state.selectedDesigner && DESIGNERS[state.selectedDesigner]) {
      payDesigner.textContent = DESIGNERS[state.selectedDesigner].name;
    }
  }

  /* ── Step 3: toggle button groups ───────────────── */
  document.querySelectorAll('.ds-toggle-group').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.ds-toggle-btn');
      if (!btn) return;
      group.querySelectorAll('.ds-toggle-btn').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');
    });
  });

  /* ── Step 3: upload zone drag-over ─────────────── */
  var uploadZone = document.querySelector('.ds-upload-zone');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      uploadZone.classList.add('is-dragover');
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      uploadZone.addEventListener(ev, function (e) {
        e.preventDefault();
        uploadZone.classList.remove('is-dragover');
      });
    });
  }

  /* ── Step 4: payment method selection ───────────── */
  document.querySelectorAll('.ds-pay-method').forEach(function (label) {
    label.addEventListener('change', function () {
      document.querySelectorAll('.ds-pay-method').forEach(function (l) {
        l.classList.remove('is-selected');
      });
      label.classList.add('is-selected');
    });
  });

  /* ── Step 4: complete booking ─────────────────────── */
  var completeBtn = document.getElementById('complete-booking');
  if (completeBtn) {
    completeBtn.addEventListener('click', function () {
      window.location.href = 'lich-tu-van.html';
    });
  }

  /* ── Load more ────────────────────────────────────── */
  var loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      /* placeholder */
    });
  }

  /* ── Chat FAB ─────────────────────────────────────── */
  var chatFab = document.querySelector('.chat-fab');
  if (chatFab) {
    chatFab.addEventListener('click', function () {
      /* placeholder */
    });
  }

}());
