
const form = document.querySelector('form');

form.addEventListener('submit', displayWeather);

function displayWeather(element) {
  
  const search = document.querySelector('#search');
  const temperature = document.querySelector('.temp');
  const feelsLike = document.querySelector('.feelslike');
  const condition = document.querySelector('.condition');
  const wind = document.querySelector('.wind');
  const location = document.querySelector('.location');

  
  let searchValue = search.value;

  element.preventDefault();

  getWeatherData();

  async function getWeatherData() {
    try {
      const coorResponse = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='+searchValue+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
      const coorData = await coorResponse.json();
      const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+coorData[0].lat+'&lon='+coorData[0].lon+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
      const weatherData = await weatherResponse.json();
      
      location.textContent = `Current weather conditions in ${(searchValue)}`;
      temperature.textContent = `Temperature: ${tempConverter.toCelsius(weatherData.main.temp)}°C`;
      feelsLike.textContent = `Feels Like: ${tempConverter.toCelsius(weatherData.main.feels_like)}°C`;
      condition.textContent = `Conditions: ${(weatherData.weather[0].description)}`;
      wind.textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;

      search.value = '';
      
    } catch (err) {
      console.log(err);
    }
  }
};

const tempConverter = (() => {

  const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
  }

  const toFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * (9/5) + 32).toFixed(0);
  }

  return {
    toCelsius,
    toFahrenheit
  }

})();