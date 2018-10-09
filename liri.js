require('dotenv').config()
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);


var youSay = process.argv[2]
var input = process.argv[3]

if (youSay === "concert-this") {
  var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
  request(queryUrl, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    console.log(JSON.parse(body))
  })
} else if (youSay === "spotify-this-song") {

} else if (youSay === "movie-this") {
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    console.log(JSON.parse(body).Released)
  })
} else if (youSay === "do-what-it-says") {
  console.log("JUST DO IT")
} else {
  console.log("Not a valid method.")
}



