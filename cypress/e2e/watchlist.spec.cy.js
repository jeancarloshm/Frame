describe('TMDB API', () => {
  it('returns movie details for a specific movie', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/385687',
      qs: {
        api_key: '4a24d8326eef858419a61cb94a02d429',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const { title, overview } = response.body;
      expect(title).to.be.a('string');
      expect(overview).to.be.a('string');

      cy.log('Title:', title);
      cy.log('Overview:', overview);
    });
  });
});

