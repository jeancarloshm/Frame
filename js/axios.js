

$(document).ready(() => {
  $(`#search-form`).on(`submit`, (e) => {
    let searchInput = $(`#searchInput`).val();
    searchMovie(searchInput);
    e.preventDefault();
  });

  //Metodo que invoca los datos en AXIOS mediante el Search Input 
const obtainData = async (searchInput) => {
    try {
      const {data: { results }} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&query=${searchInput || ''}&page=1&include_adult=false `
      );
      return results;
    } catch (error) {
      console.log(error);
    }
  };
  
const addToWatchlist = (e) => {
    const movieElement = $(e.target).closest(".col-md-3");
    const title = movieElement.find("h4").text();
    const id = movieElement.find('h6').text();
    const posterPath = movieElement.find("img").attr("src");
    const releaseDate = movieElement.find("h5").text();

    const currentWatchlist = JSON.parse(localStorage.getItem('movieInWatch')) || [];

    if (!currentWatchlist.find(m => m.id === id)) {
        const movieWatchlist = {
            id,
            title,
            posterPath,
            releaseDate,
        };

        currentWatchlist.push(movieWatchlist);
        localStorage.setItem('movieInWatch', JSON.stringify(currentWatchlist));
        console.log(movieWatchlist);
    } else {
        alert('Movie already in watchlist!');
    }
}

  //Renderizar las peliculas cuando se busquen
const searchMovie = async (searchInput) => {
    try {

      //Llama a el metodo ObtainData para obtener las diferentes peliculas 
      const results = await obtainData(searchInput);
      console.log(results)
      let displayMovies = [];
      $.each(results, (index, { id, title, poster_path, release_date }) => {
        displayMovies += `
          <div class="col-md-3"> 
          <div class="well text-center">
          <img src="https://image.tmdb.org/t/p/original${poster_path}"></a>
            <h4>${title}</h4>
            <h5>${release_date}</h5>
            <h6 hidden>${id}</h6>
            <button class="btn btn-primary" id = "add-button" type="button">Add to watchlist</button>
          </div>
        </div>
          `;
      });
      
    //Si le da click a un boton con el ID: Add-Boton que realice la funcion 
    $("#movies").off("click", "#add-button");
    $("#movies").on("click", "#add-button", (e) => {
      addToWatchlist(e)
    });
    
    $("#movies").html(displayMovies)
    } 
    catch (error) {
      console.log(error);
    }
  };
  


  
const getPopularMovies = async() => {
       try {
           const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&page=1')
           console.log(response.data.results)

           let displayPopular = [];
      $.each(response.data.results, (index, { id, title, poster_path, release_date }) => {
        displayPopular += `
          <div class="col-md-3"> 
          <div class="well text-center">
          <img src="https://image.tmdb.org/t/p/original${poster_path}"></a>
            <h4>${title}</h4>
            <h5>${release_date}</h5>
            <h6 hidden>${id}</h6>
            <a class="btn btn-primary" id="add-button">Add to watchlist</a>
          </div>
        </div>
          `;
      });

      $("#popular-movies").on("click", "#add-button", (e) => {
        addToWatchlist(e)
       })
       $("#popular-movies").html(displayPopular);
       } catch (error) {
           console.log(error)
       }
   }

   getPopularMovies()
  searchMovie();
});