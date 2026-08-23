const navbar = document.getElementById('navbar');
const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const localArtwork = ['pictures/bar3.jpeg', 'pictures/bar4.jpeg', 'pictures/bar5.jpeg', 'pictures/bar7.jpeg', 'pictures/bar8.jpeg', 'pictures/bar9.jpeg', 'pictures/bar10.jpeg', 'pictures/bar11.jpeg', 'pictures/bar12.jpeg', 'pictures/bar14.jpeg', 'pictures/bar15.jpeg', 'pictures/bar16.jpeg', 'pictures/bar17.jpeg', 'pictures/bar18.jpeg', 'pictures/download.jpg', 'pictures/download1.jpg', 'pictures/download2.jpg'];
document.querySelectorAll('img[src*="pexels"]').forEach((image, index) => { image.src = localArtwork[index % localArtwork.length]; image.removeAttribute('srcset'); });
document.querySelectorAll('img').forEach((image) => image.addEventListener('error', () => { image.src = 'pictures/bar4.jpeg'; }, { once: true }));

// Supplied movie artwork, presented with the same cards used across the homepage.
(function renderMovieGallery() {
  const gallery = document.getElementById('movieGallery');
  if (!gallery) return;

  const movies = [
    ['Ice Age', '2002', 'Animation · Comedy', '_Ice Age_.jpg'],
    ['Rango', '2011', 'Animation · Adventure', 'Abigail Breslin.jpg'],
    ['Bad Boys', '1995', 'Action · Comedy', 'Bad Boys (1995).jpg'],
    ['Bruce Almighty', '2003', 'Comedy · Fantasy', 'Bruce Almighty (2003) [800 x 1200].jpg'],
    ["Don’t Look Up", '2021', 'Comedy · Drama', 'Cate Blanchett.jpg'],
    ['Charlie and the Chocolate Factory', '2005', 'Fantasy · Family', 'Charlie and the Chocolate Factory.jpg'],
    ['Coco', '2017', 'Animation · Family', 'Coco (2017).jpg'],
    ['Deadpool & Wolverine', '2024', 'Action · Comedy', 'Deadpool And Wolverine.jpg'],
    ['Dolittle', '2020', 'Fantasy · Family', 'Dolittle, 2020.jpg'],
    ['The Wolf of Wall Street', '2013', 'Comedy · Drama', 'download (2).jpg'],
    ['Gladiator', '2000', 'Action · Drama', 'download (3).jpg'],
    ['Avatar: Fire and Ash', '2025', 'Sci-Fi · Adventure', 'download (4).jpg'],
    ['Elemental', '2023', 'Animation · Romance', 'download (5).jpg'],
    ['Marty Supreme', '2025', 'Drama · Sport', 'download (6).jpg'],
    ['Jumanji: Welcome to the Jungle', '2017', 'Adventure · Comedy', 'download (7).jpg'],
    ['The Maze Runner', '2014', 'Sci-Fi · Thriller', 'download (8).jpg'],
    ['American Psycho', '2000', 'Crime · Thriller', 'download.jpg'],
    ['Dune: Part Two', '2024', 'Sci-Fi · Adventure', 'Dune_ Part Two.jpg'],
    ['Fantastic Beasts and Where to Find Them', '2016', 'Fantasy · Adventure', 'Fantastic Beasts And Where To Find Them.jpg'],
    ['Fight Club', '1999', 'Drama · Thriller', 'FIGHT CLUB.jpg'],
    ['Finding Nemo', '2003', 'Animation · Family', 'Finding Nemo (2003).jpg'],
    ['Home Alone', '1990', 'Comedy · Family', 'Home Alone, 1991.jpg'],
    ['Interstellar', '2014', 'Sci-Fi · Drama', 'interstellar (1).jpg'],
    ['Jurassic World Dominion', '2022', 'Action · Adventure', 'June #7.jpg'],
    ['Spider-Man: Across the Spider-Verse', '2023', 'Animation · Action', 'Marvel Spider-Man_ Across the Spider-Verse - Official One Sheet Wall Poster, 34L_ x 22_4W_, Premium Unframed Version.jpg'],
    ['The Matrix', '1999', 'Sci-Fi · Action', 'matrix poster.jpg'],
    ['John Wick', '2014', 'Action · Thriller', 'Movie Poster Design.jpg'],
    ["Mr. Bean’s Holiday", '2007', 'Comedy · Family', "Mr_ Bean's Holiday (2007).jpg"],
    ['Troy', '2004', 'Action · Drama', 'One of my favorite movies.jpg'],
    ['Pirates of the Caribbean', '2003', 'Adventure · Fantasy', 'pirates of carabian.jpg'],
    ['Real Steel', '2011', 'Action · Sci-Fi', 'Real Steel.jpg'],
    ['Rush Hour 2', '2001', 'Action · Comedy', 'Rush Hour 2.jpg'],
    ['Spider-Man 3', '2007', 'Action · Adventure', 'Spider-Man 3 (2007).jpg'],
    ['The Dark Knight', '2008', 'Action · Crime', 'THE DARK KNIGHT.jpg'],
    ['The Martian', '2015', 'Sci-Fi · Adventure', 'The Martian Movie Poster.jpg'],
    ['The Mask', '1994', 'Comedy · Fantasy', 'The Mask 🎭.jpg'],
    ['Uncharted', '2022', 'Action · Adventure', 'Uncharted.jpg'],
    ['War for the Planet of the Apes', '2017', 'Action · Sci-Fi', 'War for the Planet of the Apes poster.jpg'],
    ['White Chicks', '2004', 'Comedy · Crime', 'White Chicks _ iffa Film Posters 2025.jpg'],
    ['World War Z', '2013', 'Action · Horror', 'World War Z - 2013_____.jpg']
  ];

  gallery.innerHTML = movies.map(([title, year, genre, file]) => {
    const src = encodeURI(`Movies pictures/${file}`);
    return `<article class="movie-card movie-poster-card" data-ripple>
      <div class="card-media">
        <span class="card-badge blue">MOVIE</span>
        <img src="${src}" alt="${title} poster" loading="lazy">
        <div class="card-play"><i class="fas fa-play"></i></div>
      </div>
      <div class="card-info">
        <h5>${title}</h5>
        <div class="card-tags"><span>${year}</span><span class="sep">•</span><span>${genre}</span></div>
      </div>
    </article>`;
  }).join('');
}());

