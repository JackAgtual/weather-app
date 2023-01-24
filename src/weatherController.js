export default function WeatherController(FetchWeather, UnitConverter) {
    const _submitBtn = document.getElementById('submit')
    const _input = document.getElementById('location-input')
    const _cityValueEl = document.getElementById('city')
    const _tempValueEl = document.getElementById('temperature')

    _submitBtn.addEventListener('click', async e => {
        e.preventDefault()

        const data = await FetchWeather.getWeatherAtLocation(_input.value)
        if (!data) return;

        _cityValueEl.innerText = data.name
        _tempValueEl.innerText = `${Math.round(UnitConverter.kelvin2fahrenhet(data.main.temp))} \u00B0F`
    })
}