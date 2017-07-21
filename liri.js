// Node Packages
const Twitter = require('twitter');
const Request = require('request');
const Spotify = require('node-spotify-api');

// Keys and Params
const twitterKeys =  require("./keys.js");
const twitterParams = {screen_name: 'TeamSoloMid'};
const spotifyParams = {
  id: false,
  secret: false
};

// Inputs
let input  = process.argv[2].toLowerCase();

// Instances
let client = new Twitter(twitterKeys);
// let spotify = new Spotify(spotifyParams);

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
  let song = process.argv[3]
  spotify.search({type: 'track', query: song}, function (error, data) {
    if (error) {
      return console.log('Error occupied: ' + error);
    }

    console.log(data);
  });

}
else if (input === "movie-this") {

}
else if (input === "do-what-it-says") {

}
