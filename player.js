/**
 * ECLIPSA PLATFORM — Cinema Video Player Component
 * Ultra-sleek, responsive HTML5 video streaming player with custom controls,
 * keyboard shortcuts, playback persistence, and speed selection.
 */

const EclipsaPlayer = (() => {
  let modalEl = null;
  let videoEl = null;
  let currentItem = null;
  let currentEpisode = null;
  let hideControlsTimer = null;
  let isSeeking = false;

  const initDOM = () => {
    if (document.getElementById('eclipsaPlayerModal')) {
      modalEl = document.getElementById('eclipsaPlayerModal');
      videoEl = modalEl.querySelector('video');
      return;
    }

    const html = `
      <div class="player-modal" id="eclipsaPlayerModal" aria-hidden="true" role="dialog" aria-label="Video Player">
        <div class="player-container" id="playerContainer">
          <!-- Main HTML5 Video -->
          <video id="eclipsaVideo" playsinline preload="auto"></video>

          <!-- Big Center Indicator for Play/Pause Animation -->
          <div class="player-center-play" id="playerCenterPlay">
            <i class="fas fa-play"></i>
          </div>

          <!-- Top Bar -->
          <div class="player-top-bar">
            <button class="player-btn player-close-btn" id="playerCloseBtn" aria-label="Close Player" title="Close (Esc)">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="player-title-wrap">
              <div class="player-title" id="playerTitle">Eclipsa Stream</div>
              <div class="player-subtitle" id="playerSubtitle">4K Ultra HD • Dolby Atmos</div>
            </div>
            <div class="player-top-badge">
              <span class="badge-live-stream">STREAMING</span>
            </div>
          </div>

          <!-- Bottom Controls -->
          <div class="player-controls-wrap" id="playerControls">
            <!-- Timeline Scrubber Bar -->
            <div class="player-timeline-wrapper" id="playerTimelineWrap">
              <div class="timeline-hover-time" id="timelineHoverTime">00:00</div>
              <div class="player-timeline" id="playerTimeline">
                <div class="timeline-buffer" id="timelineBuffer"></div>
                <div class="timeline-progress" id="timelineProgress">
                  <div class="timeline-thumb"></div>
                </div>
              </div>
            </div>

            <!-- Controls Row -->
            <div class="player-controls-row">
              <div class="player-controls-left">
                <!-- Play / Pause -->
                <button class="player-btn" id="playerPlayPauseBtn" aria-label="Play/Pause" title="Play/Pause (Space)">
                  <i class="fas fa-play"></i>
                </button>

                <!-- 10s Rewind / Forward -->
                <button class="player-btn" id="playerRewindBtn" aria-label="Rewind 10 seconds" title="Rewind 10s (Left Arrow)">
                  <i class="fas fa-rotate-left"></i>
                  <span class="skip-pill">10</span>
                </button>
                <button class="player-btn" id="playerForwardBtn" aria-label="Fast forward 10 seconds" title="Forward 10s (Right Arrow)">
                  <i class="fas fa-rotate-right"></i>
                  <span class="skip-pill">10</span>
                </button>

                <!-- Volume & Slider -->
                <div class="player-volume-wrap">
                  <button class="player-btn" id="playerVolumeBtn" aria-label="Mute" title="Mute/Unmute (M)">
                    <i class="fas fa-volume-high"></i>
                  </button>
                  <div class="volume-slider-bar" id="volumeSliderBar">
                    <input type="range" id="volumeRange" min="0" max="1" step="0.05" value="1" aria-label="Volume Slider">
                  </div>
                </div>

                <!-- Time display -->
                <div class="player-time-display">
                  <span id="playerCurrentTime">00:00</span>
                  <span class="sep">/</span>
                  <span id="playerDuration">00:00</span>
                </div>
              </div>

              <div class="player-controls-right">
                <!-- Subtitles / Captions -->
                <button class="player-btn is-active" id="playerSubtitlesBtn" title="Subtitles (C)">
                  <i class="fas fa-closed-captioning"></i>
                </button>

                <!-- Speed Menu -->
                <div class="player-speed-wrap">
                  <button class="player-btn" id="playerSpeedBtn" title="Playback Speed">1.0x</button>
                  <div class="player-speed-dropdown" id="playerSpeedDropdown">
                    <button class="speed-option" data-speed="0.5">0.5x</button>
                    <button class="speed-option" data-speed="0.75">0.75x</button>
                    <button class="speed-option is-active" data-speed="1">1.0x (Normal)</button>
                    <button class="speed-option" data-speed="1.25">1.25x</button>
                    <button class="speed-option" data-speed="1.5">1.5x</button>
                    <button class="speed-option" data-speed="2">2.0x</button>
                  </div>
                </div>

                <!-- Fullscreen -->
                <button class="player-btn" id="playerFullscreenBtn" title="Fullscreen (F)">
                  <i class="fas fa-expand"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    modalEl = document.getElementById('eclipsaPlayerModal');
    videoEl = document.getElementById('eclipsaVideo');

    setupEventListeners();
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const totalSecs = Math.floor(seconds);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const setupEventListeners = () => {
    const playPauseBtn = document.getElementById('playerPlayPauseBtn');
    const centerPlay = document.getElementById('playerCenterPlay');
    const rewindBtn = document.getElementById('playerRewindBtn');
    const forwardBtn = document.getElementById('playerForwardBtn');
    const volumeBtn = document.getElementById('playerVolumeBtn');
    const volumeRange = document.getElementById('volumeRange');
    const timelineWrap = document.getElementById('playerTimelineWrap');
    const speedBtn = document.getElementById('playerSpeedBtn');
    const speedDropdown = document.getElementById('playerSpeedDropdown');
    const fullscreenBtn = document.getElementById('playerFullscreenBtn');
    const closeBtn = document.getElementById('playerCloseBtn');
    const container = document.getElementById('playerContainer');
    const subtitlesBtn = document.getElementById('playerSubtitlesBtn');

    // Play / Pause
    const togglePlay = () => {
      if (videoEl.paused || videoEl.ended) {
        videoEl.play();
      } else {
        videoEl.pause();
      }
    };

    playPauseBtn?.addEventListener('click', togglePlay);
    centerPlay?.addEventListener('click', togglePlay);
    videoEl?.addEventListener('click', togglePlay);

    videoEl?.addEventListener('play', () => {
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      centerPlay.classList.add('is-hidden');
      resetHideControlsTimer();
    });

    videoEl?.addEventListener('pause', () => {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      centerPlay.classList.remove('is-hidden');
      showControls();
    });

    // Timeupdate & Progress Scrubber
    videoEl?.addEventListener('timeupdate', () => {
      if (isSeeking) return;
      const cur = videoEl.currentTime;
      const dur = videoEl.duration || 1;
      const pct = (cur / dur) * 100;

      document.getElementById('timelineProgress').style.width = `${pct}%`;
      document.getElementById('playerCurrentTime').textContent = formatTime(cur);

      // Save continue watching record
      if (currentItem && cur > 3) {
        saveProgress(currentItem, currentEpisode, cur, dur);
      }
    });

    videoEl?.addEventListener('loadedmetadata', () => {
      document.getElementById('playerDuration').textContent = formatTime(videoEl.duration);
    });

    videoEl?.addEventListener('progress', () => {
      if (videoEl.buffered.length > 0 && videoEl.duration) {
        const bufferedEnd = videoEl.buffered.end(videoEl.buffered.length - 1);
        const pct = (bufferedEnd / videoEl.duration) * 100;
        document.getElementById('timelineBuffer').style.width = `${pct}%`;
      }
    });

    // Rewind / Forward 10s
    rewindBtn?.addEventListener('click', () => {
      videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
    });

    forwardBtn?.addEventListener('click', () => {
      videoEl.currentTime = Math.min(videoEl.duration || 0, videoEl.currentTime + 10);
    });

    // Volume handling
    let lastVolume = 1;
    volumeBtn?.addEventListener('click', () => {
      if (videoEl.volume > 0) {
        lastVolume = videoEl.volume;
        videoEl.volume = 0;
        volumeRange.value = 0;
      } else {
        videoEl.volume = lastVolume || 0.8;
        volumeRange.value = videoEl.volume;
      }
      updateVolumeIcon();
    });

    volumeRange?.addEventListener('input', (e) => {
      videoEl.volume = Number(e.target.value);
      updateVolumeIcon();
    });

    const updateVolumeIcon = () => {
      const icon = volumeBtn.querySelector('i');
      if (videoEl.volume === 0 || videoEl.muted) {
        icon.className = 'fas fa-volume-xmark';
      } else if (videoEl.volume < 0.5) {
        icon.className = 'fas fa-volume-low';
      } else {
        icon.className = 'fas fa-volume-high';
      }
    };

    // Timeline seeking & hover preview
    const hoverTimeEl = document.getElementById('timelineHoverTime');
    timelineWrap?.addEventListener('mousemove', (e) => {
      const rect = timelineWrap.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const targetTime = pos * (videoEl.duration || 0);
      hoverTimeEl.textContent = formatTime(targetTime);
      hoverTimeEl.style.left = `${pos * 100}%`;
      hoverTimeEl.style.opacity = '1';
    });

    timelineWrap?.addEventListener('mouseleave', () => {
      hoverTimeEl.style.opacity = '0';
    });

    const seekToPosition = (e) => {
      const rect = timelineWrap.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const targetTime = pos * (videoEl.duration || 0);
      videoEl.currentTime = targetTime;
      document.getElementById('timelineProgress').style.width = `${pos * 100}%`;
    };

    timelineWrap?.addEventListener('mousedown', (e) => {
      isSeeking = true;
      seekToPosition(e);
      const onMouseMove = (moveEvent) => seekToPosition(moveEvent);
      const onMouseUp = () => {
        isSeeking = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Speed options
    speedBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      speedDropdown.classList.toggle('is-open');
    });

    document.querySelectorAll('.speed-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const speed = parseFloat(opt.dataset.speed);
        videoEl.playbackRate = speed;
        speedBtn.textContent = `${speed}x`;
        document.querySelectorAll('.speed-option').forEach((o) => o.classList.remove('is-active'));
        opt.classList.add('is-active');
        speedDropdown.classList.remove('is-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.player-speed-wrap')) {
        speedDropdown?.classList.remove('is-open');
      }
    });

    // Subtitles toggle simulation
    subtitlesBtn?.addEventListener('click', () => {
      subtitlesBtn.classList.toggle('is-active');
      const active = subtitlesBtn.classList.contains('is-active');
      if (typeof showGlobalToast === 'function') {
        showGlobalToast(active ? 'Subtitles: English [CC] ON' : 'Subtitles: OFF');
      }
    });

    // Fullscreen toggle
    fullscreenBtn?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(() => {});
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
      } else {
        document.exitFullscreen().catch(() => {});
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
      }
    });

    // Close button
    closeBtn?.addEventListener('click', () => close());

    // Controls Auto-Hide
    container?.addEventListener('mousemove', () => {
      showControls();
      resetHideControlsTimer();
    });

    container?.addEventListener('mouseleave', () => {
      if (!videoEl.paused) hideControls();
    });

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', handleKeyShortcuts);
  };

  const handleKeyShortcuts = (e) => {
    if (!modalEl || !modalEl.classList.contains('is-open')) return;

    // Prevent scrolling or browser defaults for video controls
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault();
    }

    switch (e.code) {
      case 'Space':
      case 'KeyK':
        if (videoEl.paused) videoEl.play(); else videoEl.pause();
        break;
      case 'ArrowLeft':
      case 'KeyJ':
        videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
        break;
      case 'ArrowRight':
      case 'KeyL':
        videoEl.currentTime = Math.min(videoEl.duration || 0, videoEl.currentTime + 10);
        break;
      case 'ArrowUp':
        videoEl.volume = Math.min(1, videoEl.volume + 0.1);
        document.getElementById('volumeRange').value = videoEl.volume;
        break;
      case 'ArrowDown':
        videoEl.volume = Math.max(0, videoEl.volume - 0.1);
        document.getElementById('volumeRange').value = videoEl.volume;
        break;
      case 'KeyM':
        videoEl.muted = !videoEl.muted;
        break;
      case 'KeyF':
        document.getElementById('playerFullscreenBtn')?.click();
        break;
      case 'Escape':
        close();
        break;
    }
  };

  const showControls = () => {
    const controls = document.getElementById('playerControls');
    const topBar = modalEl?.querySelector('.player-top-bar');
    controls?.classList.remove('is-hidden');
    topBar?.classList.remove('is-hidden');
    modalEl.style.cursor = 'default';
  };

  const hideControls = () => {
    const controls = document.getElementById('playerControls');
    const topBar = modalEl?.querySelector('.player-top-bar');
    controls?.classList.add('is-hidden');
    topBar?.classList.add('is-hidden');
    modalEl.style.cursor = 'none';
  };

  const resetHideControlsTimer = () => {
    clearTimeout(hideControlsTimer);
    hideControlsTimer = setTimeout(() => {
      if (videoEl && !videoEl.paused) {
        hideControls();
      }
    }, 3200);
  };

  // Continue Watching persistence
  const saveProgress = (item, episode, cur, dur) => {
    try {
      const STORAGE_KEY = 'eclipsa_continue_watching';
      let records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const id = item.id || item.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      const record = {
        id,
        title: item.title,
        type: item.type || 'movie',
        poster: item.poster || item.backdrop,
        backdrop: item.backdrop || item.poster,
        currentTime: cur,
        duration: dur,
        percent: Math.min(100, Math.round((cur / dur) * 100)),
        episodeTitle: episode ? `S1:E${episode.number} "${episode.title}"` : null,
        timestamp: Date.now()
      };

      records = records.filter((r) => r.id !== id);
      records.unshift(record);
      // Keep up to 10 continue watching items
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 10)));

      // Dispatch event for UI updates (e.g. Continue Watching row on homepage)
      window.dispatchEvent(new CustomEvent('eclipsa:progress_update', { detail: record }));
    } catch (e) {}
  };

  /**
   * Public: Open player with a media item
   * @param {Object} item - media object from catalog
   * @param {Object|null} episode - optional episode object
   * @param {Boolean} isTrailer - whether to stream the trailer
   */
  const open = (item, episode = null, isTrailer = false) => {
    initDOM();
    currentItem = item;
    currentEpisode = episode;

    const streamSrc = isTrailer 
      ? (item.trailerUrl || item.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4')
      : (item.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4');

    document.getElementById('playerTitle').textContent = item.title;
    
    if (isTrailer) {
      document.getElementById('playerSubtitle').textContent = `Official Trailer • ${item.year || '2024'} • ${item.quality || '4K Ultra HD'}`;
    } else if (episode) {
      document.getElementById('playerSubtitle').textContent = `Season 1, Episode ${episode.number}: "${episode.title}" • ${episode.duration}`;
    } else {
      document.getElementById('playerSubtitle').textContent = `${item.year || '2024'} • ${item.duration || '2h'} • ${item.quality || '4K Ultra HD'}`;
    }

    videoEl.src = streamSrc;
    videoEl.load();

    // Check if there is a saved playback position
    try {
      const records = JSON.parse(localStorage.getItem('eclipsa_continue_watching') || '[]');
      const saved = records.find((r) => r.id === (item.id || item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')));
      if (saved && saved.currentTime > 5 && !isTrailer) {
        videoEl.currentTime = saved.currentTime;
      }
    } catch (e) {}

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    videoEl.play().catch(() => {
      // Autoplay with sound might need user interaction; browser handles gracefully
    });
  };

  /**
   * Public: Close player modal
   */
  const close = () => {
    if (!modalEl) return;
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.load();
    }
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearTimeout(hideControlsTimer);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  return {
    open,
    close
  };
})();

if (typeof window !== 'undefined') {
  window.EclipsaPlayer = EclipsaPlayer;
}
