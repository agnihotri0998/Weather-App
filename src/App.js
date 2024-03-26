import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [bgClass, setBgClass] = useState('default');

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
        const response = await axios.get(url);
        setWeather(response.data);
        updateBackground(response.data.weather[0].main.toLowerCase());
        setQuery('');
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    }
  };

  const updateBackground = (weatherCondition) => {
    // This function sets the background class based on the weather condition
    // You can add more conditions and corresponding classes for different weathers
    switch(weatherCondition) {
      case 'clear':
        setBgClass('clear');
        break;
      case 'clouds':
        setBgClass('clouds');
        break;
      case 'rain':
        setBgClass('rain');
        break;
      case 'snow':
        setBgClass('snow');
        break;
      case 'thunderstorm':
        setBgClass('thunderstorm');
        break;
      default:
        setBgClass('default');
        break;
    }
  };

  // Effect hook to reset background to default when app initializes
  useEffect(() => {
    setBgClass('default');
  }, []);

  return (
    <div className={`App ${bgClass}`}>
      <input 
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={searchWeather}
      />
      {weather.main && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
