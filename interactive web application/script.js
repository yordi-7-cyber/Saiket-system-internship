const APIkey = "df93b47d9365fc8888b839075e8974c6";

const searchBtn = document.querySelector('.search-box-button');
const input = document.querySelector('.search-box input');
const container = document.querySelector('.container'); // Weather container
const weatherImg = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');

searchBtn.addEventListener('click', () => {
  const city = input.value.trim();
  if (city === '') return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      // Weather icon switch based on weather type
      switch (data.weather[0].main) {
        case 'Clear':
          weatherImg.src = 'images/clear.png';
          break;
        case 'Rain':
          weatherImg.src = 'images/rain.png';
          break;
        case 'Snow':
          weatherImg.src = 'images/snow.png';
          break;
        case 'Clouds':
          weatherImg.src = 'images/clouds.png';
          break;
        case 'Haze':
        case 'Mist':
        case 'Fog':
          weatherImg.src = 'images/mist.png';
          break;
        case 'Drizzle':
          weatherImg.src = 'images/drizzle.png';
          break;
        default:
          weatherImg.src = 'images/clouds.png';
      }

      // Update the weather details
      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.textContent = data.weather[0].description;
      humidity.textContent = `${data.main.humidity}%`;
      wind.textContent = `${Math.round(data.wind.speed)} km/hr`;

      // Show the weather container after the data is fetched
      container.style.display = "block";  // Make the container visible
    })
    .catch(err => {
      alert("❌ " + err.message);
    });
});