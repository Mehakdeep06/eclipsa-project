/**
 * ECLIPSA PLATFORM — My List Controller (mylist.js)
 * Manages the dedicated My List page: rendering saved titles, sorting,
 * category filtering, quick deletion, instant video playback, and empty state.
 */

document.addEventListener('DOMContentLoaded', () => {
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

  // 5. User Session Init
  (function initUserSession() {
    let userStr = localStorage.getItem('eclipsa_user');
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
        }
      } catch (e) {}
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
      window.location.href = 'login.html';
    });
  }());

  // 6. Toast Notification Helper
  const showToast = (message) => {
    const toast = document.getElementById('globalToast');
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  };

  // 7. Watchlist Data State & Management
  const STORAGE_KEY = 'eclipsa_watchlist';
  let currentTab = 'all';
  let currentSort = 'recent';

  const getWatchlist = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  };

  const normalizeWatchlistItem = (item) => {
    const catalogItem = typeof findMediaByTitle === 'function' ? findMediaByTitle(item.title) : null;
    const metaText = String(item.meta || '').replace(/\s+/g, ' ').trim();
    const metaParts = metaText.split('•').map((part) => part.trim()).filter(Boolean);
    const parsedRating = metaParts[0]?.match(/\d+(?:\.\d+)?/)?.[0] || '';
    const yearIndex = metaParts.findIndex((part) => /^\d{4}(?:\s*[–-]\s*\d{4})?$/.test(part));
    let parsedYear = yearIndex >= 0 ? metaParts[yearIndex] : '';
    let parsedGenres = yearIndex >= 0 ? metaParts.slice(yearIndex + 1).join(' · ') : '';
    if (!parsedYear) {
      const simpleMetaMatch = metaText.match(/^((?:19|20)\d{2}(?:\s*[–-]\s*(?:19|20)\d{2})?)\s*[·•]\s*(.+)$/);
      if (simpleMetaMatch) {
        parsedYear = simpleMetaMatch[1];
        parsedGenres = simpleMetaMatch[2];
      } else if (!parsedRating && metaText && !/^(popular title|catalog title|featured series|featured title|saved item)$/i.test(metaText)) {
        parsedGenres = metaText;
      }
    }
    const rating = catalogItem?.rating || item.rating || parsedRating || '';
    const year = catalogItem?.year || item.year || parsedYear || '';
    const genres = Array.isArray(catalogItem?.genres)
      ? catalogItem.genres
      : Array.isArray(item.genres) && item.genres.length && !String(item.genres[0]).includes('•')
        ? item.genres
        : parsedGenres.split(/[·,]/).map((genre) => genre.trim()).filter(Boolean);
    const normalized = {
      ...item,
      title: catalogItem?.title || item.title,
      type: catalogItem?.type || item.type || 'movie',
      image: catalogItem?.poster || item.image || 'pictures/bar4.jpeg',
      rating,
      year,
      genres
    };
    normalized.meta = [rating, year, genres.join(' · ')].filter(Boolean).join(' • ');
    return normalized;
  };

  const getNormalizedWatchlist = () => {
    const stored = getWatchlist();
    const normalized = stored.map(normalizeWatchlistItem);
    if (JSON.stringify(stored) !== JSON.stringify(normalized)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  };

  const saveWatchlist = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    renderMyListPage();
    window.dispatchEvent(new CustomEvent('eclipsa:watchlist_change', { detail: list }));
  };

  const removeTitle = (title) => {
    let list = getWatchlist();
    list = list.filter((item) => item.title.toLowerCase() !== title.toLowerCase());
    saveWatchlist(list);
    showToast(`Removed "${title}" from My List`);
  };

  const clearAllTitles = () => {
    const list = getWatchlist();
    if (list.length === 0) return;
    if (confirm('Are you sure you want to clear your entire Watchlist?')) {
      saveWatchlist([]);
      showToast('Your Watchlist has been cleared.');
    }
  };

  document.getElementById('myListClearBtn')?.addEventListener('click', clearAllTitles);

  // 8. Tab Filtering & Sorting Controls
  const filterTabs = document.querySelectorAll('.catalog-tab-btn');
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      currentTab = tab.getAttribute('data-tab');
      renderGrid();
    });
  });

  const sortSelect = document.getElementById('myListSortSelect');
  sortSelect?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderGrid();
  });

  // 9. Render My List Page
  const renderMyListPage = () => {
    const enrichedList = getNormalizedWatchlist();

    // Update Counts
    const countAll = enrichedList.length;
    const countMovie = enrichedList.filter((i) => i.type === 'movie').length;
    const countSeries = enrichedList.filter((i) => i.type === 'series').length;
    const countAnime = enrichedList.filter((i) => i.type === 'anime').length;

    document.getElementById('tabCountAll').textContent = countAll;
    document.getElementById('tabCountMovie').textContent = countMovie;
    document.getElementById('tabCountSeries').textContent = countSeries;
    document.getElementById('tabCountAnime').textContent = countAnime;

    // Navbar Badge
    const navBadge = document.getElementById('navMyListBadge');
    if (navBadge) {
      navBadge.textContent = countAll;
      navBadge.classList.toggle('is-empty', countAll === 0);
    }

    renderGrid(enrichedList);
  };

  const renderGrid = (items = null) => {
    const grid = document.getElementById('myListGrid');
    if (!grid) return;

    if (!items) {
      items = getNormalizedWatchlist();
    }

    // 1. Filter by Tab
    let filtered = items;
    if (currentTab !== 'all') {
      filtered = filtered.filter((i) => i.type === currentTab);
    }

    // 2. Sort Items
    if (currentSort === 'rating') {
      filtered.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
    } else if (currentSort === 'year') {
      filtered.sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
    } else if (currentSort === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Empty State Check
    if (filtered.length === 0) {
      const isFilteredEmpty = items.length > 0;
      grid.innerHTML = `
        <div class="mylist-empty-state" style="grid-column: 1 / -1;">
          <div class="mylist-empty-icon"><i class="fas fa-bookmark"></i></div>
          <h3>${isFilteredEmpty ? 'No Titles in This Category' : 'Your Watchlist is Empty'}</h3>
          <p>${
            isFilteredEmpty
              ? 'You have not added any titles under this category yet. Switch tabs or explore our catalog.'
              : 'Explore our catalog of 4K Ultra HD movies, series, and anime. Click the bookmark icon on any card to save it here.'
          }</p>
          <div class="mylist-empty-actions">
            <a href="movies.html" class="btn btn-primary" data-ripple><i class="fas fa-film"></i> Browse Movies</a>
            <a href="series.html" class="btn btn-ghost" data-ripple><i class="fas fa-tv"></i> Explore Series</a>
            <a href="anime.html" class="btn btn-ghost" data-ripple><i class="fas fa-dragon"></i> Watch Anime</a>
          </div>
        </div>
      `;
      return;
    }

    // Render Cards
    grid.innerHTML = filtered
      .map((item) => {
        const typeBadge = item.type ? item.type.toUpperCase() : 'TITLE';
        const genreText = Array.isArray(item.genres) ? item.genres.join(' · ') : (item.genres || '');
        const detailParts = [];
        if (item.rating) detailParts.push(`<span class="star-rating" style="color:#facc15;"><i class="fas fa-star"></i> ${item.rating}</span>`);
        if (item.year) detailParts.push(`<span>${item.year}</span>`);
        if (genreText) detailParts.push(`<span class="mylist-card-genres">${genreText}</span>`);
        return `
          <article class="mylist-card" data-title="${item.title.replace(/"/g, '&quot;')}">
            <div class="mylist-card-media">
              <span class="mylist-card-badge">${typeBadge}</span>
              <button type="button" class="mylist-card-delete-btn" data-delete-title="${item.title.replace(/"/g, '&quot;')}" title="Remove from list">
                <i class="fas fa-trash-alt"></i>
              </button>
              <img src="${item.image || 'pictures/bar4.jpeg'}" alt="${item.title}" loading="lazy" onerror="this.src='pictures/bar4.jpeg'">
              <div class="mylist-card-play-overlay" data-play-title="${item.title.replace(/"/g, '&quot;')}">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="mylist-card-info">
              <h5 class="mylist-card-title">${item.title}</h5>
              <div class="mylist-card-tags">${detailParts.join('<span class="mylist-card-separator">•</span>')}</div>
            </div>
          </article>
        `;
      })
      .join('');

    // Wire Card Interactions
    grid.querySelectorAll('.mylist-card').forEach((card) => {
      const title = card.getAttribute('data-title');
      const deleteBtn = card.querySelector('.mylist-card-delete-btn');
      const playOverlay = card.querySelector('.mylist-card-play-overlay');

      // 1. Delete Action
      deleteBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTitle(title);
      });

      // 2. Play Action -> Launch Video Player
      playOverlay?.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(title) : null;
        if (item && typeof EclipsaPlayer !== 'undefined') {
          EclipsaPlayer.open(item);
        } else if (typeof EclipsaPlayer !== 'undefined') {
          const img = card.querySelector('img');
          EclipsaPlayer.open({
            title,
            poster: img ? img.src : 'pictures/bar4.jpeg',
            backdrop: img ? img.src : 'pictures/bar4.jpeg',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
          });
        }
      });

      // 3. Card Body Click -> Open Quick-View Detail Modal
      card.addEventListener('click', (e) => {
        if (e.target.closest('.mylist-card-delete-btn') || e.target.closest('.mylist-card-play-overlay')) return;
        const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(title) : null;
        if (item && typeof EclipsaModal !== 'undefined') {
          EclipsaModal.open(item);
        } else if (typeof EclipsaModal !== 'undefined') {
          const img = card.querySelector('img');
          EclipsaModal.open({
            title,
            poster: img ? img.src : 'pictures/bar4.jpeg',
            backdrop: img ? img.src : 'pictures/bar4.jpeg',
            rating: '8.8',
            year: '2024',
            desc: `Experience ${title} streaming in ultra-high definition on Eclipsa with crystal clear audio.`,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
          });
        }
      });
    });
  };

  // 10. Real-time Search on My List Page
  (function initMyListSearch() {
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

  // Initial Load & Event Listener
  renderMyListPage();
  window.addEventListener('eclipsa:watchlist_change', () => {
    renderMyListPage();
  });
});
