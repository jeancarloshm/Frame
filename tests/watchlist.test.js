
const { render, screen } = require('@testing-library/react');
const { renderSelectedMovies } = require('../src/js/watchlist.js');

describe('renderSelectedMovies', () => {
  it('renders the movies in the DOM', () => {
    const data = [
      {
        id: '385687',
        title: 'Fast X',
        posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      },
    ];
    renderSelectedMovies(data);
    expect(screen.getByText('Fast X')).toBeInTheDocument();

  });
});