const particleHost = document.getElementById('particles');
if (particleHost && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) for (let i = 0; i < 14; i += 1) { const p = document.createElement('span'); const s = Math.random() * 2 + 1; p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 9 + 12}s;animation-delay:${Math.random() * -12}s`; particleHost.appendChild(p); }

const heroBg = document.querySelector('.hero-bg');
const heroSlides = [
  {
    image: 'pictures/hero-breaking-bad.jpg',
    kicker: 'Prestige Drama · 16 Primetime Emmys',
    title: 'Breaking <span class="grad">Bad</span>',
    meta: '<span class="rating"><i class="fas fa-star"></i> 9.5 IMDb</span><span class="dot-sep"></span><span>5 Seasons</span><span class="dot-sep"></span><span>2008–2013</span><span class="dot-sep"></span><span>Crime · Drama · Thriller</span>',
    desc: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family’s financial future.',
    fallback: 'pictures/hero-breaking-bad.jpg'
  },
  {
    image: 'pictures/hero-the-walking-dead.jpg',
    kicker: 'AMC Epic Series · 11 Seasons Complete',
    title: 'The Walking <span class="grad">Dead</span>',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.6 IMDb</span><span class="dot-sep"></span><span>11 Seasons</span><span class="dot-sep"></span><span>2010–2022</span><span class="dot-sep"></span><span>Post-Apocalyptic · Horror · Drama</span>',
    desc: 'Sheriff Deputy Rick Grimes wakes from a coma into a desolate world overrun by the dead, leading a determined group of survivors in a ruthless struggle for humanity.',
    fallback: 'pictures/hero-the-walking-dead.jpg'
  },
  {
    image: 'pictures/hero-suits.jpg',
    kicker: 'Prestige Drama · 9 Seasons Complete',
    title: 'Suits <span class="grad">Legacy</span>',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.5 IMDb</span><span class="dot-sep"></span><span>9 Seasons</span><span class="dot-sep"></span><span>2011–2019</span><span class="dot-sep"></span><span>Legal Drama · Comedy · Thriller</span>',
    desc: 'Top Manhattan corporate lawyer Harvey Specter and executive Donna Paulsen navigate high-stakes legal warfare and power plays at Pearson Specter Litt.',
    fallback: 'pictures/hero-suits.jpg'
  },
  {
    image: 'pictures/hero-money-heist.jpg',
    kicker: 'Global Phenomenon · 5 Parts Complete',
    title: 'Money <span class="grad">Heist</span>',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.2 IMDb</span><span class="dot-sep"></span><span>5 Parts</span><span class="dot-sep"></span><span>2017–2021</span><span class="dot-sep"></span><span>Crime · Heist · Thriller</span>',
    desc: 'An enigmatic mastermind known as "The Professor" recruits eight thieves with city code names to execute an ambitious multi-billion euro heist on the Royal Mint of Spain.',
    fallback: 'pictures/hero-money-heist.jpg'
  },
  {
    image: 'pictures/hero-ozark.jpg',
    kicker: 'Emmy Winner · 4 Seasons Complete',
    title: 'Oz<span class="grad">ark</span>',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.5 IMDb</span><span class="dot-sep"></span><span>4 Seasons</span><span class="dot-sep"></span><span>2017–2022</span><span class="dot-sep"></span><span>Crime · Drama · Thriller</span>',
    desc: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million for a ruthless Mexican drug cartel to keep his family alive.',
    fallback: 'pictures/hero-ozark.jpg'
  },
  {
    image: 'pictures/hero-dark.jpg',
    kicker: 'Sci-Fi Masterpiece · 3 Cycles Complete',
    title: 'D<span class="grad">ARK</span>',
    meta: '<span class="rating"><i class="fas fa-star"></i> 8.7 IMDb</span><span class="dot-sep"></span><span>3 Cycles</span><span class="dot-sep"></span><span>2017–2020</span><span class="dot-sep"></span><span>Sci-Fi · Mystery · Time-Travel</span>',
    desc: 'A missing child sets four connected families on a frantic hunt for answers, unearthing a mind-bending time-travel conspiracy spanning three generations in Winden.',
    fallback: 'pictures/hero-dark.jpg'
  }
];
const dots = [...document.querySelectorAll('.hero-pagination button')];
let slideIndex = 0;
const setHeroSlide = (index) => { slideIndex = (index + heroSlides.length) % heroSlides.length; const activeIndex = slideIndex; const slide = heroSlides[activeIndex]; heroBg?.classList.add('is-changing'); document.querySelector('.hero-content')?.classList.add('is-changing'); window.setTimeout(() => { heroBg?.style.setProperty('--hero-image', `url("${slide.image}")`); const preload = new Image(); preload.onerror = () => { if (slideIndex === activeIndex) heroBg?.style.setProperty('--hero-image', `url("${slide.fallback}")`); }; preload.src = slide.image; const kicker = document.getElementById('hero-kicker'); if (kicker) kicker.innerHTML = `<span class="live-dot"></span>${slide.kicker}`; const title = document.getElementById('hero-title'); if (title) title.innerHTML = slide.title; const meta = document.getElementById('hero-meta'); if (meta) meta.innerHTML = slide.meta; const desc = document.getElementById('hero-desc'); if (desc) desc.textContent = slide.desc; heroBg?.classList.remove('is-changing'); document.querySelector('.hero-content')?.classList.remove('is-changing'); }, 280); dots.forEach((dot, i) => dot.classList.toggle('is-active', i === slideIndex)); };
setHeroSlide(0);
setHeroSlide(0);
dots.forEach((dot, index) => dot.addEventListener('click', () => setHeroSlide(index)));
document.getElementById('heroPrevBtn')?.addEventListener('click', () => setHeroSlide(slideIndex - 1));
document.getElementById('heroNextBtn')?.addEventListener('click', () => setHeroSlide(slideIndex + 1));
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.setInterval(() => setHeroSlide(slideIndex + 1), 7000);

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => revealObserver.observe(el));
const animateCounter = (el) => { const target = Number(el.dataset.count); const suffix = el.dataset.suffix || ''; const start = performance.now(); const update = (now) => { const p = Math.min((now - start) / 1000, 1); el.textContent = Math.round(target * (1 - (1 - p) ** 3)).toLocaleString() + suffix; if (p < 1) requestAnimationFrame(update); }; requestAnimationFrame(update); };
const counterObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); } }), { threshold: .4 });
document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));
document.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => document.querySelector(button.dataset.scroll)?.scrollBy({ left: Number(button.dataset.dir) * 420, behavior: 'smooth' })));
document.querySelectorAll('.row-scroller').forEach((scroller) => { scroller.scrollLeft = 0; });
document.querySelectorAll('[data-ripple]').forEach((button) => button.addEventListener('click', (event) => { const rect = button.getBoundingClientRect(); const ripple = document.createElement('span'); const size = Math.max(rect.width, rect.height); ripple.className = 'ripple'; ripple.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - rect.left - size / 2}px;top:${event.clientY - rect.top - size / 2}px`; button.appendChild(ripple); window.setTimeout(() => ripple.remove(), 650); }));
const toggle = document.querySelector('.nav-toggle'); const links = document.querySelector('.nav-links'); toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); links?.classList.toggle('is-open', !open); });
const themeToggle = document.querySelector('.theme-toggle'); if (localStorage.getItem('eclipsa-theme') === 'light') document.body.classList.add('light-theme');
const updateThemeButton = () => { const light = document.body.classList.contains('light-theme'); themeToggle?.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); themeToggle?.querySelector('i')?.classList.toggle('fa-moon', light); themeToggle?.querySelector('i')?.classList.toggle('fa-sun', !light); }; updateThemeButton(); themeToggle?.addEventListener('click', () => { document.body.classList.toggle('light-theme'); localStorage.setItem('eclipsa-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); updateThemeButton(); });
(function countdown() { const target = Date.now() + 18 * 86400000 + 6 * 3600000; const update = () => { let s = Math.max(0, Math.floor((target - Date.now()) / 1000)); [['cd-days', 86400], ['cd-hours', 3600], ['cd-mins', 60], ['cd-secs', 1]].forEach(([id, unit]) => { const el = document.getElementById(id); const n = Math.floor(s / unit); s %= unit; if (el) el.textContent = String(n).padStart(2, '0'); }); }; update(); setInterval(update, 1000); }());

// Auth user session sync on homepage
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
    window.location.reload();
  });
}());
// Interactive Real-Time Search System
(function initSearchSystem() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const dropdown = document.getElementById('searchResultsDropdown');

  if (!searchInput || !dropdown) return;

  const getSearchDatabase = () => {
    const items = [];
    const seen = new Set();

    heroSlides.forEach((slide, index) => {
      const titleText = slide.title.replace(/<[^>]*>/g, '').replace('<br>', ' ').trim();
      if (!seen.has(titleText.toLowerCase())) {
        seen.add(titleText.toLowerCase());
        items.push({
          title: titleText,
          image: slide.image,
          metaText: slide.kicker,
          isHero: true,
          heroIndex: index
        });
      }
    });

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
            element: card
          });
        }
      }
    });

    return items;
  };

  let searchDatabase = [];

  const renderResults = (query) => {
    if (!searchDatabase.length) searchDatabase = getSearchDatabase();
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
        `;

        btn.addEventListener('click', () => {
          dropdown.classList.remove('is-open');
          searchInput.value = item.title;

          if (item.isHero) {
            setHeroSlide(item.heroIndex);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (item.element) {
            item.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            item.element.classList.add('search-highlight');
            setTimeout(() => item.element.classList.remove('search-highlight'), 1800);
          }
        });

        dropdown.appendChild(btn);
      });
    } else {
      dropdown.innerHTML = `
        <div class="search-no-results">
          <i class="fas fa-film"></i>
          <div>No titles found for "<strong>${query}</strong>"</div>
          <div style="font-size: 11.5px; opacity: .7; margin-top: 4px;">Try searching for Breaking Bad, Suits, Action, or Sci-Fi</div>
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
      if (firstItem) {
        firstItem.click();
      } else {
        renderResults(searchInput.value);
      }
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('is-open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchWrap')) {
      dropdown.classList.remove('is-open');
    }
  });
}());

