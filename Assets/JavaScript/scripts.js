


var searches = JSON.parse(localStorage.getItem('searches')) || [];

function renderSearches() {
    $('#searches').empty();

    for (var i = 0; i < searches.length; i++) {
        var newSearch = $('<a>').text(searches[i]);
        newSearch.attr('class', 'list-group-item list-group-item-action city');
        newSearch.attr('data-city', searches[i])
        $('#searches').append(newSearch);

        // getWeather();
    }
}

$('form').on('submit', function (event) {
    event.preventDefault;

    var city = $("#city-input").val().trim();
    searches.push(city);

    localStorage.setItem('searches', JSON.stringify(searches))

    // clears out the search input bar
    $('#city-input').val('');

    renderSearches();

});

// when user submits a city, the weather for that city is returned
// current weather and 5-day forecast
// function getWeather() {
    
//     var cityName = $(this).val();
//     var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=20a0e218c2b35d7287d3b43b10aa6e1f";


//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//             $('#city-name').text(response.city.name);

//         });

//     // renderWeather();
// }

// function renderWeather(){

// }

// $(document).on("click", ".city", getWeather);

// need to call here so that searches render unpon page load
renderSearches();



