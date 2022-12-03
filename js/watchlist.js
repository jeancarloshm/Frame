 
 
 // Retrieve the selected movie from localStorage and display it on the page
 let selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
 if (selectedMovie) {
   // Display the selected movie on the page
   `<div class="col-md-3">
   <div class="well text-center">
    <img src="https://image.tmdb.org/t/p/original${poster}"></a>
     <h5>${title}</h5>
     <h4>${releaseDate}<h4>
   </div>
 </div>`;
 }