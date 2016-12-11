  const videos = require("./videos");
  const reviews = require("./reviews");
  const users = require('./users');
  const jwtauth = require('./jwtauth');
  const locations = require('./locations');

  module.exports = {
      videos: videos,
      users: users,
      locations:locations,
      reviews:reviews,
      jwtauth: jwtauth
  };
