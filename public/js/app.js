// const weatherForm = document.querySelector("form");

const searchInput = document.querySelector("input");
const searchBtn = document.querySelector('#search')
const locationBtn = document.querySelector('#location')
const locationElement = document.querySelector('[location]')
const statusElement = document.querySelector('[status]')
const windElement = document.querySelector('[wind]')
const temperatureElement = document.querySelector('[temperature]')
const humidityElement = document.querySelector('[humidity]')
const displayError = document.querySelector('[error]')
const loaderElement = document.querySelector('#loader')


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

searchInput.addEventListener("keyup", (event) =>{
    if(event.keyCode === 13) {
        loaderElement.style.display = "block"
        statusElement.textContent = ""
        locationElement.textContent = ""
        displayError.textContent = ""
        fetchWeather()
    }
})

searchBtn.addEventListener("click", () => {
    fetchWeather()
})

locationBtn.addEventListener('click', () => {
    searchInput.value = ""
    loaderElement.style.display = "block"
    statusElement.textContent = ""
    locationElement.textContent = ""
    displayError.textContent = ""
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
            loaderElement.style.display = "none"

            if (data.error) {
                locationElement.textContent = ""
                statusElement.textContent = ""
                displayError.textContent = data.error
            } 
            else {
                setWeatherData(data)
            }
        })
    })
})

function fetchWeather() {
    const location = searchInput.value;    
    fetch('/weather?address=' + location)
        .then((res) => res.json())
        .then((data) => {
            loaderElement.style.display = "none"

            if (data.error) {
                locationElement.textContent = ""
                statusElement.textContent = ""
                displayError.textContent = data.error
            } 
            else {
                console.log(data)
                setWeatherData(data)    
            }
        })
}

function setWeatherData({forecast, location}) {
    console.log(forecast)
    console.log(location)
    locationElement.textContent = location
    statusElement.textContent = forecast.weather
    windElement.textContent = forecast.wind + " Km/h"
    temperatureElement.textContent = forecast.temperature + " ℃"
    humidityElement.textContent = forecast.humidity + " %"    
}
