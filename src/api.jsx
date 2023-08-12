import React, { useState, useEffect } from 'react';
 const Weather_Api = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '9c55db619848b94a2ce3899ea3190390';
  const city = 'New York'; // Change this to the city you're interested in

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9c55db619848b94a2ce3899ea3190390`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        // Parse the JSON response
        const weather_Data = await response.json();
        console.log(weather_Data);
        setWeatherData(weather_Data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData(); // Call the function to fetch weather data
  },[]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  

  // Assuming you want to display the temperature
  return (
    <div>
      <h1>Weather in {weatherData.name}</h1>
       <p>Temperature: {weatherData.coord.lon} K</p>
      <p>Weather: {weatherData.weather[0].description}</p> 
    </div>
  );
};
export default Weather_Api;
