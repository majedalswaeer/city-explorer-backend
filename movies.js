const axios = require('axios')

let allreadyMovieSaved= {};

class Movie {
    constructor(element) {
        this.original_title = element.original_title
        this.overview = element.overview
        this.vote_average = element.vote_average
        this.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`
        this.popularity = element.popularity
        this.release_date = element.release_date
    }
}
//http://localhost:3001/movies?sQuery=amman
function getMovie(req, res) {
    let sQuery = req.query.sQuery;

    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${sQuery}&language=en-US`;
    if (allreadyMovieSaved[sQuery] !== undefined){
        console.log('saved')

        res.send(allreadyMovieSaved[sQuery])
    } else{
        try {

            //build a class then do the below
            axios.get(movieUrl).then((movieResults) => {
    
                let newMovieOb = movieResults.data.results.map(item => {
    
                    return new Movie(item);
                });
                allreadyMovieSaved[sQuery]=newMovieOb
                res.send(newMovieOb)
            });
        }
    
        catch (error) {
            console.log('wtf', error)
            // res.send('Check you code :(',error);
        }

    }
    
}

module.exports=getMovie