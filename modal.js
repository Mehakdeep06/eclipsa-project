/**
 * ECLIPSA PLATFORM — Movie & Series Quick-View / Detail Modal
 * Features backdrop hero, metadata badges, interactive Season/Episode selector,
 * direct Play/Trailer actions, watchlist synchronization, and recommendations.
 */

const EclipsaModal = (() => {
  let modalEl = null;
  let currentItem = null;

  const initDOM = () => {
    if (document.getElementById('eclipsaDetailModal')) {
      modalEl = document.getElementById('eclipsaDetailModal');
      return;
    }

    const html = `
      <div class="detail-modal-overlay" id="eclipsaDetailModal" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="detail-modal-container" id="detailModalContainer">
          <!-- Close Button -->
          <button class="detail-modal-close" id="detailModalCloseBtn" aria-label="Close dialog">
            <i class="fas fa-times"></i>
          </button>

          <!-- Modal Hero Banner with Backdrop -->
          <div class="detail-hero-banner" id="detailHeroBanner">
            <div class="detail-banner-backdrop" id="detailBannerBackdrop"></div>
            <div class="detail-banner-vignette"></div>

            <div class="detail-banner-content">
              <span class="detail-kicker" id="detailKicker">Eclipsa Original</span>
              <h1 class="detail-title" id="detailTitle">Title</h1>

              <!-- Badges -->
              <div class="detail-badge-row" id="detailBadgeRow">
                <span class="badge-match" id="detailMatch">98% Match</span>
                <span class="badge-rating"><i class="fas fa-star"></i> <strong id="detailRating">9.5</strong> IMDb</span>
                <span class="badge-year" id="detailYear">2024</span>
                <span class="badge-age" id="detailAge">TV-MA</span>
                <span class="badge-duration" id="detailDuration">5 Seasons</span>
                <span class="badge-spec" id="detailQuality"><i class="fas fa-tv"></i> 4K Ultra HD</span>
              </div>

              <!-- Main Actions CTA -->
              <div class="detail-actions-row">
                <button class="btn btn-primary detail-play-btn" id="detailPlayBtn" data-ripple>
                  <i class="fas fa-play"></i>
                  <span>Play</span>
                </button>
                <button class="btn btn-ghost detail-trailer-btn" id="detailTrailerBtn" data-ripple>
                  <i class="fas fa-film"></i>
                  <span>Trailer</span>
                </button>
                <button class="btn-circle-icon detail-watchlist-btn" id="detailWatchlistBtn" title="Add to My List" aria-label="Add to Watchlist">
                  <i class="fas fa-plus"></i>
                </button>
                <button class="btn-circle-icon detail-share-btn" id="detailShareBtn" title="Share Title" aria-label="Share">
                  <i class="fas fa-share-nodes"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Modal Body Content -->
          <div class="detail-body-content">
            <div class="detail-body-grid">
              <!-- Left Column: Synopsis & Episodes -->
              <div class="detail-main-col">
                <p class="detail-synopsis" id="detailSynopsis"></p>

                <!-- Interactive Episodes Section (for Series) -->
                <div class="detail-episodes-section" id="detailEpisodesSection" style="display:none;">
                  <div class="episodes-header">
                    <h3>Episodes</h3>
                    <div class="season-select-wrap">
                      <select class="season-select" id="seasonSelect" aria-label="Select Season">
                        <option value="1">Season 1</option>
                      </select>
                    </div>
                  </div>
                  <div class="episodes-list" id="episodesList">
                    <!-- Injected dynamically -->
                  </div>
                </div>

                <!-- More Like This Recommendations -->
                <div class="detail-recommendations-section">
                  <h3>More Like This</h3>
                  <div class="recommendations-grid" id="recommendationsGrid">
                    <!-- Injected dynamically -->
                  </div>
                </div>
              </div>

              <!-- Right Column: Cast, Director, Metadata Tags -->
              <div class="detail-sidebar-col">
                <div class="detail-meta-group">
                  <span class="meta-label">Cast:</span>
                  <div class="meta-names" id="detailCast"></div>
                </div>

                <div class="detail-meta-group">
                  <span class="meta-label">Director / Creator:</span>
                  <div class="meta-names" id="detailDirector"></div>
                </div>

                <div class="detail-meta-group">
                  <span class="meta-label">Genres:</span>
                  <div class="meta-pills" id="detailGenres"></div>
                </div>

                <div class="detail-meta-group">
                  <span class="meta-label">Audio &amp; Subtitles:</span>
                  <p class="meta-text" id="detailAudio">Dolby Atmos, English [Original], Spanish, French, German</p>
                </div>

                <div class="detail-meta-group">
                  <span class="meta-label">Maturity Rating:</span>
                  <div class="maturity-badge-wrap">
                    <span class="maturity-badge" id="detailMaturity">TV-MA</span>
                    <span class="maturity-desc">Recommended for mature audiences. May contain strong violence, language.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    modalEl = document.getElementById('eclipsaDetailModal');

    setupEventListeners();
  };

  const setupEventListeners = () => {
    const closeBtn = document.getElementById('detailModalCloseBtn');
    const playBtn = document.getElementById('detailPlayBtn');
    const trailerBtn = document.getElementById('detailTrailerBtn');
    const watchlistBtn = document.getElementById('detailWatchlistBtn');
    const shareBtn = document.getElementById('detailShareBtn');

    // Close on button or backdrop click
    closeBtn?.addEventListener('click', close);
    modalEl?.addEventListener('click', (e) => {
      if (e.target === modalEl) close();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl?.classList.contains('is-open')) {
        // Only close if player isn't also open
        const playerModal = document.getElementById('eclipsaPlayerModal');
        if (!playerModal || !playerModal.classList.contains('is-open')) {
          close();
        }
      }
    });

    // Play action
    playBtn?.addEventListener('click', () => {
      if (currentItem && typeof EclipsaPlayer !== 'undefined') {
        const firstEpisode = currentItem.episodes?.[0] || null;
        EclipsaPlayer.open(currentItem, firstEpisode);
      }
    });

    // Trailer action
    trailerBtn?.addEventListener('click', () => {
      if (currentItem && typeof EclipsaPlayer !== 'undefined') {
        EclipsaPlayer.open(currentItem, null, true);
      }
    });

    // Watchlist toggle
    watchlistBtn?.addEventListener('click', () => {
      if (!currentItem) return;
      toggleWatchlistItem(currentItem);
    });

    // Share link
    shareBtn?.addEventListener('click', () => {
      if (!currentItem) return;
      const shareUrl = `${window.location.origin}${window.location.pathname}?watch=${encodeURIComponent(currentItem.id || currentItem.title)}`;
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast(`Link copied to clipboard: ${currentItem.title}`);
        }).catch(() => {
          showToast(`Shared: ${currentItem.title}`);
        });
      } else {
        showToast(`Shared: ${currentItem.title}`);
      }
    });
  };

  const showToast = (message) => {
    const toast = document.getElementById('globalToast');
    if (toast) {
      toast.querySelector('.toast-text').textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  };

  const isBookmarked = (title) => {
    try {
      const list = JSON.parse(localStorage.getItem('eclipsa_watchlist') || '[]');
      return list.some((item) => item.title.toLowerCase() === title.toLowerCase());
    } catch (e) {
      return false;
    }
  };

  const toggleWatchlistItem = (item) => {
    try {
      let list = JSON.parse(localStorage.getItem('eclipsa_watchlist') || '[]');
      const index = list.findIndex((i) => i.title.toLowerCase() === item.title.toLowerCase());
      const btn = document.getElementById('detailWatchlistBtn');
      const icon = btn.querySelector('i');

      if (index >= 0) {
        list.splice(index, 1);
        if (icon) icon.className = 'fas fa-plus';
        btn.classList.remove('is-bookmarked');
        showToast(`Removed "${item.title}" from My List`);
      } else {
        list.push({
          id: item.id,
          title: item.title,
          image: item.poster || item.backdrop || 'pictures/bar4.jpeg',
          meta: `${item.year || '2024'} • ${item.duration || (item.genres?.[0] || 'Drama')}`
        });
        if (icon) icon.className = 'fas fa-check';
        btn.classList.add('is-bookmarked');
        showToast(`Added "${item.title}" to My List`);
      }

      localStorage.setItem('eclipsa_watchlist', JSON.stringify(list));

      // Trigger global event so drawer & card buttons synchronize
      window.dispatchEvent(new CustomEvent('eclipsa:watchlist_change', { detail: list }));
    } catch (e) {}
  };

  const updateWatchlistBtnState = (title) => {
    const btn = document.getElementById('detailWatchlistBtn');
    if (!btn) return;
    const bookmarked = isBookmarked(title);
    btn.classList.toggle('is-bookmarked', bookmarked);
    const icon = btn.querySelector('i');
    if (icon) icon.className = bookmarked ? 'fas fa-check' : 'fas fa-plus';
  };

  /**
   * Public: Open Detail Modal with Media Item
   * @param {Object} item - full media metadata
   */
  const open = (item) => {
    initDOM();
    currentItem = item;

    // Header info
    document.getElementById('detailTitle').textContent = item.title;
    document.getElementById('detailKicker').textContent = item.kicker || `${item.type?.toUpperCase() || 'STREAMING'} EXCLUSIVE`;

    // Backdrop
    const backdropEl = document.getElementById('detailBannerBackdrop');
    const bgUrl = item.backdrop || item.poster || 'pictures/hero-breaking-bad.jpg';
    backdropEl.style.backgroundImage = `url("${bgUrl}")`;

    // Badges
    document.getElementById('detailRating').textContent = item.rating || '8.8';
    document.getElementById('detailYear').textContent = item.year || '2024';
    document.getElementById('detailAge').textContent = item.age || 'TV-MA';
    document.getElementById('detailDuration').textContent = item.duration || (item.type === 'series' ? 'Series' : 'Movie');
    document.getElementById('detailQuality').innerHTML = `<i class="fas fa-tv"></i> ${item.quality || '4K Ultra HD'}`;

    // Synopsis
    document.getElementById('detailSynopsis').textContent = item.desc || 'No description available for this title.';

    // Watchlist button
    updateWatchlistBtnState(item.title);

    // Cast & Director
    const castEl = document.getElementById('detailCast');
    if (item.cast && item.cast.length > 0) {
      castEl.textContent = item.cast.join(', ');
    } else {
      castEl.textContent = 'Ensemble Cast';
    }

    const directorEl = document.getElementById('detailDirector');
    directorEl.textContent = item.director || 'Acclaimed Visionary Director';

    // Genres
    const genresEl = document.getElementById('detailGenres');
    const genreList = item.genres || ['Drama', 'Thriller'];
    genresEl.innerHTML = genreList.map((g) => `<span class="meta-pill">${g}</span>`).join('');

    // Audio & Maturity
    if (item.audio) document.getElementById('detailAudio').textContent = item.audio;
    document.getElementById('detailMaturity').textContent = item.age || 'TV-MA';

    // Episodes Section (for Series)
    const episodesSec = document.getElementById('detailEpisodesSection');
    const episodesList = document.getElementById('episodesList');
    if (item.episodes && item.episodes.length > 0) {
      episodesSec.style.display = 'block';
      episodesList.innerHTML = item.episodes.map((ep) => `
        <article class="episode-card" data-episode-num="${ep.number}">
          <div class="ep-num">${ep.number}</div>
          <div class="ep-thumb-wrap">
            <img src="${ep.thumb || item.backdrop || item.poster}" alt="${ep.title}" loading="lazy" onerror="this.src='pictures/bar4.jpeg'">
            <div class="ep-play-overlay"><i class="fas fa-play"></i></div>
          </div>
          <div class="ep-info">
            <div class="ep-head">
              <h5 class="ep-title">${ep.title}</h5>
              <span class="ep-duration">${ep.duration}</span>
            </div>
            <p class="ep-desc">${ep.desc}</p>
          </div>
        </article>
      `).join('');

      // Wire episode click to play
      episodesList.querySelectorAll('.episode-card').forEach((card) => {
        card.addEventListener('click', () => {
          const num = parseInt(card.dataset.episodeNum, 10);
          const ep = item.episodes.find((e) => e.number === num);
          if (typeof EclipsaPlayer !== 'undefined') {
            EclipsaPlayer.open(item, ep);
          }
        });
      });
    } else {
      episodesSec.style.display = 'none';
      episodesList.innerHTML = '';
    }

    // Recommendations Section ("More Like This")
    const recGrid = document.getElementById('recommendationsGrid');
    if (typeof ECLIPSA_CATALOG !== 'undefined') {
      const recs = ECLIPSA_CATALOG
        .filter((c) => c.title.toLowerCase() !== item.title.toLowerCase())
        .slice(0, 4);

      recGrid.innerHTML = recs.map((rec) => `
        <div class="rec-card" data-rec-title="${rec.title.replace(/"/g, '&quot;')}">
          <div class="rec-media">
            <img src="${rec.poster || rec.backdrop}" alt="${rec.title}" loading="lazy" onerror="this.src='pictures/bar4.jpeg'">
            <div class="rec-play-overlay"><i class="fas fa-play"></i></div>
            <span class="rec-rating"><i class="fas fa-star"></i> ${rec.rating}</span>
          </div>
          <div class="rec-info">
            <h6>${rec.title}</h6>
            <div class="rec-tags">${rec.year} • ${rec.genres?.[0] || 'Drama'}</div>
          </div>
        </div>
      `).join('');

      recGrid.querySelectorAll('.rec-card').forEach((rCard) => {
        rCard.addEventListener('click', () => {
          const recTitle = rCard.dataset.recTitle;
          const recItem = typeof findMediaByTitle === 'function' ? findMediaByTitle(recTitle) : null;
          if (recItem) {
            modalEl.querySelector('.detail-modal-container').scrollTo({ top: 0, behavior: 'smooth' });
            open(recItem);
          }
        });
      });
    }

    // Open modal
    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Public: Close Detail Modal
   */
  const close = () => {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  return {
    open,
    close
  };
})();

if (typeof window !== 'undefined') {
  window.EclipsaModal = EclipsaModal;
}
