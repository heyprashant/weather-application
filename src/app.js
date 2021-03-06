const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode'); 
const revGeocode = require('./utils/revGeocode')

const app = express();
const port = process.env.PORT || 3000;

// Parsing string to json
app.use(express.json())

// Define pahts for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Prashant'
    })
} );

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Prashant'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        helpText:'This is some helpful text.',
        title: 'Help',
        name: 'Prashant'
    })
});

app.get('/weather', ( req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide the address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({ forecast: forecastData, 
                    location,
                    });   
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404page',{
        errorMsg: 'Help article not found!',
        title: 'Page not found!',
        name: 'Prashant'

    })
});

app.get('*', (req, res) => {
    res.render('404page',{
        errorMsg: 'Error 404! Page not found.',
        title: 'Page not found!',
        name: 'Prashant'
    })
})

app.post('/weather', (req, res) => {
    
    revGeocode( req.body.longitude, req.body.latitude, (error, location) => {
        if(error) {
            return res.send({ error });
        }

        forecast(req.body.latitude, req.body.longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData, 
                location});   
        })

    })

    
})

app.listen( port, () => {
    console.log('Server is up on port ' + port);
});
