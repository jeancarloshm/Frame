const { JSDOM } = jsdom;

// Mock the localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Set up the JSDOM environment
const jsdom = new JSDOM('<!DOCTYPE html><html><body><div id="selected-movie"></div></body></html>', { runScripts: 'dangerously' });
const { window } = jsdom;

// Set up the global objects
global.window = window;
global.document = window.document;
global.localStorage = localStorageMock;

// Import the JavaScript file to be tested
const { renderSelectedMovies } = require('../src/js/watchlist.js');

describe('renderSelectedMovies', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should render selected movies in the DOM', () => {
    // Mock the data in localStorage
    localStorage.setItem('movieInWatch', JSON.stringify([
      {
        id: '385687',
        title: 'Fast X',
        posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      },
    ]));

    // Call the renderSelectedMovies function
    renderSelectedMovies();

    // Verify the movies are rendered in the DOM
    const selectedMovies = document.querySelectorAll('#selected-movie .col-md-3');
    expect(selectedMovies.length).toBe(1);
    expect(selectedMovies[0].querySelector('h4').textContent).toBe('Fast X');
    expect(selectedMovies[0].querySelector('h6').textContent).toBe('385687');
    expect(selectedMovies[0].querySelector('img').getAttribute('src')).toBe('https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg');
  });

  // Add more test cases as needed
});

