function formatDate (timestamp) {
  let date = new Date(timestamp);
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

function displayforecast () {
  let forecastElement = document.querySelector("#days-after");
  let forecastHTML = ``;
  let days = ["Monday", "Tuesday", "Wenesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML + `
    <div class="forecast">
      <div class="row justify-content-md-center">
        <div class="col col-lg-9" style="padding-left: 20px;">
      <span class="nameday">${day}</span> | <span id="temperatures-max">0°C</span> - <span id="temperatures-min">0°C</span>
      <br />
      <div class="infosdaysafter">
      Precipitation: <span id="precipitation-day">0</span>%
      <br />
      Humidity: <span id="humidity-day">0</span>%
      <br />
      Wind: <span id="wind-day">0</span> <span id="units-wind">km/h</span>
      </div>
        </div>
        <div class="col col-lg-3" style="text-align: right; margin: auto;">
      <img src="#" alt="icon" class="iconday1" width="80px"></i>
        </div>
      </div>
    </div>`;  
  })
  forecastElement.innerHTML = forecastHTML;
}

function temperatureCelsius (event) {
  event.preventDefault();
  celsius.classList.add("active");
  celsius.classList.remove("inactive");
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("inactive");
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#current-wind").innerHTML = Math.round(windSpeed);
  document.querySelector("#units-wind").innerHTML = `km/h`;
};
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", temperatureCelsius);

function temperatureFahrenheit (event) {
  event.preventDefault();
  celsius.classList.remove("active");
  celsius.classList.add("inactive");
  fahrenheit.classList.add("active");
  fahrenheit.classList.remove("inactive");
  document.querySelector("#current-temperature").innerHTML = Math.round((celsiusTemperature * 9) / 5) + 32;
  document.querySelector("#current-wind").innerHTML = Math.round(windSpeed * 0.621371);
  document.querySelector("#units-wind").innerHTML = `mph`;
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
  document.querySelector("#current-day").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#current-weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  celsiusTemperature = response.data.main.temp;
  windSpeed = response.data.wind.speed;
  celsius.classList.add("active");
  celsius.classList.remove("inactive");
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("inactive");
  document.querySelector("#units-wind").innerHTML = `km/h`;
}

let celsiusTemperature = null;
let windSpeed = null;

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

function displayOnLoad (city) {
  let units = "metric";
  let apiKey = "764c6412bfddc7086225316d08eb93d8";
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiCityUrl).then(displayCityTemp);
}

function chosenCity(event) {
  event.preventDefault();
  let city = document.querySelector("#select-city").value;
  displayOnLoad(city);
}
let cityForm = document.querySelector("#submit-city");
cityForm.addEventListener("submit", chosenCity);

displayforecast();
displayOnLoad("Montevideo");