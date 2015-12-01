/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api/venue-api');
var { Link } = require('react-router');

var fieldsData;

var Location = module.exports = React.createClass({
  statics: {
    fetchData: function(token, params, query) {
      return api.get('/venue', token).then(function(data){
        console.log('fetchData data: ' + data);
        console.log('fetchData data.name: ' + data.name);
        fieldsData = data;
      }, function (data) {

        return { error: true };
      });
    }
  },
  render: function() {
    //var data = this.props.data.venue;
    var data = fieldsData;
  //  var venue = data != null && data != "undefined" ? data.venue : {};
    var venue = data != null && data != "undefined" ? data : {};
    console.log('venue.ceremonyTime: ' + venue.ceremonyTime);

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
            {venue.ceremonytime}
          </span>
        </div>

        <img className="Content-large-image" src={venue.url} alt="Venue Image" />

        <div className="Content-text">
          <span> {venue.description} </span>
        </div>
      </div>
    );
  }
});
