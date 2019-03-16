const apiKey = "69518b1f8f16c35f8705550dc4161056";
const units = "metric";
var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather"
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast"
var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"

var citySearched;

function getCurrentWeather() {

  if (document.getElementById("city").value === "") {
    document.getElementById("city").value = "Bucharest";
  }
  citySearched = document.getElementById("city").value;

  //fetch(URL_CURRENT_WEATHER + '?' + "q=" + citySearched + "&APPID=" + apiKey + "&units=metric")
  fetch(`${URL_CURRENT_WEATHER}?q=${citySearched}&APPID=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      showWeatherDescription(data);
      showMap(citySearched);
    })

}

function showWeatherDescription(data) {
  document.querySelector("#img").src = URL_WEATHER_ICON_PREFIX + data.weather[0].icon + ".png";
  document.querySelector("#descriere").innerHTML = `Descriere:  ${data.weather[0].description}`;
  document.querySelector("#umiditate").innerHTML = `Umiditate:  ${data.main.humidity}`;
  document.querySelector("#presiune").innerHTML = `Presiune:  ${Math.round(data.main.pressure)}`;
  document.querySelector("#temp").innerHTML = `Temperatura curenta: ${Math.round(data.main.temp)}`;  //+ " &deg;C"
  document.querySelector("#tmin").innerHTML = `Minima zilei: ${Math.round(data.main.temp_min)}`;
  document.querySelector("#tmax").innerHTML = `Maxima zilei: ${Math.round(data.main.temp_max)}`;
}

function getWeatherIfEnter(event) {
  if (event.keyCode === 13) {
    getCurrentWeather()
  }

}
function showMap(city) {
  document.querySelector("#imap").src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyClF-HHZIUUpVSDnu5Au9yxiPV2yqiWQl8&q=${city}`
}


function getWeatherForecast() {
  if (document.getElementById("city").value === "") {
    document.getElementById("city").value = "Bucharest";
  }
  citySearched = document.getElementById("city").value;

  fetch(URL_FORECAST_WEATHER + '?q=' + citySearched + "&APPID=" + apiKey + "&units=metric&cnt=45")
    .then(response => response.json())
    .then(forecastResult => {
      draw(forecastResult)
    })
}


function draw(forecast) {
  var str = '';
  var previousDate = 0;

  for (var i = 0; i < forecast.list.length; i++) {
    if (document.querySelector("table").rows[0].cells[previousDate].innerHTML.length == 0) {
      document.querySelector("table").rows[0].cells[previousDate].innerHTML = 'Ziua: ' + forecast.list[i].dt_txt.substring(0, 10).toString().split("-").reverse().join("/");
      document.querySelector("table").rows[0].cells[previousDate].classList.add("bkg");
    }
    for (var j = 1; j < document.querySelector("table").rows.length; j++) {
     if (document.querySelector("table").rows[j].getAttribute("class").substring(3, 5) == forecast.list[i].dt_txt.substring(11, 13)) {
        console.log(forecast.list[i].dt_txt.substring(11, 13));
        document.querySelector("table").rows[j].cells[previousDate].innerHTML =
          `<img src = "${URL_WEATHER_ICON_PREFIX}${forecast.list[i].weather[0].icon}.png"><br>
              Ora: ${forecast.list[i].dt_txt.substring(11, 16)} <br> 
              Temperatura: ${forecast.list[i].main.temp} <br>
              Descriere: ${forecast.list[i].weather[0].description}
            `
        break;
      }
    }
    if (j  == document.querySelector("table").rows.length-1) {
      previousDate++;
    }
  }
}





