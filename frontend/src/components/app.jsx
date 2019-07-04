import React, { useState, useEffect } from 'react'
import Forecast from './forecast'

const baseURL = process.env.ENDPOINT

console.log('TCL: baseURL', baseURL)
const App = () => {
  const [location, setLocation] = useState('')
  const [forecast, setForecast] = useState('')

  useEffect(() => {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = Math.round(position.coords.latitude)
      const lon = Math.round(position.coords.longitude)

      setLocation({ lat, lon })
    })
  }, [])

  useEffect(() => {
    if (location) {
      const getWeatherFromApi = async () => {
        try {
          const response = await fetch(`${baseURL}/weather`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(location),
          })
          const data = await response.json()

          setForecast(data.list.slice(0, 8))
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
        }
        return {}
      }

      getWeatherFromApi()
    }
  }, [location])

  return <div className="app">{forecast && <Forecast forecast={forecast} />}</div>
}

export default App
