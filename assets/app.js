var searchResults;
//set up the API key
var APIKey = "&appid=95c61d37a98e509e8766816d7fd6ec65";

// Display the current and future weather to the user after grabbing the city form from the input text box
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!=="") {
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(cityInput) {
    var currentWeathURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityInput + APIKey;

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

function getUVData(lat, lon) {
    $.ajax ({
        url: "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + APIKey,
        method: "GET"
    }).then(function(response) {
        searchResults = response;
        var UV = $("#uv-index").text(response.daily[0].uvi);
        var UVInt = parseInt(response.daily[0].uvi);
        UV.css("color", "black");
        if ((UVInt >= 0) && (UVInt <= 2)) {
            UV.css("background-color", "green")
            }
            else if ((UVInt > 2) && (UVInt <= 5)) {
                UV.css("background-color", "yellow")
            }
            else if ((UVInt > 5) && (UVInt <= 7)) {
                UV.css("background-color", "orange")
            }
            else if ((UVInt > 7) && (UVInt <= 10)) {
                UV.css("background-color", "red")
            }
            else if (UVInt > 10) {
                UV.css("background-color", "violet")
            };
            console.log(response);
            fiveDayData();
    })  
};

function fiveDayData() {
   for (i=0; i <=5; i ++) {
       var newDate = new Date(searchResults.daily[i].dt * 1000);
       var day = newDate.toDateString().slice(0,3);
       var dayString = "day" + i;
       $("#" + dayString).text(day);
       var tempString = "temp" + i;
       $("#" + tempString).text(parseInt(searchResults.daily[i].temp.day));
       var humidString = "humid" + i;
       $("#" + humidString).text(searchResults.daily[i].humidity);
   } 
}

$(document).ready(function() {
    $("#startSearch").on("click", function(){
        var cityInput = $("#enterCity").val();
        //this will clear the search/text area 
        $("#enterCity").val("");

        currentWeather(cityInput);
        // makeRow(text);
        console.log(cityInput)
    });
    $("#list-cities").on("click", "ul", function() {
        currentWeather($(this.text()));
        // make row function and for loop to pull through local storage
    });
    
    // function makeRow(text) {
    //     var paraEl = $("<li>").addClass("make-list-cities").text(text);
    //     $("#list-cities").append(paraEl);
    // }

})

