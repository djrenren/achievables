'use strict';

var schema = require('../lib/db').schema;

var Achievable = schema.define('Achievable', {
  'name': String,
  'description': String,
  'maxprogress': String,
});

Achievable.validatesInclusionOf('name');

module.exports = Achievable;