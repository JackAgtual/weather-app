export default function WeatherController(FetchWeather, UnitConverter) {
    const _form = document.getElementById('form')
    const _input = document.getElementById('location-input')
    const _cityValueEl = document.getElementById('city')
    const _countryValueEl = document.getElementById('country')
    const _tempValueEl = document.getElementById('temperature')
    const _feelsLikeTempValueEl = document.getElementById('feels-like-temp')
    const _cloudStatusValueEl = document.getElementById('cloud-status')
    const _humidityValueEl = document.getElementById('humidity')
    const _windspeedValueEl = document.getElementById('windspeed')

    const _renderPageForInvalidSearch = () => {
        _input.setCustomValidity('Invalid city')
        _input.reportValidity()
        _input.focus()
        _input.select()
    }

    const _renderPageForValidSearch = async cityName => {
        const data = await FetchWeather.getWeatherAtLocation(cityName)
        _cityValueEl.innerText = data.name
        _countryValueEl.innerText = data.sys.country
        _tempValueEl.innerText = `${Math.round(data.main.temp)} \u00B0F`
        _feelsLikeTempValueEl.innerText = `${Math.round(data.main.feels_like)} \u00B0F`
        _cloudStatusValueEl.innerText = data.weather[0].description
        _humidityValueEl.innerText = data.main.humidity
        _windspeedValueEl.innerText = data.wind.speed
        _input.blur()
    }

    const presentWeatherData = e => {
        e.preventDefault()

        _input.setCustomValidity('')
        try {
            _renderPageForValidSearch(_input.value)
        } catch {
            _renderPageForInvalidSearch()
        }
    }

    _form.addEventListener('submit', presentWeatherData)

    // prevent custom validity message from popping up
    _input.addEventListener('input', () => _input.setCustomValidity(''))

    _renderPageForValidSearch('los angeles')
}