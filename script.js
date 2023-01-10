
const form = document.querySelector('form');

form.addEventListener('submit', displayWeather);

function displayWeather(element) {
  
  const search = document.querySelector('#search');
  const temperature = document.querySelector('.temp');

  let searchValue = search.value;

  element.preventDefault();

  getWeatherData();

  async function getWeatherData() {
    try {
      const coorResponse = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='+searchValue+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
      const coorData = await coorResponse.json();
      const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+coorData[0].lat+'&lon='+coorData[0].lon+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
      const weatherData = await weatherResponse.json();
      
      temperature.textContent = tempConverter.toCelsius(weatherData.main.temp);
      
    } catch (err) {
      console.log(err);
    }
  }
};

const tempConverter = (() => {

  const toCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  }

  const toFahrenheit = (temp) => {
    return ((temp - 273.15) * (9/5) + 32).toFixed(2);
  }

  return {
    toCelsius,
    toFahrenheit
  }

})();