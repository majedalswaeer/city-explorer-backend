'use strict';
//___________________________________________________________________________LIBRIES
const express = require('express');

require('dotenv').config();

const cors = require('cors')

const server = express();

const axios = require('axios')

const PORT = process.env.PORT;

const weatherData = require('./data/weather.json')
server.use(cors())

//___________________________________________________________________________USUAL FUNCTIONS

server.get('/getWeatherBitData', getResults)

server.get('/movies', getMovie)

server.get('/retriveData', getInfo)

server.get('/', (req, res) => {
    res.send('Home Route')
})

server.get('/test', (req, res) => {
    res.send('It\'s Working!!')
})

server.get('/*', (req, res) => {
    res.send('Write another city')
})

server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})

//___________________________________________________________________________FUNCTIONS FOR LAB08> WEATHER AND MOVIES


//** WEATHER FUNCTION AND CLASS**

class WeatherBit {
    constructor(element) {
        this.description = element.weather.description;
        this.low_temp = element.low_temp;
        this.max_temp = element.max_temp;
        this.datetime = element.datetime
    }
}

//localhost:3001/getWeatherBitData?city=amman

function getResults(req, res) {
    let sQuery = req.query.sQuery;

    let weatherBitDataUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_API_KEY}&days=4`;
    try {
        //build a class then do the below
        axios.get(weatherBitDataUrl).then((weatherBitResults) => {

            // console.log('results', weatherBitResults.data.data)

            let newweatherBitOb = weatherBitResults.data.data.map(item => {

                console.log('ewewewene', weatherBitResults.data.data)

                return new WeatherBit(item);
            });
            console.log('hereeee', newweatherBitOb)
            res.send(newweatherBitOb)
        });
    }
    catch (error) {
        // console.log('wtf', error)
        res.send('Check you code :(', error);
    }
}


//** MOVIES FUNCTION AND CLASS**

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

    console.log(movieUrl)
    try {

        //build a class then do the below
        axios.get(movieUrl).then((movieResults) => {

            // console.log('results', movieResults.data.results)

            let newMovieOb = movieResults.data.results.map(item => {

                // console.log('ewewewene', movieResults.data.results)

                return new Movie(item);
            });
            console.log('hereeee', newMovieOb)
            res.send(newMovieOb)
        });
    }

    catch (error) {
        console.log('wtf', error)
        // res.send('Check you code :(',error);
    }
}


//___________________________________________________________________________ FUNCTION FOR LAB07


function getInfo(req, res) {
    let sQuery = req.query.sQuery;

    let newData = weatherData.find(element => {

        if (element.city_name.toLowerCase() === sQuery.toLowerCase()) {
            return element;
        }
    })

    res.send(newData);
}





