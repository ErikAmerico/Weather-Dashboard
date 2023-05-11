const apiKey = 'cecc3bd04ab6746c6e6e7130bfc08b3a'
const searchBtn = document.getElementById('searchBtn');
const city = document.getElementById('inputCity');
const state = document.getElementById('inputState');
//const country = document.getElementById('inputCountry');

searchBtn.addEventListener('click', function () {
    handleWeatherData()
})

function getWeatherData(cityName, stateName) { // countryName
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},US&units=imperial&appid=cecc3bd04ab6746c6e6e7130bfc08b3a`; //${ countryName }
    return fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            console.log(`The geographical coordinates of ${cityName}, ${stateName}, are: latitude ${lat}, longitude ${lon}`);
            return { lat, lon, };
        });
}

function getWeatherForecast(lat, lon) {
    const cityUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    return fetch(cityUrl)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
}

function displayWeatherData(data) {
    currentCity = document.getElementById('currCity')
    currentTemp = document.getElementById('temp')
    currentWind = document.getElementById('wind')
    currentHumidity = document.getElementById('humidity')
    currently = document.getElementById('currentStatus')
    logo = document.getElementById('weatherLogo')
    skyStatus = data.list[0].weather[0].main;

    currentCity.textContent = "";
    currentTemp.textContent = "";
    currentWind.textContent = "";
    currentHumidity.textContent = "";

    //console.log(data)
    currentCity.textContent = data.city.name;
    currentTemp.textContent += "Temperature: " + Math.floor(data.list[0].main.temp) + "°F";
    currentWind.textContent += "Wind Speed: " + Math.floor(data.list[0].wind.speed) + " MPH";
    currentHumidity.textContent += "Humidity Level: " + Math.floor(data.list[0].main.humidity) + "%";

    if (skyStatus === 'Rain') {
        logo.src = "Assets/rain.png";
        currently.textContent = 'Raining';
    } else if (skyStatus === 'Clouds') {
        logo.src = "Assets/clouds.png";
        currently.textContent = 'Cloudy';
    } else if (skyStatus === 'Drizzle') {
        logo.src = "Assets/drizzle.png";
        currently.textContent = 'Drizzling';
    } else if (skyStatus === 'Snow') {
        logo.src = "Assets/snow.png";
        currently.textContent = 'Snowing';
    } else if (skyStatus === 'Thunderstorm') {
        logo.src = "Assets/thunderstorm.png";
        currently.textContent = 'Stormy';
    } else if (skyStatus === 'Clear') {
        logo.src = "Assets/clearDay.png";
        currently.textContent = 'Clear Skies';
    } else {
        logo.src = "Assets/mist,smoke,haze,dust,fog,sand,ash,squall,tornado.png";
        currently.textContent = 'Air quality low';
    }

}

function handleWeatherData() {

    const cityName = city.value;
    const stateName = state.value;
    //const countryName = country.value;

    getWeatherData(cityName, stateName,  /*countryName*/)
        .then(function ({ lat, lon }) {
            return getWeatherForecast(lat, lon);
        })
        .then(function (data) {
            return displayWeatherData(data);
        })
}