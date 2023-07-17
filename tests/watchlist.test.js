
// Import the necessary modules and the function to be tested
const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const $ = require('jquery');

// Read the HTML file that contains the selected-movie container
const htmlContent = fs.readFileSync(path.resolve(__dirname, '../src/views/watchlist.html'), 'utf8');
const dom = new JSDOM(htmlContent);
global.window = dom.window;
global.document = dom.window.document;
global.$ = $;;

// Import the function to be tested
const { renderSelectedMovies } = require('../src/js/watchlist.js'); // Adjust the path accordingly

// Set up the test suite
describe('renderSelectedMovies', () => {
  beforeEach(() => {
    // Clear the selected-movie element before each test
    $('#selected-movie').empty();
  });

  it('should render selected movies correctly in the DOM', () => {
    // Mock data to be stored in localStorage
    const movieData = [
      {
        id: '385687',
        title: 'Fast X',
        posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      },
    ];

    // Store the data in localStorage
    global.localStorage.setItem('movieInWatch', JSON.stringify(movieData));

    // Call the function to be tested
    renderSelectedMovies();

    // Assertions
    const renderedMovies = $('#selected-movie').children();
    assert.equal(renderedMovies.length, 1, 'Only one movie should be rendered');

    const movieElement = renderedMovies.first();
    const movieTitle = movieElement.find('h4').text();
    const moviePoster = movieElement.find('img').attr('src');
    const movieId = parseInt(movieElement.find('h6').text());

      assert.equal(movieTitle, movieData[0].title, 'Movie title should match');
      assert.equal(moviePoster, movieData[0].posterPath, 'Movie poster should match');
      assert.equal(movieId, movieData[0].id, 'Movie ID should match');
    
  });
});
