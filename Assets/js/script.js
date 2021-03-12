var APIkey = 'c37bbf42'
var movieSearch = document.getElementById('movieSearch');
var submitBtn = document.getElementById('submitBtn');
var movieEl = document.getElementById('movie');
var playlistEl = document.getElementById('playlist');
var movieTitle;
var musicAPIkey;
var spotifyToken;

a = new URLSearchParams(document.location.search.substr(1))
a.clientID;
a.clientSecret;

// Spotify requres a Token to fetch api - this function saves that token.
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

// Passes the client ID and client Secret from the URL to the getToken function
getToken(a.get("clientID"), a.get("clientSecret"))

// Function that uses Spotify API to generate a playlist based on genre from the movie the user searched
function getPlaylist(Genre) {
    playlistURL = 'https://api.spotify.com/v1/search?q=' + Genre + '&type=playlist&market=US&limit=5&offset=5'
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
        var playlistName = data.playlists.items[1].name;
        var playlistURL = data.playlists.items[1].external_urls.spotify;
        var description = data.playlists.items[1].description;
        var image = data.playlists.items[1].images[0].url;
        displayPlaylist(playlistName, playlistURL, description, image);
    })
}

// Function to capture the movie the user enters and call the getAPI function to use the OMDb API
function handleSearch(event) {
    event.preventDefault();
    movieEl.innerHTML = "";
    playlistEl.innerHTML = "";
    movieTitle = movieSearch.value;
    getAPI(movieTitle)
}

// Function to display the searched movie onto the page.
function displayMovie(name, poster, genre) {

    var movieTitle = document.createElement('h2');
    var movieName = name;
    movieTitle.textContent = movieName;

    var posterIMG = document.createElement('img');
    posterIMG.setAttribute('src', poster);

    var genreType = document.createElement('p');
    genreName = genre;
    genreType.textContent = "Genre: " + genreName;

    movieEl.append(movieTitle, posterIMG, genreType);
}

// Function to display Spotify playlist onto the page.
function displayPlaylist(name, URL, description, image){

    var playlistName = document.createElement('h2');
    var playName = name;
    playlistName.textContent = playName;

    var descrip = document.createElement('p');
    var playDescrip = description;
    descrip.textContent = playDescrip;

    var display = document.createElement('a')
    var picture = document.createElement('img');
    picture.setAttribute('src', image);
    display.setAttribute('href', URL);

    display.append(picture);

    playlistEl.append(playlistName, descrip, display)
}

// Function that fetches the OMDb API given the movie the user searches
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
           var genre = data.Genre;
           var genreArr = genre.split(', ');
           var Genre = genreArr[0];
           getPlaylist(Genre)
           displayMovie(data.Title, data.Poster, Genre);
       })
};

// Event listener to call the handleSearch function when the search button is pressed.
submitBtn.addEventListener('click', handleSearch);
