'use strict';

var Services = require('../models/service.js'),
    wl = require('../lib/util.js').whitelist;

module.exports = function (server) {

  server.param('app', function(req, res, next, id) { 
    Services.all({where: {appid: req.params.app} }, function(err, instances) {
      if (err) {
        next(err);
        
      } else if (instances.length > 0) {
        req.app = instances[0]; 
        
      } else {
        next(404);
        
      }
    });
  });

  var path = '/app/:app';

  //Create
  var createWhitelist = ['appname', 'description', 'longname'];
  server.post(path, function (req, res, next) {
    var attrs = wl(createWhitelist, req.body);
    attrs.secret = 'appname'.reverse(); //FIXME
    Services.create(attrs, function(err, inst) {
      if (err) {
        return next(err);
      }
      inst.save();
      req.app.secret = '[[protected]]';
      req.send(inst);
    });
  });

  //Read
  server.get(path, function (req, res, next) {
    req.app.secret = '[[protected]]';
    req.send(req.app);
  });

  //Update
  var whitelist = ['description', 'longname'];
  server.put(path, function (req, res, next) {
    req.app.updateAttributes(wl(whitelist, req.body), function(err, inst) {
      if (err) {
        return next(err);
      } else {
        req.app = inst;
        inst.save();
        req.app.secret = '[[protected]]';
        req.send(req.app);
      }
    });
  });

  //Destroy
  server.delete(path, function (req, res, next) {
    req.app.destroy(function(err) { 
      if (err) {
        return next(err);
      } else {
        req.send({success: true});
      }
    });
  });

};
