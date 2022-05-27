function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  searchCity(cityElement.value);
}
function searchCity(cityElement) {
  let apiKey = "46e91c132e9080dd0c810b591007d18d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response) {
  let cityElement = document.querySelector("#city-text");
  cityElement.innerHTML = `${response.data.name}`;
  let TemperatureDisplay = document.querySelector("#temperature");
  TemperatureDisplay.innerHTML = Math.round(response.data.main.temp);
  let weatherCondition = document.querySelector("#condition");
  weatherCondition.innerHTML = `${response.data.weather[0].description}`;
  let windElement = document.querySelector("#wind-condition");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity-condition");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function CurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function DateAndTime() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let DayTime = document.querySelector("#day-Time");
  DayTime.innerHTML = `${day}, ${hours}:${minutes}`;
}

let cityForm = document.querySelector("#city-form");
cityForm = addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", CurrentLocation);

DateAndTime();
searchCity("London");
