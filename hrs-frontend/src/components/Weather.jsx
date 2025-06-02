import React, { useState, useEffect } from 'react';
import { FaSearch, FaTemperatureHigh, FaCloudSun, FaWind } from 'react-icons/fa';
import '../assets/css/WeatherSearch.css';

const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';
const WEATHER_API_KEY = '3d7f6bbcccef4549a03202817240512'; 
    
const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultCities = ['Karachi', 'Islamabad', 'Lahore'];

  const fetchWeatherData = async (cityName) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${cityName}&aqi=no`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message || 'Failed to fetch weather data');
      }

      return data;
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDefaultCitiesWeather = async () => {
      const weatherResults = [];
      for (let cityName of defaultCities) {
        try {
          const data = await fetchWeatherData(cityName);
          if (data) weatherResults.push(data);
        } catch (err) {
          console.error(`Error fetching weather for ${cityName}:`, err);
        }
      }
      setWeatherData(weatherResults);
    };

    fetchDefaultCitiesWeather();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    const newCityWeather = await fetchWeatherData(city);
    if (newCityWeather) {
      setWeatherData([newCityWeather]);
    }
  };

  return (
    <div className="weather-search-container">
      <h1 className="title">Weather Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          <FaSearch />
        </button>
      </form>

      {isLoading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="weather-table">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (°C)</th>
              <th>Condition</th>
              <th>Humidity (%)</th>
              <th>Wind Speed (km/h)</th>
            </tr>
          </thead>
          <tbody>
            {weatherData?.length > 0 ? (
              weatherData.map((data, index) => (
                <tr key={index}>
                  <td>{data.location.name}, {data.location.country}</td>
                  <td><FaTemperatureHigh /> {data.current.temp_c}</td>
                  <td><FaCloudSun /> {data.current.condition.text}</td>
                  <td>{data.current.humidity}</td>
                  <td><FaWind /> {data.current.wind_kph}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No weather data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherSearch;
