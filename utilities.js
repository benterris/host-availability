// This module contains simple functions to deal with arrays / dictionnaries

module.exports = {
  // returns the proportion of values where the data is available
  getAvailability: function(availabilities) {
    var sum = 0;
    for (var i = 0; i < availabilities.length; i++) {
      if(availabilities[i]){
        sum++;
      }
    }
    return sum/availabilities.length;
  },

  // Takes a list of successive response codes as input, as found in the logs
  // Returns a dictionnary with the different response codes found in the array, and their count
  codeArrayToDictCount: function(codes){
    var result = {}
    for (var i = 0; i < codes.length; i++) {
      // If it's the first time we see this alert, create it in dictionnary
      if(Object.keys(result).indexOf(codes[i].toString()) == -1) {
        result[codes[i]] = 1;
      } else {
        result[codes[i]]++;
      }
    }
    return result;
  },

  // Returns the max value of an array
  getArrayMax: function(arr) {
    return Math.max.apply(null, arr);
  },

  // Return th average response time of a website
  averagePing: function(array){
    var sum = array.reduce(function(a, b) { return a + b; });
    var numberNotNull = array.reduce(function(a, b) {
      // We have to use a custom function to deal with the absent values (when the website is not responding)
      if(b != null){
        return a + 1;
      } else {
        return a;
      }
    });
    // We return a value only if the site has been reached at least one time
    if(numberNotNull){
      return sum / array.length;
    } else {
      return null;
    }
  },
}
