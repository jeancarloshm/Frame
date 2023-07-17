const fs = require('fs');
const { JSDOM } = require('jsdom');
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
const htmlContent = fs.readFileSync('src/views/watchlist.html', 'utf-8');
const { window } = new JSDOM(htmlContent, { runScripts: 'dangerously' });


// Set up the global objects
global.window = window;
global.document = window.document;
global.$ = require('jquery'); // Assuming jQuery is used in the script

const { renderSelectedMovies } = require('../src/js/watchlist.js');

// Import the JavaScript file to be tested

describe('renderSelectedMoviesFunction', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  beforeAll(() => {
    // Assign the localStorage mock to the global object
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    // Clear the mocks after each test
    jest.clearAllMocks();
    // Clear the DOM after each test
    document.body.innerHTML = '';
  });

  it('should render selected movies in the DOM', () => {
    // Mock the data in localStorage
    const movieData = [
      {
        id: '385687',
        title: 'Fast X',
        posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      },
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(movieData));

    // Call the renderSelectedMovies function
    renderSelectedMovies()

    // Verify the movies are rendered in the DOM
    const selectedMovies = document.querySelectorAll('#selected-movie .col-md-3');
    expect(selectedMovies[0].querySelector('h4').textContent).toBe('Fast X');
    expect(selectedMovies[0].querySelector('h6').textContent).toBe('385687');
    expect(selectedMovies[0].querySelector('img').getAttribute('src')).toBe('https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg');
  });

  // Add more test cases as needed
});

