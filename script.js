function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  city = `${city.value}`;
  let apiKey = "46e91c132e9080dd0c810b591007d18d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response) {
  let cityText = document.querySelector("#city-text");
  cityText.innerHTML = `${response.data.name}`;
  let TemperatureDisplay = document.querySelector("#temperature");
  TemperatureDisplay.innerHTML = Math.round(response.data.main.temp);
}
function CurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
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

let cityForm = document.querySelector("#city-form");
cityForm = addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", CurrentLocation);
