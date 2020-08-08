const COORDS = 'coords',
REFRESH_BTN = document.querySelector('.weather__refresh__js'),
API_KEY = 'e3c7140afb35ca2390363ccb0a04672f',
ICON_URL = 'http://openweathermap.org/img/wn/',
WEATHER_IMG = document.querySelector('.weather__img__js'),
TEMP_SPAN = document.querySelector('.weather__temp__js'),
CITY_SPAN = document.querySelector('.weather__city__js'),
WEATHER_CONTAINER_1 = document.querySelector('.weather__container__1__js'),
WEATHER_CONTAINER_2 = document.querySelector('.weather__container__2__js');

let LS_COORDS = JSON.parse(localStorage.getItem('coords')),
coordsObj = {},
weatherObj = {};

function geoError(){
    console.log('FAILED');
}

function refreshLocation(){
    askCoords();
    saveWeather();
    displayWeather();
    console.log('success')
}

function saveWeather(){
    let weather = {},
    lat = 0.0, lon=0.0;

    if(localStorage.getItem(COORDS)===null){
        askCoords();
    }else{
        coordsObj = JSON.parse(localStorage.getItem(COORDS));
    }
    lat = coordsObj['lat'];
    lon = coordsObj['lon'];
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        weather = {
            'temp': json['main']['temp'],
            'weather':json['weather'][0]['icon'],
            'city':json['name']
        }
        localStorage.setItem('weather', JSON.stringify(weather));
    }
    )
}

function displayWeather(){
    weather = JSON.parse(localStorage.getItem('weather'))
    let weather_img_url = `${ICON_URL}${weather['weather']}@2x.png`,
    temp = weather['temp'],
    city = weather['city'];
    WEATHER_IMG.src = weather_img_url;
    TEMP_SPAN.innerText = `${Math.round(temp)}℃`;
    CITY_SPAN.innerText = city;
    WEATHER_CONTAINER_1.style.width = `${WEATHER_CONTAINER_2.offsetWidth}px`;
    REFRESH_BTN.addEventListener('click',refreshLocation);
}

function geoSuccess(position){
    const lat = position.coords.latitude,
    lon = position.coords.longitude;
    coordsObj['lat'] = lat;
    coordsObj['lon'] = lon;
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function askCoords(){
   navigator.geolocation.getCurrentPosition(geoSuccess,geoError)    
}


function init(){
    saveWeather();
    displayWeather();
    REFRESH_BTN.addEventListener('click',refreshLocation);
}

init();