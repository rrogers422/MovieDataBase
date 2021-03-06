var APIkey = 'c37bbf42'
var movieSearch = document.getElementById('movieSearch');
var submitBtn = document.getElementById('submitBtn');
var movieTitle;
var musicAPIkey;

a = new URLSearchParams(document.location.search.substr(1))
debugger;
a.clientID;
a.clientSecret;

function getToken (clientID, clientSecret){
    fetch('https://accounts.spotify.com/api/token', {
        headers: {
            Authorization: `Basic ${btoa(`${clientID}+${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        body: JSON.stringify({grant_type:'client_credentials'})
    })
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

getToken(a.get("clientID"), a.get("clientSecret"));


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
