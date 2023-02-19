"use strict";

// Variables //
let searchCity = document.getElementById("searchCity");
let apiStorage = 0;
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// End Variables //

// Weather API //
async function getWeather(city) {
  let weatherApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
  apiStorage = await weatherApi.json();
  displayToday();
  displayNextDay();
}
//End Weather API //

// Display function //
 function displayToday() {
  let pickDay = new Date(apiStorage.current.last_updated.replace(" ", "T"));
  let weather = `
    <div class="col-md-4">
    <div class="card border-0 ">
      <div class="card-body text-white text-center rounded-3">
      <div class="text-white">
      <p class="day text-center">${days[pickDay.getDay()]}</p>
    </div>
        <h5 class="card-title city text-start">${apiStorage.location.name}</h5>
        <div class="d-inline">
        <p class=" d-inline-block degree">${apiStorage.current.temp_c} <sup>o</sup> C</p>
        </div>
        <div class="weather-icon d-inline-block">
        <img src="${apiStorage.current.condition.icon}">
      </div>
        <div class="info">
          <div class="status text-center">
            <p>${apiStorage.current.condition.text}</p>
          </div>
          <div class="info-icons text-center">
          <span>
          <i class="fa-solid fa-cloud"> ${apiStorage.current.cloud}</i>
        </span>
        <span>
          <i class="fa-solid fa-wind"> ${apiStorage.current.wind_mph} m/h</i>
        </span>
        <span>
          <i class="fa-regular fa-compass"> ${apiStorage.current.wind_dir}</i>
        </span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  document.querySelector(".row").innerHTML = weather;
}

function displayNextDay() {
  let weatherAraay = apiStorage.forecast.forecastday;
  let weatherForcast=``
  for(let i = 1 ;i<weatherAraay.length;i++){
    weatherForcast += `
  <div class="col-md-4">
  <div class="card border-0 ">
    <div class="card-body text-white text-center rounded-3">
    <div class=" text-white">
    <p class="day text-center">${days[new Date(weatherAraay[i].date.replace(" ", "T")).getDay()]}</p>
    </div>
    <div class="weather-icon">
    <img src="${weatherAraay[i].day.condition.icon}">
  </div>
      <div class="info">
        <p class="card-text degree-max">Max: ${weatherAraay[i].day.maxtemp_c} <sup>o</sup> C</p>
        <p class="card-text degree-min">Min: ${weatherAraay[i].day.mintemp_c} <sup>o</sup></p>
        <div class="status text-center">
        <p>${weatherAraay[i].day.condition.text}</p>
        </div>
      </div>
      <div class="info-icons text-center">
      <span>
      <i class="fa-solid fa-umbrella"> ${weatherAraay[i].day.daily_chance_of_rain} %</i>
    </span>
    <span>
      <i class="fa-solid fa-wind"> ${weatherAraay[i].day.maxwind_mph} m/h</i>
    </span>
      </div>
    </div>
  </div>
</div>
  `;}
  document.querySelector(".row").innerHTML += weatherForcast;
}
// End Display function //


// Search //
searchCity.addEventListener("keyup", (weatherApi) => {
  getWeather(weatherApi.target.value);
});
// End Search //

// Static //
getWeather("cairo");
// End Static //


