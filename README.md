# Weather-applicatition | nodejs - express

<a href="https://heyprashant-weather-app.herokuapp.com/"> Live demo </a>

In this section exploring some important topics-
<ul>
<li> Set up a webserver with Express
<li> Serve static Assets
<li> Use Hanlebars to render templates (hbs) 
<li> Send back JSON data
<li> Using Partials with HBS
</ul>

## API used - 
<ul>
  <li> <a href = 'https://weatherstack.com/' >weatherstack</a> - To fetch forecast data
  <li> <a href = 'https://www.mapbox.com/' > mapbox</a> - To fetch geocodes for the address
 </ul>  
 
## Module required -
<ul>
<li> express
<li> hbs
<li> path
</ul>

Covered a lot of new information and explored Express - learning how we can serve up JSON and HTML, serve up the contents of entire directories or working with templating engines.
Also integrated Async code from weather-app into express allowing us to fetch the forecast for an address inside the browser. 
Application is deployed on Heroku.

## Running locally in your machine
To get started, just clone the repository and run ```npm install```:
```
git clone https://github.com/heyprashant/Notes-App.git
npm install
npm run dev
```

