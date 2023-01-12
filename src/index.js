import './styles.css'
import FetchWeather from './fetchWeather.js'
import WeatherController from './weatherController';

const fetchWeather = FetchWeather();
const weatherController = WeatherController(fetchWeather)
