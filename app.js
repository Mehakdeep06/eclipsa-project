/**
 * ECLIPSA PLATFORM — Main Application Controller (Phase 1)
 * Integrated Hero Slider, Real-time Search, Cinema Video Player,
 * Detail Modal, Genre Filters, Watchlist Drawer, and User Session.
 */

// 1. Navigation Scroll Effect
const navbar = document.getElementById('navbar');
const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 2. Local Artwork Fallback Handler
const localArtwork = [
  'pictures/bar3.jpeg', 'pictures/bar4.jpeg', 'pictures/bar5.jpeg', 'pictures/bar7.jpeg',
  'pictures/bar8.jpeg', 'pictures/bar9.jpeg', 'pictures/bar10.jpeg', 'pictures/bar11.jpeg',
  'pictures/bar12.jpeg', 'pictures/bar14.jpeg', 'pictures/bar15.jpeg', 'pictures/bar16.jpeg',
  'pictures/bar17.jpeg', 'pictures/bar18.jpeg', 'pictures/download.jpg', 'pictures/download1.jpg', 'pictures/download2.jpg'
];
document.querySelectorAll('img[src*="pexels"]').forEach((image, index) => {
  image.src = localArtwork[index % localArtwork.length];
  image.removeAttribute('srcset');
});
document.querySelectorAll('img').forEach((image) => {
  image.addEventListener('error', () => { image.src = 'pictures/bar4.jpeg'; }, { once: true });
});

