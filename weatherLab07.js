const weatherData = require('./data/weather.json')

function getInfo(req, res) {
    let sQuery = req.query.sQuery;

    let newData = weatherData.find(element => {

        if (element.city_name.toLowerCase() === sQuery.toLowerCase()) {
            return element;
        }
    })

    res.send(newData);
}

module.exports=getInfo