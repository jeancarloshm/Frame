 

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

    
   