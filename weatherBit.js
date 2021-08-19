const axios = require('axios')

let allreadySaved= {};

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

    if (allreadySaved[sQuery] !== undefined){
        console.log('saved')

        res.send(allreadySaved[sQuery])
    } else{
        try {
            //build a class then do the below
            
    
            axios.get(weatherBitDataUrl).then((weatherBitResults) => {
    

    
                let newweatherBitOb = weatherBitResults.data.data.map(item => {
    
                    return new WeatherBit(item);
                });
                console.log('notsaved')
                allreadySaved[sQuery]=newweatherBitOb
                res.send(newweatherBitOb)
            });
        }
        catch (error) {
            res.send('Check you code :(', error);
        }

    }
    
}
module.exports=getResults