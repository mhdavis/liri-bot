// Node Packages
const Twitter = require('twitter');
const Request = require('request');
const Spotify = require('node-spotify-api');
const fs = require('fs');

// Keys and Params
const twitterKeys =  require("./keys.js");
const twitterParams = {screen_name: 'TeamSoloMid'};
const spotifyParams = {
  id: false,
  secret: false
};

// Inputs
let firstArg  = process.argv[2].toLowerCase();
let secondArg = process.argv[3].toLowerCase();

// Instances
let client = new Twitter(twitterKeys);
// let spotify = new Spotify(spotifyParams);

if (firstArg === "do-what-it-says"); {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    let dataArr = data.split("\n");
    let commandObj = {};
    for (let i=0; i < dataArr.length; i++) {
      commandObj[i][0] = commandObj[i][1];
    }

    for (let command in commandObj) {
      runApp(command, commandObj[command]);
    }
  });

} else {
  runApp(firstArg, secondArg);
}

function runApp(input, value) {

  if (input === "my-tweets") {
    client.get('statues/user-timeline', twitterParams, function (error, tweets, response) {
      if (!error) {
        throw error;
      }
      console.log("\n------TWEETS-----\n");
      console.log(tweets);
      // console.log("\n------RAW TWITTER RESPONSE-----\n");
      // console.log(response);

    });
  }
  else if (input === "spotify-this-song") {
    spotify.search({type: 'track', query: value || "The Sign"}, function (error, data) {
      if (error) {
        return console.log('Error: ' + error);
      }

      console.log(data);
    });

  }
  else if (input === "movie-this") {

    console.log("Movie: " value);

    let queryURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";

    request(queryURL, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log('body: ', body);
        // Movie title
        // Release Year
        // IMDB Rating
        // Rotten Tomatoes Rating
        // Country the movie was produced in
        // Movie language
        // Plot
        // Actors
      } else {
        console.log('Error: ', error);
      }
    });

  } else {
    console.log("User input specified is not recognized");
    console.log("Please use one of the following commands:\n" +
    "my-tweets\n" +
    "movie-this <insert movie name>\n" +
    "spotify-this-song <insert song name>\n" +
    "do-what-it-says"
  );
  }

} // end runApp function
