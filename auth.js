/**
 * ECLIPSA Streaming Platform — Authentication System
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle synchronization
  const themeToggle = document.querySelector('.theme-toggle');
  if (localStorage.getItem('eclipsa-theme') === 'light') {
    document.body.classList.add('light-theme');
  }

  const updateThemeButton = () => {
    const light = document.body.classList.contains('light-theme');
    themeToggle?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-moon', light);
      icon.classList.toggle('fa-sun', !light);
    }
  };
  updateThemeButton();

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('eclipsa-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    updateThemeButton();
  });

  // 2. Password Visibility Toggle
  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('i');
      if (input) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        if (icon) {
          icon.classList.toggle('fa-eye', !isPassword);
          icon.classList.toggle('fa-eye-slash', isPassword);
        }
      }
    });
  });

  // 3. Toast Notification
  const toast = document.getElementById('authToast');
  const showToast = (message, iconClass = 'fa-check-circle', duration = 3000) => {
    if (!toast) return;
    const textEl = toast.querySelector('.toast-text');
    const iconEl = toast.querySelector('i');
    if (textEl) textEl.textContent = message;
    if (iconEl) iconEl.className = `fas ${iconClass}`;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), duration);
  };

  // 4. Alert Banner in Card
  const alertEl = document.getElementById('authAlert');
  const showAlert = (message, type = 'error') => {
    if (!alertEl) return;
    const textEl = alertEl.querySelector('.alert-text');
    if (textEl) textEl.textContent = message;
    alertEl.className = `auth-alert ${type}`;
    alertEl.style.display = 'flex';
  };
  const hideAlert = () => {
    if (alertEl) alertEl.style.display = 'none';
  };

  // Helpers for validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 5. LOGIN FORM HANDLING
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const identInput = document.getElementById('loginIdentifier');
    const passInput = document.getElementById('loginPassword');
    const submitBtn = document.getElementById('submitBtn');

    // Realtime error clearing
    [identInput, passInput].forEach((input) => {
      input?.addEventListener('input', () => {
        input.closest('.input-wrap')?.classList.remove('has-error');
        hideAlert();
      });
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAlert();

      const identVal = identInput.value.trim();
      const passVal = passInput.value;
      let valid = true;

      if (!identVal) {
        identInput.closest('.input-wrap')?.classList.add('has-error');
        valid = false;
      } else {
        identInput.closest('.input-wrap')?.classList.remove('has-error');
      }

      if (!passVal || passVal.length < 6) {
        passInput.closest('.input-wrap')?.classList.add('has-error');
        valid = false;
      } else {
        passInput.closest('.input-wrap')?.classList.remove('has-error');
      }

      if (!valid) {
        showAlert('Please provide your login credentials.', 'error');
        return;
      }

      // Demo login loading & redirection
      submitBtn.classList.add('is-loading');
      const btnText = submitBtn.querySelector('.btn-text');
      if (btnText) btnText.innerHTML = 'Signing In...';

      window.setTimeout(() => {
        const userName = identVal.includes('@') ? identVal.split('@')[0] : identVal;
        const userObj = {
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          email: identVal.includes('@') ? identVal : `${identVal}@example.com`,
          initial: userName.charAt(0).toUpperCase(),
          loggedIn: true
        };
        localStorage.setItem('eclipsa_user', JSON.stringify(userObj));

        showToast(`Welcome back, ${userObj.name}! Redirecting...`, 'fa-circle-check', 2000);

        window.setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 1000);
    });
  }

  // 6. SIGNUP FORM HANDLING
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const passInput = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const termsInput = document.getElementById('termsAgree');
    const submitBtn = document.getElementById('submitBtn');
    const strengthIndicator = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');

    // Realtime error clearing
    [nameInput, emailInput, passInput, confirmInput, termsInput].forEach((input) => {
      input?.addEventListener('input', () => {
        input.closest('.input-wrap')?.classList.remove('has-error');
        input.closest('.form-group')?.classList.remove('has-error');
        hideAlert();
      });
    });

    // Password strength check
    passInput?.addEventListener('input', () => {
      const val = passInput.value;
      if (!val) {
        strengthIndicator?.classList.remove('active', 'strength-weak', 'strength-medium', 'strength-strong');
        return;
      }
      strengthIndicator?.classList.add('active');
      strengthIndicator.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

      let score = 0;
      if (val.length >= 6) score += 1;
      if (val.length >= 10) score += 1;
      if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score += 1;
      if (/[^A-Za-z0-9]/.test(val)) score += 1;

      if (score <= 1) {
        strengthIndicator.classList.add('strength-weak');
        if (strengthText) strengthText.textContent = 'Weak password';
      } else if (score <= 3) {
        strengthIndicator.classList.add('strength-medium');
        if (strengthText) strengthText.textContent = 'Good password';
      } else {
        strengthIndicator.classList.add('strength-strong');
        if (strengthText) strengthText.textContent = 'Strong password';
      }
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAlert();

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const passVal = passInput.value;
      const confirmVal = confirmInput.value;
      const termsVal = termsInput.checked;

      let valid = true;

      if (!nameVal) {
        nameInput.closest('.input-wrap')?.classList.add('has-error');
        valid = false;
      } else {
        nameInput.closest('.input-wrap')?.classList.remove('has-error');
      }

      if (!emailVal || !isValidEmail(emailVal)) {
        emailInput.closest('.input-wrap')?.classList.add('has-error');
        valid = false;
      } else {
        emailInput.closest('.input-wrap')?.classList.remove('has-error');
      }

      if (!passVal || passVal.length < 6) {
        passInput.closest('.input-wrap')?.classList.add('has-error');
        valid = false;
      } else {
        passInput.closest('.input-wrap')?.classList.remove('has-error');
      }

      if (!confirmVal || confirmVal !== passVal) {
        confirmInput.closest('.input-wrap')?.classList.add('has-error');
        valid = false;
      } else {
        confirmInput.closest('.input-wrap')?.classList.remove('has-error');
      }

      if (!termsVal) {
        termsInput.closest('.form-group')?.classList.add('has-error');
        valid = false;
      } else {
        termsInput.closest('.form-group')?.classList.remove('has-error');
      }

      if (!valid) {
        showAlert('Please fix the highlighted fields to continue.', 'error');
        return;
      }

      // Demo signup loading & redirection
      submitBtn.classList.add('is-loading');
      const btnText = submitBtn.querySelector('.btn-text');
      if (btnText) btnText.innerHTML = 'Creating Account...';

      window.setTimeout(() => {
        const userObj = {
          name: nameVal,
          email: emailVal,
          initial: nameVal.charAt(0).toUpperCase(),
          loggedIn: true
        };
        localStorage.setItem('eclipsa_user', JSON.stringify(userObj));

        showToast(`Account created for ${userObj.name}! Welcome to Eclipsa.`, 'fa-circle-check', 2000);

        window.setTimeout(() => {
          window.location.href = 'index.html';
        }, 1200);
      }, 1200);
    });
  }

  // 7. FORGOT PASSWORD MODAL
  const forgotModal = document.getElementById('forgotModal');
  const forgotBtn = document.getElementById('forgotPasswordBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const forgotForm = document.getElementById('forgotForm');

  forgotBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    forgotModal?.classList.add('is-open');
    document.getElementById('forgotEmail')?.focus();
  });

  const closeModal = () => forgotModal?.classList.remove('is-open');
  modalCloseBtn?.addEventListener('click', closeModal);
  forgotModal?.addEventListener('click', (e) => {
    if (e.target === forgotModal) closeModal();
  });

  forgotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const forgotEmail = document.getElementById('forgotEmail');
    const emailVal = forgotEmail.value.trim();

    if (!emailVal || !isValidEmail(emailVal)) {
      forgotEmail.closest('.input-wrap')?.classList.add('has-error');
      return;
    }

    forgotEmail.closest('.input-wrap')?.classList.remove('has-error');
    const submitBtn = document.getElementById('forgotSubmitBtn');
    submitBtn.classList.add('is-loading');
    const btnText = submitBtn.querySelector('.btn-text');
    if (btnText) btnText.innerHTML = 'Sending...';

    window.setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      if (btnText) btnText.innerHTML = 'Send Reset Link';
      closeModal();
      showToast(`Password reset link sent to ${emailVal}!`, 'fa-paper-plane', 4000);
      forgotForm.reset();
    }, 1200);
  });

  // 8. SOCIAL BUTTONS (UI MOCK)
  document.querySelectorAll('.social-btn-mock').forEach((btn) => {
    btn.addEventListener('click', () => {
      const provider = btn.getAttribute('data-provider');
      showToast(`${provider} Sign-In interface is ready for backend API integration.`, 'fa-info-circle', 3000);
    });
  });
});
