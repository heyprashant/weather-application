const request = require( 'request');

const revGeocode = (long, lat, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +long+','+lat+ '.json?access_token=pk.eyJ1IjoiaGV5cHJhc2hhbnQiLCJhIjoiY2tpdHd1bjg5MDU2OTJxbXd4c2pxYWF3NSJ9.6j0sGJDAiPl51skW7CEarQ&limit=1';
    
    request( { url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to location services!', undefined);
        }
        else if ( body.message || body.features.length === 0) {
            callback('Unable to find location. Try a hardcode search.')
        }
        else {
            callback( undefined, body.features[0].place_name);
        }
    });
}

module.exports = revGeocode;