
var searches = JSON.parse(localStorage.getItem('searches')) || [];
var d = new Date();
var strDate = (d.getMonth()+1) + "/" + d.getDate() + "/" +  d.getFullYear();


function renderSearches() {
    $('#searches').empty();

    for (var i = 0; i < searches.length; i++) {
        var search = $('<a>').text(searches[i])
        search.attr('class', 'list-group-item list-group-item-action city')
        search.attr('data-city', searches[i])
        $('#searches').append(search)
    }

    getWeather();
}

$('form').on('submit', function (event) {
    var city = $("#city-input").val().trim();
    console.log(city)
    event.preventDefault

    // pushes city search into searches array
    searches.push(city)

    localStorage.setItem('searches', JSON.stringify(searches))

    // clears out the search input field
    $('#city-input').val('')

    // render the previous searches to the sidebar
    renderSearches();
});

function getWeather() {
    // grabs the data-city attribute from the event target
    var city = $(this).attr('data-city')
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=20a0e218c2b35d7287d3b43b10aa6e1f&units=imperial';

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
        var icon = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png');
        $('#city-name').text(cityName)
        $('#city-name').append(icon)
        $('#temp').text('Temperature: ' + temp + ' \xB0F')
        $('#humidity').text('Humidity: ' + humidity + '%')
        $('#wind-speed').text('Wind Speed: ' + windSpeed + ' mph')

        var queryURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=20a0e218c2b35d7287d3b43b10aa6e1f&lat=' + lat + '&lon=' + lon;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var uvIndex = response.value
            $('#uv-index').text('UV Index: ' + uvIndex)
        })
        
    });
}

// function renderWeather(){

// }

// Adding click event listeners to all elements with a class of "city" when page loads
$(document).on("click", ".city", getWeather);

// need to call here so that searches render unpon page load
renderSearches();



