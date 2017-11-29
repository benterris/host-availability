// Here you can choose which hosts you want to monitor, and the check frequency (in multiples of 10 seconds)

const websites = [
  ['www.example.com', 1], // host name and check interval (one unit is 10 seconds)
  ['www.google.com', 1],
  ['www.nonExistentWebsite.frr', 1],
  ['www.facebook.com', 2],
  ['wikipedia.org', 3],
];

exports.websites = websites;
