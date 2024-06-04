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


    const body = document.querySelector('body');
    console.log(condition.textContent);
    console.log(weatherData.current.condition.code);

    if (weatherData.current.condition.code === 1000 || condition.textContent == 'Clear') {
        body.style.backgroundImage = 'url("https://christiancountynow.sagacom.com/files/2023/09/Mostly-sunny-1200-2023-1200x768.jpg")';
    }
    else if (weatherData.current.condition.code === 1003) {
        body.style.backgroundImage = 'url("https://www.wkbn.com/wp-content/uploads/sites/48/2021/03/clouds-cloudy-sky-spring-summer-fall-winter-weather-generic-8-1.jpg?w=1280")';
    }
    else if (weatherData.current.condition.code === 1009 || weatherData.current.condition.code === 1006) {
        body.style.backgroundImage = 'url("https://www.rochesterfirst.com/wp-content/uploads/sites/66/2021/04/black-rain-abstract-dark-power-1-1.jpg?w=900")';
    }
    else if (weatherData.current.condition.code === 1030) {
        body.style.backgroundImage = 'url("https://ichef.bbci.co.uk/news/976/cpsprodpb/FD4A/production/_87524846_87524845.jpg")';
    }
    else if (weatherData.current.condition.code === 1063 || weatherData.current.condition.code === 1066 || weatherData.current.condition.code === 1069 || weatherData.current.condition.code === 1072) {
        body.style.backgroundImage = 'url("https://media.istockphoto.com/id/453684353/photo/rain-at-the-fields.jpg?s=612x612&w=0&k=20&c=JXVnwl83Oifw3ook_yhZy9IIeHm2Ey6PrxgZUK1_vZs=")';
    }
    else if (weatherData.current.condition.code === 1135 || weatherData.current.condition.code === 1147) {
        body.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzl53X8dXYVyuMLdmaZSmxRyIUlKJ91gGWQg&s")';
    }
    else if (weatherData.current.condition.code === 1150 || weatherData.current.condition.code === 1153) {
        body.style.backgroundImage = 'url("https://i.iheart.com/v3/re/assets.getty/61773a18a785760defd7d732?ops=contain(1480,0)")';
    }
    else if (weatherData.current.condition.code === 1186 || weatherData.current.condition.code === 1189) {
        body.style.backgroundImage = 'url("https://haligonia.b-cdn.net/wp-content/uploads/2021/12/rainfall.jpg")'
    }
    else if (weatherData.current.condition.code === 1192 || weatherData.current.condition.code === 1195) {
        body.style.backgroundImage = 'url("https://trepanddoc.files.wordpress.com/2013/09/rain.jpeg")'
    }
    else {
        body.style.backgroundImage = 'url("https://i.natgeofe.com/k/ff56315f-1b5c-44ba-a85b-1f29c8ee403b/Tree_Blizzard_KIDS_0123.jpg")'
    }
  


    let classCounter = 0;

    const forecastContainer = document.getElementById('forecast-container')
    
    forecastContainer.innerHTML = '';

    weatherData.forecast.forecastday.forEach(day => {
        const forecastElement = document.createElement('div');
        const forecastClass = `forecast-${classCounter}`;
        forecastElement.className = 'forecast-element ' + forecastClass;
        classCounter++;

        let forecastIcon = `https:${day.day.condition.icon}`;
        
        forecastElement.innerHTML = `
           
            <h3>${day.date}</h3>
            <img src="${forecastIcon}" alt="weather icon">
            <p class="conditionForecast">${day.day.condition.text}</p>
            <p class="maxtemp">Max: ${day.day.maxtemp_c} c</p>
            <p class="mintemp">Min: ${day.day.mintemp_c} c</p>
            <p>Humidity: ${day.day.avghumidity}%</p>
            <p>Max Wind: ${day.day.maxwind_kph} kph</p>
        `;
        forecastContainer.appendChild(forecastElement);
    });
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const place = `${latitude},${longitude}`;
    getWeatherData(place).then(weatherData => {
        convertJson(weatherData);
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

let button = document.getElementById('submit').addEventListener('click', () => {
    let place = document.getElementById('place').value;
    if (place) {
        getWeatherData(place).then(weatherData => {
            convertJson(weatherData);
        });        
    } else {
        getLocation();
    }
})
