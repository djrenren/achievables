'use strict';
var jdb = require('jugglingdb');

var schema = null;

module.exports = {
  init: function(adapter, settings){
    db = new jdb.Schema(adapter, settings);
  },
  get schema(){
    if(!db)
      throw new Error("Connection requested before initializing database");
    return db;
  }
};