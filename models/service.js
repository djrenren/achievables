'use strict';

var schema = require('../lib/db').schema;

var Service = schema.define('Service', {
  'longname': String,
  'description': String,
  'appname': String,
  'secret': String,
});

Service.validatesInclusionOf('appname');
Service.validatesUniquenessOf('appname', {message: 'appname is not unique'});
Service.validatesInclusionOf('description');
Service.validatesInclusionOf('longname');
Service.validatesInclusionOf('secret');

module.exports = Service;