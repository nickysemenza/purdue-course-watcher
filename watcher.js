var $ = require('cheerio');
var request = require('request');
// Your accountSid and authToken from twilio.com/user/account
var accountSid = '';
var authToken = "";
var twilio_number = "";//the number texts will be coming from
var recipient_phone_number = "";//the number to send alerts to

var crn = 25220; //CRN number
var term = 201710; //201710 is Fall 2016 for some reason?? why purdue

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
			  		if(spots!=0)
			  		{
			  			var msg = coursename+" has "+spots+" spots";
			  			console.log(msg);
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