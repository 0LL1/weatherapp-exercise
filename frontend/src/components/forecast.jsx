import React from 'react'
import Weather from './weather'

const Forecast = ({ forecast }) => {
  const weathers = forecast.map((weather) => {
    const data = {
      key: weather.dt,
      time: weather.dt_txt.slice(11, -3),
      icon: weather.weather[0].icon.slice(0, -1),
      temp: Math.round(weather.main.temp),
      desc: weather.weather[0].description,
    }

    return (
      <Weather key={data.key} time={data.time} icon={data.icon} temp={data.temp} desc={data.desc} />
    )
  })

  return <div className="weathers">{weathers}</div>
}

export default Forecast
