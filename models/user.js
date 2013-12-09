'use strict';

var schema = require('../lib/db').schema;

var AchievableProgress = require('achievableprogress.js');

var User = schema.define('User', {
  'hash': String,
  'email': String,
});

User.hasMany('achievables', {model: AchievableProgress});

User.validatesInclusionOf('hash');
User.validatesInclusionOf('email');

module.exports = User;