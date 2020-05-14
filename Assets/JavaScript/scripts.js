
var searches = JSON.parse(localStorage.getItem('searches')) || [];
var d = new Date();
var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();

function renderSearches() {
    $('#searches').empty();
    for (var i = 0; i < searches.length; i++) {
        // only append to the page if search is not already present in the array
        // if (indexOf.(search))
        var search = $('<a>').text(searches[i])
        search.attr('class', 'list-group-item list-group-item-action city')
        search.attr('data-city', searches[i])
        $('#searches').append(search)
    }

}

$('form').on('submit', function (event) {
    event.preventDefault();

    var city = $('#city-input').val().trim();
    console.log(city)
    // pushes city search into searches array
    searches.push(city)
    // stringify the searches and set to local storage
    localStorage.setItem('searches', JSON.stringify(searches))
    // clears out the search input field
    $('#city-input').val('')
    // render the previous searches to the sidebar
    getWeather(city);

});

function getWeather(city) {
    console.log(city);
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=20a0e218c2b35d7287d3b43b10aa6e1f&units=imperial';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var cityName = response.name
        var temp = (response.main.temp).toFixed(1)
        var windSpeed = (response.wind.speed).toFixed(1)
        var humidity = response.main.humidity
        var lat = response.coord.lat
        var lon = response.coord.lon
        var icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
        $('#city-name').text(cityName + ' ' + strDate)
        $('#city-name').append(icon)
        $('#temp').text('Temperature: ' + temp + ' \xB0F')
        $('#humidity').text('Humidity: ' + humidity + '%')
        $('#wind-speed').text('Wind Speed: ' + windSpeed + ' mph')

        var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=20a0e218c2b35d7287d3b43b10aa6e1f&lat=' + lat + '&lon=' + lon;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var uvIndex = response.value
            $('#uv-index').text('UV Index: ' + uvIndex)
        })

    });

    getForecast(city);
}

function getForecast(city) {

    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=20a0e218c2b35d7287d3b43b10aa6e1f&units=imperial'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var day1Temp = (response.list[3].main.temp).toFixed(1)
        var day1Humid = (response.list[3].main.humidity)
        var day2Temp = (response.list[11].main.temp).toFixed(1)
        var day2Humid = (response.list[11].main.humidity)
        var day3Temp = (response.list[19].main.temp).toFixed(1)
        var day3Humid = (response.list[19].main.humidity)
        var day4Temp = (response.list[27].main.temp).toFixed(1)
        var day4Humid = (response.list[27].main.humidity)
        var day5Temp = (response.list[35].main.temp).toFixed(1)
        var day5Humid = (response.list[35].main.humidity)
        var day1icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.list[3].weather[0].icon + '.png')
        var day2icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.list[11].weather[0].icon + '.png')
        var day3icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.list[19].weather[0].icon + '.png')
        var day4icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.list[27].weather[0].icon + '.png')
        var day5icon = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + response.list[35].weather[0].icon + '.png')
        $('#day1date').text(response.list[3].dt_txt.split(' ')[0])
        $('#day2date').text(response.list[11].dt_txt.split(' ')[0])
        $('#day3date').text(response.list[19].dt_txt.split(' ')[0])
        $('#day4date').text(response.list[27].dt_txt.split(' ')[0])
        $('#day5date').text(response.list[35].dt_txt.split(' ')[0])
        $('#day1temp').append(day1Temp + ' \xB0F')
        $('#day1hum').append(day1Humid + '%')
        $('#day2temp').append(day2Temp + ' \xB0F')
        $('#day2hum').append(day2Humid + '%')
        $('#day3temp').append(day3Temp + ' \xB0F')
        $('#day3hum').append(day3Humid + '%')
        $('#day4temp').append(day4Temp + ' \xB0F')
        $('#day4hum').append(day4Humid + '%')
        $('#day5temp').append(day5Temp + ' \xB0F')
        $('#day5hum').append(day5Humid + '%')
        $('#day1date').append(day1icon)
        $('#day2date').append(day2icon)
        $('#day3date').append(day3icon)
        $('#day4date').append(day4icon)
        $('#day5date').append(day5icon)

    })

    renderSearches();
}

// Adding click event listeners to all elements with a class of "city" when page loads
$(document).on("click", ".city", function () {
    var city = $(this).attr('data-city')
    getWeather(city);
});

// need to call here so that searches render unpon page load
renderSearches();