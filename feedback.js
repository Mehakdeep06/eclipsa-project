(() => {
  const user = (() => { try { return JSON.parse(localStorage.getItem('eclipsa_user') || 'null'); } catch (_) { return null; } })() || { name: 'Guest Explorer', email: 'guest@eclipsa.stream', initial: 'G' };
  const avatar = document.getElementById('navAvatarBtn');
  const dropdown = document.getElementById('userDropdown');
  avatar.textContent = user.initial || (user.name || 'U').trim().charAt(0).toUpperCase();
  document.getElementById('userNameDisplay').textContent = user.name || 'Eclipsa Member';
  document.getElementById('userEmailDisplay').textContent = user.email || '';
  avatar.addEventListener('click', (event) => { event.stopPropagation(); const open = dropdown.classList.toggle('is-open'); avatar.setAttribute('aria-expanded', String(open)); });
  document.addEventListener('click', (event) => { if (!event.target.closest('#userMenuWrap')) { dropdown.classList.remove('is-open'); avatar.setAttribute('aria-expanded', 'false'); } });
  document.getElementById('signOutBtn').addEventListener('click', () => { localStorage.removeItem('eclipsa_user'); window.location.href = 'login.html'; });
  document.querySelector('.nav-toggle').addEventListener('click', () => document.querySelector('.feedback-navbar .nav-links').classList.toggle('is-open'));

  const themeToggle = document.querySelector('.theme-toggle');
  if (localStorage.getItem('eclipsa-theme') === 'light') document.body.classList.add('light-theme');
  const updateTheme = () => { const light = document.body.classList.contains('light-theme'); themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); themeToggle.querySelector('i').classList.toggle('fa-moon', light); themeToggle.querySelector('i').classList.toggle('fa-sun', !light); };
  updateTheme();
  themeToggle.addEventListener('click', () => { document.body.classList.toggle('light-theme'); localStorage.setItem('eclipsa-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); updateTheme(); });

  const searchInput = document.getElementById('searchInput');
  const goToSearch = () => { const query = searchInput.value.trim(); if (query) sessionStorage.setItem('eclipsa_pending_search', query); window.location.href = 'index.html#searchWrap'; };
  document.getElementById('searchBtn').addEventListener('click', goToSearch);
  searchInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') goToSearch(); });
  const notifications = document.getElementById('notificationsDropdown');
  document.getElementById('notifBtn').addEventListener('click', (event) => { event.stopPropagation(); notifications.classList.toggle('is-open'); });
  document.getElementById('notifMarkReadBtn').addEventListener('click', () => { document.getElementById('notifPing').hidden = true; document.querySelectorAll('#notifList .notif-unread-dot').forEach((dot) => dot.remove()); });
  document.addEventListener('click', (event) => { if (!event.target.closest('#notificationWrap')) notifications.classList.remove('is-open'); });

  const form = document.getElementById('feedbackForm');
  const count = document.getElementById('messageCount');
  const message = document.getElementById('feedbackMessage');
  const caption = document.getElementById('ratingCaption');
  const ratingCopy = { 1: 'Needs work', 2: 'Could be better', 3: 'It was okay', 4: 'Really enjoyed it', 5: 'Loved it' };
  document.querySelectorAll('[name="rating"]').forEach((input) => input.addEventListener('change', () => { caption.textContent = ratingCopy[input.value]; }));
  message.addEventListener('input', () => { count.textContent = `${message.value.length} / 2000`; });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.submittedAt = new Date().toISOString();
    let feedback = [];
    try { feedback = JSON.parse(localStorage.getItem('eclipsa_feedback') || '[]'); } catch (_) {}
    feedback.push(payload);
    localStorage.setItem('eclipsa_feedback', JSON.stringify(feedback));
    form.hidden = true;
    document.querySelector('.feedback-aside').hidden = true;
    document.getElementById('feedbackSuccess').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('sendAnother').addEventListener('click', () => { form.reset(); count.textContent = '0 / 2000'; caption.textContent = 'Choose a rating'; form.hidden = false; document.querySelector('.feedback-aside').hidden = false; document.getElementById('feedbackSuccess').hidden = true; });
})();
