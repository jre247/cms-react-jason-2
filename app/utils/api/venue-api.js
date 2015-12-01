//var Promise = require('when').Promise;
var venueDb = require('../db/venue-db');
var cache = require('../cache');
var Promise = require("node-promise").Promise;

exports.get = (url, token) => {
  console.log('venue api get.');
  console.log('is venueDb null' + venueDb);
  var promise = new Promise();

  var cached = cache.get(token, url);
  if(cached){
    return promise.resolve(cached);
  }

  venueDb.get().then(function(res) {
    console.log('venue db get returned: res' + res);
    console.log('venue db get returned: res.name: ' + res.name);
    console.log('venue db get returned: res.description: ' + res.description);
    //console.log('venue db get returned: res.data.name' + res.data.name);

    var venueData = {};

    if(res){
      console.log('res is null?' + res);
      cache.set(token, url, res);
      venueData = res;
    }

    console.log('venueData.name: ' + venueData.name);

    promise.resolve(venueData);
  });

  return promise;
};

exports.post = (url, data, token) => {
  var venue = data.venue;
  venue.user = 1;
  venue.dateCreated = new Date();
  venue.dateModified = new Date();

  console.log('data: ' + data);
  console.log('name: ' + venue.name);
  console.log('ceremonyTime: ' + venue.ceremonyTime);
  console.log('description: ' + venue.description);
  console.log('ceremonyTime: ' + venue.ceremonyTime);

  return venueDb.insert(venue).then(function(res) {
    console.log('venue db insert returned: res' + res);
    console.log('venue db insert returned: res.data' + res.data);
    console.log('venue db insert returned: res.data.name' + res.data.name);
    return res.data;
  });
};
