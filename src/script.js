function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let actualDateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  actualDateElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  icon.innerHTML = `<img
  src="${response.data.condition.icon_url}" class="current-icon" />`;

  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "b739b64actfb7710ab2aa8f6044o4c38";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b739b64actfb7710ab2aa8f6044o4c38";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(showForecast);
}

function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      console.log(response);
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div>
        <img src="${day.condition.icon_url}" class="forecast-icon" />
        </div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}ºC</strong>
          </div>
          <div class="forecast-temperature">${Math.round(
            day.temperature.minimum
          )}ºC</div>
        </div>
      </div>
    `;
    }
  });

  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("London");
