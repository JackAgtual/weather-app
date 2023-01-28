export default function WeatherController(FetchWeather, UnitConverter) {
    const _form = document.getElementById('form')
    const _input = document.getElementById('location-input')
    const _cityValueEl = document.getElementById('city')
    const _tempValueEl = document.getElementById('temperature')

    const _renderPageForInvalidSearch = () => {
        _input.setCustomValidity('Invalid city')
        _input.reportValidity()
        _input.focus()
        _input.select()
    }

    const _renderPageForValidSearch = async () => {
        const data = await FetchWeather.getWeatherAtLocation(_input.value)
        _cityValueEl.innerText = data.name
        _tempValueEl.innerText = `${Math.round(UnitConverter.kelvin2fahrenhet(data.main.temp))} \u00B0F`
        _input.blur()
    }

    const presentWeatherData = e => {
        e.preventDefault()

        _input.setCustomValidity('')
        try {
            _renderPageForValidSearch()
        } catch {
            _renderPageForInvalidSearch()
        }
    }

    _form.addEventListener('submit', presentWeatherData)

    // prevent custom validity message from popping up
    _input.addEventListener('input', () => _input.setCustomValidity(''))
}