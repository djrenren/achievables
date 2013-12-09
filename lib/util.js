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

module.exports = {
  whitelist: whitelist,
};