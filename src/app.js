const path = require('path');
const express = require('express');

const app = express();

// Define pahts for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Setup handlerbars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Prashant'
    })
} );

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Prashant'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        helpText:'This is some helpful text.'
    })
});

app.get('/weather', ( req, res) => {
    res.send({
        temp: 24,
        location: 'Bhiwani',
        forecast: 'cloudy'
    }); 
});

app.listen( 3000, () => {
    console.log('Server is up on port 3000.');
});
