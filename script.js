
// Select DOM elements for future manipulation
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Event listener for the search button
search.addEventListener('click', () => {
    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091'; // OpenWeatherMap API key
    const city = document.querySelector('.search-box input').value;

    if (city !== '') {
        // Fetch weather data by city name
        fetchWeatherByCity(city, APIKey);
    } else {
        // If no city is provided, use geolocation to get the current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherByCoordinates(lat, lon, APIKey);
            }, () => {
                alert('Unable to retrieve your location');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
});

// Function to fetch weather data by city name
function fetchWeatherByCity(city, APIKey) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${city}. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => updateWeatherUI(json))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(`Failed to retrieve weather data for "${city}". Please try another city.`);
        });
}

// Function to fetch weather data by geographical coordinates
function fetchWeatherByCoordinates(lat, lon, APIKey) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Location not found. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => updateWeatherUI(json))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(`Failed to retrieve weather data for your location. Error: ${error.message}`);
        });
}

// Function to update the UI with weather data
function updateWeatherUI(json) {
    // Handle case where the city or location is not found
    if (json.cod === '404') {
        container.style.height = '400px'; // Adjust height for error message
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
    }

    // Adjust height for displaying weather data
    container.style.height = '600px';
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');

    // Select elements to update with new data
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.querySelector('.humidity span');
    const wind = document.querySelector('.wind span');

    // Update the weather icon URLs based on the weather condition
    switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'https://www.achensee.com/fileadmin/images/WetterIcons/C.png';
            break;
        case 'Clouds':
            image.src = 'https://cdn-icons-png.flaticon.com/512/1139/1139994.png';
            break;
        case 'Rain':
            image.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png';
            break;
        case 'Snow':
            image.src = 'https://icons.veryicon.com/png/o/weather/weather-icon-1/moderate-to-heavy-snow.png';
            break;
        case 'Thunderstorm':
            image.src = 'https://cdn-icons-png.flaticon.com/256/1959/1959334.png';
            break;
        default:
            image.src = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png';
            break;
    }

    // Update weather details
    temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;
}

