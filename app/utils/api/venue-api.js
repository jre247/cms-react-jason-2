//var Promise = require('when').Promise;
var venueDb = require('../db/venue-db');
var cache = require('../cache');
var Promise = require("node-promise").Promise;

exports.get = (url, token) => {
  console.log('venue api get.');
  
  var promise = new Promise();

  var cached = cache.get(token, url);
  if(cached){
    return promise.resolve(cached);
  }

  venueDb.get().then(function(res) {
    var venueData = {};

    if(res){
      cache.set(token, url, res);
      venueData = res;
    }

    promise.resolve(venueData);
  });

  return promise;
};

exports.post = (url, data, token) => {
  var venue = data.venue;
  venue.user = 1;
  venue.dateCreated = new Date();
  venue.dateModified = new Date();

  return venueDb.insert(venue).then(function(res) {
    return res.data;
  });
};
