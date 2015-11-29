var React = require('react');
var { Link, RouteHandler } = require('react-router');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Header = require('./Header');
var twitter = "http://twitter.com/ryanflorence";
var rr = "https://github.com/rackt/react-router";
var source = "https://github.com/rackt/react-router-mega-demo";

var sortContacts = (contacts) => {
  return contacts.slice(0).sort((a, b) => {
    a = (a.first+' '+a.last).toLowerCase();
    b = (b.first+' '+b.last).toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
  });
};

var Root = module.exports = React.createClass({



  getInitialState () {
    return { longLoad: false };
  },

  componentDidMount () {
    var timeout;
    this.props.loadingEvents.on('start', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.setState({ longLoad: true });
      }, 250);
    });
    this.props.loadingEvents.on('end', () => {
      clearTimeout(timeout);
      this.setState({ longLoad: false });
    });
  },

  renderContacts: function() {
    return sortContacts(this.props.data.root.contacts).map((contact) => {
      return (
        <li className="ContactList__Contact" key={contact.id}>
          <Link
            className="ContactList__Link"
            to="contact"
            params={{id: contact.id}}
          >
            {contact.first} {contact.last}
          </Link>
        </li>
      );
    });
  },

  render: function() {
    var className = 'App';
    if (this.state.longLoad)
      className += ' App--loading';
    return (
      <div className={className}>
        <div className="fixed-container">
          <Header />
          <TransitionGroup transitionName="detail">
            <RouteHandler {...this.props} />
          </TransitionGroup>
        </div>
      </div>
    );
  }
});
