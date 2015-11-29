var React = require('react');
var { Navigation } = require('react-router');

var EditVenue = module.exports = React.createClass({

  mixins: [ Navigation ],

  handleSubmit: function(event) {
    event.preventDefault();
    var description = this.refs.description.getDOMNode().value;

    this.transitionTo('saveVenue', {}, {description});
  },

  render: function() {
    return (
      <div className="Detail">
        <h1 className="Heading Heading--alt">Edit Venue</h1>
        <div className="Content padBox">
          <form action="/saveVenue" onSubmit={this.handleSubmit}>
            <p>
              <input ref="name" name="name" placeholder="Name"/>
            </p>
            <p>
              <textarea ref="description" name="description" placeholder="Description"/>
            </p>

            <p>
              <button type="submit">Save</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
});
