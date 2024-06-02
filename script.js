async function getWeatherData (place) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f0fb4469f000457aaba155348243105&q=${place}`)
    const weatherData = await response.json();
    return weatherData;
}

function convertJson(weatherData) {
    console.log(weatherData);
    const data = {
        place: weatherData.location.name,
        country: weatherData.location.country,
        temp_c: weatherData.current.temp_c,
        temp_f: weatherData.current.temp_f,
        condition: weatherData.current.condition.text,
        humidity: weatherData.current.humidity,
        wind_kph: weatherData.current.wind_kph,
        wind_mph: weatherData.current.wind_mph,
        wind_direction: weatherData.current.wind_dir
    }

    const container = document.getElementById('data-container');

    const country = document.createElement('h1');
    country.textContent = `${data.country}`;

    const placeName = document.createElement('h1'); 
    placeName.textContent = `${data.place}`;

    const temp_c = document.createElement('h1');
    temp_c.textContent = `Temperature (C): ${data.temp_c}`;

    const temp_f = document.createElement('h1');
    temp_f.textContent = ` Temperature (F): ${data.temp_f}`;

    const condition = document.createElement('h2');
    condition.textContent = `Condition: ${data.condition}`;

    const humidity = document.createElement('h2');
    humidity.textContent = `Humidity: ${data.humidity}`;

    const wind_kph = document.createElement('h2');
    wind_kph.textContent = `Wind kph: ${data.wind_kph}`;

    const wind_mph = document.createElement('h2');
    wind_mph.textContent = `Wind mph: ${data.wind_mph}`;

    const wind_direction = document.createElement('h2');
    wind_direction.textContent = `Wind direction: ${data.wind_direction}`;

    container.appendChild(country);  
    container.appendChild(placeName); 
    container.appendChild(temp_c);   
    container.appendChild(temp_f);   
    container.appendChild(condition);   
    container.appendChild(humidity);   
    container.appendChild(wind_kph);   
    container.appendChild(wind_mph);   
    container.appendChild(wind_direction);   

    return data;
}
let button = document.getElementById('submit').addEventListener('click', () => {
    let place = document.getElementById('place').value;
    getWeatherData(place).then(weatherData => {
        convertJson(weatherData);
    });    
})
