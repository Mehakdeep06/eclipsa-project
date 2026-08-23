const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

const menuButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => navLinks?.classList.toggle('is-open'));

const themeToggle = document.querySelector('.theme-toggle');
if ((localStorage.getItem('eclipsa-theme') || localStorage.getItem('eclipsa-theme')) === 'light') document.body.classList.add('light-theme');

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

// Auth user session sync on catalog pages (movies, series, anime)
(function initUserSession() {
  const userStr = localStorage.getItem('eclipsa_user');
  const signInLink = document.getElementById('navSignInLink');
  const avatarBtn = document.getElementById('navAvatarBtn');
  const userDropdown = document.getElementById('userDropdown');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userEmailDisplay = document.getElementById('userEmailDisplay');
  const signOutBtn = document.getElementById('signOutBtn');

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && user.loggedIn) {
        if (signInLink) signInLink.style.display = 'none';
        if (avatarBtn) {
          avatarBtn.style.display = 'flex';
          avatarBtn.textContent = user.initial || (user.name ? user.name.charAt(0).toUpperCase() : 'U');
        }
        if (userNameDisplay) userNameDisplay.textContent = user.name || 'Eclipsa Member';
        if (userEmailDisplay) userEmailDisplay.textContent = user.email || '';
      } else {
        if (signInLink) signInLink.style.display = 'inline-flex';
        if (avatarBtn) avatarBtn.style.display = 'none';
      }
    } catch (e) {
      if (signInLink) signInLink.style.display = 'inline-flex';
      if (avatarBtn) avatarBtn.style.display = 'none';
    }
  } else {
    if (signInLink) signInLink.style.display = 'inline-flex';
    if (avatarBtn) avatarBtn.style.display = 'none';
  }

  avatarBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = userDropdown?.classList.toggle('is-open');
    avatarBtn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#userMenuWrap')) {
      userDropdown?.classList.remove('is-open');
      avatarBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  signOutBtn?.addEventListener('click', () => {
    localStorage.removeItem('eclipsa_user');
    window.location.href = 'signup.html';
  });
}());
