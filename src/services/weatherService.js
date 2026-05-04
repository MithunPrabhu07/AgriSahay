const CITY_COORDS = {
  Chennai: { lat: 13.08, lon: 80.27 },
  Delhi: { lat: 28.61, lon: 77.2 },
  Madurai: { lat: 9.93, lon: 78.12 },
  Coimbatore: { lat: 11.02, lon: 76.96 },
  Lucknow: { lat: 26.85, lon: 80.95 }
}

export async function fetchWeather(city = 'Chennai') {
  const coords = CITY_COORDS[city] || CITY_COORDS.Chennai
  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`

  try {
    const response = await fetch(endpoint)
    if (!response.ok) throw new Error('Weather fetch failed')

    const payload = await response.json()
    return {
      city,
      temperature: payload.current?.temperature_2m,
      humidity: payload.current?.relative_humidity_2m,
      wind: payload.current?.wind_speed_10m
    }
  } catch {
    return {
      city,
      temperature: 31,
      humidity: 62,
      wind: 14
    }
  }
}

export function getWeatherCities() {
  return Object.keys(CITY_COORDS)
}
