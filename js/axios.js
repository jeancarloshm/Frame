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
      const {data: { results }} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&query=${searchInput || ''}&page=1&include_adult=false `
      );
      console.log(results)
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

      
      //Si le da click a un boton con el ID: Add-Boton que realice la funcion (EN MANTENIMIENTO!!!!!! )
      
    $("#movies").on("click", "#add-button", (e) => {
    const movieElement = $(e.target).closest(".col-md-3")
    const title = movieElement.find("h4").text()
    const id = movieElement.find('h6').text()
    console.log(id)
    const posterPath = movieElement.find("img").attr("src")
    const releaseDate = movieElement.find("h5").text()
    
    const currentWatchlist = localStorage.getItem('movieInWatch') || '[]'
    const newWatchlist = JSON.parse(currentWatchlist)
     if (newWatchlist.find(m => m.id === id)){
      return 
     }
     
    const movieWatchlist = {
      id: id,
      title: title,
      posterPath: posterPath,
      releaseDate: releaseDate,
    }

    
   
    
    newWatchlist.push(movieWatchlist)
    localStorage.setItem('movieInWatch' ,JSON.stringify(newWatchlist))
    console.log(movieWatchlist)
   })
  

  //Si le da click a un boton con el ID: Add-Boton que realice la funcion (EN MANTENIMIENTO!!!!!! )
      
  // function addToWatchlist(id) {
  //   const movie = results.find(m => m.id === id) 
  //   const displayToWatch =  {
  //   id: movie.id,
  //   poster: movie.poster_path,
  //   title: movie.title,
  //   year: movie.release_date,
  //   }
  //   const currentWatchlist = localStorage.getItem('watchList') || '[]'
  //   const newWatchlist = JSON.parse(currentWatchlist)
  //   newWatchlist.push(displayToWatch)
  //   localStorage.setItem('watchList' ,JSON.stringify(newWatchlist))
  //  };

      
  //  function displayData() {
  //   var data = localStorage.getItem('movieInWatch');
  //   if (data) {
  //   data = JSON.parse(data);
  //   $('#selected-movie').html(''); // clear previous data
  //   for (var i = 0; i < data.length; i++) {
  //   $('#selected-movie').append(`
  //        <div class="col-md-3"> 
  //         <div class="well text-center">
  //         <img src="https://image.tmdb.org/t/p/original${data[i].posterPath}">
  //           <h4>${data[i].title}</h4>
  //           <h5>${data[i].releaseDate}<h5>
  //           <h6 hidden>${data[i].id}</h6>
  //         </div>
  //       </div>
  //   `);
  //   $("selected-movie").html(displayData());
  //   }
  //   }
  //   }
    
  //   displayData();

   $("#movies").html(displayMovies);



      //$("#selected-movie").html(selectedMovie);
    } 
    catch (error) {
      console.log(error);
    }
  };

  // function displayToWatchList() {
  //   let selectedMovie = JSON.parse(localStorage.getItem('movieInWatch'));
  //   if (selectedMovie) {
  //     `<div class="col-md-3">
  //     <div class="well text-center">
  //      <img src="https://image.tmdb.org/t/p/original${posterPath}">
  //       <h5>${title}</h5>
  //       <h4>${releaseDate}}<h4>
  //     </div>
  //   </div>`;
  //   }
  //   $("#selected-movie").html(displayToWatchList());

  // }  

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
            <a class="btn btn-primary" id="add-button" >Add to watchlist</a>
          </div>
        </div>
          `;
      });

      $("#popular-movies").html(displayPopular);

      $("#popular-movies").on("click", "#add-button", (e) => {
        const movieElement = $(e.target).closest(".col-md-3")
        const title = movieElement.find("h4").text()
        const id = movieElement.find('h6').text()
        console.log(id)
        const posterPath = movieElement.find("img").attr("src")
        const releaseDate = movieElement.find("h5").text()
        
        const currentWatchlist = localStorage.getItem('movieInWatch') || '[]'
        const newWatchlist = JSON.parse(currentWatchlist)
         if (newWatchlist.find(m => m.id === id)){
          return 
         }
         
        const movieWatchlist = {
          id: id,
          title: title,
          posterPath: posterPath,
          releaseDate: releaseDate,
        }
    
        
       
        
        newWatchlist.push(movieWatchlist)
        localStorage.setItem('movieInWatch' ,JSON.stringify(newWatchlist))
        console.log(movieWatchlist)
       })

       } catch (error) {
           console.log(error)
       }

   }

   getPopularMovies()
  searchMovie();
});