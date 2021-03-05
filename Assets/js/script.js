var APIkey = 'c37bbf42'
var movieSearch = document.getElementById('movieSearch');
var submitBtn = document.getElementById('submitBtn');
var movieTitle;
var musicAPIkey = 

function handleSearch(event) {
    event.preventDefault();
    movieTitle = movieSearch.value;
    getAPI(movieTitle)
}


function getAPI(movie) {
 var movieAPI = 'http://www.omdbapi.com/?apikey=' + APIkey + '&t=' + movie;
 fetch(movieAPI)
 .then(function(response){

    if (!response.ok){
        throw response.json();
    }
    return response.json();
 })

    .then(function(data){
        console.log(data)
    })
};

submitBtn.addEventListener('click', handleSearch);
