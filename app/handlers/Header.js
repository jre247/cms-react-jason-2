var React = require('react');
var Navigation = require('./Navigation');
var { Link, RouteHandler } = require('react-router');
//require('./Navigation.scss');

var Header = module.exports = React.createClass({
  render() {
    return (
      <div className="Header">
        <div className="Header-container">
            <a className="Header-brand" href="/" >
              <span className="Header-brandTxt">JASON & JENNA</span>
            </a>

            <div className="Header-graphic-separator">
            </div>

            <div>
              <Navigation className="Header-nav" />
            </div>

            <div className="Header-graphic-separator">
            </div>
        </div>
      </div>

    );
  }

});
