
const form = document.querySelector('form');

form.addEventListener('submit', displayWeather);

function displayWeather(element) {
  
  const search = document.querySelector('#search');

  let searchValue = search.value;

  element.preventDefault();

  getWeatherData();

  async function getWeatherData() {
    try {
      const coorResponse = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='+searchValue+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
      const coorData = await coorResponse.json();
      
      const lat = coorData[0].lat;
      const lon = coorData[0].lon;

      const weatherResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=a514c3b8912742c6fbbe4b4f27cb598c');
      const weatherData = await weatherResponse.json();
      
      console.log(weatherData);
      
    } catch (err) {
      console.log(err);
    }
  }
};