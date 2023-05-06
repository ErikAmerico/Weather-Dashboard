const apiKey = 'cecc3bd04ab6746c6e6e7130bfc08b3a'
const searchBtn = document.getElementById('searchBtn');
const city = document.getElementById('inputCity');
const state = document.getElementById('inputState');

searchBtn.addEventListener('click', function () {
    handleWeatherData()
})

function getWeatherData(cityName, stateName, countryName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateName},${countryName}&appid=${apiKey}`;
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

function handleWeatherData() {

    const cityName = city.value;
    const stateName = state.value;

    getWeatherData(cityName, stateName,)
        .then(function ({ lat, lon }) {
            return getWeatherForecast(lat, lon);
        })
}