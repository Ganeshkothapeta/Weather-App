# Weather-App

This is a simple weather app that provides current weather information for a specified location or the user's current location using the OpenWeatherMap API. The app features a clean and responsive design, and it displays temperature, weather description, humidity, and wind speed.

Features
Search for weather by city name.
Retrieve weather data based on the user's current location.
Display weather conditions with dynamic icons and data.
Handle errors and display appropriate messages if the location is not found.
Technologies Used
HTML: Structure of the web page.
CSS: Styling and layout.
JavaScript: Fetching and displaying weather data.
OpenWeatherMap API: Fetching weather data.
Google Fonts: Font styling (Poppins).
Boxicons: Icons for UI elements.
Installation
To set up the project locally:

Clone the Repository:

bash
Copy code
git clone <repository-url>
cd <repository-directory>
Open index.html: Open index.html in your browser to view the app.

Usage
Search for Weather:

Enter a city name in the search box and click the search button to retrieve the weather information for that city.
If the city is not found, an error message will be displayed.
Use Current Location:

If no city is entered, the app will attempt to use the browser's geolocation to get the current weather based on your location.
Code Explanation
HTML
Contains the structure of the app, including the search box, weather display, and error message elements.
CSS
Provides styling for the app, including layout, colors, and responsive design.
JavaScript
Handles user interactions and fetches weather data from the OpenWeatherMap API.
Updates the UI based on the fetched data and handles errors.
Key JavaScript Functions
search.addEventListener('click', ...): Initiates a search for weather data based on user input or current location.

fetchWeatherByCity(city, APIKey): Fetches weather data for a specified city and updates the UI.

fetchWeatherByCoordinates(lat, lon, APIKey): Fetches weather data based on geographical coordinates and updates the UI.

updateWeatherUI(json): Updates the UI with weather data and handles error states.

