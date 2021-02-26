
const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const searchBtn = document.querySelector('#search')
const locationBtn = document.querySelector('#location')

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
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } 
            else {
                console.log(data)
                // messageOne.textContent = data.location;
                // messageTwo.textContent = data.forecast;
            }
        });
    });
});

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
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    })

})
