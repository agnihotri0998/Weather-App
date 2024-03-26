import React from "react";

function WeatherDisplay({ weather }) {
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  return (
    <div>
      <h2>{weather.name}</h2>
      <img src={iconUrl} alt={weather.weather[0].description} />

      <p>{weather.main.temp}°C</p>
      <p>{weather.weather[0].main}</p>
    </div>
  );
}

export default WeatherDisplay;
