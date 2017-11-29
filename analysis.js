var utilities = require('./utilities');
var display = require('./display');

module.exports = {
  // Make anaysis on the logged data :
  // Here we compute :
  // - the percentage of availability
  // - the max response time
  // - the average response time
  // - the code response count
  // over the duration timeFrame.
  analysis: function(timeFrame, timestamp, websites, connectionLog, alertLog, reportedDown){

    var availability = [];
    var maxResponseTime = [];
    var avgResponseTime = [];
    var codeResponseCounts = [];


    for(var i = 0; i < websites.length; i++){
      const fullLog = connectionLog[websites[i][0]];

      var logData = []; // table to be filled with correct data

      // We check if the data are related to an event which is in the time frame we want
      // We want to avoid checking the whole log every time, so we go through the table backwards
      for(j = fullLog.length - 1; j >= 0; j--){
        if(timestamp - fullLog[j][0] > timeFrame){
          break;
        }
        logData.push(fullLog[j]);
      }


      // The map function lets us take a column in a 2d array
      currentAvailability = utilities.getAvailability(logData.map(function(value,index) { return value[1]; }));
      responseCodeTable = logData.map(function(value,index) { return value[2]; });
      responseTimeTable = logData.map(function(value,index) { return value[3]; });

      // Alert messages computation :
      const now = new Date();
      if(currentAvailability < .8 && !reportedDown[i]){
        // If the host is newly unavailable :
        alertLog.push('\x1b[31m[' + now.toString() + '] Website ' + websites[i][0] + ' is down : availability=' + currentAvailability + '\x1b[0m');
        reportedDown[i] = true;
      } else if (currentAvailability >= .8 && reportedDown[i]) {
        // On the contrary, if the host is back :
        alertLog.push('\x1b[32m[' + now.toString() + '] Website ' + websites[i][0] + ' is up again !\x1b[0m');
        reportedDown[i] = false;
      }


      // save all these data in corresponding tables
      availability.push(currentAvailability);
      maxResponseTime.push(utilities.getArrayMax(responseTimeTable));
      avgResponseTime.push(utilities.averagePing(responseTimeTable));
      codeResponseCounts.push(utilities.codeArrayToDictCount(responseCodeTable));



    }
    data = [availability, avgResponseTime, maxResponseTime, codeResponseCounts];

    // Send everything to the display logic
    display.printData(timeFrame, timestamp, data, alertLog, websites);
  },
}
