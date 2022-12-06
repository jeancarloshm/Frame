const axios = require('axios');
jest.mock('axios', () => {
    return {
      get: jest.fn(() => Promise.resolve({data: 'mock data'})),
    };
  });

  it('makes a GET request to the API', async () => {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&query=batman&page=1&include_adult=false');
    expect(response.data).toBe('mock data');
  });

