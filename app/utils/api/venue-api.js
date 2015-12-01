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
    var venueData = {};

    if(res){
      cache.set(token, url, res.data);
      venueData = res.data;
    }

    return promise.resolve(venueData);
  });

  return promise;
};

exports.post = (url, data, token) => {
  return venueDb.insert(data).then(function(res) {
    return res.data;
  });
};
