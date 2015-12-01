/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api/venue-api');
var cache = require('../utils/cache');

var SaveVenue = module.exports = React.createClass({

  statics: {
    willTransitionTo: (transition, params, query) => {
      var url = '/venue';
      var token = SaveVenue.token;

      console.log('token: ' + token);

      transition.wait(
        api.post(url, {venue: query}, token).then(function(data) {
          console.log('Api post done. Data: ' + data);
          cache.expire(token, url);
          transition.redirect(`/venue`);
        })
      );
    }
  },

  render: function() {
    return null;
  }

});
