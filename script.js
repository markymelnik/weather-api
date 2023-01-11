
const displayController = (() => {

  const search = document.querySelector('#search');
  const location = document.querySelector('.location');
  const temperature = document.querySelector('.temp-title');
  const feelsLike = document.querySelector('.feelslike');
  const condition = document.querySelector('.condition');
  const wind = document.querySelector('.wind');
  
  const displayWeather = (element) => {
  
    let searchValue = search.value;
    element.preventDefault();
    getWeatherData();
  
    async function getWeatherData() {
      try {

        const coorResponse = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='+searchValue+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
        const coorData = await coorResponse.json();

        const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+coorData[0].lat+'&lon='+coorData[0].lon+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
        const weatherData = await weatherResponse.json();

        const celsiusTemp = tempConverter.toCelsius(weatherData.main.temp);
        
        location.textContent = `Current weather conditions in ${(capitalizeFirstLetters(searchValue))}`;
        temperature.textContent = `Temperature: ${celsiusTemp}`;
        feelsLike.textContent = `Feels Like: ${tempConverter.toCelsius(weatherData.main.feels_like)}°C`;
        condition.textContent = `Conditions: ${(capitalizeFirstLetters(weatherData.weather[0].description))}`;
        wind.textContent = `Wind: ${weatherData.wind.speed.toFixed(0)} m/s`;

        search.value = '';
        
      } catch (err) {
        console.log(err);
      }
    }
  };

  const capitalizeFirstLetters = (str) => {
    str = str.split(' ');
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1).toLowerCase();
    }
    return str.join(' ');
  };

  return {
    displayWeather
  }

})();


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

const form = document.querySelector('form');
const button = document.querySelector('button');

form.addEventListener('submit', displayController.displayWeather);
button.addEventListener('click', displayController.displayWeather);