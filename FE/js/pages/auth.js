/* ===== AUTH PAGES JS ===== */

/* ──────────────────────────────────────────────────
   Utility: Toggle password visibility
   Works on any button with data-target="<inputId>"
   or explicit loginEyeBtn on the login page.
────────────────────────────────────────────────── */
function bindEyeToggles() {
  // Generic eye buttons (register modal, reset form)
  document.querySelectorAll('.auth-field__eye-btn[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      const svgs = btn.querySelectorAll('svg');
      svgs.forEach(s => (s.style.display = s.style.display === 'none' ? '' : 'none'));
    });
  });

  // Login page eye button (swap two inline SVGs)
  const loginEyeBtn = document.getElementById('loginEyeBtn');
  const loginPwd = document.getElementById('loginPwd');
  const eyeOff = document.getElementById('loginEyeOff');
  const eyeOn  = document.getElementById('loginEyeOn');
  if (loginEyeBtn && loginPwd) {
    loginEyeBtn.addEventListener('click', () => {
      const hidden = loginPwd.type === 'password';
      loginPwd.type = hidden ? 'text' : 'password';
      if (eyeOff) eyeOff.style.display = hidden ? 'none' : '';
      if (eyeOn)  eyeOn.style.display  = hidden ? ''     : 'none';
    });
  }
}

/* ──────────────────────────────────────────────────
   Modal helpers
────────────────────────────────────────────────── */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('is-open');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('is-open');
}

// Close on backdrop click (not on card click)
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) backdrop.classList.remove('is-open');
  });
});

// Esc key closes any open modal
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-backdrop.is-open').forEach(m => m.classList.remove('is-open'));
});

/* ──────────────────────────────────────────────────
   LOGIN PAGE
────────────────────────────────────────────────── */
// Open register modal
const openRegisterBtn = document.getElementById('openRegisterBtn');
if (openRegisterBtn) {
  openRegisterBtn.addEventListener('click', e => {
    e.preventDefault();
    openModal('modalRegister');
  });
}

// Close register modal
const closeRegisterBtn = document.getElementById('closeRegister');
if (closeRegisterBtn) closeRegisterBtn.addEventListener('click', () => closeModal('modalRegister'));

// Switch from register modal to login
const switchToLogin = document.getElementById('switchToLoginBtn');
if (switchToLogin) {
  switchToLogin.addEventListener('click', e => {
    e.preventDefault();
    closeModal('modalRegister');
  });
}

// Register submit → simulate "found old orders" modal
const registerSubmitBtn = document.getElementById('registerSubmitBtn');
if (registerSubmitBtn) {
  registerSubmitBtn.addEventListener('click', () => {
    const name  = document.getElementById('regName')?.value.trim();
    const phone = document.getElementById('regPhone')?.value.trim();
    const pwd   = document.getElementById('regPwd')?.value;
    const conf  = document.getElementById('regPwdConfirm')?.value;

    if (!name || !phone || !pwd || !conf) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc (*).');
      return;
    }
    if (pwd.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    if (pwd !== conf) {
      alert('Mật khẩu xác nhận không khớp.');
      return;
    }

    // Demo: show "link orders" modal
    closeModal('modalRegister');
    openModal('modalLinkOrders');
  });
}

// Link orders modal buttons
const closeLinkOrders = document.getElementById('closeLinkOrders');
const confirmLinkBtn  = document.getElementById('confirmLinkBtn');
const skipLinkBtn     = document.getElementById('skipLinkBtn');

if (closeLinkOrders) closeLinkOrders.addEventListener('click', () => closeModal('modalLinkOrders'));
if (confirmLinkBtn) {
  confirmLinkBtn.addEventListener('click', () => {
    closeModal('modalLinkOrders');
    window.location.href = '../profile/ho-so.html';
  });
}
if (skipLinkBtn) {
  skipLinkBtn.addEventListener('click', () => {
    closeModal('modalLinkOrders');
    window.location.href = '../profile/ho-so.html';
  });
}

// Auth gate modal
const authGateLoginBtn = document.getElementById('authGateLoginBtn');
const authGateBackBtn  = document.getElementById('authGateBackBtn');
if (authGateLoginBtn) {
  authGateLoginBtn.addEventListener('click', () => {
    closeModal('modalAuthGate');
  });
}
if (authGateBackBtn) {
  authGateBackBtn.addEventListener('click', () => closeModal('modalAuthGate'));
}

