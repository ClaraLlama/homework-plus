//Date

let header = document.querySelector("header");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "Februray",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

header.innerHTML = `${day}, ${date} ${month}, ${hours}:${minutes}`;


let metricConversion = document.querySelector("#celsius");
metricConversion.addEventListener("click", search);

let metricConversionToF = document.querySelector("#fahrenheit");
metricConversionToF.addEventListener("click", searchImperial);

//form

function search(event) {
  event.preventDefault();
  let searchInPut = document.querySelector("#search-text-input");
  console.log(searchInPut.value);
  callAPIreq(searchInPut.value);
}

function searchImperial(event) {
  event.preventDefault();
  let searchInPut = document.querySelector("#search-text-input");
  console.log(searchInPut.value);
  callAPIreqimperial(searchInPut.value);
}

function searchGeo(event) {
  event.preventDefault();
  let searchGeoInPut = document.querySelector("#current-location");
  navigator.geolocation.getCurrentPosition(retrievePosition);
  console.log(searchGeoInPut.value);
  //callAPIreq(searchGeoInPut.value);
}

function callAPIreq(searchCity) {
  let city = `${searchCity}`;
  let apiKey = "06e61b3b1916c0c5dffdf3f2accd815b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemprature);
}

function callAPIreqimperial(searchCity) {
  let city = `${searchCity}`;
  let apiKey = "06e61b3b1916c0c5dffdf3f2accd815b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTempratureImperial);
}

function showTemprature(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let highTemp = Math.round(response.data.main.temp_max);
  let temperatureElement = document.querySelector("#current");
  let description = document.querySelector("#weatherCondition");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let todaysHighTemp = document.querySelector("#todays-high");
  let todaysLowTemp = document.querySelector("#today-low");
  let lowTemp = Math.round(response.data.main.temp_min);
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].main;
  feelsLikeElement.innerHTML = `Feels like ${feelsLike}°C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windSpeedElement.innerHTML = `Wind: ${wind} m/s`;
  todaysHighTemp.innerHTML = `/ ${highTemp}°`;
  todaysLowTemp.innerHTML = `${lowTemp}° `;
}

function showTempratureImperial(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let highTemp = Math.round(response.data.main.temp_max);
  let temperatureElement = document.querySelector("#current");
  let description = document.querySelector("#weatherCondition");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let todaysHighTemp = document.querySelector("#todays-high");
  let todaysLowTemp = document.querySelector("#today-low");
  let lowTemp = Math.round(response.data.main.temp_min);
  temperatureElement.innerHTML = `${temperature}°F`;
  description.innerHTML = response.data.weather[0].main;
  feelsLikeElement.innerHTML = `Feels like ${feelsLike}°F`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windSpeedElement.innerHTML = `Wind: ${wind} m/s`;
  todaysHighTemp.innerHTML = `/ ${highTemp}°`;
  todaysLowTemp.innerHTML = `${lowTemp}° `;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "06e61b3b1916c0c5dffdf3f2accd815b";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemprature);
}

let form = document.querySelector("#location-search");
form.addEventListener("submit", search);

let button = document.querySelector("#current-location");
button.addEventListener("click", searchGeo);
