# Website availability & performance monitoring

This CLI tool can be used to monitor in real time the availability and the performance of some websites.

## Features

- Monitor any number of websites
- Choose a different check interval for each website (this is why the response count may not be the same for every host)
- For all of them, check :
  - the availability
  - the response time (max and average)
  - the count of every http response code received for a host
- Various time frames for analysis : every 10s, an analysis on the last minute is done, and every minute, the analysis is made over the last hour
- Alert logging


## How to install

To use this tool you need to have `nodejs` and `npm` installed.  
You just have to run :
```bash
npm install
node run.js
```

You can tune the settings as you like : you just have to edit the file `config.js` and register the host you want to monitor, as well as their check interval.

## Running the test

I implemented a test case to check the alert logging logic. You can run it with :
```bash
node test.js
```
