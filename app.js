'use strict';


var kraken = require('kraken-js'),
    db = require('./lib/db'),
    app = {};


app.configure = function configure(nconf, next) {
  // Fired when an app configures itself
  var adapter = nconf.get('adapter'),
      settings = nconf.get('db')[adapter];

  db.init(adapter, settings);

  next(null);
};


app.requestStart = function requestStart(server) {
  // Fired at the beginning of an incoming request
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
  // Fired before routing occurs
};


app.requestAfterRoute = function requestAfterRoute(server) {
  // Fired after routing occurs
};


kraken.create(app).listen(function (err) {
  if (err) {
    console.error(err);
  }
});
