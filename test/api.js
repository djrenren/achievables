'use strict';

var chai = require('chai');
var http = require('http');
var qs = require('querystring');
var should = chai.should(); //gives access to should.exist and friends
var reverse = require('../lib/util.js').reverse;

describe('The REST API,', function() {

  var options = {};

  beforeEach(function(){
    options = {
      host: 'localhost',
      port: '3000',
    };
  });

  describe('service api section', function() {
  
    before(function() {
      //TODO: reset target's database for testing... somehow.
    });
  
    beforeEach(function(){
      options.path = '/app/';
    });
  
    it('lets someone register a new service', function(done) {
      var appname = 'dat_app';
      var appdesc = 'A cool application for cool people';
      var applong = 'Dat App';
      
      var data = qs.stringify({
        appname: appname,
        description: appdesc,
        longname: applong
      });
      
      options.method = 'POST';
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      };
      
      var req = http.request(options, function(res) {
        var sink = '';
        res.on('data', function(chunk) {
          sink += chunk;
        });
        res.on('end', function() {
          var obj = JSON.parse(sink);
          
          obj.appname.should.equal(appname);
          obj.description.should.equal(appdesc);
          obj.longname.should.equal(applong);
          
          obj.secret.should.equal('[[protected]]');
          
          done();
        });
        res.on('error', done);
      });
      req.write(data);
      req.end();
    });
    
    it('lets someone update a service', function(done) {
      var appname = 'dat_app';
      var appdesc = 'A cooler application for cooler people';
      var applong = 'Dat Really Awesome App';
      var appsecret = reverse('appname'); //Yeah, needs real secrets
      
      var data = qs.stringify({
        description: appdesc,
        longname: applong,
        secret: appsecret
      });
      
      options.path += appname;
      options.method = 'PUT';
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      };
      
      var req = http.request(options, function(res) {
        var sink = '';
        res.on('data', function(chunk) {
          sink += chunk;
        });
        res.on('end', function() {
          var obj = JSON.parse(sink);
          
          obj.appname.should.equal(appname);
          obj.description.should.equal(appdesc);
          obj.longname.should.equal(applong);
          
          obj.secret.should.equal('[[protected]]');
          
          done();
        });
        res.on('error', done);
      });
      req.write(data);
      req.end();
    });
    
    it('lets someone look at a service', function(done) {
      var appname = 'dat_app';
      var appdesc = 'A cooler application for cooler people';
      var applong = 'Dat Really Awesome App';
      
      options.path += appname;
      options.method = 'GET';
      
      var req = http.request(options, function(res) {
        var sink = '';
        res.on('data', function(chunk) {
          sink += chunk;
        });
        res.on('end', function() {
          var obj = JSON.parse(sink);
          
          obj.appname.should.equal(appname);
          obj.description.should.equal(appdesc);
          obj.longname.should.equal(applong);
          
          obj.secret.should.equal('[[protected]]');
          
          done();
        });
        res.on('error', done);
      });
      req.end();
    });
    
    it('lets someone remove a service', function(done) {
      var appname = 'dat_app';
      var appsecret = reverse('appname'); //Yeah, needs real secrets
      
      var data = qs.stringify({
        secret: appsecret
      });
      
      options.path += appname;
      options.method = 'DELETE';
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      };
      
      var req = http.request(options, function(res) {
        var sink = '';
        res.on('data', function(chunk) {
          sink += chunk;
        });
        res.on('end', function() {
          var obj = JSON.parse(sink);
          
          obj.should.have.property('success');
          obj.success.should.be.true;
          
          done();
        });
        res.on('error', done);
      });
      req.write(data);
      req.end();
    });
  
  });
  
  describe('achievable api section', function() {
  
  });
  
  describe('user api section', function() {
  
  });

});