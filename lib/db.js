'use strict';
var jdb = require('jugglingdb');

var schema = null;

module.exports = {
  init: function(adapter, settings){
    schema = new jdb.chema.Schema(adapter, settings);
  },

  get schema(){
    if(!schema){
      throw new Error('Connection requested before initializing database');
    }
    return schema;
  }
};