// 3. Ambient Floating Particles
const particleHost = document.getElementById('particles');
if (particleHost && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (let i = 0; i < 14; i += 1) {
    const p = document.createElement('span');
    const s = Math.random() * 2 + 1;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 9 + 12}s;animation-delay:${Math.random() * -12}s`;
    particleHost.appendChild(p);
  }
}

// 4. Hero Slider Component
const heroBg = document.querySelector('.hero-bg');
const heroSlides = [
  {
    id: 'breaking-bad',
    image: 'pictures/hero-breaking-bad.jpg',
    kicker: 'Prestige Drama · 16 Primetime Emmys',
    title: 'Breaking <span class="grad">Bad</span>',
    plainTitle: 'Breaking Bad',
    meta: '<span class="rating"><i class="fas fa-star"></i> 9.5 IMDb</span><span class="dot-sep"></span><span>5 Seasons</span><span class="dot-sep"></span><span>2008–2013</span><span class="dot-sep"></span><span>Crime · Drama · Thriller</span>',
    desc: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family’s financial future.',
    fallback: 'pictures/hero-breaking-bad.jpg'
  },
  {
    id: 'the-walking-dead',
    image: 'pictures/hero-the-walking-dead.jpg',
    kicker: 'AMC Epic Series · 11 Seasons Complete',
    title: 'The Walking <span class="grad">Dead</span>',
    plainTitle: 'The Walking Dead',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.6 IMDb</span><span class="dot-sep"></span><span>11 Seasons</span><span class="dot-sep"></span><span>2010–2022</span><span class="dot-sep"></span><span>Post-Apocalyptic · Horror · Drama</span>',
    desc: 'Sheriff Deputy Rick Grimes wakes from a coma into a desolate world overrun by the dead, leading a determined group of survivors in a ruthless struggle for humanity.',
    fallback: 'pictures/hero-the-walking-dead.jpg'
  },
  {
    id: 'suits',
    image: 'pictures/hero-suits.jpg',
    kicker: 'Prestige Drama · 9 Seasons Complete',
    title: 'Suits <span class="grad">Legacy</span>',
    plainTitle: 'Suits',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.5 IMDb</span><span class="dot-sep"></span><span>9 Seasons</span><span class="dot-sep"></span><span>2011–2019</span><span class="dot-sep"></span><span>Legal Drama · Comedy · Thriller</span>',
    desc: 'Top Manhattan corporate lawyer Harvey Specter and executive Donna Paulsen navigate high-stakes legal warfare and power plays at Pearson Specter Litt.',
    fallback: 'pictures/hero-suits.jpg'
  },
  {
    id: 'money-heist',
    image: 'pictures/hero-money-heist.jpg',
    kicker: 'Global Phenomenon · 5 Parts Complete',
    title: 'Money <span class="grad">Heist</span>',
    plainTitle: 'Money Heist',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.2 IMDb</span><span class="dot-sep"></span><span>5 Parts</span><span class="dot-sep"></span><span>2017–2021</span><span class="dot-sep"></span><span>Crime · Heist · Thriller</span>',
    desc: 'An enigmatic mastermind known as "The Professor" recruits eight thieves with city code names to execute an ambitious multi-billion euro heist on the Royal Mint of Spain.',
    fallback: 'pictures/hero-money-heist.jpg'
  },
  {
    id: 'ozark',
    image: 'pictures/hero-ozark.jpg',
    kicker: 'Emmy Winner · 4 Seasons Complete',
    title: 'Oz<span class="grad">ark</span>',
    plainTitle: 'Ozark',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.5 IMDb</span><span class="dot-sep"></span><span>4 Seasons</span><span class="dot-sep"></span><span>2017–2022</span><span class="dot-sep"></span><span>Crime · Drama · Thriller</span>',
    desc: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million for a ruthless Mexican drug cartel to keep his family alive.',
    fallback: 'pictures/hero-ozark.jpg'
  },
  {
    id: 'dark',
    image: 'pictures/hero-dark.jpg',
    kicker: 'Sci-Fi Masterpiece · 3 Cycles Complete',
    title: 'D<span class="grad">ARK</span>',
    plainTitle: 'Dark',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.7 IMDb</span><span class="dot-sep"></span><span>3 Cycles</span><span class="dot-sep"></span><span>2017–2020</span><span class="dot-sep"></span><span>Sci-Fi · Mystery · Time-Travel</span>',
    desc: 'A missing child sets four connected families on a frantic hunt for answers, unearthing a mind-bending time-travel conspiracy spanning three generations in Winden.',
    fallback: 'pictures/hero-dark.jpg'
  }
];

const dots = [...document.querySelectorAll('.hero-pagination button')];
let slideIndex = 0;

const setHeroSlide = (index) => {
  slideIndex = (index + heroSlides.length) % heroSlides.length;
  const activeIndex = slideIndex;
  const slide = heroSlides[activeIndex];

  heroBg?.classList.add('is-changing');
  document.querySelector('.hero-content')?.classList.add('is-changing');

  window.setTimeout(() => {
    heroBg?.style.setProperty('--hero-image', `url("${slide.image}")`);
    const preload = new Image();
    preload.onerror = () => {
      if (slideIndex === activeIndex) heroBg?.style.setProperty('--hero-image', `url("${slide.fallback}")`);
    };
    preload.src = slide.image;

    const kicker = document.getElementById('hero-kicker');
    if (kicker) kicker.innerHTML = `<span class="live-dot"></span>${slide.kicker}`;

    const title = document.getElementById('hero-title');
    if (title) title.innerHTML = slide.title;

    const meta = document.getElementById('hero-meta');
    if (meta) meta.innerHTML = slide.meta;

    const desc = document.getElementById('hero-desc');
    if (desc) desc.textContent = slide.desc;

    heroBg?.classList.remove('is-changing');
    document.querySelector('.hero-content')?.classList.remove('is-changing');

    // Update hero watchlist button
    updateHeroWatchlistBtn();
  }, 240);

  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === slideIndex));
};

setHeroSlide(0);
dots.forEach((dot, index) => dot.addEventListener('click', () => setHeroSlide(index)));
document.getElementById('heroPrevBtn')?.addEventListener('click', () => setHeroSlide(slideIndex - 1));
document.getElementById('heroNextBtn')?.addEventListener('click', () => setHeroSlide(slideIndex + 1));

// Hero autoplay timer
let heroAutoTimer = window.setInterval(() => setHeroSlide(slideIndex + 1), 7500);
const resetHeroTimer = () => {
  clearInterval(heroAutoTimer);
  heroAutoTimer = window.setInterval(() => setHeroSlide(slideIndex + 1), 7500);
};
['heroPrevBtn', 'heroNextBtn'].forEach((id) => document.getElementById(id)?.addEventListener('click', resetHeroTimer));

// 5. Hero CTA Actions (Watch Now & Watch Trailer)
const heroWatchNowBtn = document.querySelector('.hero-cta .btn-primary');
const heroWatchTrailerBtn = document.querySelector('.hero-cta .btn-ghost');

heroWatchNowBtn?.addEventListener('click', () => {
  const currentSlide = heroSlides[slideIndex];
  const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(currentSlide.plainTitle || currentSlide.id) : null;
  if (item && typeof EclipsaPlayer !== 'undefined') {
    const firstEp = item.episodes?.[0] || null;
    EclipsaPlayer.open(item, firstEp);
  } else if (typeof EclipsaPlayer !== 'undefined') {
    EclipsaPlayer.open({
      title: currentSlide.plainTitle,
      year: '2024',
      quality: '4K Ultra HD',
      backdrop: currentSlide.image,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    });
  }
});

heroWatchTrailerBtn?.addEventListener('click', () => {
  const currentSlide = heroSlides[slideIndex];
  const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(currentSlide.plainTitle || currentSlide.id) : null;
  if (item && typeof EclipsaPlayer !== 'undefined') {
    EclipsaPlayer.open(item, null, true);
  } else if (typeof EclipsaPlayer !== 'undefined') {
    EclipsaPlayer.open({
      title: `${currentSlide.plainTitle} (Trailer)`,
      year: '2024',
      quality: '4K Ultra HD',
      backdrop: currentSlide.image,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    }, null, true);
  }
});

// 6. Intersection Observers (Reveal & Stats Counter)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => revealObserver.observe(el));

const animateCounter = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / 1000, 1);
    el.textContent = Math.round(target * (1 - (1 - p) ** 3)).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
};
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

// 7. Horizontal Scrollers & Ripple Effects
document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector(button.dataset.scroll)?.scrollBy({
      left: Number(button.dataset.dir) * 440,
      behavior: 'smooth'
    });
  });
});
document.querySelectorAll('.row-scroller').forEach((scroller) => {
  scroller.scrollLeft = 0;
});

document.querySelectorAll('[data-ripple]').forEach((button) => {
  button.addEventListener('click', (event) => {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - rect.left - size / 2}px;top:${event.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  });
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  navLinks?.classList.toggle('is-open', !open);
});

// Theme switcher
const themeToggle = document.querySelector('.theme-toggle');
if (localStorage.getItem('eclipsa-theme') === 'light') document.body.classList.add('light-theme');
const updateThemeButton = () => {
  const light = document.body.classList.contains('light-theme');
  themeToggle?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  themeToggle?.querySelector('i')?.classList.toggle('fa-moon', light);
  themeToggle?.querySelector('i')?.classList.toggle('fa-sun', !light);
};
updateThemeButton();
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('eclipsa-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  updateThemeButton();
});

// Countdown timer
(function countdown() {
  const target = Date.now() + 18 * 86400000 + 6 * 3600000;
  const update = () => {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    [['cd-days', 86400], ['cd-hours', 3600], ['cd-mins', 60], ['cd-secs', 1]].forEach(([id, unit]) => {
      const el = document.getElementById(id);
      const n = Math.floor(s / unit);
      s %= unit;
      if (el) el.textContent = String(n).padStart(2, '0');
    });
  };
  update();
  setInterval(update, 1000);
}());

// 8. User Session Sync
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
      }
    } catch (e) {}
  } else {
    // Provide default guest session
    const guestUser = {
      name: 'Guest Explorer',
      email: 'guest@eclipsa.stream',
      initial: 'G',
      loggedIn: true,
      isGuest: true
    };
    localStorage.setItem('eclipsa_user', JSON.stringify(guestUser));
    if (signInLink) signInLink.style.display = 'none';
    if (avatarBtn) {
      avatarBtn.style.display = 'flex';
      avatarBtn.textContent = 'G';
    }
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

// 9. Interactive Real-Time Search System
(function initSearchSystem() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const dropdown = document.getElementById('searchResultsDropdown');

  if (!searchInput || !dropdown) return;

  const buildSearchDatabase = () => {
    const items = [];
    const seen = new Set();

    // 1. From ECLIPSA_CATALOG
    if (typeof ECLIPSA_CATALOG !== 'undefined') {
      ECLIPSA_CATALOG.forEach((catItem) => {
        const key = catItem.title.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          items.push({
            title: catItem.title,
            image: catItem.poster || catItem.backdrop,
            metaText: `${catItem.year || '2024'} • ${catItem.genres?.[0] || 'Drama'} • ${catItem.rating} ★`,
            catalogItem: catItem
          });
        }
      });
    }

    // 2. From Hero Slides
    heroSlides.forEach((slide) => {
      const titleText = slide.plainTitle;
      const key = titleText.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        items.push({
          title: titleText,
          image: slide.image,
          metaText: slide.kicker,
          catalogItem: typeof findMediaByTitle === 'function' ? findMediaByTitle(titleText) : null
        });
      }
    });

    // 3. From DOM cards
    document.querySelectorAll('.movie-card').forEach((card) => {
      const h5 = card.querySelector('h5');
      const img = card.querySelector('.card-media img') || card.querySelector('img');
      const tags = card.querySelector('.card-tags');
      if (h5 && img) {
        const titleText = h5.textContent.trim();
        const key = titleText.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          items.push({
            title: titleText,
            image: img.src,
            metaText: tags ? tags.textContent.replace(/\s+/g, ' ').trim() : 'Popular Title',
            element: card,
            catalogItem: typeof findMediaByTitle === 'function' ? findMediaByTitle(titleText) : null
          });
        }
      }
    });

    return items;
  };

  let searchDatabase = [];

  const renderResults = (query) => {
    if (!searchDatabase.length) searchDatabase = buildSearchDatabase();
    const q = query.toLowerCase().trim();

    if (!q) {
      dropdown.classList.remove('is-open');
      dropdown.innerHTML = '';
      return;
    }

    const matches = searchDatabase.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.metaText.toLowerCase().includes(q)
    ).slice(0, 8);

    dropdown.innerHTML = '';

    if (matches.length > 0) {
      const header = document.createElement('div');
      header.className = 'search-results-header';
      header.innerHTML = `<span>Results</span><span class="count">${matches.length} titles</span>`;
      dropdown.appendChild(header);

      matches.forEach((item) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'search-item';
        btn.innerHTML = `
          <img class="search-item-thumb" src="${item.image}" alt="${item.title}" onerror="this.src='pictures/bar4.jpeg'">
          <div class="search-item-info">
            <div class="search-item-title">${item.title}</div>
            <div class="search-item-meta">${item.metaText}</div>
          </div>
          <span class="search-item-play"><i class="fas fa-play"></i></span>
        `;

        btn.addEventListener('click', () => {
          dropdown.classList.remove('is-open');
          searchInput.value = item.title;

          // If catalog item exists, open Detail Modal directly!
          if (item.catalogItem && typeof EclipsaModal !== 'undefined') {
            EclipsaModal.open(item.catalogItem);
          } else if (item.element) {
            item.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            item.element.classList.add('search-highlight');
            setTimeout(() => item.element.classList.remove('search-highlight'), 1800);
            item.element.click();
          }
        });

        dropdown.appendChild(btn);
      });
    } else {
      dropdown.innerHTML = `
        <div class="search-no-results">
          <i class="fas fa-film"></i>
          <div>No titles found for "<strong>${query}</strong>"</div>
          <div style="font-size: 11.5px; opacity: .7; margin-top: 4px;">Try searching for Breaking Bad, Dune, Batman, Suits, or Sci-Fi</div>
        </div>
      `;
    }

    dropdown.classList.add('is-open');
  };

  searchInput.addEventListener('input', (e) => renderResults(e.target.value));
  searchInput.addEventListener('focus', (e) => {
    if (e.target.value.trim()) renderResults(e.target.value);
  });
  searchBtn?.addEventListener('click', () => {
    const val = searchInput.value.trim();
    if (val) renderResults(val);
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const firstItem = dropdown.querySelector('.search-item');
      if (firstItem) firstItem.click();
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('is-open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchWrap')) {
      dropdown.classList.remove('is-open');
    }
  });
  const pendingSearch = sessionStorage.getItem('eclipsa_pending_search');
  if (pendingSearch) {
    sessionStorage.removeItem('eclipsa_pending_search');
    searchInput.value = pendingSearch;
    renderResults(pendingSearch);
    searchInput.focus();
  }
}());

// 10. Genre Filter System (Fixed & Enhanced)
(function initGenreFilterSystem() {
  const filterPills = document.querySelectorAll('.filter-pill');
  if (!filterPills.length) return;

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const filter = pill.getAttribute('data-filter').toLowerCase().trim();
      const cards = document.querySelectorAll('.movie-card');
      const sections = document.querySelectorAll('section.wrap:not(.hero)');

      if (filter === 'all') {
        sections.forEach((sec) => (sec.style.display = ''));
        cards.forEach((card) => (card.style.display = ''));
        return;
      }

      cards.forEach((card) => {
        const h5 = card.querySelector('h5');
        const tags = card.querySelector('.card-tags');
        const text = `${h5?.textContent || ''} ${tags?.textContent || ''}`.toLowerCase();

        let matches = text.includes(filter);

        // Cross-reference ECLIPSA_CATALOG for comprehensive genre tags
        if (!matches && h5 && typeof findMediaByTitle === 'function') {
          const item = findMediaByTitle(h5.textContent.trim());
          if (item && item.genres) {
            matches = item.genres.some((g) => g.toLowerCase().includes(filter));
          }
        }

        // Special handling for trending
        if (filter === 'trending') {
          matches = !!card.querySelector('.card-badge.rank') || !!card.closest('#trending');
        }

        card.style.display = matches ? '' : 'none';
      });

      // Keep section visible ONLY if it has matching visible cards
      sections.forEach((sec) => {
        const visibleInSec = sec.querySelectorAll('.movie-card:not([style*="display: none"])');
        sec.style.display = visibleInSec.length > 0 ? '' : 'none';
      });
    });
  });
}());

// 11. Watchlist & Global Toast System
const STORAGE_KEY = 'eclipsa_watchlist';

const getWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
};

const saveWatchlist = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  updateWatchlistUI();
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
    showGlobalToast(`Removed "${item.title}" from My List`);
  } else {
    list.push(item);
    added = true;
    showGlobalToast(`Added "${item.title}" to My List`);
  }

  saveWatchlist(list);
  window.dispatchEvent(new CustomEvent('eclipsa:watchlist_change', { detail: list }));
  return added;
};

const showGlobalToast = (message) => {
  const toast = document.getElementById('globalToast');
  if (!toast) return;
  toast.querySelector('.toast-text').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
};

const updateHeroWatchlistBtn = () => {
  const heroAddBtn = document.getElementById('heroAddListBtn');
  if (!heroAddBtn) return;
  const currentSlide = heroSlides[slideIndex];
  const bookmarked = isBookmarked(currentSlide.plainTitle);
  heroAddBtn.classList.toggle('is-bookmarked', bookmarked);
  heroAddBtn.querySelector('i').className = bookmarked ? 'fas fa-check' : 'fas fa-plus';
};

const updateWatchlistUI = () => {
  const list = getWatchlist();
  const count = list.length;

  const navCount = document.getElementById('navWatchlistCount');
  if (navCount) navCount.textContent = count;

  const navMyListBadge = document.getElementById('navMyListBadge');
  if (navMyListBadge) {
    navMyListBadge.textContent = count;
    navMyListBadge.classList.toggle('is-empty', count === 0);
  }

  const drawerPill = document.getElementById('watchlistCountPill');
  if (drawerPill) drawerPill.textContent = `${count} Saved`;

  document.querySelectorAll('.card-bookmark-btn').forEach((btn) => {
    const cardTitle = btn.getAttribute('data-title');
    if (cardTitle) {
      const bookmarked = isBookmarked(cardTitle);
      btn.classList.toggle('is-bookmarked', bookmarked);
      btn.querySelector('i').className = bookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
    }
  });

  updateHeroWatchlistBtn();
  renderDrawerBody(list);
};

const renderDrawerBody = (list) => {
  const body = document.getElementById('watchlistBody');
  if (!body) return;

  if (list.length === 0) {
    body.innerHTML = `
      <div class="watchlist-empty">
        <i class="far fa-bookmark"></i>
        <h4>Your Watchlist is Empty</h4>
        <p>Click the bookmark icon on any movie or series to save it to your personal list.</p>
      </div>
    `;
    return;
  }

  body.innerHTML = list
    .map(
      (item) => `
      <div class="watchlist-item">
        <img class="watchlist-item-thumb" src="${item.image}" alt="${item.title}" onerror="this.src='pictures/bar4.jpeg'">
        <div class="watchlist-item-info">
          <div class="watchlist-item-title">${item.title}</div>
          <div class="watchlist-item-meta">${item.meta || 'Saved Item'}</div>
        </div>
        <div class="watchlist-item-actions">
          <button class="watchlist-btn-play" data-play-title="${item.title.replace(/"/g, '&quot;')}" title="Play Title"><i class="fas fa-play"></i></button>
          <button class="watchlist-btn-remove" data-remove-title="${item.title.replace(/"/g, '&quot;')}" title="Remove from list"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `
    )
    .join('');

  // Wire Play in Watchlist
  body.querySelectorAll('[data-play-title]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-play-title');
      const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(title) : null;
      if (item && typeof EclipsaPlayer !== 'undefined') {
        EclipsaPlayer.open(item);
      } else if (typeof EclipsaPlayer !== 'undefined') {
        EclipsaPlayer.open({
          title,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
        });
      }
    });
  });

  // Wire Remove in Watchlist
  body.querySelectorAll('[data-remove-title]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const titleToRemove = btn.getAttribute('data-remove-title');
      toggleWatchlist({ title: titleToRemove });
    });
  });
};

