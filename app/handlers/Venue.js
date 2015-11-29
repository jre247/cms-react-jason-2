/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api/venue-api');

var Location = module.exports = React.createClass({
  statics: {
    fetchData: function(token, params, query) {
      return api.get('/venue', token).then(null, function () {
        return { error: true };
      });
    }
  },
  render: function() {
    var data = this.props.data.venue;
    var venue = data.venue;
    return (
      <div className="Detail">
        <div className="Content-text">
          <span> Wadsworth Mansion {venue.Name} </span>
        </div>

        <div className="Content-text">
          <span> November 5, 2016 {venue.CeremonyTime} </span>
        </div>

        <img className="Content-large-image" src="http://www.weddingreports.com/wp-content/uploads/wadworth-mansion-weddings.jpg"/>
        <img className="Content-large-image" src={venue.Url} />

        <div className="Content-text">
          <span> Description {venue.Description} </span>
        </div>
      </div>
    );
  }
});
