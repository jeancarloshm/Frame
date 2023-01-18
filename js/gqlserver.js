var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var axios = require('axios')




// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Movie {
    id: Int
    title: String
    poster_path: String
    release_date: String
}
type Query {
    searchMovies(searchInput: String): [Movie]
    popularMovies: [Movie]
}

`);

// The root provides a resolver function for each API endpoint
var root = {
    Query: {
        async searchMovies(_, {searchInput}) {
            try {
                // Make the API request
                const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&query=${searchInput}&page=1&include_adult=false`);
                // Create an empty array to store the movie objects
                let movieArr = [];
                if(!results.length) return movieArr;
                // Iterate over the results and push the movie objects into the array
                results.forEach(movie => {
                    movieArr.push({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date
                    });
                });
                // Return the array of movie objects
                return movieArr;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },
async popularMovies() {
            const { data: { results } } = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=4a24d8326eef858419a61cb94a02d429&language=en-US&page=1');
            return results.map(movie => ({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date
            }));
        }
    }


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');