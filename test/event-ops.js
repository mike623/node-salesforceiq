'use strict';

var SalesforceIQ = require('../index.js');

var util = require('util');
var assert = require('assert');
var uid = require('uid');
var _ = require('lodash');

var apiKey = process.env['SALESFORCEIQ_KEY'];
var apiSecret = process.env['SALESFORCEIQ_SECRET'];

describe.skip('SalesforceIQ Event Operations', function() {
  var salesforceIQ = new SalesforceIQ(apiKey, apiSecret);
  var contactName = 'User Leslie';
  var contactEmail = 'leslie@test.sigmasofware.com';

  it('should create an event', function(done) {
    var body = {
      subject: 'New account created',
      body: 'New account created for ' + contactName,
      participantIds: [
        {
          type: 'email',
          value: contactEmail
        }
      ]
    };

    salesforceIQ.createEvent(body, function(err) {
      assert.ifError(err);
      done();
    });
  });

});
