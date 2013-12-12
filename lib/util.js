'use strict';

function whitelist(list, obj) {
  var ret = {};
  for (var s in obj) {
    if (list.indexOf(s)>=-1) {
      ret[s] = obj[s];
    }
  }
  return ret;
}

function reverse(str) { //This will fail on UTF-8 characters because javascript is bad at strings
  return str.split('').reverse().join('');
}

module.exports = {
  whitelist: whitelist,
  reverse: reverse,
};