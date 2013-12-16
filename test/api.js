'use strict';

//JSHint defs
/* global describe */
/* global it */
/* global beforeEach */
/* global before */

var chai = require('chai');
var http = require('http');
var qs = require('querystring');
var should = chai.should(); //gives access to should.exist and friends
var reverse = require('../lib/util.js').reverse;
var crypto = require('crypto');

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
    beforeEach(function(done){
      options.path = '/app/';
        
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
          done();
        });
        res.on('error', done);
      });
      req.write(data);
      req.end();
      
      options.path += appname + '/ach/';
    });
    
    it('lets services create achievables', function(done) {
      var appsecret = reverse('appname'); //Yeah, needs real secrets
      var achname = 'Certifiably Cool';
      var achdesc = '{{progress}}/{{max_progress}} coolness points earned.';
      var achprog = 42;
      
      var data = qs.stringify({
        secret: appsecret,
        name: achname,
        description: achdesc,
        max_progress: achprog,
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
          
          obj.name.should.equal(achname);
          obj.description.should.equal(achdesc);
          obj.max_progress.should.equal(achprog);
          
          done();
        });
        res.on('error', done);
      });
      req.write(data);
      req.end();
    });
    
    it('lets services update achievables', function(done) { //Also tests updating to a new achievable type
      var appsecret = reverse('appname'); //Yeah, needs real secrets
      var achname = 'Certifiably Cool';
      var achdesc = '{{#listify checklist}}'; //Taking so many liberties with this.
      var achprog = -1;
      var achchecklist = {
        1:'Sunglasses', 
        2:'Pompadour', 
        3:'Comb', 
        4:'Leather Jacket', 
        5:'Fast Car'
      };
      
      var data = qs.stringify({
        secret: appsecret,
        name: achname,
        description: achdesc,
        max_progress: achprog,
        checklist: achchecklist,
      });
      
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
          
          obj.name.should.equal(achname);
          obj.description.should.equal(achdesc);
          obj.max_progress.should.equal(achprog);
          obj.checklist.should.equal(achchecklist);
          
          done();
        });
        res.on('error', done);
      });
      req.write(data);
      req.end();
    });
    
    it('lets services read their achievables', function(done) {
      this.fail('TODO');
    });
    
    it('lets services remove their achievables', function(done) {
      this.fail('TODO');
    });
  });
  
  describe('user api section', function() {
    var userEmail = 'test@test.com';
    beforeEach(function() {
      var md5 = crypto.createHash('md5');
      md5.update(userEmail);
      var hash = md5.digest('base64');
      options.path = '/usr/'+hash+'/';
    });
    
    it('lets users have achievement progress updated', function(done) {
      this.fail('TODO');
    });
    
    it('lets users be queried for their achivement progress', function(done) {
      this.fail('TODO');
    });
  });

});