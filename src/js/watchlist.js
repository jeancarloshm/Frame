  
  $(document).ready(function(){
    var data = localStorage.getItem('movieInWatch');
    if (data) {
        data = JSON.parse(data);
        console.log(data);

      $.each(data, (index, { id, title, posterPath}) => {
        $('#selected-movie').append(`
       <div class="col-md-3"> 
       <div class="well text-center">
        <img src="${posterPath}">
        <h4>${title}</h4>
        <h6 hidden>${id}</h6>
        <button class="btn btn-primary" id = "remove-button" type="button">Remove</button>
      </div>
    </div>
        `);
    });

    $("#selected-movie").on("click", "#remove-button", (e) => {
      const movieElement = $(e.target).closest(".col-md-3")
      const id = movieElement.find('h6').text()
  
      // Remove the movie from local storage
      const currentWatchlist = localStorage.getItem('movieInWatch') || '[]'
      const newWatchlist = JSON.parse(currentWatchlist)
      const updatedWatchlist = newWatchlist.filter(m => m.id !== id)
      localStorage.setItem('movieInWatch', JSON.stringify(updatedWatchlist))
  
      // Remove the movie element from the page
      movieElement.remove()
  });
    }
});

    
   