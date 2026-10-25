const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

const sections = [
  ['Action & Adventure', 'Adrenaline Rush', 'Big stakes, bold heroes, and journeys that never slow down.', [
    ['Bad Boys','1995','Action · Comedy','Bad Boys (1995).jpg'], ['Deadpool & Wolverine','2024','Action · Comedy','Deadpool And Wolverine.jpg'], ['Gladiator','2000','Action · Drama','download (3).jpg'], ['Jumanji: Welcome to the Jungle','2017','Adventure · Comedy','download (7).jpg'], ['Jurassic World Dominion','2022','Action · Adventure','June #7.jpg'], ['John Wick','2014','Action · Thriller','Movie Poster Design.jpg'], ['Troy','2004','Action · Drama','One of my favorite movies.jpg'], ['Pirates of the Caribbean','2003','Adventure · Fantasy','pirates of carabian.jpg'], ['Rush Hour 2','2001','Action · Comedy','Rush Hour 2.jpg'], ['Spider-Man 3','2007','Action · Adventure','Spider-Man 3 (2007).jpg'], ['The Dark Knight','2008','Action · Crime','THE DARK KNIGHT.jpg'], ['Uncharted','2022','Action · Adventure','Uncharted.jpg'], ['War for the Planet of the Apes','2017','Action · Sci-Fi','War for the Planet of the Apes poster.jpg'], ['World War Z','2013','Action · Horror','World War Z - 2013_____.jpg']
  ]],
  ['Sci-Fi & Fantasy', 'Other Worlds', 'Escape into distant futures, magical worlds, and the unknown.', [
    ['Avatar: Fire and Ash','2025','Sci-Fi · Adventure','download (4).jpg'], ['Dune: Part Two','2024','Sci-Fi · Adventure','Dune_ Part Two.jpg'], ['Fantastic Beasts and Where to Find Them','2016','Fantasy · Adventure','Fantastic Beasts And Where To Find Them.jpg'], ['Interstellar','2014','Sci-Fi · Drama','interstellar (1).jpg'], ['The Matrix','1999','Sci-Fi · Action','matrix poster.jpg'], ['The Martian','2015','Sci-Fi · Adventure','The Martian Movie Poster.jpg'], ['The Maze Runner','2014','Sci-Fi · Thriller','download (8).jpg'], ['Real Steel','2011','Action · Sci-Fi','Real Steel.jpg']
  ]],
  ['Family & Animation', 'For Every Generation', 'Bright, heartfelt stories to enjoy together.', [
    ['Ice Age','2002','Animation · Comedy','_Ice Age_.jpg'], ['Rango','2011','Animation · Adventure','Abigail Breslin.jpg'], ['Charlie and the Chocolate Factory','2005','Fantasy · Family','Charlie and the Chocolate Factory.jpg'], ['Coco','2017','Animation · Family','Coco (2017).jpg'], ['Dolittle','2020','Fantasy · Family','Dolittle, 2020.jpg'], ['Elemental','2023','Animation · Romance','download (5).jpg'], ['Spider-Man: Across the Spider-Verse','2023','Animation · Action','Marvel Spider-Man_ Across the Spider-Verse - Official One Sheet Wall Poster, 34L_ x 22_4W_, Premium Unframed Version.jpg'], ['Finding Nemo','2003','Animation · Family','Finding Nemo (2003).jpg'], ['Home Alone','1990','Comedy · Family','Home Alone, 1991.jpg'], ["Mr. Bean’s Holiday",'2007','Comedy · Family',"Mr_ Bean's Holiday (2007).jpg"], ['The Mask','1994','Comedy · Fantasy','The Mask 🎭.jpg']
  ]],
  ['Drama & Classics', 'Stories That Stay', 'Unforgettable characters, iconic performances, and lasting cinema.', [
    ["Don’t Look Up",'2021','Comedy · Drama','Cate Blanchett.jpg'], ['The Wolf of Wall Street','2013','Comedy · Drama','download (2).jpg'], ['Marty Supreme','2025','Drama · Sport','download (6).jpg'], ['Fight Club','1999','Drama · Thriller','FIGHT CLUB.jpg'], ['Bruce Almighty','2003','Comedy · Fantasy','Bruce Almighty (2003) [800 x 1200].jpg']
  ]],
  ['Crime & Thriller', 'Dark Corners', 'Tense, daring films that keep you guessing until the final scene.', [
    ['American Psycho','2000','Crime · Thriller','download.jpg'], ['White Chicks','2004','Comedy · Crime','White Chicks _ iffa Film Posters 2025.jpg']
  ]]
];

const card = ([title, year, genre, file]) => `<article class="movie-card" tabindex="0"><div class="card-media"><span class="card-badge blue">MOVIE</span><img src="${encodeURI(`Movies pictures/${file}`)}" alt="${title} poster" loading="lazy"><div class="card-play"><i class="fas fa-play"></i></div></div><div class="card-info"><h5>${title}</h5><div class="card-tags"><span>${year}</span><span class="sep">•</span><span>${genre}</span></div></div></article>`;
const host = document.getElementById('movieSections');
host.innerHTML = sections.map(([title, eyebrow, description, movies], index) => `<section class="wrap movie-library-section"><div class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p>${description}</p></div><div class="rail-controls"><button class="rail-btn" data-target="movie-row-${index}" data-direction="-1" aria-label="Scroll left"><i class="fas fa-chevron-left"></i></button><button class="rail-btn" data-target="movie-row-${index}" data-direction="1" aria-label="Scroll right"><i class="fas fa-chevron-right"></i></button></div></div><div class="row-scroller" id="movie-row-${index}">${movies.map(card).join('')}</div></section>`).join('');
document.querySelectorAll('[data-target]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.target)?.scrollBy({ left: Number(button.dataset.direction) * 440, behavior: 'smooth' })));

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => links?.classList.toggle('is-open'));
const themeToggle = document.querySelector('.theme-toggle');
if (localStorage.getItem('eclipsa-theme') === 'light') document.body.classList.add('light-theme');
themeToggle?.addEventListener('click', () => { document.body.classList.toggle('light-theme'); localStorage.setItem('eclipsa-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); });
