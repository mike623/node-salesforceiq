'use strict';

var SalesforceIQ = require('../index.js');

var assert = require('assert');
var _ = require('lodash');

var apiKey = process.env['SALESFORCEIQ_KEY'];
var apiSecret = process.env['SALESFORCEIQ_SECRET'];

describe.skip('SalesforceIQ Contact Operations', function() {
  var salesforceIQ = new SalesforceIQ(apiKey, apiSecret);
  var companyName = 'Test - Sigma Software';
  var companyNameUpdated = 'Test - Sigma Software Updated';
  var contactName = 'User Leslie';
  var contactNameUpdated = 'User Leslie - Updated';
  var contactEmail = 'leslie@test.sigmasofware.com';
  var contactId = null;

  /* SKIPPING AS API DOES NOT HAVE ABILITY TO DELETE AFTER CREATING */
  it.skip('can create a contact', function(done) {
    salesforceIQ.createContact({
      name: contactName,
      company: companyName,
      email: contactEmail
    }, function(err, data) {
      assert.ifError(err);
      assert.ok(data.id);
      assert.equal(_.first(data.properties.email).value, contactEmail);

      // Store the contact id for further tests
      contactId = data.id;
      done();
    });
  });

  it('can retrieve all contacts', function(done) {
    salesforceIQ.getContacts(function(err, res) {
      assert.ifError(err);
      assert.equal(res.length > 0, true);
      done();
    });
  });

  it('can retrieve a contact by email address', function(done) {
    salesforceIQ.getContactByEmail(contactEmail, function(err, data) {
      assert.ifError(err);
      assert.ok(data[0].id);
      assert.equal(data[0].properties.email[0].value, contactEmail);

      // Save the contact id for further tests
      contactId = data[0].id;
      done();
    });
  });

  it('can retrieve a contact by id', function(done) {
    salesforceIQ.getContact(contactId, function(err, res) {
      assert.ifError(err);
      assert.notEqual(res.id, null);
      done();
    });
  });

  it('can update a contact', function(done) {
    salesforceIQ.updateContact(contactId, {
      id: contactId,
      name: contactNameUpdated,
      company: companyNameUpdated,
      email: contactEmail
    }, function(err, res) {
      assert.ifError(err);
      assert.notEqual(res.id, null);
      done();
    });
  });

  it('can upsert a contact', function(done) {
    salesforceIQ.upsertContact({
      name: contactNameUpdated,
      company: companyNameUpdated,
      email: contactEmail
    }, function(err, res) {
      assert.ifError(err);
      assert.notEqual(res.id, null);
      done();
    });
  });

  it.skip('should delete a contact', function(done) {
    // NJC this does not work.  IQ has 'archive' in UI not in API
    salesforceIQ.deleteContact(contactId, function(err, data) {
      assert.ifError(err);
      // REF print(err, data);

      done();
    });
  });
});
