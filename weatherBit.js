const axios = require('axios')

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
module.exports=getResults