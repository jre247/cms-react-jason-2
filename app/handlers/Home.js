/** @jsx React.DOM */
var React = require('react');
var api = require('../utils/api');

var Home = module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <div className="Content-text">
          <span> November 5, 2016 </span>
        </div>

        <div>
          <img className="Content-large-image" src="https://scontent-lga3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/12219352_10205322216999523_2989781224031728729_n.jpg?oh=2ce868d093f34a72a5a333752218e4eb&oe=56E30ABC"/>
        </div>
      </div>
    );
  }
});
