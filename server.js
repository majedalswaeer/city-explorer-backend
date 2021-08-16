'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors')

const server = express();

const PORT = process.env.PORT;

const weatherData = require('./data/weather.json')

server.use(cors())



server.get('/retriveData', (req, res) => {

    let city = req.query.cityName;

    let newData = weatherData.find(element => {

        if (element.city_name.toLowerCase() === city.toLowerCase()) {
            return element;
        }
    })

    res.send(newData);
})

server.get('/', (req, res) => {
    res.send('Home Route')
})


server.get('/test', (req, res) => {
    res.send('It\'s Working!!')
})







server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})