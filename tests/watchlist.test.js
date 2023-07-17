
// Import the necessary modules and the function to be tested
const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');



// Read the HTML file that contains the selected-movie container
const htmlContent = fs.readFileSync(path.resolve(__dirname, '../src/views/watchlist.html'), 'utf8');
const { window } = new jsdom.JSDOM(htmlContent);
const $ = require('jquery')(window);

const $ = selector => document.querySelector(selector);

let mockLocalStorage = {
  getItem: key => mockLocalStorage[key],
  setItem: (key, value) => {
    mockLocalStorage[key] = value;
  },
  removeItem: key => {
    delete mockLocalStorage[key];
  },
  clear: () => {
    mockLocalStorage = {};
  },
};

// Assign the mock to global.localStorage
global.localStorage = mockLocalStorage;

// Import the function to be tested
const { renderSelectedMovies } = require('../src/js/watchlist.js'); // Adjust the path accordingly

// Set up the test suite
describe('renderSelectedMovies', () => {
  beforeEach(() => {
    // Clear the selected-movie element before each test
    $('#selected-movie').innerHTML = '';
    global.localStorage.clear();
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

    const movieElement = renderedMovies[0];
    const movieTitle = movieElement.querySelector('h4').textContent;
    const moviePoster = movieElement.querySelector('img').getAttribute('src');
    const movieId = parseInt(movieElement.querySelector('h6').textContent);

      assert.equal(movieTitle, movieData[0].title, 'Movie title should match');
      assert.equal(moviePoster, movieData[0].posterPath, 'Movie poster should match');
      assert.equal(movieId, movieData[0].id, 'Movie ID should match');
    
  });
});
