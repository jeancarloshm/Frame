const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const $ = require('jquery');
// Create a virtual DOM using JSDOM
const htmlContent = fs.readFileSync('src/views/watchlist.html', 'utf-8');
const { window } = new JSDOM(htmlContent, { runScripts: 'dangerously' });

// Inject jQuery into the virtual DOM

// Set up the global objects
global.window = window;
global.document = window.document;

global.$ = window.$; // Assuming jQuery is used in the script

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
    localStorage.setItem(
      'movieInWatch',
      JSON.stringify([
        {
          id: '385687',
          title: 'Fast X',
          posterPath: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
        },
      ])
    );
    localStorageMock.getItem.mockReturnValueOnce('movieInWatch');

    // Call the renderSelectedMovies function
    renderSelectedMovies();

    // Verify the movies are rendered in the DOM
    expect($('#selected-movie').find('h4').eq(0).text()).toEqual('Fast X'); // Check if the first movie's title is correct
    expect($('#selected-movie').find('h6').eq(0).text()).toEqual('385687'); // Check if the second movie's title is correct
  });

  // Add more test cases as needed
});

