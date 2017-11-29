var config = require('./config');
var analysis = require('./analysis');
var makeRequests = require('./makeRequests');

// Retrieve the hosts list and the check intervals from the config file
const websites = config['websites'];

var timeFrame;



// INITIALISATION

var connectionLog = {}; // Contains all the logs
var alertLog = []; // Contains the alert messages to be displayed
var reportedDown = []; // Contains a boolean to tell if a host is known to be down
var secondsSinceStart = 0 // Timer to keep a trace of the length of execution

// We create empty logs for every website
// Initially, no host is known to be down
for(var i = 0; i < websites.length; i++) {
  connectionLog[websites[i][0]] = [];
  reportedDown.push(false);
}


// First requests before analysis
console.log('\x1b[36m%s\x1b[0m', 'Making the first requests...');
makeRequests.makeRequests(secondsSinceStart, websites, connectionLog);

// Main loop : makes requests, runs analysis and prints results
const run = setInterval(function(){
  secondsSinceStart += 10;
  makeRequests.makeRequests(secondsSinceStart, websites, connectionLog);
  if(secondsSinceStart % 60 == 0){
    timeFrame = 3600
  } else {
    timeFrame = 600
  }
  analysis.analysis(timeFrame, secondsSinceStart, websites, connectionLog, alertLog, reportedDown);
}, 10000);
