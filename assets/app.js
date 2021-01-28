
//searches the city to see if it exists in the entries from the storage
function find(c) {
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}
//set up the API key
var APIKey = "95c61d37a98e509e8766816d7fd6ec65";

// Display the current and future weather to the user after grabbing the city form from the input text box
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!=="") {
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

//Set up the AJAX call
var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
console.log(queryURL)

function currentWeather(city) {
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
    });
}


console.log("URL: " + queryURL)

// convert temp to F
var tempF = (response.main.temp - 273.15) * 1.80 + 32;
