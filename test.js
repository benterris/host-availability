// Here we test the alert logging logic. It works as follow :
// We make mock requests to a fake host.
// For the first minute, the host is up.
// It is then down for 20s, then up again.
// We check if the log messages are logged at the correct times.
// It takes 100s to run.

var config = require('./config');
var analysis = require('./analysis');
// require('console.table');

// Just one website to test
const websites = [
  ['www.example.com', 1],
];
var testResults = [];
var mockRequest = mockRequestGood;

// Same as before :
var timeFrame;
var connectionLog = {};
var alertLog = [];
var reportedDown = [];
var secondsSinceStart = 0;

for(var i = 0; i < websites.length; i++) {
  connectionLog[websites[i][0]] = [];
  reportedDown.push(false);
}



console.log('\x1b[36m%s\x1b[0m', 'Making the first requests...');


const run = setInterval(function(){
  secondsSinceStart += 10;
  mockRequest(secondsSinceStart);
  if(secondsSinceStart % 60 == 0){
    timeFrame = 3600
  } else {
    timeFrame = 600
  }
  analysis.analysis(timeFrame, secondsSinceStart, websites, connectionLog, alertLog, reportedDown);
  if(secondsSinceStart == 60) {
    // Let's make the host unavailable
    mockRequest = mockRequestBad;
  }
  if(secondsSinceStart == 80){
    // Now the host "www.example.com" should have seen its availability go under 80% (60s/80s),
    // so a message should have appeared in the logs
    testResults.push(alertLog.length == 1);
    // And let's make it available again
    mockRequest = mockRequestGood;
  }
  if(secondsSinceStart == 100){
    // Now the host "www.example.com" should have seen his availability go back above 80% (80s/100s),
    // so another message should have appeared in the logs
    testResults.push(alertLog.length == 2);
    console.log("Test results : ");
    if(testResults[0] && testResults[1]){
      console.log('Successful !');
    } else {
      console.log('Something went wrong...');
      console.log(testResults);
    }
    clearInterval(run);
  }

}, 10000);

// Mock request where the website is available
function mockRequestGood(timestamp){
  connectionLog['www.example.com'].push([timestamp, true, 'response 200', 250.0])
}

// Mock request where it is not.
function mockRequestBad(timestamp){
  connectionLog['www.example.com'].push([timestamp, false, 'unreachable', null])
}
