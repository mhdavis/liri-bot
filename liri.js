// Node Packages
const Twitter = require('twitter');
const Request = require('request');
const Spotify = require('node-spotify-api');
const fs = require('fs');

// Keys and Params
const keys =  require("./keys.js");
const twitterParams = {screen_name: 'donjohnsonvice'};
const spotifyParams = keys.spotifyKeys;
const twitterKeys = keys.twitterKeys;

// Inputs
let firstArg  = process.argv[2];
let secondArg = process.argv[3];

// Instances
let client = new Twitter(twitterKeys);
let spotify = new Spotify(spotifyParams);

if (firstArg === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    let dataArr = data.split("\n");

    let commandArr = [];
    for (let i=0; i < dataArr.length; i++) {
      let commandItem = dataArr[i].split(',');
      let obj = {
        command: commandItem[0],
        value: commandItem[1]
      }
      commandArr.push(obj);
    }

    for (let i=0; i < commandArr.length; i++) {
      // console.log(
      //   "\n----------------------\n" +
      //   `|       TASK ${i+1}       |\n` +
      //   "----------------------\n"
      // );
      runApp(commandArr[i].command, commandArr[i].value);
    }
  });

} else {
  runApp(firstArg, secondArg);
}

function runApp(input, value) {

  if (input === "my-tweets") {
    client.get('statuses/user_timeline', twitterParams, function (error, tweets, response) {

      if (!error) {
        console.log("\n------------ TWEETS ------------\n");
        for (let i=0; i < 19; i++) {
          console.log("CREATED: " + tweets[i].created_at);
          console.log('TWEET: ' + tweets[i].text + "\n");
        }
        console.log("--------------------------------");
      }

    });
  }
  else if (input === "spotify-this-song") {
    spotify.search({type: 'track', query: value || "The Sign"}, function (error, data) {
      if (error) {
        return console.log('Error: ' + error);
      }
      let songInfo = data.tracks.items[0];

      console.log(
        "\n------------ SONG --------------\n" +
        "ARTISTS: " + songInfo.artists[0].name + "\n" +
        "SONG: " + songInfo.name + "\n" +
        "ALBUM: " + songInfo.album.name + "\n" +
        "URL: " + songInfo.external_urls.spotify + "\n" +
        "--------------------------------"
      );
    });

  }
  else if (input === "movie-this") {

    let queryURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";

    Request.get(queryURL, function (error, response, body) {

      if (!error && response.statusCode === 200) {

        let result = JSON.parse(body);

        console.log(
          "\n------------ MOVIE --------------\n" +
          "TITLE: " + result.Title + "\n" +
          "RELEASED: " + result.Released + "\n" +
          "IMDB RATING: " + result.imdbRating + "\n" +
          "COUNTRY PRODUCED: " + result.Country + "\n" +
          "LANGUAGE: " + result.Language + "\n" +
          "PLOT:\n" +
           result.Plot + "\n" +
          "ACTORS:\n" +
           result.Actors + "\n" +
           "---------------------------------"
         );

      } else {
        console.log('Error: ', error);
      }
    });

  } else {
    console.log("\nUser input specified is NOT recognized: " + input + "\n" +
    "\nPlease use one of the following commands: " +
    "\nmy-tweets\n" +
    "movie-this <insert movie name as string>\n" +
    "spotify-this-song <insert song name as string>\n" +
    "do-what-it-says"
  );
  }

} // end runApp function
