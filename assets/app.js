// GLOBAL VARIABLES

var searchResults;
// Create a variable for the API key
var APIKey = "&appid=95c61d37a98e509e8766816d7fd6ec65";
var searchedCities = [];

// Display the current and future weather to the user after grabbing the city form from the input text box
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!=="") {
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

// Display the current weather by using the 5 Day forecast API
function currentWeather(cityInput) {
    var currentWeathURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityInput + APIKey;

// AJAX call to display the current weather into the text box
    $.ajax ({
        url: currentWeathURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var temp = $("#temperature").text(parseInt(response.main.temp));
        var humid = $("#humidity").text(response.main.humidity);
        var windSpeed = $("#wind-speed").text(response.wind.speed);
        var weatherIcon="http://openweathermap.org/img/wn/10d@2x.png";
        getUVData(response.coord.lat, response.coord.lon);
    });
};

//AJAX call to display the UV index in the current weather text box by using lat and lon from the 5 day forecast API
function getUVData(lat, lon) {
    $.ajax ({
        url: "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + APIKey,
        method: "GET"
    }).then(function(response) {
        searchResults = response;
        var UV = $("#uv-index").text(response.daily[0].uvi);
        var UVInt = parseInt(response.daily[0].uvi);
        // Set the UV Index so that the colors change depending on the UV Index range
        if ((UVInt >= 0) && (UVInt <= 2)) {
            UV.css("background-color", "green")
            UV.css("color", "white");
            }
            else if ((UVInt > 2) && (UVInt <= 5)) {
                UV.css("background-color", "yellow")
                UV.css("color", "black");
            }
            else if ((UVInt > 5) && (UVInt <= 7)) {
                UV.css("background-color", "orange")
                UV.css("color", "white");
            }
            else if ((UVInt > 7) && (UVInt <= 10)) {
                UV.css("background-color", "red")
                UV.css("color", "white");
            }
            else if (UVInt > 10) {
                UV.css("background-color", "violet")
                UV.css("color", "white");
            };
            console.log(response);
            fiveDayData();
    })  
};
// Function to display the 5 day forecast
function fiveDayData() {
   for (i=0; i <=5; i ++) {
       var newDate = new Date(searchResults.daily[i].dt * 1000);
       var day = newDate.toDateString().slice(0,3);
       var dayString = "day" + i;
       $("#" + dayString).text(day);
       var iconString = "icon" + i;
       $("#" + iconString).attr("src", "http://openweathermap.org/img/w/" + searchResults.daily[i].weather[0].icon + ".png");
       var tempString = "temp" + i;
       $("#" + tempString).text(parseInt(searchResults.daily[i].temp.day));
       var humidString = "humid" + i;
       $("#" + humidString).text(searchResults.daily[i].humidity);
   } 
}

// Function to show the city list as a li item created using jQuery
function showCityList() {
    $("#list-cities").empty();
    for (i=0; i< searchedCities.length; i++) {
        var newItem = $("<li>");
        newItem.text(searchedCities[i]);
        newItem.addClass("border-bottom");
        $("#list-cities").prepend(newItem);
    }
}

// Click event to populate the data for current weather and 5 day forecast after user enters a city
$(document).ready(function() {
    $("#startSearch").on("click", function(){
        var cityInput = $("#enterCity").val();
        searchedCities.push(cityInput);
        console.log(searchedCities);
        $("#enterCity").val("");
        currentWeather(cityInput);
        console.log(cityInput)
        localStorage.setItem("cityList", JSON.stringify(searchedCities));

        showCityList();
    });

    //Click event to display the list of cities in the li tag that was created in JS
    $("#list-cities").on("click", "li", function() {
        currentWeather($(this).text());
    });

    //click event to clear the list of cities that a user has already searched for
    $("#clearSearch").on("click", function() {
        searchedCities = [];
        $("#enterCity").val("");
        localStorage.setItem("cityList", null)
        showCityList();
    });

    //click event for the submit button to display the city's current weather & 5 day forecast
    $(document).on("submit", function(event) {
        event.preventDefault();
        currentWeather($("#enterCity").val());
        var city = $("#enterCity").val();
        console.log(city);
        searchedCities.push(city);
        console.log(searchedCities);
        localStorage.setItem("cityList", JSON.stringify(searchedCities));
        $("#enterCity").val("");
        showCityList();
    });
    
    // Save the entered cities to local storage
        var tempArray = JSON.parse(localStorage.getItem("cityList"));
        if (tempArray !== null) {
            searchedCities = tempArray;
            showCityList();
        }
});

