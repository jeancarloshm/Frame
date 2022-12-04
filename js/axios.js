// const dotEnv = require('dotenv')
// dotEnv.config({path:'dotenv.config'})

//event for when the form is submitted//
// const searchForm = document.getElementById('search-form')
// searchForm.addEventListener('submit', (e) => {
//  console.log('searchInput'.val())
//  e.preventDefault();
//  })

//event on submit on jqeuery

//Inicio de JQuery

$(document).ready(() => {
  $(`#search-form`).on(`submit`, (e) => {
    let searchInput = $(`#searchInput`).val();
    searchMovie(searchInput);
    e.preventDefault();
  });

  //Metodo que invoca los datos en AXIOS mediante el Search Input (Recordar que si esta undefined sale la China)
  const obtainData = async (searchInput) => {
    try {
      const {
        data: { results },
      } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&query=${
          searchInput == undefined ? ` ` : searchInput
        }&page=1&include_adult=false `
      );

      return results;
    } catch (error) {
      console.log(error);
    }
  };

  //Renderizar las peliculas cuando se busquen
  const searchMovie = async (searchInput) => {
    try {
      //Llama a el metodo ObtainData para obtener las diferentes peliculas (Superman, Batman, Spiderman ..... )
      const results = await obtainData(searchInput);

      let displayMovies;
      $.each(results, (index, { title, poster_path, release_date }) => {
        displayMovies += `
          <div class="col-md-3"> 
          <div class="well text-center">
          <img src="https://image.tmdb.org/t/p/original${poster_path}"></a>
            <h5>${title}</h5>
            <h4>${release_date}<h4>
            <a class="btn btn-primary" id="add-button"  >Add to watchlist</a>
          </div>
        </div>
          `;
      });

      
      $("#movies").html(displayMovies);

      //Si le da click a un boton con el ID: Add-Boton que realice la funcion (EN MANTENIMIENTO!!!!!! )
      
      $("#add-button").click(() => {

        
        //SOLUCIONAR PARA QUE SE ELIJA LA PELICULA CORRECTA ! 
        
        let displayToWatch = {
          poster: results.poster_path,
          title: results.title,
          year: results.release_date,
        };

        console.log(displayToWatch);
      
       
        localStorage.setItem("selectedMovie", JSON.stringify(displayMovies));
        let selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
        console.log(selectedMovie);
        if (selectedMovie) {
          `
        <div class="col-md-3">
        <div class="well text-center">
        <img src="https://image.tmdb.org/t/p/original${poster}">
        <h5>${title}</h5>
        <h4>${year}<h4>
        `;
        }
      });


      //NO TENGO IDEA PARA QUE ES ESTE CODIGO TODAVIA !

      // $("#selected-movie").html(selectedMovie);

  
    } 
    catch (error) {
      console.log(error);
    }
  };

  

  // const getPopularMovies = async() => {
  //     try {
  //         const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&page=1')
  //         console.log(response.data.results)

  //     } catch (error) {
  //         console.log(error)
  //     }

  // }

  // getPopularMovies()
  searchMovie();
});