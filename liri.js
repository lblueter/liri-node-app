var fs = require("fs")
require('dotenv').config()
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require("axios")
moment().format()
var keys = require("./keys")

var spotify = new Spotify(keys.spotify);


var youSay = process.argv[2]
var input = process.argv[3]

var divider = "\n========================================\n"

var appendIt = function (a) {
  fs.appendFile("log.txt", a + divider, function(err) {
    if (err) throw err;
    // console.log(showData);
  });
}

var doIt = function () {
  if (youSay === "concert-this") {
    if (!input) {input="Disturbed"}
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(results => {
      console.log(results)
      var newBody = JSON.parse(results.body)

        var showData = [
          "Name: " + newBody[0].venue.name,
          "Location: " + newBody[0].venue.city + ', ' + newBody[0].venue.region,
          "Date: " + moment(newBody[0].datetime).format("MM/DD/YYYY")
        ].join("\n");
        console.log(showData)
        appendIt(showData)
    })
    
    // , function (error, response, body) {
    //   if (error) {
    //     console.log(error)
    //   }
    //   var newBody = JSON.parse(body)

    //   var showData = [
    //     "Name: " + newBody[0].venue.name,
    //     "Location: " + newBody[0].venue.city + ', ' + newBody[0].venue.region,
    //     "Date: " + moment(newBody[0].datetime).format("MM/DD/YYYY")
    //   ].join("\n");
    //   console.log(showData)
    //   appendIt(showData)
    // })
  } else if (youSay === "spotify-this-song") {
    if (!input) {input="The Sign"}
    spotify.search({ type: "track", query: input, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var showData = [
        "Artist: " + data.tracks.items[0].album.artists[0].name,
        "Song: " + data.tracks.items[0].name,
        "Album: " + data.tracks.items[0].album.name,
        "URL: " + data.tracks.items[0].external_urls.spotify
      ].join("\n");
      console.log(showData)
      appendIt(showData)
    });
  } else if (youSay === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    if (!input) {input="Mr. Nobody"}
    axios.get(queryUrl).then(response => {
      console.log(response)
      var newBody = JSON.parse(response.body)
      var showData = [
            "Title: " + newBody.Title,
            "Released: " + newBody.Year,
            "IMDB Rating: " + newBody.imdbRating,
            "Country: " + newBody.Country,
            "Language: " + newBody.Language,
            "Actors: " + newBody.Actors,
            "Plot: " + newBody.Plot
          ].join("\n");
          console.log(showData)
          appendIt(showData)
    })

    //  function (error, response, body) {
    //   if (error) {
    //     console.log(error)
    //   }
    //   var newBody = JSON.parse(body)
      
    //   var showData = [
    //     "Title: " + newBody.Title,
    //     "Released: " + newBody.Year,
    //     "IMDB Rating: " + newBody.imdbRating,
    //     "Country: " + newBody.Country,
    //     "Language: " + newBody.Language,
    //     "Actors: " + newBody.Actors,
    //     "Plot: " + newBody.Plot
    //   ].join("\n");
    //   console.log(showData)
    //   appendIt(showData)
    // })

  } else if (youSay === "do-what-it-says") {
    // console.log("JUST DO IT")
    var whatItSaysArray = [];
    fs.readFile("random.txt", "utf-8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      // console.log(data)
      whatItSaysArray = data.split(",");
      // console.log(whatItSaysArray)
      youSay = whatItSaysArray[0];
      input = whatItSaysArray[1];
      console.log(youSay + " " + input);
      doIt()
    });
  } else {
    console.log("Not a valid method.")
  }
}

doIt()


