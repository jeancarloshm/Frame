const { addToWatchlist } = require('../src/js/axios.js');
const $ = require('jquery');

describe('addToWatchlist', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should add a movie to the watchlist', () => {
    // Set up the initial localStorage state
    localStorage.setItem(
      'movieInWatch',
      JSON.stringify([
        {
          id: '385687',
          title: 'Fast X',
          posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
          releaseDate: '2023-05-17',
        },
      ])
    );

    // Call the addToWatchlist function
    const movieElement = {
      target: {
        closest: jest.fn().mockReturnValueOnce({
          find: jest.fn().mockReturnValueOnce({ text: jest.fn().mockReturnValueOnce('123') }),
        }),
      },
    };
    addToWatchlist(movieElement);

    // Retrieve the updated watchlist from localStorage
    const updatedWatchlist = JSON.parse(localStorage.getItem('movieInWatch'));

    // Verify that the movie is added to the watchlist
    expect(updatedWatchlist.length).toBe(2);
    expect(updatedWatchlist[1]).toEqual({
          id: '385687',
          title: 'Fast X',
          posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
          releaseDate: '2023-05-17',
    });
  });

  it('should display an alert when movie is already in watchlist', () => {
    // Set up the initial localStorage state
    localStorage.setItem(
      'movieInWatch',
      JSON.stringify([
        {
          id: '385687',
          title: 'Fast X',
          posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
          releaseDate: '2023-05-17',
        },
      ])
    );

    // Mock the alert function
    window.alert = jest.fn();

    // Call the addToWatchlist function with a movie that is already in the watchlist
    const movieElement = {
      target: {
        closest: jest.fn().mockReturnValueOnce({
          find: jest.fn().mockReturnValueOnce({ text: jest.fn().mockReturnValueOnce('385687') }),
        }),
      },
    };
    addToWatchlist(movieElement);

    // Verify that the alert is displayed
    expect(window.alert).toHaveBeenCalledWith('Movie already in watchlist!');
  });
});
