var APIkey = 'c37bbf42'
var movieSearch = document.getElementById('movieSearch');
var submitBtn = document.getElementById('submitBtn');
var movieTitle;
var musicAPIkey;
var spotifyToken;

a = new URLSearchParams(document.location.search.substr(1))
a.clientID;
a.clientSecret;

function getToken (clientID, clientSecret){
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');

    fetch('https://accounts.spotify.com/api/token', {
        headers: {
            Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        body: formData.toString()
    })
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        var token = data.access_token;
        spotifyToken = token;
        return token;
    })
}

getToken(a.get("clientID"), a.get("clientSecret"))


function getPlaylist(Genre) {
    playlistURL = 'https://api.spotify.com/v1/search?q=' + Genre + '&type=playlist&market=US&limit=1&offset=5'
    fetch(playlistURL, {
        headers: {
            Authorization: `Bearer ${spotifyToken}`
        }
    })
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        console.log(data);
        var playlistName = data.playlists.items[0].name;
        var playlistURL = data.playlists.items[0].external_urls.spotify;
        displayContent(playlistName, playlistURL);
    })
}

function handleSearch(event) {
    event.preventDefault();
    movieTitle = movieSearch.value;
    getAPI(movieTitle)
}

function displayContent(name, link) {

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
           var genre = data.Genre;
           console.log(genre);
           var genreArr = genre.split(', ');
           var Genre = genreArr[1];
           console.log(genreArr);
           getPlaylist(Genre)
       })
   };

submitBtn.addEventListener('click', handleSearch);