// Genre Filter System
(function initGenreFilterSystem() {
  const filterPills = document.querySelectorAll('.filter-pill');
  if (!filterPills.length) return;

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const filter = pill.getAttribute('data-filter');
      const cards = document.querySelectorAll('.movie-card');
      const sections = document.querySelectorAll('section.wrap:not(.hero)');

      if (filter === 'all') {
        sections.forEach((sec) => (sec.style.display = ''));
        cards.forEach((card) => (card.style.display = ''));
        return;
      }

      cards.forEach((card) => {
        const text = (card.textContent || '').toLowerCase();
        if (text.includes(filter.toLowerCase())) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      sections.forEach((sec) => {
        const visibleInSec = sec.querySelectorAll('.movie-card:not([style*="display: none"])');
        const secTitle = (sec.querySelector('.section-title')?.textContent || '').toLowerCase();
        if (visibleInSec.length > 0 || secTitle.includes(filter.toLowerCase())) {
          sec.style.display = '';
          sec.querySelectorAll('.movie-card').forEach((c) => (c.style.display = ''));
        } else {
          sec.style.display = 'none';
        }
      });
    });
  });
}());

// Watchlist & Bookmark Management System
(function initWatchlistSystem() {
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
      showToast(`Removed "${item.title}" from My List`);
    } else {
      list.push(item);
      added = true;
      showToast(`Added "${item.title}" to My List`);
    }

    saveWatchlist(list);
    return added;
  };

  const showToast = (message) => {
    const toast = document.getElementById('globalToast');
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  };

  const updateWatchlistUI = () => {
    const list = getWatchlist();
    const count = list.length;

    const navCount = document.getElementById('navWatchlistCount');
    if (navCount) navCount.textContent = count;

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

    const heroTitleEl = document.getElementById('hero-title');
    const heroAddBtn = document.getElementById('heroAddListBtn');
    if (heroTitleEl && heroAddBtn) {
      const heroTitleText = heroTitleEl.textContent.trim();
      const bookmarked = isBookmarked(heroTitleText);
      heroAddBtn.querySelector('i').className = bookmarked ? 'fas fa-check' : 'fas fa-plus';
    }

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
            <button class="watchlist-btn-play" title="Play Title" onclick="alert('Starting playback for ${item.title.replace(/'/g, "\\'")}...')"><i class="fas fa-play"></i></button>
            <button class="watchlist-btn-remove" data-remove-title="${item.title.replace(/"/g, '&quot;')}" title="Remove from list"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `
      )
      .join('');

    body.querySelectorAll('[data-remove-title]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const titleToRemove = btn.getAttribute('data-remove-title');
        toggleWatchlist({ title: titleToRemove });
      });
    });
  };

  document.querySelectorAll('.movie-card').forEach((card) => {
    const media = card.querySelector('.card-media');
    const h5 = card.querySelector('h5');
    const img = media ? media.querySelector('img') : null;
    const tags = card.querySelector('.card-tags');

    if (media && h5) {
      const title = h5.textContent.trim();
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
          meta: tags ? tags.textContent.trim() : 'Popular Title'
        });
      });

      media.appendChild(bookmarkBtn);
    }
  });

  document.getElementById('heroAddListBtn')?.addEventListener('click', () => {
    const heroTitleEl = document.getElementById('hero-title');
    const heroMetaEl = document.getElementById('hero-meta');

    if (heroTitleEl) {
      const title = heroTitleEl.textContent.trim();
      const meta = heroMetaEl ? heroMetaEl.textContent.trim() : '';
      const slide = typeof heroSlides !== 'undefined' ? heroSlides[typeof slideIndex !== 'undefined' ? slideIndex : 0] : null;

      toggleWatchlist({
        title,
        image: slide ? slide.image : 'pictures/hero-breaking-bad.jpg',
        meta
      });
    }
  });

  const drawer = document.getElementById('watchlistDrawer');
  const overlay = document.getElementById('watchlistOverlay');
  const closeBtn = document.getElementById('watchlistCloseBtn');
  const navMyListLink = document.getElementById('navMyListLink');

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    drawer?.classList.add('is-open');
    overlay?.classList.add('is-open');
  };

  const closeDrawer = () => {
    drawer?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
  };

  navMyListLink?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  updateWatchlistUI();
}());
