// This module contains the request logic

var request = require('request');

module.exports = {
  makeRequests: function(secondsSinceStart, websites, connectionLog){
    for(var i = 0; i < websites.length; i++){
      // Do we need to check the host, accordingly to his check interval ?
      if(secondsSinceStart % (websites[i][1]*10) == 0){
        let hostWebsite = websites[i][0];
        let timestamp = secondsSinceStart;
        // The request takes place here :
        request.get({
          url : 'http://' + hostWebsite,
          time : true,
          timeout : 3000,
        }, function(err, response){
          var result = null;
          if(err){
            // If we couldn't reach the host, we fill with the right data
            result = [timestamp, false, 'unreachable', null];
          } else {
            result = [timestamp, true, 'response ' + response.statusCode, response.elapsedTime];
          }
          // Add the gathered information to the connection log
          connectionLog[hostWebsite].push(result)
        });
      }
    }
  },
}
