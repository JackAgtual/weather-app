export default function WeatherController(FetchWeather, UnitConverter) {
    const _form = document.getElementById('form')
    const _input = document.getElementById('location-input')
    const _locationValueEl = document.getElementById('location')
    const _tempValueEl = document.getElementById('temp-val')
    const _weatherIcon = document.getElementById('weather-icon')
    const _weatherDescriptionValueEl = document.getElementById('weather-description')
    const _feelsLikeTempValueEl = document.getElementById('feels-like-temp')
    const _humidityValueEl = document.getElementById('humidity')
    const _windspeedValueEl = document.getElementById('windspeed')

    let _currentUnitIsF = true
    let _temperatureVal = undefined
    let _feelsLikeVal = undefined
    const _unitSelectorF = document.getElementById('unit-f')
    const _unitSelectorC = document.getElementById('unit-c')

    const _renderPageForInvalidSearch = () => {
        _input.setCustomValidity('Invalid city')
        _input.reportValidity()
        _input.focus()
        _input.select()
    }

    const _makeEachWordInStringUpperCase = string => {
        // string contains words separated by a space
        return string
            .split(' ')
            .reduce(
                (combinedString, curWord) => {
                    const capitalizedWord = curWord.charAt(0).toUpperCase() + curWord.slice(1)
                    return `${combinedString} ${capitalizedWord}`
                }, ''
            )
            .trim()
    }

    const _renderPageForValidSearch = async cityName => {
        const data = await FetchWeather.getWeatherAtLocation(cityName)

        _storeTemperatureValues(data)

        _tempValueEl.innerText = `${Math.round(data.main.temp)}`
        _weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        _locationValueEl.innerText = `${data.name}, ${data.sys.country}`
        _weatherDescriptionValueEl.innerText = _makeEachWordInStringUpperCase(data.weather[0].description)
        _feelsLikeTempValueEl.innerText = `Feels like ${Math.round(data.main.feels_like)}`
        _humidityValueEl.innerText = `Humidity: ${data.main.humidity}%`
        _windspeedValueEl.innerText = `Windspeed: ${data.wind.speed}`
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

    const _storeTemperatureValues = data => {
        // store temperatures for unit conversions
        _temperatureVal = data.main.temp
        _feelsLikeVal = data.main.feels_like
    }

    const _toggleSelectedUnitClassOnUnitElements = () => {
        _unitSelectorC.classList.toggle('unselected-unit')
        _unitSelectorF.classList.toggle('unselected-unit')
    }

    const toggleTemperatureUnits = () => {
        if (_currentUnitIsF) {
            _temperatureVal = UnitConverter.fahrenheit2celcius(_temperatureVal)
            _feelsLikeVal = UnitConverter.fahrenheit2celcius(_feelsLikeVal)
        } else {
            _temperatureVal = UnitConverter.celcius2fahrenheit(_temperatureVal)
            _feelsLikeVal = UnitConverter.celcius2fahrenheit(_feelsLikeVal)
        }

        _tempValueEl.innerText = `${Math.round(_temperatureVal)}`
        _feelsLikeTempValueEl.innerText = `Feels like ${Math.round(_feelsLikeVal)}`

        _toggleSelectedUnitClassOnUnitElements()
        _currentUnitIsF = !_currentUnitIsF
    }

    _unitSelectorC.addEventListener('click', toggleTemperatureUnits)
    _unitSelectorF.addEventListener('click', toggleTemperatureUnits)

    _form.addEventListener('submit', presentWeatherData)

    // prevent custom validity message from popping up
    _input.addEventListener('input', () => _input.setCustomValidity(''))

    _renderPageForValidSearch('los angeles')
}