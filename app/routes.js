var React = require('react');
var { DefaultRoute, Route, NotFoundRoute } = require('react-router');

module.exports = (token) => {

  // hand-wavy dependency injection
  var EditVenue = require('./handlers/EditVenue');
  EditVenue.token = token;

  return [
    <Route name="root" path="/" handler={require('./handlers/Root')}>
      <DefaultRoute handler={require('./handlers/Home')} />
      <Route name="photo-album" handler={require('./handlers/PhotoAlbum')} />
      <Route name="our-story" handler={require('./handlers/OurStory')} />
      <Route name="venue" handler={require('./handlers/Venue')} />
      <Route name="accomodations" handler={require('./handlers/Accomodations')} />
      <Route name="gift-registry" handler={require('./handlers/GiftRegistry')} />
      <Route name="edit-venue" handler={EditVenue} />
      <Route name="save-venue" handler={require('./handlers/SaveVenue')} />
    </Route>,
    <NotFoundRoute name="not-found" handler={require('./handlers/NotFound')}/>
  ];
};
