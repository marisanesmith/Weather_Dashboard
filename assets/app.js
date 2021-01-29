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
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + APIKey;
        var currentWeathURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + APIKey;

        $.ajax ({
            url: currentWeathURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var temp = $("#temperature").text(((response.main.temp- 273.15) * 1.80 + 32).toFixed(2));
            var humid = $("#humidity").text(response.main.humidity);
            var windSpeed = $("#wind-speed").text(response.wind.speed);
            var UV = $("#uv-index");
            var weatherIcon="http://openweathermap.org/img/wn/10d@2x.png";
            getUVData(response.coord.lat, response.coord.lon);
        });

        function getUVData(lat, lon) {
            $.ajax ({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            })  
        }
    };

})

