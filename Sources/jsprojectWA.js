function formatDate (date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wenesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  };

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };

  return `${day} ${hours}:${minutes}`;
}
let now = new Date();
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDate(now);

function temperatureCelsius (event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = `${Math.round((temperature - 32) * 5 / 9)}`;
  let windUnit = document.querySelector("#units-wind");
  windUnit.innerHTML = "km/h"
};
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", temperatureCelsius);

function temperatureFahrenheit (event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = `${Math.round((temperature * 9) / 5) + 32}`;
  let windUnit = document.querySelector("#units-wind");
  windUnit.innerHTML = "mph"
};
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", temperatureFahrenheit);

function displayCityTemp(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  let precipitation = document.querySelector("#current-precipitation");
  document.querySelector("#current-humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#current-wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-visibility").innerHTML = response.data.weather[0].main;
}

function displayOnLoad (city) {
  let units = "metric";
  let apiKey = "764c6412bfddc7086225316d08eb93d8";
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiCityUrl).then(displayCityTemp);
}

displayOnLoad("Paris");

function chosenCity(event) {
  event.preventDefault();
  let city = document.querySelector("#select-city").value;
  displayOnLoad(city);
}
let cityForm = document.querySelector("#submit-city");
cityForm.addEventListener("submit", chosenCity);

function weatherPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units ="metric";
  let apiKey = "764c6412bfddc7086225316d08eb93d8";
  let positionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(positionUrl).then(displayCityTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(weatherPosition);
}
let getCurrentPositionButton = document.querySelector("#location-button");
getCurrentPositionButton.addEventListener("click", getCurrentPosition);