var searches = JSON.parse(localStorage.getItem('searches')) || [];

function renderHistory() {
    $('#searches').empty();

    for (var i = 0; i < history.length; i++) {
        $('#searches').append($('<a>').text(history[i]));
    }
}

$('form').on("submit", function(event) {
    event.preventDefault;

    var city = $("#city").val().trim();
    searches.push(city);

    localStorage.setItem('searches', JSON.stringify(searches))

    // clears out the search input bar
    $('#city').val('');

    // need to make div in html to have somewhere to render history
    renderHistory();
});
// need to call here so that searches render unpon page load
renderHistory();