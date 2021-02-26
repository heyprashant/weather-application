// const weatherForm = document.querySelector("form");

const searchInput = document.querySelector("input");
const searchBtn = document.querySelector('#search')
const locationBtn = document.querySelector('#location')
const locationElement = document.querySelector('[location]')
const statusElement = document.querySelector('[status]')
const windElement = document.querySelector('[wind]')
const temperatureElement = document.querySelector('[temperature]')
const humidityElement = document.querySelector('[humidity]')



// const searchBox = new google.maps.places.SearchBox(searchInput)
// searchBox.addListener('places_changed', () => {
//     const place = searchBox.getPlaces()[0]
//     if (place == null) return

//     const latitude = place.geometry.location.lat()
//     const longitude = place.geometry.location.lng()
//     fetch('/weather', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             latitude,
//             longitude
//         }) 
//     }).then( res => res.json()).then( data => {
         
//     })
    
// })

searchBtn.addEventListener("click", () => {
    const location = searchInput.value;    
    // messageOne.textContent = 'Loading...';
    // messageTwo.textContent = '';
    //Fetch is a browser method.
    fetch('/weather?address=' + location)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                // messageOne.textContent = data.error;
            } 
            else {
                console.log(data)
                setWeatherData(data)
            }
        })
})

locationBtn.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition( (position) => {


        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
        .then( (res) => res.json())
        .then((data) => {
            if (data.error) {
                // messageOne.textContent = data.error;
            } 
            else {
                
                setWeatherData(data)
            }
        })
    })
})

function setWeatherData ({forecast, location}) {
    console.log(forecast)
    console.log(location)
    locationElement.textContent = location
    statusElement.textContent = forecast.weather
    windElement.textContent = forecast.wind
    temperatureElement.textContent = forecast.temperature
    humidityElement.textContent = forecast.humidity
    const dataIcon = 'Skycons.'+ forecast.weather
    
}