//Global Variables

const searchCity = $("#search-city");
const searchButton = $("#search-button");
const clearHistory = $("#clear-history");
const currentWeather = $("#current-weather");
const currentCity = $("#current-city");
const temperature = $("#temperature");
const humidity = $("#humidity");
const windSpeed = $("#wind-speed");
const UVIndex = $("#uv-index");

var city = "";

//set up the API key
var APIKey = "95c61d37a98e509e8766816d7fd6ec65";

//Set up the AJAX call
var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
console.log(queryURL)


$.ajax ({
    url: queryURL,
    method: "GET"
}).then(function(response) {

});

console.log("URL: " + queryURL)

// convert temp to F
var tempF = (response.main.temp - 273.15) * 1.80 + 32;
