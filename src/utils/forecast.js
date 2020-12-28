const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b5b9c3b9e7791900c6f33020d52562bd&query=' + latitude +',' + longitude +'&units=m';
    
    //shorthand -> {body} = response; for res.body
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect weather service!', undefined);
        }
        else if( body.error) {
            callback('Unable to find the location.', undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike +' degrees out. The humidity is ' + body.current.humidity + '%.' );
        }
    })
}

module.exports = forecast;