const request = require( 'request');

const revGeocode = (long, lat, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +long+','+lat+ '.json?access_token=pk.eyJ1IjoiaGV5cHJhc2hhbnQiLCJhIjoiY2tpdHd1bjg5MDU2OTJxbXd4c2pxYWF3NSJ9.6j0sGJDAiPl51skW7CEarQ';
    
    request( { url, json: true}, (error, { body }) => {
        
        if (error){
            callback('Unable to connect to location services. Try a hardcode search.', undefined);
        }
        else if ( body.message || body.features.length === 0) {
            callback('Unable to find location. Try a hardcode search.')
        }
        else {
            try {
                callback( undefined, body.features[2].place_name);
            } catch (error) {
                 callback('Unable to find location. Try a hardcode search.')
                
            }
        }
    });
}

module.exports = revGeocode;