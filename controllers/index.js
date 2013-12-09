'use strict';

module.exports = function (server) {
  server.get('/', function (req, res) {
    var model = { name: 'webchievables' };
    res.send('Hey! ');
  });
};
