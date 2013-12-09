'use strict';

var schema = require('../lib/db').schema;

var Achievable = require('achievable.js');

var AchievableProgress = schema.define('AchievableProgress', {
  'base': Achievable,
  'progress': Number,
});

AchievableProgress.validatesInclusionOf('base');
AchievableProgress.validatesInclusionOf('progress');

module.exports = AchievableProgress;