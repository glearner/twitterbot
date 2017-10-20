console.log("This is reply bot");

var Twit = require('twit');

var config =require('./config');
var T = new Twit(config);

var stream = T.stream('user');

stream.on('tweet',tweetEvent);

function tweetEvent(eventMsg){
	// var fs = require('fs');
	// var json = JSON.stringify(eventMsg,null,2);
	// fs.writeFile('tweet.json',json);

	var replyTo = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	console.log(replyTo+ ' '+ from);

	if(replyTo === 'EdparkerEric'){

		var newtweet = '@'+	from +' thank you for tweeting me.';
		tweetIt(newtweet);
	}

}
function tweetIt(txt) {
	var tweet = { status: txt};
T.post('statuses/update',tweet,tweeted);	
console.log("tweeted back");
};
function tweeted(err, data, response) {
  if(err)
  {
  	console.log("Something went wrong");
  }
  else{
  console.log("it's work");
  //stream.on('follow',followed);
}
};