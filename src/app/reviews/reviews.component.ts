(function () {
  'use strict';

  /* ── Star rating ─────────────────────────────────── */
  var stars = document.querySelectorAll('.pr-star');
  var starLabel = document.querySelector('.pr-star-label');
  var ratingInput = document.getElementById('review-rating');
  var currentRating = 0;

  var labels = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

  function setRating(n) {
    currentRating = n;
    if (ratingInput) ratingInput.value = n;
    stars.forEach(function (star, i) {
      star.classList.toggle('is-filled', i < n);
      star.setAttribute('aria-pressed', i < n ? 'true' : 'false');
    });
    if (starLabel) starLabel.textContent = labels[n] || '';
  }

  stars.forEach(function (star, i) {
    star.addEventListener('mouseenter', function () {
      stars.forEach(function (s, j) {
        s.classList.toggle('is-filled', j <= i);
      });
      if (starLabel) starLabel.textContent = labels[i + 1] || '';
    });

    star.addEventListener('mouseleave', function () {
      setRating(currentRating);
    });

    star.addEventListener('click', function () {
      setRating(i + 1);
    });

    star.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setRating(i + 1);
      }
    });

    star.setAttribute('role', 'button');
    star.setAttribute('tabindex', '0');
    star.setAttribute('aria-label', (i + 1) + ' sao');
  });

  /* ── File upload with previews ───────────────────── */
  var uploadInput = document.querySelector('.pr-upload__input');
  var previewsWrap = document.querySelector('.pr-upload-previews');
  var uploadedFiles = [];

  function renderPreviews() {
    if (!previewsWrap) return;
    previewsWrap.innerHTML = '';
    uploadedFiles.forEach(function (file, idx) {
      var reader = new FileReader();
      reader.onload = function (ev) {
        var item = document.createElement('div');
        item.className = 'pr-upload-preview';

        var img = document.createElement('img');
        img.src = ev.target.result;
        img.alt = file.name;

        var btn = document.createElement('button');
        btn.className = 'pr-upload-preview__remove';
        btn.textContent = '×';
        btn.setAttribute('aria-label', 'Xóa ảnh ' + (idx + 1));
        btn.type = 'button';
        btn.addEventListener('click', function () {
          uploadedFiles.splice(idx, 1);
          renderPreviews();
        });

        item.appendChild(img);
        item.appendChild(btn);
        previewsWrap.appendChild(item);
      };
      reader.readAsDataURL(file);
    });
  }

  if (uploadInput) {
    uploadInput.addEventListener('change', function () {
      var newFiles = Array.from(uploadInput.files);
      newFiles.forEach(function (f) {
        if (uploadedFiles.length < 5) uploadedFiles.push(f);
      });
      uploadInput.value = '';
      renderPreviews();
    });
  }

  /* Drag-and-drop on upload zone */
  var uploadZone = document.querySelector('.pr-upload');
  if (uploadZone) {
    uploadZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      uploadZone.style.opacity = '0.7';
    });
    uploadZone.addEventListener('dragleave', function () {
      uploadZone.style.opacity = '';
    });
    uploadZone.addEventListener('drop', function (e) {
      e.preventDefault();
      uploadZone.style.opacity = '';
      var dropped = Array.from(e.dataTransfer.files).filter(function (f) {
        return f.type.startsWith('image/');
      });
      dropped.forEach(function (f) {
        if (uploadedFiles.length < 5) uploadedFiles.push(f);
      });
      renderPreviews();
    });
  }

  /* ── Form submit ─────────────────────────────────── */
  var form = document.getElementById('review-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (currentRating === 0) {
        alert('Vui lòng chọn số sao đánh giá.');
        return;
      }
      var btn = form.querySelector('.pr-submit-btn');
      if (btn) btn.disabled = true;
      /* Placeholder — wire to real API */
      console.log('Submit review, rating:', currentRating, 'files:', uploadedFiles.length);
    });
  }

  /* ── Chat FAB ─────────────────────────────────────── */
  var chatFab = document.querySelector('.chat-fab');
  if (chatFab) {
    chatFab.addEventListener('click', function () {
      console.log('Open chat');
    });
  }

})();
