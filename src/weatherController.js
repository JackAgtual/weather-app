export default function WeatherController(FetchWeather) {
    const _submitBtn = document.getElementById('submit')
    const _input = document.getElementById('location-input')
    const _cityValueEl = document.getElementById('city')
    const _tempValueEl = document.getElementById('temperature')

    _submitBtn.addEventListener('click', async () => {
        const data = await FetchWeather.getWeatherAtLocation(_input.value)
        if (!data) return;

        _cityValueEl.innerText = data.name
        _tempValueEl.innerText = `${Math.round((data.main.temp - 273.15) * 9 / 5 + 32)} \u00B0F`
    })
}