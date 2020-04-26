// /  PSUEDO CODE //
// Variables...
// Variable for User Input
var city = $("#cityName").val();
// Variable for the API Key
var apiKey = "&appid=0d5cc2c08385aeb85e507cd007654815";
var date = new Date();
var lon;
var lat;
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
$("#cityName").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchBtn").click();
  }
});
$("#searchBtn").on("click", function () {
  $('#5DayForcast').addClass('show');
  // Get Value of User Input
  city = $("#cityName").val();
  // Clear Input Textbox
  // $("#cityName").val("");
  searchHistory.push($("#cityName").val());
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  // URL to Call API
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  })
    .then(function (response) {
      console.log(response)
      console.log(response.name)
      console.log(response.weather[0].icon)
      var tempC = (response.main.temp - 273.15);
      lat = response.coord.lat;
      lon = response.coord.lon;
      console.log(Math.floor(tempC))
      console.log(response.main.humidity)
      console.log(response.wind.speed)
      console.log(response.coord.lat)
      console.log(response.coord.lon)
      //   getCurrentConditions(response);
      getCurrentForecast(response);
      makeList();
      url2 = "http://api.openweathermap.org/data/2.5/uvi?appid=0d5cc2c08385aeb85e507cd007654815" + "&lat=" + lat + "&lon=" + lon;
      console.log(lat);
      console.log(lon);
      $.ajax({
        url: url2,
        method: "GET"
      }).then(function (UVresponse) {
        var tempC = (response.main.temp - 273.15);
        tempC = Math.floor(tempC);
        $('#currentCity').empty();
        // Setting Content
        var card = $("<div>").addClass("card");
        var cardBody = $("<div>").addClass("card-body");
        var city = $("<h4>").addClass("card-title").text(response.name);
        var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-GB'));
        var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempC + " °C");
        var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
        var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        var uvIndex = $("<p>").addClass("card-text current-UV").text("UV Index: " + UVresponse.value);
        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        // Add to Page
        city.append(cityDate, image)
        cardBody.append(city, temperature, humidity, wind, uvIndex);
        card.append(cardBody);
        $("#currentCity").append(card)
      });
    })
});
function makeList() {
  var listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}
function getCurrentConditions(response) {
  // Get Temperature and Convert to Celsius
  var tempC = (response.main.temp - 273.15);
  tempC = Math.floor(tempC);
  $('#currentCity').empty();
  // Setting Content
  var card = $("<div>").addClass("card");
  var cardBody = $("<div>").addClass("card-body");
  var city = $("<h4>").addClass("card-title").text(response.name);
  var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-GB'));
  var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempC + " °C");
  var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
  var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
  var uvIndex = $("<p>").addClass("card-text current-UV").text("UV Index: " + UVresponse.value);
  var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
  // Add to Page
  city.append(cityDate, image)
  cardBody.append(city, temperature, humidity, wind, uvIndex);
  card.append(cardBody);
  $("#currentCity").append(card)
}
function getCurrentForecast() {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    console.log(response.dt)
    $('#forecast').empty();
    // variable to hold response.list
    var results = response.list;
    console.log(results)
    //declare start date to check against
    // startDate = 20
    //have end date, endDate = startDate + 5
    for (let i = 0; i < results.length; i++) {
      var day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      var month = results[i].dt_txt.split('-')[1].split(' ')[0];
      var year = results[i].dt_txt.split('-')[0].split(' ')[0];
      var hour = results[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(month);
      console.log(year);
      console.log(hour);
      if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
        // Get Temperature and Convert to Celsius 
        var temp = (results[i].main.temp - 273.15);
        var tempC = Math.floor(temp);
        // Setting Content
        var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        var cityDate = $("<h4>").addClass("card-title").text(day + "/" + month + "/" + year);
        var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempC + " °C");
        var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
        var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);
        renderSearchHistory();
      }
    }
  });
}
function renderSearchHistory() {
  $("#history").empty();
  for (var i = 0; i < searchHistory.length; i++) {
    var historyButton = $("<button>")
    // console.log(searchHistory[i]);
    historyButton.addClass("city btn btn-light btn-lg btn-block");
    historyButton.text(searchHistory[i]);
    $("#history").prepend(historyButton);
  }
}
renderSearchHistory();
