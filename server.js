'use strict';
//___________________________________________________________________________LIBRIES
const express = require('express');

require('dotenv').config();

const cors = require('cors')

const server = express();

const PORT = process.env.PORT;

const getResults = require('./weatherBit.js')

const getMovie = require('./movies.js')

const getInfo=require('./weatherLab07.js')

server.use(cors())

//___________________________________________________________________________DATA FUNCTIONS
server.get('/getWeatherBitData', getResults)

server.get('/movies', getMovie)

server.get('/retriveData', getInfo)

//___________________________________________________________________________USUAL FUNCTIONS
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






