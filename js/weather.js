const COORDS = 'coords',
REFRESH_BTN = document.querySelector('.weather__refresh__js'),
API_KEY = 'e3c7140afb35ca2390363ccb0a04672f',
ICON_URL = 'http://openweathermap.org/img/wn/',
WEATHER_IMG = document.querySelector('.weather__img__js'),
TEMP_SPAN = document.querySelector('.weather__temp__js'),
CITY_SPAN = document.querySelector('.weather__city__js'),
WEATHER_CONTAINER_1 = document.querySelector('.weather__container__1__js'),
WEATHER_CONTAINER_2 = document.querySelector('.weather__container__2__js'),
TOP_ROW = document.querySelector('.top__row__container'),
PASSWORD_INPUT = document.querySelector('.password__js');

let LS_COORDS = JSON.parse(localStorage.getItem('coords')),
coordsObj = {},
weatherObj = {};

function geoError(){
    console.log('FAILED');
}

function refreshLocation(){
    askCoords();
}


function saveWeatherJson(){
    LS_COORDS = JSON.parse(localStorage.getItem('coords'));
    let lat = LS_COORDS['lat'],
    lon = LS_COORDS['lon'];
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        localStorage.setItem('weather', JSON.stringify(json));
        displayWeather();
    }
    )
}

function displayWeather(){
    weatherObj = JSON.parse(localStorage.getItem('weather'));
    let weather_img_url = `${ICON_URL}${weatherObj['weather'][0]['icon']}@2x.png`,
    temp = weatherObj['main']['temp'];
    city = weatherObj['name'];
    WEATHER_IMG.src = weather_img_url;
    TEMP_SPAN.innerText = `${Math.round(temp)}℃`;
    CITY_SPAN.innerText = city;
    WEATHER_CONTAINER_1.style.width = `${WEATHER_CONTAINER_2.offsetWidth}px`;
    REFRESH_BTN.addEventListener('click',refreshLocation);
}

function geoSuccess(position){
    const lat = position.coords.latitude,
    lon = position.coords.longitude;

    coordsObj['lat'] = Number(lat.toFixed(2));
    coordsObj['lon'] = Number(lon.toFixed(2));
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    saveWeatherJson();
}

function askCoords(){
   navigator.geolocation.getCurrentPosition(geoSuccess,geoError);
   console.log('askCoords() executed');
}


function init(){
    if(localStorage.getItem('weather') === null){
        askCoords();
    }   
}

PASSWORD_INPUT.addEventListener('submit', init);
if(localStorage.getItem('weather') !== null){
    displayWeather();
}