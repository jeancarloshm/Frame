 
 
 // Retrieve the selected movie from localStorage and display it on the page
 let selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
 if (selectedMovie) {
   // Display the selected movie on the page
   `<div class="col-md-3">
   <div class="well text-center">
     <h5>${title}</h5>
     <h4>${year}<h4>
   </div>
 </div>`;
 }

 