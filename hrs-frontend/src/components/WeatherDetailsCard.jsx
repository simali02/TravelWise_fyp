import React from "react";
import { FaTemperatureHigh, FaWind, FaTint } from "react-icons/fa";
import '../assets/css/WeatherDetailsCardStyles.css'
const WeatherDetailsCard = () => {
  const weatherData = {
    location: "Karachi",
    temperature: "32°C",
    condition: "Sunny",
    windSpeed: "15 km/h",
    humidity: "60%",
  };

  return (
    <div className="weather-container">
      <div className="weather-location">{weatherData.location}</div>
      <div className="weather-details">
        <div className="weather-detail-item">
          <FaTemperatureHigh className="weather-icon" />
          <span>{weatherData.temperature}</span>
        </div>
        <div className="weather-detail-item">
          <FaTint className="weather-icon" />
          <span>Humidity: {weatherData.humidity}</span>
        </div>
        <div className="weather-detail-item">
          <FaWind className="weather-icon" />
          <span>Wind: {weatherData.windSpeed}</span>
        </div>
      </div>
      <div className="weather-condition">{weatherData.condition}</div>
    </div>
  );
};

export default WeatherDetailsCard;
