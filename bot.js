console.log("This is good");
var Twit = require('twit');

var config = require('./config');

var exec = require('child_process').exec;


var T =new Twit(config);
var fs = require('fs');
var params=  { q: 'rainbow'
	, count: 2 };
//T.get('search/tweets',params, gotdata);


var stream = T.stream('user');
var cmd= 'processing-java --sketch=C:\\Users\\gaurav\\Desktop\\twitterbot\\rainbow --run';  

exec(cmd,processing);

function processing(){
	var filename = 'rainbow\\output.png';
	params={
			encoding: 'base64'
		}
	
	var b64 =fs.readFileSync(filename,params);

	T.post('media/upload',{ media_data: b64}, uploaded);

	function uploaded(err,data,response){
		
		var id = data.media_id_string;
		var tweet = {
			status : '#CTF live from nodejs',
			media_ids: [id]
		}

		T.post('statuses/update',tweet,tweeted);
		function tweeted(err, data, response) {
  if(err)
  {
  	console.log("Something went wrong");
  }
  else{
  console.log("it's work");
  stream.on('follow',followed);
}
};
}
	console.log('finished');
}

function followed(eventMsg){
	var name= eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@'+screenName+' Thanks');
	console.log("hi");
	};

function tweetIt(txt) {
	var tweet = { status: txt};

T.post('statuses/update',tweet,tweeted);	
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

//tweetIt();

// function gotdata(err, data, response) {
// 	var tweets=data.statuses;
// 	for(var i=0;i<tweets.length;i++)
//   			console.log(tweets[i].text);
// };
