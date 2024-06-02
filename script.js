async function getWeatherData (place) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f0fb4469f000457aaba155348243105&q=${place}`)
    const weatherData = await response.json();
    return weatherData;
}

function convertJson(weatherData) {
    console.log(weatherData);
    const data = {
        temp_c: weatherData.current.temp_c,
        temp_f: weatherData.current.temp_f
    }
    return data;
}
console.log(data);

getWeatherData('Buenos_aires').then(weatherData => {
    convertJson(weatherData);
});
