const { expect } = require('chai');
const { addToWatchList, currentWatchlist } = require('/src/js/axios.js'); // Import your application's functions

describe('Watch List', () => {
  it('should add a movie to the watch list', () => {
    const movie = { title: 'Fast X', id: 385687 };

    // Add the movie to the watch list
    addToWatchList(movie);

    // Get the watch list
    const watchList = currentWatchlist();

    // Assert that the movie is in the watch list
    expect(watchList).to.deep.include(movie);
  });
});