// 12. Hook Up Movie Cards with Video Player & Detail Modal
(function initMovieCardsInteractivity() {
  const buildWatchlistEntry = (title, img, tags, fallbackType = 'movie') => {
    const media = typeof findMediaByTitle === 'function' ? findMediaByTitle(title) : null;
    const tagValues = tags ? Array.from(tags.children).map((node) => node.textContent.trim()).filter(Boolean) : [];
    const ratingFromCard = tags?.querySelector('.star-rating')?.textContent.match(/\d+(?:\.\d+)?/)?.[0];
    const yearFromCard = tagValues.find((value) => /^\d{4}(?:\s*[–-]\s*\d{4})?$/.test(value));
    const genreFromCard = tagValues.filter((value) => value !== '•' && value !== yearFromCard && !value.includes(ratingFromCard || '\u0000')).at(-1);
    const badgeType = ['movie', 'series', 'anime'].includes(fallbackType) ? fallbackType : 'movie';
    const rating = media?.rating || ratingFromCard || '';
    const year = media?.year || yearFromCard || '';
    const genres = media?.genres || (genreFromCard ? genreFromCard.split(/[·,]/).map((genre) => genre.trim()).filter(Boolean) : []);
    return {
      title: media?.title || title,
      image: media?.poster || img?.getAttribute('src') || 'pictures/bar4.jpeg',
      type: media?.type || badgeType,
      rating,
      year,
      genres,
      meta: [rating, year, genres.join(' · ')].filter(Boolean).join(' • ')
    };
  };

  document.querySelectorAll('.movie-card').forEach((card) => {
    const media = card.querySelector('.card-media');
    const h5 = card.querySelector('h5');
    const img = media ? media.querySelector('img') : null;
    const tags = card.querySelector('.card-tags');
    const playBtn = card.querySelector('.card-play');

    if (!h5) return;
    const title = h5.textContent.trim();

    // 1. Add Bookmark Button if not already there
    if (media && !media.querySelector('.card-bookmark-btn')) {
      const bookmarkBtn = document.createElement('button');
      bookmarkBtn.className = 'card-bookmark-btn';
      bookmarkBtn.setAttribute('type', 'button');
      bookmarkBtn.setAttribute('data-title', title);
      bookmarkBtn.setAttribute('aria-label', `Bookmark ${title}`);
      bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';

      bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWatchlist(buildWatchlistEntry(title, img, tags, card.querySelector('.card-badge')?.textContent.trim().toLowerCase()));
      });

      media.appendChild(bookmarkBtn);
    }

    // 2. Play Button -> Launch Cinema Video Player
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

    // 3. Card Body Click -> Open Detail Quick-View Modal
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
          age: 'TV-MA',
          quality: '4K Ultra HD',
          desc: `Experience ${title} streaming in ultra-high definition on Eclipsa with crisp spatial audio and zero buffering.`,
          genres: tags ? tags.textContent.split('·').map(s => s.trim()) : ['Action', 'Drama'],
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
        };
        EclipsaModal.open(fallbackItem);
      }
    });
  });

  // Hero Add to List button click
  document.getElementById('heroAddListBtn')?.addEventListener('click', () => {
    const currentSlide = heroSlides[slideIndex];
    const media = typeof findMediaByTitle === 'function' ? findMediaByTitle(currentSlide.plainTitle) : null;
    const genres = media?.genres || [];
    toggleWatchlist({
      title: media?.title || currentSlide.plainTitle,
      image: media?.poster || currentSlide.image,
      type: media?.type || 'series',
      rating: media?.rating || '',
      year: media?.year || '',
      genres,
      meta: [media?.rating, media?.year, genres.join(' · ')].filter(Boolean).join(' • ')
    });
  });

  // Watchlist Drawer Controls
  const drawer = document.getElementById('watchlistDrawer');
  const overlay = document.getElementById('watchlistOverlay');
  const closeBtn = document.getElementById('watchlistCloseBtn');
  const userMenuWatchlistLink = document.querySelector('a[href="#watchlist"]');

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    drawer?.classList.add('is-open');
    overlay?.classList.add('is-open');
  };

  const closeDrawer = () => {
    drawer?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
  };

  userMenuWatchlistLink?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  // Sync with global custom event
  window.addEventListener('eclipsa:watchlist_change', () => {
    updateWatchlistUI();
  });

  updateWatchlistUI();
}());

