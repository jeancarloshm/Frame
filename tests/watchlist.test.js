const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const jquery = require('jquery');

// Read the contents of the watchlist.js file
const watchlistCode = fs.readFileSync(path.resolve(__dirname, '../src/js/watchlist.js'), 'utf8');

// Set up the JSDOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="selected-movie"></div></body></html>', {
  runScripts: 'dangerously',
  resources: 'usable',
});
const { window } = dom;

// Set up the global objects
global.window = window;
global.document = window.document;
global.$ = jquery(window);
global.localStorage = createMockLocalStorage();

// Helper function to create a mock version of localStorage
function createMockLocalStorage() {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}

// Run the watchlist.js code within the JSDOM environment
window.eval(watchlistCode);

// Get the renderSelectedMovies function
const renderSelectedMovies = window.renderSelectedMovies;

// Start writing your tests
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

