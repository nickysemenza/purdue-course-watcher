var $ = require('cheerio');
var request = require('request');
var settings = require('./settings');

// Your accountSid and authToken from twilio.com/user/account
var accountSid = settings.accountSid;
var authToken = settings.authToken;
var twilio_number = settings.twilio_number;
var recipient_phone_number = settings.recipient_phone_number;
var crn = settings.crn;
var term = settings.term;
var client = require('twilio')(accountSid, authToken);
var domain = 'https://selfservice.mypurdue.purdue.edu/prod/bwckschd.p_disp_detail_sched?term_in='+term+'&crn_in='+crn;
function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html);
	parsedHTML('.ddlabel').map(function(i, elem) {
	  elem = $(elem);
	  	if(i==0)//the first ddlabel is the course name
	  	{
	  		var coursename = elem.text();

	  		//get the number of spots
	  		parsedHTML('td').map(function(i, elem) {
			  elem = $(elem);
			  	// console.log(i,elem.text())
			  	if(i==10)//the 10th TD is the number of spots available
			  	{
			  		var spots = elem.text();
			  		var msg = coursename+" has "+spots+" spots";
			  			console.log(msg);
			  		if(spots!=0)
			  		{
			  			client.messages.create({
						    body: msg,
						    to: recipient_phone_number,
						    from: twilio_number
						}, function(err, message) {
						    process.stdout.write(message.sid);
						});
			  		}
			  	}
			});	
	  	}
	});
}
setInterval(function(){request(domain, gotHTML);},60000);