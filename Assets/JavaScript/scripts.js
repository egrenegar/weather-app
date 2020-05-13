


var searches = JSON.parse(localStorage.getItem('searches')) || [];


function renderSearches() {
    $('#searches').empty();

    for (var i = 0; i < searches.length; i++) {
        var search = $('<a>').text(searches[i]);
        search.attr('class', 'list-group-item list-group-item-action city');
        search.attr('data-city', searches[i])
        $('#searches').append(search);

        // getWeather();
    }
}

$('form').on('submit', function (event) {
    var city = $("#city-input").val().trim();
    console.log(city);
    event.preventDefault;

    // pushes city search into searches array
    searches.push(city);

    localStorage.setItem('searches', JSON.stringify(searches))

    // clears out the search input bar
    $('#city-input').val('');
    // render the previous searches to the sidebar
    renderSearches();

});

// when user submits a city, the weather for that city is returned
// current weather and 5-day forecast
function getWeather() {
    // grabs the data-city attribute from the event target
    var cityName = $(this).attr('data-city');
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=20a0e218c2b35d7287d3b43b10aa6e1f';


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#city-name').append($('<h2>').text(response.name));

    });

    // renderWeather();
}

// function renderWeather(){

// }

// Adding click event listeners to all elements with a class of "city" when page loads
$(document).on("click", ".city", getWeather);

// need to call here so that searches render unpon page load
renderSearches();



