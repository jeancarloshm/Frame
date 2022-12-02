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
     const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&query=${searchInput}&page=1&include_adult=false `)
     console.log(response.data.results)
    }catch(error) {
     console.log(error)
    }
}

const getPopularMovies = async() => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&page=1')
        console.log(response.data.results) 

    } catch (error) {
        console.log(error)
    }
    
}

getPopularMovies()
searchMovie()


