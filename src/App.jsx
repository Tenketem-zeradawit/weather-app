

 import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "c54c85d47f135c06042b1b22ee708418";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  return (
   <div className="weather">
    <div className="  container text-center mt-5">
      
      <div className="inpt">
        <input
          type="text"
          placeholder="Enter City"
          className="form-control mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
        />
      </div>
     
      <br />
     
<br />

<div className="mt-4">
  <div className="right">
    <h2>{weather?.name || ' '} <br />{weather?.main?.temp || ''}</h2>
    <p className="feels">{weather?.weather?.[0]?.description || ''}</p>
  </div>
  <br />
  <div className="humidity">
    <div>
      <p>{weather?.main?.feels_like || ' '}°C</p>
      <p>Feels Like</p>
    </div>
    <div>
      <p>{weather?.main?.humidity || ' '}%</p>
      <p>Humidity</p>
    </div>
    <div>
      <p>{weather?.wind?.speed || ' '} m/s</p>
      <p>Wind Speed</p>
    </div>
  </div>
</div>

    </div>
    </div>
  );
};

export default App;

 










