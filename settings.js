(() => {
  const readUser = () => {
    try { return JSON.parse(localStorage.getItem('eclipsa_user') || 'null'); } catch (_) { return null; }
  };
  const user = readUser() || { name: 'Guest Explorer', email: 'guest@eclipsa.stream', loggedIn: true, isGuest: true };
  user.loggedIn = true;
  localStorage.setItem('eclipsa_user', JSON.stringify(user));

  const nameInput = document.getElementById('profileName');
  const emailInput = document.getElementById('profileEmail');
  const avatar = document.getElementById('profileAvatar');
  const avatarButton = document.getElementById('navAvatarBtn');
  const nameDisplay = document.getElementById('userNameDisplay');
  const emailDisplay = document.getElementById('userEmailDisplay');
  const toast = document.getElementById('settingsToast');
  let toastTimer;

  const syncProfile = () => {
    const initial = (user.name || 'U').trim().charAt(0).toUpperCase() || 'U';
    avatar.textContent = initial;
    avatarButton.textContent = initial;
    nameDisplay.textContent = user.name || 'Eclipsa Member';
    emailDisplay.textContent = user.email || '';
  };
  nameInput.value = user.name || '';
  emailInput.value = user.email || '';
  syncProfile();

  let preferences = {};
  try { preferences = JSON.parse(localStorage.getItem('eclipsa_preferences') || '{}'); } catch (_) {}
  document.getElementById('audioLanguage').value = preferences.audioLanguage || 'English';
  document.getElementById('subtitleLanguage').value = preferences.subtitleLanguage || 'Off';
  document.getElementById('streamingQuality').value = preferences.streamingQuality || 'auto';
  document.getElementById('maturityRating').value = preferences.maturityRating || 'all';
  document.getElementById('autoplayNext').checked = preferences.autoplayNext ?? true;
  document.getElementById('autoplayPreviews').checked = preferences.autoplayPreviews ?? false;

  const showToast = (message) => {
    toast.querySelector('span').textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };

  document.getElementById('profileForm').addEventListener('submit', (event) => {
    event.preventDefault();
    user.name = nameInput.value.trim();
    user.email = emailInput.value.trim();
    user.initial = user.name.charAt(0).toUpperCase() || 'U';
    localStorage.setItem('eclipsa_user', JSON.stringify(user));
    localStorage.setItem('eclipsa_preferences', JSON.stringify({
      audioLanguage: document.getElementById('audioLanguage').value,
      subtitleLanguage: document.getElementById('subtitleLanguage').value,
      streamingQuality: document.getElementById('streamingQuality').value,
      maturityRating: document.getElementById('maturityRating').value,
      autoplayNext: document.getElementById('autoplayNext').checked,
      autoplayPreviews: document.getElementById('autoplayPreviews').checked
    }));
    syncProfile();
    showToast('Profile and viewing preferences saved.');
  });

  const currentPlan = localStorage.getItem('eclipsa_membership') || 'starter';
  const renderPlans = () => {
    document.querySelectorAll('.plan-card').forEach((card) => {
      const active = card.dataset.plan === localStorage.getItem('eclipsa_membership');
      card.classList.toggle('is-current', active);
      card.querySelector('.plan-current').hidden = !active;
      const button = card.querySelector('.plan-button');
      button.textContent = active ? 'Your current plan' : `Choose ${card.querySelector('h3').textContent}`;
      button.disabled = active;
    });
  };
  if (!['starter', 'plus', 'premiere'].includes(currentPlan)) localStorage.setItem('eclipsa_membership', 'starter');
  renderPlans();
  document.querySelectorAll('[data-select-plan]').forEach((button) => button.addEventListener('click', () => {
    localStorage.setItem('eclipsa_membership', button.dataset.selectPlan);
    renderPlans();
    const title = button.closest('.plan-card').querySelector('h3').textContent;
    showToast(`${title} membership selected.`);
  }));

  const themeToggle = document.querySelector('.theme-toggle');
  if (localStorage.getItem('eclipsa-theme') === 'light') document.body.classList.add('light-theme');
  const updateTheme = () => {
    const light = document.body.classList.contains('light-theme');
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.querySelector('i').classList.toggle('fa-moon', light);
    themeToggle.querySelector('i').classList.toggle('fa-sun', !light);
  };
  updateTheme();
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('eclipsa-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    updateTheme();
  });

  const searchInput = document.getElementById('searchInput');
  const goToSearch = () => {
    const query = searchInput.value.trim();
    if (query) sessionStorage.setItem('eclipsa_pending_search', query);
    window.location.href = 'index.html#searchWrap';
  };
  document.getElementById('searchBtn').addEventListener('click', goToSearch);
  searchInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') goToSearch(); });
  const notifications = document.getElementById('notificationsDropdown');
  document.getElementById('notifBtn').addEventListener('click', (event) => { event.stopPropagation(); notifications.classList.toggle('is-open'); });
  document.getElementById('notifMarkReadBtn').addEventListener('click', () => {
    document.getElementById('notifPing').hidden = true;
    document.querySelectorAll('#notifList .notif-unread-dot').forEach((dot) => dot.remove());
  });
  document.addEventListener('click', (event) => { if (!event.target.closest('#notificationWrap')) notifications.classList.remove('is-open'); });

  const dropdown = document.getElementById('userDropdown');
  avatarButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = dropdown.classList.toggle('is-open');
    avatarButton.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#userMenuWrap')) {
      dropdown.classList.remove('is-open');
      avatarButton.setAttribute('aria-expanded', 'false');
    }
  });
  document.getElementById('signOutBtn').addEventListener('click', () => {
    localStorage.removeItem('eclipsa_user');
    window.location.href = 'login.html';
  });
  document.querySelector('.nav-toggle').addEventListener('click', () => document.querySelector('.settings-navbar .nav-links').classList.toggle('is-open'));
})();

