export default function FetchWeather() {
    const _API_KEY = '71a1b51643d9e6c26dca379f470ad504'

    const _getLatLon = async location => {
        const fetchLimit = 1;
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${fetchLimit}&appid=${_API_KEY}`, { mode: 'cors' })
            const data = await response.json()
            return [data[0].lat, data[0].lon]
        } catch (error) {
            console.log(error)
        }
    }

    const _getWeatherFromLatLon = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${_API_KEY}`, { mode: 'cors' })
            return response.json()
        } catch (error) {
            console.log(error)
        }
    }

    const getWeatherAtLocation = async location => {
        try {
            const [lat, lon] = await _getLatLon(location)
            return _getWeatherFromLatLon(lat, lon)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getWeatherAtLocation
    }
}