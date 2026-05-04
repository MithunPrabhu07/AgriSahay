import { useEffect, useState } from 'react'
import { CloudSun } from 'lucide-react'
import { fetchWeather, getWeatherCities } from '../services/weatherService'

function WeatherCard() {
  const [city, setCity] = useState('Chennai')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetchWeather(city).then(setWeather)
  }, [city])

  return (
    <section className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-900">
          <CloudSun size={18} /> Weather
        </h3>
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="rounded-lg border border-emerald-900/20 bg-white px-3 py-1 text-sm text-emerald-900"
        >
          {getWeatherCities().map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {weather ? (
        <div className="grid grid-cols-3 gap-2 text-sm text-emerald-900">
          <div className="rounded-xl bg-emerald-50 p-2 text-center">
            <p className="font-semibold">{weather.temperature} C</p>
            <p>Temp</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2 text-center">
            <p className="font-semibold">{weather.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2 text-center">
            <p className="font-semibold">{weather.wind} km/h</p>
            <p>Wind</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-emerald-800/70">Loading weather...</p>
      )}
    </section>
  )
}

export default WeatherCard
