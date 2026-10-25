/**
 * ECLIPSA PLATFORM — Unified Media Catalog & Dataset
 * Contains rich metadata, streams, episodes, and recommendations.
 */

const ECLIPSA_CATALOG = [
  // =================== FEATURED / HERO SERIES ===================
  {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    type: 'series',
    kicker: 'Prestige Drama · 16 Primetime Emmys',
    year: '2008–2013',
    rating: '9.5',
    age: 'TV-MA',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '5 Seasons',
    genres: ['Crime', 'Drama', 'Thriller'],
    director: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Giancarlo Esposito', 'Bob Odenkirk'],
    desc: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family’s financial future.',
    poster: 'Series pictures/download.jpg',
    backdrop: 'pictures/hero-breaking-bad.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    episodes: [
      {
        number: 1,
        title: 'Pilot',
        duration: '58m',
        thumb: 'pictures/hero-breaking-bad.jpg',
        desc: 'Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with former student Jesse Pinkman to cook meth.'
      },
      {
        number: 2,
        title: 'Cat\'s in the Bag...',
        duration: '48m',
        thumb: 'pictures/bar3.jpeg',
        desc: 'Walt and Jesse attempt to dispose of two bodies, which turns into a grim, chaotic struggle.'
      },
      {
        number: 3,
        title: '...And the Bag\'s in the River',
        duration: '48m',
        thumb: 'pictures/bar4.jpeg',
        desc: 'Walt grapples with whether to kill Krazy-8, forming a bond with him while uncovering a fatal betrayal.'
      },
      {
        number: 4,
        title: 'Ozymandias',
        duration: '53m',
        thumb: 'pictures/bar5.jpeg',
        desc: 'Walt goes on the run as consequences catch up with everyone in devastating fashion.'
      },
      {
        number: 5,
        title: 'Felina',
        duration: '55m',
        thumb: 'pictures/bar7.jpeg',
        desc: 'A final reckoning as Walter White returns to settle scores and secure his legacy.'
      }
    ]
  },
  {
    id: 'the-walking-dead',
    title: 'The Walking Dead',
    type: 'series',
    kicker: 'AMC Epic Series · 11 Seasons Complete',
    year: '2010–2022',
    rating: '8.6',
    age: 'TV-MA',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '11 Seasons',
    genres: ['Post-Apocalyptic', 'Horror', 'Drama'],
    director: 'Frank Darabont',
    cast: ['Andrew Lincoln', 'Norman Reedus', 'Melissa McBride', 'Lauren Cohan', 'Danai Gurira'],
    desc: 'Sheriff Deputy Rick Grimes wakes from a coma into a desolate world overrun by the dead, leading a determined group of survivors in a ruthless struggle for humanity.',
    poster: 'pictures/walking_dead_thumb.jpg',
    backdrop: 'pictures/hero-the-walking-dead.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    episodes: [
      {
        number: 1,
        title: 'Days Gone Bye',
        duration: '67m',
        thumb: 'pictures/hero-the-walking-dead.jpg',
        desc: 'Deputy Rick Grimes wakes up in an abandoned hospital to discover the world has collapsed into a zombie nightmare.'
      },
      {
        number: 2,
        title: 'Guts',
        duration: '45m',
        thumb: 'pictures/scroll2.jpg',
        desc: 'Trapped in Atlanta surrounded by walkers, Rick must devise a desperate escape with survivors.'
      },
      {
        number: 3,
        title: 'Tell It to the Frogs',
        duration: '45m',
        thumb: 'pictures/scroll3.jpg',
        desc: 'Rick reunites with his family at the quarry camp and plans a dangerous rescue back into the city.'
      }
    ]
  },
  {
    id: 'suits',
    title: 'Suits',
    type: 'series',
    kicker: 'Prestige Drama · 9 Seasons Complete',
    year: '2011–2019',
    rating: '8.5',
    age: 'TV-14',
    quality: '4K Ultra HD',
    audio: 'Dolby 5.1',
    duration: '9 Seasons',
    genres: ['Legal Drama', 'Comedy', 'Thriller'],
    director: 'Aaron Korsh',
    cast: ['Gabriel Macht', 'Patrick J. Adams', 'Meghan Markle', 'Sarah Rafferty', 'Rick Hoffman'],
    desc: 'Top Manhattan corporate lawyer Harvey Specter takes a gamble by hiring brilliant college-dropout Mike Ross, who has a photographic memory but no law degree.',
    poster: 'pictures/hero-suits-scaled.jpg',
    backdrop: 'pictures/hero-suits.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    episodes: [
      {
        number: 1,
        title: 'Pilot',
        duration: '72m',
        thumb: 'pictures/hero-suits.jpg',
        desc: 'Harvey Specter tests applicants for an associate position at Pearson Hardman and meets the gifted Mike Ross.'
      },
      {
        number: 2,
        title: 'Errors and Omissions',
        duration: '44m',
        thumb: 'pictures/scroll4.jpg',
        desc: 'Harvey discovers a judge has an ethical grudge against him, while Mike tackles an intellectual property lawsuit.'
      }
    ]
  },
  {
    id: 'money-heist',
    title: 'Money Heist',
    type: 'series',
    kicker: 'Global Phenomenon · 5 Parts Complete',
    year: '2017–2021',
    rating: '8.2',
    age: 'TV-MA',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '5 Parts',
    genres: ['Crime', 'Heist', 'Thriller', 'Action'],
    director: 'Álex Pina',
    cast: ['Álvaro Morte', 'Úrsula Corberó', 'Pedro Alonso', 'Itziar Ituño', 'Miguel Herrán'],
    desc: 'An enigmatic mastermind known as "The Professor" recruits eight thieves with city code names to execute an ambitious multi-billion euro heist on the Royal Mint of Spain.',
    poster: 'pictures/hero-money-heist.jpg',
    backdrop: 'pictures/hero-money-heist.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Do As Planned',
        duration: '47m',
        thumb: 'pictures/hero-money-heist.jpg',
        desc: 'The Professor begins recruiting and briefing a crew for an audacious plan to print €2.4 billion.'
      },
      {
        number: 2,
        title: 'Episode 2: Lethal Negligence',
        duration: '42m',
        thumb: 'pictures/scroll6.jpg',
        desc: 'Hostage negotiator Raquel Murillo makes first contact with The Professor while tensions flare inside.'
      }
    ]
  },
  {
    id: 'ozark',
    title: 'Ozark',
    type: 'series',
    kicker: 'Emmy Winner · 4 Seasons Complete',
    year: '2017–2022',
    rating: '8.5',
    age: 'TV-MA',
    quality: '4K Ultra HD',
    audio: 'Dolby 5.1',
    duration: '4 Seasons',
    genres: ['Crime', 'Drama', 'Thriller'],
    director: 'Bill Dubuque, Mark Williams',
    cast: ['Jason Bateman', 'Laura Linney', 'Julia Garner', 'Sofia Hublitz', 'Skylar Gaertner'],
    desc: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million for a ruthless Mexican drug cartel to keep his family alive.',
    poster: 'pictures/hero-ozark.jpg',
    backdrop: 'pictures/hero-ozark.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    episodes: [
      {
        number: 1,
        title: 'Sugarwood',
        duration: '60m',
        thumb: 'pictures/hero-ozark.jpg',
        desc: 'Financial planner Marty Byrde realizes his business partner has been skimming money from a drug cartel.'
      },
      {
        number: 2,
        title: 'Blue Cat',
        duration: '56m',
        thumb: 'pictures/scroll7.jpg',
        desc: 'Arriving in the Ozarks, Marty struggles to find local businesses suitable for laundering.'
      }
    ]
  },
  {
    id: 'dark',
    title: 'Dark',
    type: 'series',
    kicker: 'Sci-Fi Masterpiece · 3 Cycles Complete',
    year: '2017–2020',
    rating: '8.7',
    age: 'TV-MA',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '3 Seasons',
    genres: ['Sci-Fi', 'Mystery', 'Time-Travel', 'Drama'],
    director: 'Baran bo Odar',
    cast: ['Louis Hofmann', 'Oliver Masucci', 'Jördis Triebel', 'Maja Schöne', 'Karoline Eichhorn'],
    desc: 'A missing child sets four connected families on a frantic hunt for answers, unearthing a mind-bending time-travel conspiracy spanning three generations in Winden.',
    poster: 'Series pictures/Dark TV poster #Dark TV series posters #scififantasy #Superheroes #animation #MovieBuff #MovieReview #movietalk #movieposters #movietwit # tvseries #Tv.jpg',
    backdrop: 'pictures/hero-dark.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    episodes: [
      {
        number: 1,
        title: 'Secrets',
        duration: '52m',
        thumb: 'pictures/hero-dark.jpg',
        desc: 'In 2019, a local boy\'s disappearance stokes fear in the residents of Winden, a small German town.'
      },
      {
        number: 2,
        title: 'Lies',
        duration: '44m',
        thumb: 'pictures/scroll8.jpg',
        desc: 'When a grim discovery shocks the town, police struggle to understand clues from 33 years earlier.'
      }
    ]
  },

  // =================== POPULAR MOVIES ===================
  {
    id: 'dune-2',
    title: 'Dune: Part Two',
    type: 'movie',
    year: '2024',
    rating: '8.9',
    age: 'PG-13',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · IMAX',
    duration: '2h 46m',
    genres: ['Sci-Fi', 'Adventure', 'Action', 'Drama'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem', 'Austin Butler'],
    desc: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family, facing a choice between love and the fate of the universe.',
    poster: 'Movies pictures/Dune_ Part Two.jpg',
    backdrop: 'pictures/genre-scifi.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    type: 'movie',
    year: '2008',
    rating: '9.0',
    age: 'PG-13',
    quality: '4K Ultra HD',
    audio: 'Dolby 5.1',
    duration: '2h 32m',
    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine', 'Gary Oldman'],
    desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster: 'Movies pictures/THE DARK KNIGHT.jpg',
    backdrop: 'pictures/hero-crime-thriller.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    type: 'movie',
    year: '2014',
    rating: '8.7',
    age: 'PG-13',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '2h 49m',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    desc: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers through a newly discovered wormhole.',
    poster: 'Movies pictures/interstellar (1).jpg',
    backdrop: 'pictures/hero-scifi-epic.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'deadpool-wolverine',
    title: 'Deadpool & Wolverine',
    type: 'movie',
    year: '2024',
    rating: '8.0',
    age: 'R',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos',
    duration: '2h 08m',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    director: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Matthew Macfadyen'],
    desc: 'Deadpool\'s peaceful existence comes crashing down when the Time Variance Authority recruits him to help safeguard the multiverse alongside a grumpy, reluctant Wolverine.',
    poster: 'Movies pictures/Deadpool And Wolverine.jpg',
    backdrop: 'pictures/genre-action.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: 'spider-man-spider-verse',
    title: 'Spider-Man: Across the Spider-Verse',
    type: 'movie',
    year: '2023',
    rating: '8.7',
    age: 'PG',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos',
    duration: '2h 20m',
    genres: ['Animation', 'Action', 'Adventure', 'Sci-Fi'],
    director: 'Joaquim Dos Santos, Kemp Powers',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac', 'Jake Johnson'],
    desc: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. But when the heroes clash, Miles must redefine what it means to be a hero.',
    poster: 'Movies pictures/Marvel Spider-Man_ Across the Spider-Verse - Official One Sheet Wall Poster, 34L_ x 22_4W_, Premium Unframed Version.jpg',
    backdrop: 'pictures/scroll1.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'fight-club',
    title: 'Fight Club',
    type: 'movie',
    year: '1999',
    rating: '8.8',
    age: 'R',
    quality: 'HD Remastered',
    audio: 'Dolby 5.1',
    duration: '2h 19m',
    genres: ['Drama', 'Thriller', 'Mystery'],
    director: 'David Fincher',
    cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter', 'Meat Loaf'],
    desc: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    poster: 'Movies pictures/FIGHT CLUB.jpg',
    backdrop: 'pictures/hero-psycho-thriller.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'the-matrix',
    title: 'The Matrix',
    type: 'movie',
    year: '1999',
    rating: '8.7',
    age: 'R',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '2h 16m',
    genres: ['Sci-Fi', 'Action'],
    director: 'Lana & Lilly Wachowski',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
    desc: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    poster: 'Movies pictures/matrix poster.jpg',
    backdrop: 'pictures/hero-neon-quest.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'john-wick',
    title: 'John Wick',
    type: 'movie',
    year: '2014',
    rating: '7.4',
    age: 'R',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos',
    duration: '1h 41m',
    genres: ['Action', 'Thriller', 'Crime'],
    director: 'Chad Stahelski',
    cast: ['Keanu Reeves', 'Michael Nyqvist', 'Alfie Allen', 'Willem Dafoe'],
    desc: 'An ex-hit-man comes out of retirement to track down the gangsters that took everything from him, with New York City as his bullet-riddled playground.',
    poster: 'Movies pictures/Movie Poster Design.jpg',
    backdrop: 'pictures/hero-action-epic.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4'
  },

  // =================== POPULAR SERIES ===================
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    type: 'series',
    year: '2016–2025',
    rating: '8.7',
    age: 'TV-14',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · Spatial Audio',
    duration: '4 Seasons',
    genres: ['Sci-Fi', 'Horror', 'Drama', 'Mystery'],
    director: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder', 'David Harbour', 'Gaten Matarazzo'],
    desc: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl with telekinetic powers.',
    poster: 'Series pictures/Stranger Things 3 (2019).jpg',
    backdrop: 'pictures/hero-fantasy-quest.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    episodes: [
      {
        number: 1,
        title: 'Chapter One: The Vanishing of Will Byers',
        duration: '49m',
        thumb: 'Series pictures/Stranger Things 3 (2019).jpg',
        desc: 'On his way home from a friend\'s house, young Will Byers sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.'
      },
      {
        number: 2,
        title: 'Chapter Two: The Weirdo on Maple Street',
        duration: '56m',
        thumb: 'pictures/scroll9.jpg',
        desc: 'Mike hides the mysterious runaway girl in his bedroom, while Joyce receives a frantic phone call from Will.'
      }
    ]
  },
  {
    id: 'arcane',
    title: 'Arcane',
    type: 'series',
    year: '2021–2024',
    rating: '9.0',
    age: 'TV-14',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '2 Seasons',
    genres: ['Animation', 'Action', 'Sci-Fi', 'Fantasy', 'Drama'],
    director: 'Christian Linke, Alex Yee',
    cast: ['Hailee Steinfeld', 'Ella Purnell', 'Kevin Alejandro', 'Katie Leung'],
    desc: 'Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.',
    poster: 'Series pictures/Arcane.jpg',
    backdrop: 'pictures/hero-neon-quest.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    episodes: [
      {
        number: 1,
        title: 'Welcome to the Playground',
        duration: '43m',
        thumb: 'Series pictures/Arcane.jpg',
        desc: 'Orphaned sisters Vi and Powder bring trouble to Zaun\'s underground streets following a heist in posh Piltover.'
      },
      {
        number: 2,
        title: 'Some Mysteries Are Better Left Unsolved',
        duration: '41m',
        thumb: 'pictures/scroll10.jpg',
        desc: 'Idealistic inventor Jayce risks his future by pursuing illicit Hextech research.'
      }
    ]
  },
  {
    id: 'squid-game',
    title: 'Squid Game',
    type: 'series',
    year: '2021–2024',
    rating: '8.0',
    age: 'TV-MA',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos',
    duration: '2 Seasons',
    genres: ['Thriller', 'Drama', 'Mystery'],
    director: 'Hwang Dong-hyuk',
    cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-joon', 'Jung Ho-yeon'],
    desc: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    poster: 'Series pictures/Squid Game.jpg',
    backdrop: 'pictures/genre-thriller.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    episodes: [
      {
        number: 1,
        title: 'Red Light, Green Light',
        duration: '60m',
        thumb: 'Series pictures/Squid Game.jpg',
        desc: 'Hoping to win easy money, a desperate Gi-hun enters the enigmatic game. But as the first round starts, unexpected horrors unfold.'
      }
    ]
  },
  {
    id: 'house-of-the-dragon',
    title: 'House of the Dragon',
    type: 'series',
    year: '2022–Present',
    rating: '8.4',
    age: 'TV-MA',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '2 Seasons',
    genres: ['Fantasy', 'Action', 'Drama', 'Adventure'],
    director: 'Ryan J. Condal, George R.R. Martin',
    cast: ['Matt Smith', 'Emma D\'Arcy', 'Olivia Cooke', 'Rhys Ifans'],
    desc: 'An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.',
    poster: 'Series pictures/House of the Dragon - Rhaenyra Dragon Head Wall Poster.jpg',
    backdrop: 'pictures/hero-fantasy-quest.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    episodes: [
      {
        number: 1,
        title: 'The Heirs of the Dragon',
        duration: '66m',
        thumb: 'Series pictures/House of the Dragon - Rhaenyra Dragon Head Wall Poster.jpg',
        desc: 'Viserys hosts a tournament to celebrate the birth of his second child, while Rhaenyra welcomes her uncle Daemon back to court.'
      }
    ]
  },

  // =================== POPULAR ANIME ===================
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    type: 'anime',
    year: '2020–Present',
    rating: '8.6',
    age: 'TV-14',
    quality: '4K Ultra HD',
    audio: 'Original Japanese & English Dub',
    duration: '2 Seasons',
    genres: ['Action', 'Supernatural', 'Fantasy', 'Animation'],
    director: 'Sunghoo Park, Shota Goshozono',
    cast: ['Junya Enoki', 'Yuma Uchida', 'Asami Seto', 'Yuichi Nakamura'],
    desc: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    poster: 'Anime pictures/JUJUTSU KAISEN.jpg',
    backdrop: 'pictures/hero-mystery-night.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    episodes: [
      {
        number: 1,
        title: 'Ryomen Sukuna',
        duration: '24m',
        thumb: 'Anime pictures/JUJUTSU KAISEN.jpg',
        desc: 'Yuji Itadori is a high schooler with incredible natural athleticism who encounters a cursed spirit seal at school.'
      },
      {
        number: 2,
        title: 'For Myself',
        duration: '24m',
        thumb: 'pictures/scroll11.jpg',
        desc: 'Yuji wakes up bound in a room facing Satoru Gojo, the strongest Jujutsu sorcerer in modern history.'
      }
    ]
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    type: 'anime',
    year: '2019–Present',
    rating: '8.6',
    age: 'TV-14',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · Spatial Audio',
    duration: '4 Seasons',
    genres: ['Action', 'Fantasy', 'Animation', 'Adventure'],
    director: 'Haruo Sotozaki',
    cast: ['Natsuki Hanae', 'Akari Kito', 'Hiro Shimono', 'Yoshitsugu Matsuoka'],
    desc: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.',
    poster: 'Anime pictures/download (3).jpg',
    backdrop: 'pictures/genre-action.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    episodes: [
      {
        number: 1,
        title: 'Cruelty',
        duration: '24m',
        thumb: 'Anime pictures/download (3).jpg',
        desc: 'Tanjiro Kamado lives a peaceful life selling charcoal, until he returns home to find his family slaughtered.'
      }
    ]
  },
  {
    id: 'death-note',
    title: 'Death Note',
    type: 'anime',
    year: '2006–2007',
    rating: '8.9',
    age: 'TV-14',
    quality: 'HD Remastered',
    audio: 'Dolby 5.1',
    duration: '37 Episodes',
    genres: ['Mystery', 'Psychological', 'Thriller', 'Animation'],
    director: 'Tetsuro Araki',
    cast: ['Mamoru Miyano', 'Kappei Yamaguchi', 'Shidou Nakamura', 'Aya Hirano'],
    desc: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.',
    poster: 'Anime pictures/Amazon_com_ Death Note Poster Light Yagami Merch Anime Cool Wall Art Print Poster 12x18_ Posters & Prints.jpg',
    backdrop: 'pictures/hero-psycho-thriller.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    episodes: [
      {
        number: 1,
        title: 'Rebirth',
        duration: '23m',
        thumb: 'Anime pictures/Amazon_com_ Death Note Poster Light Yagami Merch Anime Cool Wall Art Print Poster 12x18_ Posters & Prints.jpg',
        desc: 'Light Yagami stumbles upon a mysterious notebook dropped by a Shinigami named Ryuk.'
      }
    ]
  },
  {
    id: 'frieren',
    title: 'Frieren: Beyond Journey\'s End',
    type: 'anime',
    year: '2023–2024',
    rating: '8.9',
    age: 'TV-14',
    quality: '4K Ultra HD',
    audio: 'Dolby Atmos · 5.1',
    duration: '1 Season',
    genres: ['Fantasy', 'Adventure', 'Drama', 'Animation'],
    director: 'Keiichiro Saito',
    cast: ['Atsumi Tanezaki', 'Nobuhiko Okamoto', 'Kana Ichinose', 'Chiaki Kobayashi'],
    desc: 'An elf and her fellow adventurers have defeated the Demon King in a ten-year quest. Now, as an elf who outlives her mortal companions by centuries, Frieren embarks on a journey to reflect on the meaning of human bonds.',
    poster: 'Anime pictures/download (9).jpg',
    backdrop: 'pictures/hero-fantasy-quest.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    episodes: [
      {
        number: 1,
        title: 'The Journey\'s End',
        duration: '25m',
        thumb: 'Anime pictures/download (9).jpg',
        desc: 'The Hero Party returns victorious to the capital after a 10-year quest to defeat the Demon King.'
      }
    ]
  }
];

// Helper to look up media item by title or ID
function findMediaByTitle(title) {
  if (!title) return null;
  const clean = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ECLIPSA_CATALOG.find((item) => {
    const itemClean = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    return itemClean === clean || item.id === title.toLowerCase();
  }) || null;
}

if (typeof window !== 'undefined') {
  window.ECLIPSA_CATALOG = ECLIPSA_CATALOG;
  window.findMediaByTitle = findMediaByTitle;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ECLIPSA_CATALOG, findMediaByTitle };
}
