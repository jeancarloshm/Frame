 
 
  // function displayData() {
  //   var data = localStorage.getItem('movieInWatch');
  // console.log(data);
  //   if (data) {
  //   // data = JSON.parse(data);
  //   // $('#selected-movie').html(''); // clear previous data
  //   for (var i = 0; i < data.length; i++) {
    // $('#selected-movie').append(`
  //        <div class="col-md-3"> 
  //         <div class="well text-center">
  //         <img src="https://image.tmdb.org/t/p/original${data[i].posterPath}">
  //           <h4>${data[i].title}</h4>
  //           <h5>${data[i].releaseDate}<h5>
  //           <h6 hidden>${data[i].id}</h6>
  //         </div>
  //       </div>
  //   `);
  //   // $("selected-movie").html(displayData());
  //   }
  //   }
  //   }
  //   displayData();

  $(document).ready(function(){
    var data = localStorage.getItem('movieInWatch');
    if (data) {
        data = JSON.parse(data);
        console.log(data);

      $.each(data, (index, { id, title, posterPath, releaseDate }) => {
        $('#selected-movie').append(`
    <div class="col-md-3"> 
      <div class="well text-center">
        <img src="${posterPath}">
        <h4>${title}</h4>
        <h5>${releaseDate}<h5>
        <h6 hidden>${id}</h6>
      </div>
    </div>
        `);
    });
    }
});

    
    // console.log(x);
    // $("#selected-movie").html(x);


  //   const displayData = async() => {
  //     try {
        
  //       var data = localStorage.getItem('movieInWatch');
  //       JSON.parse(data)
  //       console.log(data);
  //       if (data != ' ') {    
  //         let displayMovies;  
  //         for (var i = 0; i < data.length; i++) {
  //         displayMovies += `
  //        <div class="col-md-3"> 
  //        <div class="well text-center">
  //        <img src="https://image.tmdb.org/t/p/original${data[i].poster_path}"></a>
  //          <h4>${data[i].title}</h4>
  //          <h5>${data[i].release_date}</h5>
  //          <h6 hidden>${data[i].id}</h6>
  //          <a class="btn btn-primary" id="add-button" >Add to watchlist</a>
  //        </div>
  //      </div>
  //        `;
  //    };

  //    $("#selected-movie").html(displayMovies);
          
  //   }
  //     } catch (error) {
  //         console.log(error)
  //     }
    
  //   }
  
  // displayData();