// Login submit
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
if (loginSubmitBtn) {
  loginSubmitBtn.addEventListener('click', () => {
    const phone = document.getElementById('loginPhone')?.value.trim();
    const pwd   = document.getElementById('loginPwd')?.value;
    if (!phone || !pwd) {
      alert('Vui lòng nhập số điện thoại và mật khẩu.');
      return;
    }
    // Demo: redirect to profile
    window.location.href = '../profile/ho-so.html';
  });
}

// Allow login on Enter
document.getElementById('loginPwd')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') loginSubmitBtn?.click();
});


/* ──────────────────────────────────────────────────
   FORGOT PASSWORD PAGE
────────────────────────────────────────────────── */
function showStep(stepId) {
  document.querySelectorAll('.auth-step').forEach(s => s.classList.remove('is-active'));
  const target = document.getElementById(stepId);
  if (target) target.classList.add('is-active');
}

// Send OTP
const sendOtpBtn = document.getElementById('sendOtpBtn');
if (sendOtpBtn) {
  sendOtpBtn.addEventListener('click', () => {
    const phone = document.getElementById('forgotPhone')?.value.trim();
    if (!phone || phone.length < 9) {
      alert('Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }
    // Reveal OTP grid
    const otpSection = document.getElementById('otpSection');
    if (otpSection) otpSection.style.display = 'block';
    sendOtpBtn.textContent = 'Gửi lại mã';

    // Start resend countdown
    startResendCountdown();

    // Auto-focus first OTP cell
    document.querySelector('.otp-cell')?.focus();
  });
}

// Resend countdown
function startResendCountdown() {
  const resendBtn   = document.getElementById('resendBtn');
  const timerSpan   = document.getElementById('resendTimer');
  if (!resendBtn || !timerSpan) return;

  let seconds = 30;
  resendBtn.disabled = true;
  timerSpan.textContent = seconds;

  const interval = setInterval(() => {
    seconds--;
    timerSpan.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      resendBtn.disabled = false;
      resendBtn.textContent = 'Gửi lại mã';
    }
  }, 1000);
}

const resendBtn = document.getElementById('resendBtn');
if (resendBtn) {
  resendBtn.addEventListener('click', () => {
    if (!resendBtn.disabled) startResendCountdown();
  });
}

// OTP cell auto-advance and backspace
const otpCells = document.querySelectorAll('.otp-cell');
otpCells.forEach((cell, i) => {
  cell.addEventListener('input', () => {
    // Allow only single digit
    if (cell.value.length > 1) cell.value = cell.value.slice(-1);
    cell.classList.toggle('is-filled', cell.value !== '');
    if (cell.value && i < otpCells.length - 1) otpCells[i + 1].focus();
  });

  cell.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !cell.value && i > 0) {
      otpCells[i - 1].focus();
    }
  });

  // Handle paste across all cells
  cell.addEventListener('paste', e => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    [...text].forEach((ch, j) => {
      if (otpCells[i + j]) {
        otpCells[i + j].value = ch;
        otpCells[i + j].classList.add('is-filled');
      }
    });
    const nextEmpty = [...otpCells].findIndex(c => !c.value);
    if (nextEmpty !== -1) otpCells[nextEmpty].focus();
    else otpCells[otpCells.length - 1].focus();
  });
});

// Confirm OTP → show new password step
const confirmOtpBtn = document.getElementById('confirmOtpBtn');
if (confirmOtpBtn) {
  confirmOtpBtn.addEventListener('click', () => {
    const code = [...otpCells].map(c => c.value).join('');
    if (code.length < 6) {
      alert('Vui lòng nhập đủ 6 chữ số mã OTP.');
      return;
    }
    // Demo: proceed to new password step
    showStep('stepNewPwd');
  });
}

// Update password
const updatePwdBtn = document.getElementById('updatePwdBtn');
if (updatePwdBtn) {
  updatePwdBtn.addEventListener('click', () => {
    const p1 = document.getElementById('newPwd1')?.value;
    const p2 = document.getElementById('newPwd2')?.value;
    if (!p1 || !p2) {
      alert('Vui lòng điền đầy đủ cả hai trường mật khẩu.');
      return;
    }
    if (p1.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    if (p1 !== p2) {
      alert('Xác nhận mật khẩu không khớp.');
      return;
    }
    alert('Cập nhật mật khẩu thành công! Vui lòng đăng nhập lại.');
    window.location.href = './dang-nhap.html';
  });
}

// Expose openModal globally for other pages (e.g., wishlist auth gate)
window.openAuthGate = () => openModal('modalAuthGate');

// Initialise all eye toggles
bindEyeToggles();

// Auto-open register modal when navigated from header dropdown
if (new URLSearchParams(window.location.search).get('register') === '1') {
  openModal('modalRegister');
}
