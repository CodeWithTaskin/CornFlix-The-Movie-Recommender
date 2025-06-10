const movieTitles = [
  'The Dark Knight',
  'Inception',
  'Pulp Fiction',
  'Forrest Gump',
  'Interstellar',
  'The Matrix',
  'Gladiator',
  'Titanic',
  'Jurassic Park',
  'Avatar',
  'The Avengers',
  'Star Wars',
  'The Godfather',
  'Fight Club',
  'Goodfellas',
  'Casablanca',
  "Schindler's List",
  'The Departed',
  'Whiplash',
  'Parasite',
];

// Generate random movies
const generateMovies = () => {
  return Array(30)
    .fill()
    .map((_, i) => ({
      id: i + 1,
      title: movieTitles[Math.floor(Math.random() * movieTitles.length)],
      year: 2000 + (i % 23),
      rating: ['PG-13', 'R', '18+'][Math.floor(Math.random() * 3)],
      duration: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(
        Math.random() * 60
      )}m`,
      image: `https://picsum.photos/400/600?random=${i}`,
    }));
};

let allMovies = generateMovies();
let currentMovies = [...allMovies];

// Movie card template
const createMovieCard = movie => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}" class="movie-image">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span class="movie-rating">${movie.rating}</span>
                <span class="movie-duration">${movie.duration}</span>
            </div>
        </div>
    `;
  card.addEventListener('click', () => {
    window.location.href = `details.html?id=${movie.id}+${movie.title}`;
  });
  return card;
};

// Render movies
const renderMovies = movies => {
  const grid = document.getElementById('movie-grid');
  grid.innerHTML = '';
  movies.forEach(movie => {
    grid.appendChild(createMovieCard(movie));
  });
};

// Search functionality
const handleSearch = searchTerm => {
  const filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // For demo: If no results, show random movies
  currentMovies =
    filtered.length > 0
      ? filtered
      : [...allMovies].sort(() => 0.5 - Math.random()).slice(0, 5);

  renderMovies(currentMovies);
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  renderMovies(currentMovies);

  document.getElementById('search-input').addEventListener('input', e => {
    handleSearch(e.target.value.trim());
  });
});
