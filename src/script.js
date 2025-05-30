function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let icon = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  let windElement = document.querySelector("#wind");
  let wind = `${response.data.wind.speed}km/h`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = `${response.data.temperature.humidity}%`;

  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  descriptionElement.innerHTML = description;
  icon.innerHTML = `<img
  src="${response.data.condition.icon_url}" class="current-icon" />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;

  let apiKey = "b739b64actfb7710ab2aa8f6044o4c38";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function formatDay(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let actualDateElement = document.querySelector("#current-date");
let actualDate = new Date();

actualDateElement.innerHTML = formatDay(actualDate);
