export default function WeatherController(FetchWeather, UnitConverter) {
    const _submitBtn = document.getElementById('submit')
    const _input = document.getElementById('location-input')
    const _cityValueEl = document.getElementById('city')
    const _tempValueEl = document.getElementById('temperature')

    const presentWeatherData = async e => {
        e.preventDefault()

        try {
            const data = await FetchWeather.getWeatherAtLocation(_input.value)
            console.log(`data: ${data}`)
            _cityValueEl.innerText = data.name
            _tempValueEl.innerText = `${Math.round(UnitConverter.kelvin2fahrenhet(data.main.temp))} \u00B0F`
        } catch {
            console.log(`invalid city`)
            _input.setCustomValidity('Invalid city')
        }
    }

    _submitBtn.addEventListener('click', presentWeatherData)

}