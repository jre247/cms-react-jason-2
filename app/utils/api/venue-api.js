var Promise = require('when').Promise;
var venueDb = require('../db/venue-db');
var cache = require('../cache');

exports.get = (url, token) => {
  console.log('venue api get.');
  console.log('is venueDb null' + venueDb);
  
  var cached = cache.get(token, url);
  if(cached){
    return Promise.resolve(cached);
  }

  venueDb.get().then(function(res) {
    cache.set(token, url, res.data);
    return res.data;
  });
};

exports.post = (url, data, token) => {
  return venueDb.insert(data).then(function(res) {
    return res.data;
  });
};
