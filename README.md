# Weather Forecast App

## Overview

This is a pet project built with **Angular 19** that provides weather forecasts for different locations. The application fetches real-time weather data from a public API and presents it in a clean and user-friendly interface.

## Features

- **Current Weather**: Displays real-time temperature, humidity, and wind speed.
- **5-Day Forecast**: Provides a detailed weather forecast for the upcoming days.
- **Search Functionality**: Users can search for weather updates by city name.
- **Responsive Design**: Works smoothly across desktop and mobile devices.

## Tech Stack

- **Framework**: Angular 19
- **Styling**: SCSS / Tailwind CSS
- **Data Fetching**: HTTP Client with a public weather API (e.g., OpenWeatherMap, WeatherAPI)
- **State Management**: RxJS Observables

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/weather-forecast-app.git
   cd weather-forecast-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Get an API key from a weather data provider (e.g., OpenWeatherMap) and add it to the environment file:
   ```ts
   export const environment = {
     production: false,
     weatherApiKey: 'YOUR_API_KEY_HERE',
   };
   ```
4. Run the development server:
   ```sh
   ng serve
   ```
5. Open the app in your browser at `http://localhost:4200/`.

## Usage

1. Enter a city name in the search bar.
2. View the current weather conditions and forecast.
3. Enjoy an intuitive and simple UI to track weather updates!

## Contribution

Feel free to fork the repository and submit pull requests to enhance the application.

## License

This project is licensed under the MIT License.
