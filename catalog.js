/**
 * ECLIPSA PLATFORM — Catalog Controller (Movies, Series, Anime)
 * Integrates Player Modal, Detail Modal, synchronized Bookmarks,
 * Live Navbar Search, Notifications, and user session across all catalog pages.
 */

// 1. Navigation Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

// 2. Mobile Menu Toggle
const menuButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => navLinks?.classList.toggle('is-open'));

// 3. Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
if (localStorage.getItem('eclipsa-theme') === 'light') document.body.classList.add('light-theme');

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

// 4. Notifications Dropdown
(function initNotifications() {
  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notificationsDropdown');
  const notifMarkReadBtn = document.getElementById('notifMarkReadBtn');
  const notifPing = document.getElementById('notifPing');

  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown?.classList.toggle('is-open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#notificationWrap')) {
      notifDropdown?.classList.remove('is-open');
    }
  });

  notifMarkReadBtn?.addEventListener('click', () => {
    if (notifPing) notifPing.style.display = 'none';
    document.querySelectorAll('.notif-unread-dot').forEach((d) => (d.style.display = 'none'));
    showToast('All notifications marked as read.');
  });
}());

// 5. Auth User Session Sync
(function initUserSession() {
  let userStr = localStorage.getItem('eclipsa_user');
  const signInLink = document.getElementById('navSignInLink');
  const avatarBtn = document.getElementById('navAvatarBtn');
  const userDropdown = document.getElementById('userDropdown');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userEmailDisplay = document.getElementById('userEmailDisplay');
  const signOutBtn = document.getElementById('signOutBtn');

  if (!userStr) {
    const guestUser = {
      name: 'Guest Explorer',
      email: 'guest@eclipsa.stream',
      initial: 'G',
      loggedIn: true,
      isGuest: true
    };
    localStorage.setItem('eclipsa_user', JSON.stringify(guestUser));
    userStr = JSON.stringify(guestUser);
  }

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
    }
  } catch (e) {}

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
    window.location.href = 'login.html';
  });
}());

// 6. Watchlist & Toast Helpers
const STORAGE_KEY = 'eclipsa_watchlist';
const getWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
};

const isBookmarked = (title) => {
  const list = getWatchlist();
  return list.some((item) => item.title.toLowerCase() === title.toLowerCase());
};

const toggleWatchlist = (item) => {
  let list = getWatchlist();
  const index = list.findIndex((i) => i.title.toLowerCase() === item.title.toLowerCase());
  let added = false;

  if (index >= 0) {
    list.splice(index, 1);
    showToast(`Removed "${item.title}" from My List`);
  } else {
    list.push(item);
    added = true;
    showToast(`Added "${item.title}" to My List`);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  updateCardBookmarkStates();
  window.dispatchEvent(new CustomEvent('eclipsa:watchlist_change', { detail: list }));
  return added;
};

const showToast = (message) => {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'global-toast';
    toast.id = 'globalToast';
    toast.innerHTML = '<i class="fas fa-bookmark"></i> <span class="toast-text"></span>';
    document.body.appendChild(toast);
  }
  toast.querySelector('.toast-text').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

const updateCardBookmarkStates = () => {
  const list = getWatchlist();
  const count = list.length;

  const navBadge = document.getElementById('navMyListBadge');
  if (navBadge) {
    navBadge.textContent = count;
    navBadge.classList.toggle('is-empty', count === 0);
  }

  document.querySelectorAll('.card-bookmark-btn').forEach((btn) => {
    const cardTitle = btn.getAttribute('data-title');
    if (cardTitle) {
      const bookmarked = isBookmarked(cardTitle);
      btn.classList.toggle('is-bookmarked', bookmarked);
      const icon = btn.querySelector('i');
      if (icon) icon.className = bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
    }
  });
};

// 7. Live Navbar Search on Catalog Pages
(function initCatalogSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const dropdown = document.getElementById('searchResultsDropdown');

  if (!searchInput || !dropdown) return;

  const renderResults = (query) => {
    const q = query.toLowerCase().trim();
    if (!q) {
      dropdown.classList.remove('is-open');
      dropdown.innerHTML = '';
      return;
    }

    const allItems = typeof ECLIPSA_CATALOG !== 'undefined' ? ECLIPSA_CATALOG : [];
    const matches = allItems.filter((i) => i.title.toLowerCase().includes(q) || (i.genres && i.genres.join(' ').toLowerCase().includes(q))).slice(0, 6);

    dropdown.innerHTML = '';
    if (matches.length > 0) {
      matches.forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'search-item';
        btn.innerHTML = `
          <img class="search-item-thumb" src="${item.poster || item.backdrop}" alt="${item.title}" onerror="this.src='pictures/bar4.jpeg'">
          <div class="search-item-info">
            <div class="search-item-title">${item.title}</div>
            <div class="search-item-meta">${item.year} • ${item.genres?.[0] || 'Drama'} • ${item.rating} ★</div>
          </div>
          <span class="search-item-play"><i class="fas fa-play"></i></span>
        `;
        btn.addEventListener('click', () => {
          dropdown.classList.remove('is-open');
          if (typeof EclipsaModal !== 'undefined') EclipsaModal.open(item);
        });
        dropdown.appendChild(btn);
      });
    } else {
      dropdown.innerHTML = `<div class="search-no-results"><div>No titles found for "<strong>${query}</strong>"</div></div>`;
    }
    dropdown.classList.add('is-open');
  };

  searchInput.addEventListener('input', (e) => renderResults(e.target.value));
  searchBtn?.addEventListener('click', () => renderResults(searchInput.value));
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchWrap')) dropdown.classList.remove('is-open');
  });
}());

