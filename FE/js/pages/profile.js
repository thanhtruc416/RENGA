/* ===== PROFILE & REWARDS PAGE JS ===== */

// ── Edit / Save personal info ──────────────────────
const editBtn = document.getElementById('editInfoBtn');
const infoGrid = document.getElementById('profileInfoGrid');
let isEditing = false;

if (editBtn && infoGrid) {
  editBtn.addEventListener('click', () => {
    isEditing = !isEditing;
    editBtn.textContent = isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa';

    infoGrid.querySelectorAll('.profile-form__value').forEach(span => {
      const field = span.dataset.field;
      const value = span.textContent.trim();

      if (isEditing) {
        const input = document.createElement('input');
        input.className = 'profile-form__input';
        input.value = value;
        input.dataset.field = field;
        span.replaceWith(input);
        input.focus();
      } else {
        const input = infoGrid.querySelector(`input[data-field="${field}"]`);
        if (input) {
          const newSpan = document.createElement('span');
          newSpan.className = 'profile-form__value';
          newSpan.dataset.field = field;
          newSpan.textContent = input.value;
          input.replaceWith(newSpan);
        }
      }
    });
  });
}

// ── Reward redeem ──────────────────────────────────
document.querySelectorAll('.reward-card__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.reward-card');
    const name = card.querySelector('.reward-card__name').textContent;
    const pts = card.querySelector('.reward-card__pts').textContent;
    alert(`Đổi thưởng: ${name} (${pts})\nChức năng sẽ được tích hợp trong phiên bản tiếp theo.`);
  });
});

// ── Security form ──────────────────────────────────
const securitySubmit = document.querySelector('.security-card__submit');
if (securitySubmit) {
  securitySubmit.addEventListener('click', () => {
    const currentPwd = document.getElementById('currentPwd');
    const newPwd = document.getElementById('newPwd');

    if (!currentPwd?.value || !newPwd?.value) {
      alert('Vui lòng điền đầy đủ thông tin mật khẩu.');
      return;
    }

    if (newPwd.value.length < 8) {
      alert('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }

    alert('Cập nhật mật khẩu thành công!');
    currentPwd.value = '';
    newPwd.value = '';
  });
}
