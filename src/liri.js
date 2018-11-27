require('dotenv').config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var omdbAPIKey = keys.omdb.apiKey;

const commandFilePath = './random.txt';

const {
    2: command,
    3: params
} = process.argv

run(command, params);

function run(command, params) {
    // console.log('running command: ', command)
    switch (command) {

        case "concert-this":
            bandSearch(params);
            break;
        case "spotify-this-song":
            searchSpotify(params);
            break;
        case "movie-this":
            searchMovies(params);
            break;
        case "do-what-it-says":
            runLocalCommands();
            break;
        default:

            break;
    }

    function bandSearch(artist) {

        let bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        request(bandsUrl, (error, response, body) => {

                let data = JSON.parse(body)[0];

                let {
                    name: venue,
                    city,
                } = data.venue;

                let {
                    datetime: date
                } = data;

                console.log('Venue:', venue);
                console.log('Venue Location:', city);
                console.log('Date of the Event:', moment(date).format('MMMM Do YYYY, h:mm:ss a'));
            })
            .on('error', err => console.log(err))
    }

    function searchMovies(movieName) {
        const omdbUrl = `http://www.omdbapi.com/?t=${movieName}&?i=tt3896198&apikey=${omdbAPIKey}`;

        request(omdbUrl, (error, response, body) => {
                if (error) throw error;

                let data = JSON.parse(body);

                const {
                    Title,
                    Year,
                    Actors,
                    imdbRating,
                    Country,
                    Language,
                    Plot,
                    Ratings,
                } = data;

                console.log("Title: ", Title);
                console.log("Year: ", Year);
                console.log("IMDB rating: ", imdbRating);
                console.log("Rotten Tomatoes Rating: ", Ratings.find(r => r.Source === "Rotten Tomatoes").Value);
                console.log('Country:', Country);
                console.log('Language:', Language);
                console.log('Plot:', Plot)
                console.log("Actors: ", Actors);

            })
            .on('error', err => console.log(err))
    }

    function searchSpotify(searchTitle) {
        console.log(`Searching for song '${searchTitle}'`);
        spotify
            .search({
                type: 'track',
                query: searchTitle
            })
            .then(data => {

                const {
                    href,
                    items
                } = data.tracks;

                console.log('href:', href);
                console.log('items[0]:', items[0]);

                const {
                    artists,
                    name: songName,
                    preview_url: previewUrl,
                    album,
                } = items;

                console.log('Artists', artists);
                console.log('Song Name', songName);
                console.log('Preview URL', previewUrl);
                console.log('Album', album);

            })
            .catch(err => console.log(err));

    }

    function runLocalCommands() {
        fs.readFile(commandFilePath, 'utf8', (err, data) => {
            if (err)
                throw err;
            // console.log('readfile result', data);
            let {
                0: command,
                1: params
            } = data.split(',').map(s => s.trim());
            run(command, params);
        });
    }
}

Object.prototype.print = function () {
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            console.log(key + " -> " + this[key]);
        }
    }
}