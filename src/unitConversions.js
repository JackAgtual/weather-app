export default function UnitConverter() {
    const kelvin2celcius = tempKelvin => tempKelvin - 273.15;

    const kelvin2fahrenhet = tempKelvin => celcius2fahrenheit(kelvin2celcius(tempKelvin));

    const celcius2fahrenheit = tempCelcius => tempCelcius * 9 / 5 + 32;

    const fahrenheit2celcius = tempFahrenheit => (tempFahrenheit - 32) * 5 / 9;

    return {
        kelvin2celcius,
        kelvin2fahrenhet,
        celcius2fahrenheit,
        fahrenheit2celcius
    }
}