#Purdue Course Watcher
This is a simple node app that will spam you with text messages via twillio if slots open up in a course.

###Instructions
1. Clone the repo, copy `settings.example.js` into `settings.js`
2. Add your twillio phone number, authToken, and SID to the settings file, as well as the phone number you want the texts to go to.
3. Set the CRN and 'term' quantifier, as per the myPurdue course catalog
	* i.e. for Fall2016, the term would be `201710`. This makes no sense but that's how it is.
4. Start the watcher script, i'd recommend something like [pm2](https://github.com/Unitech/pm2) to keep it alive in the background. (It checks purdue servers every 1 minute.)