/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api/venue-api');
var { Link } = require('react-router');

var Location = module.exports = React.createClass({
  statics: {
    fetchData: function(token, params, query) {
      return api.get('/venue', token).then(null, function (data) {
        console.log('data: ' + data);
        console.log('data.name: ' + data.name);
        return { error: true };
      });
    }
  },
  render: function() {
    var data = this.props.data.venue;
    var venue = data != null && data != "undefined" ? data.venue : {};
    console.log('data: ' + this.props.data);
    console.log('data.name: ' + this.props.data.name);
    console.log('props.name: ' + this.props.name);
    console.log('venue: ' + venue);
    console.log('venue.name: ' + venue.name);
    console.log('venue.ceremonyTime: ' + venue.ceremonyTime);
    console.log('venue.description: ' + venue.description);
    debugger;
    return (
      <div className="Detail">
        <Link className="Navigation-link" to="edit-venue">Edit</Link>

        <div className="Content-text">
          <span>
            {venue.name}
          </span>
        </div>

        <div className="Content-text">
          <span>
            {venue.ceremonyTime}
          </span>
        </div>



        <div className="Content-text">
          <span> {venue.description} </span>
        </div>
      </div>
    );
  }
});
