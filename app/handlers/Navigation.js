var React = require('react');
var { Link, RouteHandler } = require('react-router');
//require('./Navigation.scss');

var Navigation= module.exports = React.createClass({


  render() {
    return (
      <div className='Navigation' role="navigation">
          <Link className="Navigation-link" to="our-story">Our Story</Link>
          <Link className="Navigation-link" to="venue">The Wedding</Link>
          <Link className="Navigation-link" to="photo-album">Photo Album</Link>
          <Link className="Navigation-link" to="accomodations">Accomodations</Link>
          <Link className="Navigation-link" to="gift-registry">Gift Registry</Link>
      </div>

    );
  }

});
