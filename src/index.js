import './styles.css'
import FetchWeather from './fetchWeather.js'
import WeatherController from './weatherController'
import UnitConverter from './unitConversions'

const fetchWeather = FetchWeather()
const unitConverter = UnitConverter()
const weatherController = WeatherController(fetchWeather, unitConverter)
