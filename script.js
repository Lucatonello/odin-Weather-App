async function getWeatherData (place) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f0fb4469f000457aaba155348243105&q=${place}&days=4&q}`)
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
        icon: `https:${weatherData.current.condition.icon}`,
        condition: weatherData.current.condition.text,
        humidity: weatherData.current.humidity,
        wind_kph: weatherData.current.wind_kph,
        wind_mph: weatherData.current.wind_mph,
        wind_direction: weatherData.current.wind_dir
    }

    const container = document.getElementById('data-container');
    const mainContent = document.getElementById('main-content');
    const conditionContainer = document.getElementById('condition');
    const moreStats = document.getElementById('more-stats');
    container.innerHTML = '';
    mainContent.innerHTML = '';
    conditionContainer.innerHTML = '';
    moreStats.innerHTML = '';

    const country = document.createElement('h1');
    country.className = 'main-title';
    country.textContent = `${data.country}`;

    const placeName = document.createElement('h1'); 
    placeName.className = 'main-title';
    placeName.textContent = `${data.place}`;

    const icon = document.createElement('img');
    icon.setAttribute('src', data.icon);
    icon.setAttribute('alt', 'condition icon');
 
    const temp_c = document.createElement('h1');
    temp_c.textContent = `${data.temp_c} c`;

    const temp_f = document.createElement('h1');
    temp_f.textContent = `${data.temp_f} f`;

    const condition = document.createElement('h2');
    condition.className = 'condition';
    condition.textContent = `${data.condition}`;

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.humidity}`;

    const wind_kph = document.createElement('p');
    wind_kph.textContent = `Wind kph: ${data.wind_kph}`;

    const wind_mph = document.createElement('p');
    wind_mph.textContent = `Wind mph: ${data.wind_mph}`;

    const wind_direction = document.createElement('p');
    wind_direction.textContent = `Wind direction: ${data.wind_direction}`;

    container.appendChild(country);  
    container.appendChild(placeName);

    mainContent.appendChild(icon); 
    mainContent.appendChild(temp_c);   
    //mainContent.appendChild(temp_f);   
    conditionContainer.appendChild(condition)
    mainContent.appendChild(conditionContainer)
    container.appendChild(mainContent);

    moreStats.appendChild(humidity);   
    moreStats.appendChild(wind_kph);   
    //moreStats.appendChild(wind_mph);   
    moreStats.appendChild(wind_direction);
    mainContent.appendChild(moreStats)

    let classCounter = 0;

    const forecastContainer = document.getElementById('forecast-container')
    
    forecastContainer.innerHTML = '';

    weatherData.forecast.forecastday.forEach(day => {
        const forecastElement = document.createElement('div');
        const forecastClass = `forecast-${classCounter}`;
        forecastElement.className = 'forecast-element ' + forecastClass;
        classCounter++;
        
        forecastElement.innerHTML = `
            <h3>${day.date}</h3>
            <p class="maxtemp">Max: ${day.day.maxtemp_c} c</p>
            <p class="mintemp">Min: ${day.day.mintemp_c} c</p>
            <p>Condition: ${day.day.condition.text}</p>
            <p>Humidity: ${day.day.avghumidity}%</p>
            <p>Max Wind (Kph): ${day.day.maxwind_kph}</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}
let button = document.getElementById('submit').addEventListener('click', () => {
    let place = document.getElementById('place').value;
    getWeatherData(place).then(weatherData => {
        convertJson(weatherData);
    });    
})
