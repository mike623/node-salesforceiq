'use strict';

var SalesforceIQ = require('../index.js');

var util = require('util');
var assert = require('assert');
var uid = require('uid');
var _ = require('lodash');

var apiKey = process.env['relateIQ_APIKEY'];
var apiSecret = process.env['relateIQ_APISECRET'];

describe('SalesforceIQ List Operations', function() {
  var salesforceIQ = new SalesforceIQ(apiKey, apiSecret);
  var list = {
    id: uid(24),
    title: 'API-Test-List',
    listType: 'contact',
    fields: [{
      id: uid(24),
      name: 'Contact'
    }]
  };

  var listId = null;
  var listItemId = null;

  it.skip('can create a list', function(done) {
    salesforceIQ.createList(list, function(err, res) {
      assert.ifError(err);
      assert.equal(res.length > 0, true);
      done();
    });
  });

  it('can get all lists', function(done) {
    salesforceIQ.getLists(function(err, res) {
      assert.ifError(err);
      assert.equal(res.length > 0, true);

      // lists = res;
      listId = res[0].id;
      done();
    });
  });

  it.only('can get a list by id', function(done) {
    salesforceIQ.getList(listId, function(err, res) {
      assert.ifError(err);
      assert.notEqual(typeof res.id, 'undefined');
      done();
    });
  });

  it.only('can get all items from a list', function(done) {
    salesforceIQ.getListItems(listId, '', function(err, res) {
      assert.ifError(err);
      assert.equal(res.length > 0, true);
      res.forEach(function(item){
        assert.ok(item.parsedListFields);
      })
      // Store the list item id for later tests
      listItemId = res[0].id;
      done();
    });
  });

  it('can get filtered items from a list', function(done) {
    salesforceIQ.getListItems(listId, '_start=0&_limit=1', function(err, res) {
      assert.ifError(err);
      assert.equal(res.length > 0, true);

      done();
    });
  });

  it('can get a single item from a list', function(done) {
    salesforceIQ.getListItem(listId, listItemId, function(err, res) {
      assert.ifError(err);
      assert.notEqual(typeof res.id, 'undefined');
      done();
    });
  });

  it('can get a items from a list by contact', function(done) {
    salesforceIQ.getContacts(function(err, contacts) {
      var contact = contacts.shift();
      salesforceIQ.getListItemsByContactId(listId, [contact.id], function(err, res) {
        assert.ifError(err);
        done();
      });
    });
  });

  it.skip('can create an item in a list', function(done) {
    salesforceIQ.createListItem(listId, {
      accountId: accountId,
      contactIds: [
        contactId
      ]
    }, function(err, res) {
      assert.ifError(err);
      assert.ok(res.id);
      assert.equal(res.contactIds[0], contactId);

      done();
    });
  });

  it.skip('can update a list item', function(done) {
    salesforceIQ.updateListItem(listLicensesId,
      listLicensesItem.id, listLicensesItem,
      function(err, res) {
        assert.ifError(err);
        assert.ok(res.id);
        done();
      }
    );
  });

  it.skip('can delete an item from a list', function(done) {
    salesforceIQ.removeListItem(listLicensesId,
      listLicensesItemId, function(err, data) {
      assert.ifError(err);
      done();
    });
  });

  it.skip('can delete a list', function(done) {
    salesforceIQ.deleteList(listId, function(err, data) {
      assert.ifError(err);
      done();
    });
  });

});
