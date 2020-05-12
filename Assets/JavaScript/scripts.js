


var searches = JSON.parse(localStorage.getItem('searches')) || [];

function renderHistory() {
    $('#searches').empty();

    for (var i = 0; i < searches.length; i++) {
        var newSearch = $('<a>').text(searches[i]);
        newSearch.attr('class', 'list-group-item list-group-item-action')
        $('#searches').append(newSearch);
    }
}

$('form').on('submit', function(event) {
    event.preventDefault;

    var city = $("#city").val().trim();
    searches.push(city);
    console.log(searches);

    localStorage.setItem('searches', JSON.stringify(searches))

    // clears out the search input bar
    $('#city').val('');

    // need to make div in html to have somewhere to render history
    renderHistory();
});
// need to call here so that searches render unpon page load
renderHistory();