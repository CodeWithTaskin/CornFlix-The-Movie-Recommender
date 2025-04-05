const movies = Array(20)
  .fill()
  .map((_, i) => ({
    id: i + 1,
    title: `Movie ${i + 1}`,
    year: 2000 + i,
    rating: 'PG-13',
    duration: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(
      Math.random() * 60
    )}m`,
    description:
      'A compelling story about adventure, friendship, and discovery. This movie will take you on an unforgettable journey through amazing landscapes and emotional moments.',
    cast: [],
    image: `https://picsum.photos/400/600?random=${i}`,
  }));

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = parseInt(urlParams.get('id')) || 1;
  const movie = movies.find(m => m.id === movieId) || movies[0];

  // Set movie details
  document.getElementById('detail-poster').src = movie.image;
  document.getElementById('movie-title').textContent = movie.title;
  document.querySelector('.year').textContent = movie.year;
  document.querySelector('.rating').textContent = movie.rating;
  document.querySelector('.duration').textContent = movie.duration;
  document.querySelector('.description').textContent = movie.description;

  // Set cast
  const castContainer = document.getElementById('cast');
  movie.cast.forEach(actor => {
    const div = document.createElement('div');
    div.className = 'cast-member';
    div.textContent = actor;
    castContainer.appendChild(div);
  });

  // Generate 10 recommendations
  const recommendations = document.getElementById('recommendations');
  Array(10)
    .fill()
    .forEach(() => {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      const card = document.createElement('div');
      card.className = 'recommendation-card';
      card.innerHTML = `
            <img src="${randomMovie.image}" alt="${randomMovie.title}">
            <div class="recommendation-info">
                <h4 class="recommendation-title">${randomMovie.title}</h4>
                <span class="recommendation-year">${randomMovie.year}</span>
            </div>
        `;
      card.addEventListener('click', () => {
        window.location.href = `details.html?id=${randomMovie.id}`;
      });
      recommendations.appendChild(card);
    });
});
