// const dotEnv = require('dotenv')
// dotEnv.config({path:'dotenv.config'})

//event for when the form is submitted//
// const searchForm = document.getElementById('search-form')
// searchForm.addEventListener('submit', (e) => {
//  console.log('searchInput'.val())
//  e.preventDefault();
//  })

 //event on submit on jqeuery
 $(document).ready(() => {
    $(`#search-form`).on(`submit`, (e) =>{
        let searchInput = ($(`#searchInput`).val())
        searchMovie(searchInput)
        e.preventDefault();
    })
 })

 const searchMovie =  async (searchInput) => {
    try { 
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&query=${searchInput}&page=1&include_adult=false `)
      .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let displayMovies = '';
        $.each(movies, (index, movie) => {
          displayMovies += `
          <div class="col-md-3">
          <div class="well text-center">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
            <h5>${movie.title}</h5>
            <h4>${movie.release_date}<h4>
            <a class="btn btn-primary" href="#">Add to watchlist</a>
          </div>
        </div>
          `;
        });
        
        $('#movies').html(displayMovies);
      })
    }catch(error) {
     console.log(error)
    }
}

// const getPopularMovies = async() => {
//     try {
//         const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&page=1')
//         console.log(response.data.results) 

//     } catch (error) {
//         console.log(error)
//     }
    
// }

// getPopularMovies()
searchMovie()


