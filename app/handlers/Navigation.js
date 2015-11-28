var React = require('react');
var { Link, RouteHandler } = require('react-router');

var Navigation= module.exports = React.createClass({


  render() {
    return (
      <div className='Navigation' role="navigation">
        <Link className="Navigation-link" to="ourStory">Our Story</Link>
      </div>
    );
  }

});