// 8. Hook Up All Movie / Series / Anime Cards
(function initCatalogCards() {
  document.querySelectorAll('.movie-card').forEach((card) => {
    const media = card.querySelector('.card-media');
    const h5 = card.querySelector('h5');
    const img = media ? media.querySelector('img') : null;
    const tags = card.querySelector('.card-tags');

    if (!h5) return;
    const title = h5.textContent.trim();

    // Ensure .card-play icon exists
    let playBtn = card.querySelector('.card-play');
    if (media && !playBtn) {
      playBtn = document.createElement('div');
      playBtn.className = 'card-play';
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      media.appendChild(playBtn);
    }

    // Add Bookmark Button
    if (media && !media.querySelector('.card-bookmark-btn')) {
      const bookmarkBtn = document.createElement('button');
      bookmarkBtn.className = 'card-bookmark-btn';
      bookmarkBtn.setAttribute('type', 'button');
      bookmarkBtn.setAttribute('data-title', title);
      bookmarkBtn.setAttribute('aria-label', `Bookmark ${title}`);
      bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';

      bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWatchlist({
          title,
          image: img ? img.src : 'pictures/bar4.jpeg',
          meta: tags ? tags.textContent.trim() : 'Catalog Title'
        });
      });

      media.appendChild(bookmarkBtn);
    }

    // Play button -> Open Video Player
    playBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(title) : null;
      if (item && typeof EclipsaPlayer !== 'undefined') {
        const firstEp = item.episodes?.[0] || null;
        EclipsaPlayer.open(item, firstEp);
      } else if (typeof EclipsaPlayer !== 'undefined') {
        EclipsaPlayer.open({
          title,
          poster: img ? img.src : 'pictures/bar4.jpeg',
          backdrop: img ? img.src : 'pictures/bar4.jpeg',
          year: '2024',
          rating: '8.8',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
        });
      }
    });

    // Card Click -> Open Detail Modal
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-bookmark-btn') || e.target.closest('.card-play')) return;

      const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(title) : null;
      if (item && typeof EclipsaModal !== 'undefined') {
        EclipsaModal.open(item);
      } else if (typeof EclipsaModal !== 'undefined') {
        const fallbackItem = {
          title,
          poster: img ? img.src : 'pictures/bar4.jpeg',
          backdrop: img ? img.src : 'pictures/bar4.jpeg',
          year: '2024',
          rating: '8.8',
          age: 'TV-14',
          quality: '4K Ultra HD',
          desc: `Experience ${title} streaming in ultra-high definition on Eclipsa with crisp spatial audio and zero buffering.`,
          genres: tags ? tags.textContent.split('·').map((s) => s.trim()) : ['Popular'],
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
        };
        EclipsaModal.open(fallbackItem);
      }
    });
  });

  updateCardBookmarkStates();
  window.addEventListener('eclipsa:watchlist_change', updateCardBookmarkStates);
}());
