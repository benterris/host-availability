require('console.table');

// This module contains functions to display results in the console
module.exports = {
  // General print function (the only one called outside of this module)
  printData: function(timeFrame, timestamp, data, alertLog, websites){

    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
    console.log("\x1b[36m%s\x1b[0m", 'ALERT LOG :');
    this.printAlerts(alertLog);

    // We specify if the analysis has been made over 10 minutes or 1 hour
    if(timeFrame == 600){
      console.log("\x1b[36m%s\x1b[0m", 'ANALYSIS OVER THE LAST 10 MINUTES :');
    } else {
      console.log("\x1b[36m%s\x1b[0m", 'ANALYSIS OVER THE LAST HOUR :');
    }
    this.printNice(data, websites);
    console.log("\x1b[36m%s\x1b[0m", 'Seconds since start : ' + timestamp);
  },

  // Prints the table with website data
  printNice: function(data, websites){
    var printableData = [];

    for(var i = 0; i < websites.length; i++){
      var dataDict = {
        'host': websites[i][0],
        'availability': Math.floor((data[0][i]*100)).toString() + "%",
        'average response time': Math.floor((data[1][i]*1000))/1000,
        'max response time': Math.floor((data[2][i]*1000))/1000,
      };

      var fullData = Object.assign({}, dataDict, data[3][i]); // merge the two dictionnaries in a single one
      printableData.push(fullData);
    }
    console.table(printableData);
  },

  // Prints the alerts saved in the alert log
  printAlerts: function(alertLog) {
    for(var i = 0; i < alertLog.length; i++){
      console.log(alertLog[i]);
    }
  },
}
