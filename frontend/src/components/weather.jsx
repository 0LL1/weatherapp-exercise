import React from 'react'

const Weather = ({ time, icon, temp, desc }) => (
  <div className="weather">
    <h1>{time}</h1>
    <img src={`/img/${icon}.svg`} alt={`${desc}`} />
    <h1>{temp} &deg;C</h1>
  </div>
)

export default Weather