// 13. Interactive Notifications Center
(function initNotificationsCenter() {
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
    document.querySelectorAll('.notif-unread-dot').forEach((dot) => (dot.style.display = 'none'));
    if (typeof showGlobalToast === 'function') {
      showGlobalToast('All notifications marked as read.');
    }
  });
  if (window.location.hash === '#notificationWrap') notifDropdown?.classList.add('is-open');
}());

// 14. Dynamic Continue Watching Shelf
(function initContinueWatchingShelf() {
  const container = document.getElementById('continue-grid');
  const section = document.getElementById('continue-watching');
  if (!container || !section) return;

  const STORAGE_KEY = 'eclipsa_continue_watching';

  const getRecords = () => {
    try {
      let records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (records.length === 0) {
        // Initialize high quality starter records so the shelf looks alive immediately
        records = [
          {
            id: 'breaking-bad',
            title: 'Breaking Bad',
            type: 'series',
            backdrop: 'pictures/hero-breaking-bad.jpg',
            poster: 'Series pictures/download.jpg',
            currentTime: 2150,
            duration: 3300,
            percent: 65,
            episodeTitle: 'S5:E14 "Ozymandias"',
            timestamp: Date.now() - 3600000
          },
          {
            id: 'dune-2',
            title: 'Dune: Part Two',
            type: 'movie',
            backdrop: 'pictures/genre-scifi.jpg',
            poster: 'Movies pictures/Dune_ Part Two.jpg',
            currentTime: 4200,
            duration: 9960,
            percent: 42,
            episodeTitle: '4K Ultra HD',
            timestamp: Date.now() - 86400000
          },
          {
            id: 'arcane',
            title: 'Arcane',
            type: 'series',
            backdrop: 'pictures/hero-neon-quest.png',
            poster: 'Series pictures/Arcane.jpg',
            currentTime: 1400,
            duration: 2580,
            percent: 54,
            episodeTitle: 'S1:E2 "Some Mysteries"',
            timestamp: Date.now() - 172800000
          }
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      }
      return records;
    } catch (e) {
      return [];
    }
  };

  const renderShelf = () => {
    const records = getRecords();

    if (records.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = '';
    container.innerHTML = records.map((rec) => {
      const remainingMinutes = Math.max(1, Math.round(((rec.duration || 3600) - (rec.currentTime || 0)) / 60));
      return `
        <article class="continue-card" data-id="${rec.id}">
          <div class="continue-thumb-wrap">
            <img src="${rec.backdrop || rec.poster || 'pictures/bar4.jpeg'}" alt="${rec.title}" loading="lazy" onerror="this.src='pictures/bar4.jpeg'">
            <div class="continue-play-overlay" title="Resume Playback"><i class="fas fa-play"></i></div>
            <button type="button" class="continue-remove-btn" data-remove-id="${rec.id}" title="Remove from list"><i class="fas fa-times"></i></button>
            <div class="continue-progress-wrap">
              <div class="continue-progress-fill" style="width: ${rec.percent || 20}%;"></div>
            </div>
          </div>
          <div class="continue-info">
            <h5 class="continue-title">${rec.title}</h5>
            <div class="continue-meta">
              <span>${rec.episodeTitle || 'Movie'}</span>
              <span>${remainingMinutes}m left</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Wire clicks
    container.querySelectorAll('.continue-card').forEach((card) => {
      const id = card.getAttribute('data-id');
      const rec = records.find((r) => r.id === id);

      // Remove button
      const removeBtn = card.querySelector('.continue-remove-btn');
      removeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const updated = records.filter((r) => r.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        renderShelf();
        if (typeof showGlobalToast === 'function') {
          showGlobalToast(`Removed "${rec?.title || 'Title'}" from Continue Watching`);
        }
      });

      // Card / Play Overlay Click -> Resume in Video Player!
      card.addEventListener('click', (e) => {
        if (e.target.closest('.continue-remove-btn')) return;
        const item = typeof findMediaByTitle === 'function' ? findMediaByTitle(rec.title || id) : null;
        if (item && typeof EclipsaPlayer !== 'undefined') {
          EclipsaPlayer.open(item);
        } else if (typeof EclipsaPlayer !== 'undefined') {
          EclipsaPlayer.open({
            title: rec.title,
            backdrop: rec.backdrop,
            poster: rec.poster,
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
          });
        }
      });
    });
  };

  renderShelf();

  // Re-render when new progress is saved during playback
  window.addEventListener('eclipsa:progress_update', () => {
    renderShelf();
  });
}());

