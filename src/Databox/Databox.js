import './databox.css';
import { ImLocation, ImCloud, ImSun } from 'react-icons/im';
import { WiRainWind, WiDayHaze } from 'react-icons/wi';

import React from 'react';

const Databox = ({ cityDetails, isFetching, isError }) => {
  if (isFetching || isError)
    return (
      <div className="container">
        {isFetching ? (
          <span>Loading....</span>
        ) : (
          <span>Error fetching details. Try Again.</span>
        )}
      </div>
    );

  const getWeatherIcon = (weather) => {
    if (weather.includes('cloud') || weather.includes('fog'))
      return <ImCloud color="#626161" size={40} />;
    else if (weather.includes('clear') || weather.includes('sun'))
      return <ImSun color="yellow" size={40} />;
    else if (weather.includes('rain') || weather.includes('bad'))
      return <WiRainWind color="#687276" size={40} />;

    return <WiDayHaze color="#FFD580" size={40} />;
  };

  const getBackgroundColor = (cityDetails) => {
    if (!cityDetails) return 'white';
    const weather = cityDetails.weather[0].description;
    if (weather.includes('cloud') || weather.includes('fog')) return '#c2d5dc';
    else return '#80daeb';
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: getBackgroundColor(cityDetails) }}
    >
      {cityDetails ? (
        <>
          <div className="temperature">
            <span>{cityDetails.main.temp} &deg;C</span>
          </div>
          <div className="city-name">
            <ImLocation color="red" />
            <span>
              {cityDetails.name}, {cityDetails.sys.country}
            </span>
          </div>
          <div className="additional">
            <div className="min-max-temp">
              <span>Min. Temp : {cityDetails.main.temp_min} &deg;C</span>
              <span>Max. Temp : {cityDetails.main.temp_max} &deg;C</span>
              <span>Humidity : {cityDetails.main.humidity}</span>
            </div>
            <div className="weather">
              {getWeatherIcon(cityDetails.weather[0].description)}

              <span>{cityDetails.weather[0].description}</span>
            </div>
          </div>
        </>
      ) : (
        <span>Select City</span>
      )}
    </div>
  );
};

export default Databox;
