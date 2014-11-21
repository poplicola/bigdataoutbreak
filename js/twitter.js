var csv = require("fast-csv");
var Twit = require('twit');

csv
 .fromPath("../csv/livelog.csv")
 .on("data", function(data){
     console.log(data);
 })
 .on("end", function(){
     console.log("done");
 });

var T = new Twit({
    consumer_key:         'X124KPIVLXWPv4VtKup1KI2MY'
  , consumer_secret:      'h9n7BT5DwNlr5ZPcbT4lDK4fHlW4W92qk5cx16dGOMCPJcc54R'
  , access_token:         '2835642546-bryQSGXZ9X2vmV05opjI1W2dSkVBHRUUGya5si5'
  , access_token_secret:  'Q3TveIE21cw2ygrIw9EXHVGy9edwSHGN9XAP7RIhOaH3a'
})

// figure out how to get data from json file and insert it into tweet

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})