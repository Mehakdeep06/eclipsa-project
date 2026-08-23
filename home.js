const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const navbar = $('#navbar');
addEventListener('scroll', () => navbar?.classList.toggle('scrolled', scrollY > 24), { passive: true });

const fallbackArt = ['pictures/bar3.jpeg', 'pictures/bar4.jpeg', 'pictures/bar5.jpeg', 'pictures/bar7.jpeg'];
$$('img[src*="pexels"]').forEach((image, index) => { image.src = fallbackArt[index % fallbackArt.length]; image.removeAttribute('srcset'); });

const slides = [
  ['pictures/hero-breaking-bad.jpg', 'Prestige Drama · 16 Primetime Emmys', 'Breaking <span class="grad">Bad</span>', '9.5 IMDb · 5 Seasons · 2008–2013 · Crime · Drama · Thriller', 'A high school chemistry teacher turns to manufacturing and selling methamphetamine to secure his family’s financial future.'],
  ['pictures/hero-the-walking-dead.jpg', 'AMC Epic Series · 11 Seasons Complete', 'The Walking <span class="grad">Dead</span>', '8.6 IMDb · 11 Seasons · 2010–2022 · Post-Apocalyptic · Horror · Drama', 'Sheriff Deputy Rick Grimes leads a determined group of survivors in a ruthless struggle for humanity.'],
  ['pictures/hero-suits.jpg', 'Prestige Drama · 9 Seasons Complete', 'Suits <span class="grad">Legacy</span>', '8.5 IMDb · 9 Seasons · 2011–2019 · Legal Drama · Comedy · Thriller', 'A top Manhattan lawyer navigates high-stakes legal warfare and power plays.'],
  ['pictures/hero-money-heist.jpg', 'Global Phenomenon · 5 Parts Complete', 'Money <span class="grad">Heist</span>', '8.2 IMDb · 5 Parts · 2017–2021 · Crime · Heist · Thriller', 'A mastermind recruits eight thieves to execute an ambitious heist on Spain’s Royal Mint.'],
  ['pictures/hero-ozark.jpg', 'Emmy Winner · 4 Seasons Complete', 'Oz<span class="grad">ark</span>', '8.5 IMDb · 4 Seasons · 2017–2022 · Crime · Drama · Thriller', 'A financial adviser must launder money for a ruthless cartel to keep his family alive.'],
  ['pictures/hero-dark.jpg', 'Sci-Fi Masterpiece · 3 Cycles Complete', 'D<span class="grad">ARK</span>', '8.7 IMDb · 3 Cycles · 2017–2020 · Sci-Fi · Mystery · Time-Travel', 'A missing child uncovers a mind-bending time-travel conspiracy spanning generations.']
];
let currentSlide = 0;
const setSlide = (index) => {
  currentSlide = (index + slides.length) % slides.length;
  const [image, kicker, title, meta, description] = slides[currentSlide];
  $('.hero-bg')?.style.setProperty('--hero-image', `url("${image}")`);
  if ($('#hero-kicker')) $('#hero-kicker').innerHTML = `<span class="live-dot"></span>${kicker}`;
  if ($('#hero-title')) $('#hero-title').innerHTML = title;
  if ($('#hero-meta')) $('#hero-meta').textContent = meta;
  if ($('#hero-desc')) $('#hero-desc').textContent = description;
  $$('.hero-pagination button').forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
};
$$('.hero-pagination button').forEach((dot, i) => dot.addEventListener('click', () => setSlide(i)));
$('#heroPrevBtn')?.addEventListener('click', () => setSlide(currentSlide - 1));
$('#heroNextBtn')?.addEventListener('click', () => setSlide(currentSlide + 1));
setInterval(() => setSlide(currentSlide + 1), 7000);

const reveal = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => { if (isIntersecting) { target.classList.add('in-view'); reveal.unobserve(target); } }), { threshold: .08 });
$$('.reveal, .reveal-stagger').forEach((element) => reveal.observe(element));
$$('[data-scroll]').forEach((button) => button.addEventListener('click', () => $(button.dataset.scroll)?.scrollBy({ left: Number(button.dataset.dir) * 420, behavior: 'smooth' })));

const menuButton = $('.nav-toggle');
menuButton?.addEventListener('click', () => $('.nav-links')?.classList.toggle('is-open'));
const themeButton = $('.theme-toggle');
const setTheme = () => { const light = localStorage.getItem('eclipsa-theme') === 'light'; document.body.classList.toggle('light-theme', light); themeButton?.querySelector('i')?.classList.toggle('fa-moon', light); themeButton?.querySelector('i')?.classList.toggle('fa-sun', !light); };
setTheme();
themeButton?.addEventListener('click', () => { localStorage.setItem('eclipsa-theme', document.body.classList.contains('light-theme') ? 'dark' : 'light'); setTheme(); });

(() => { const target = Date.now() + 18 * 864e5 + 6 * 36e5; const update = () => { let seconds = Math.max(0, Math.floor((target - Date.now()) / 1000)); [['cd-days',86400],['cd-hours',3600],['cd-mins',60],['cd-secs',1]].forEach(([id, unit]) => { const el = document.getElementById(id); if (el) el.textContent = String(Math.floor(seconds / unit)).padStart(2, '0'); seconds %= unit; }); }; update(); setInterval(update, 1000); })();

try {
  const user = JSON.parse(localStorage.getItem('eclipsa_user') || 'null');
  if (user?.loggedIn) {
    $('#navSignInLink')?.style.setProperty('display', 'none');
    const avatar = $('#navAvatarBtn'); if (avatar) { avatar.style.display = 'flex'; avatar.textContent = user.initial || user.name?.[0] || 'U'; }
    if ($('#userNameDisplay')) $('#userNameDisplay').textContent = user.name || 'Eclipsa Member';
    if ($('#userEmailDisplay')) $('#userEmailDisplay').textContent = user.email || '';
  }
} catch { /* An invalid saved session simply remains signed out. */ }
$('#navAvatarBtn')?.addEventListener('click', () => $('#userDropdown')?.classList.toggle('is-open'));
$('#signOutBtn')?.addEventListener('click', () => { localStorage.removeItem('eclipsa_user'); location.reload(); });
