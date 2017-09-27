testRunner.functions.push(function (test) {
  test('new Salesforce()', function (assert) {
    var sf = new Salesforce();
    assert.ok(sf instanceof Salesforce, 'creates a Salesforce object');
  });

  test('Salesforce.getObject()', function (assert) {
    var sf1 = Salesforce.getObject();
    assert.ok(sf1 instanceof SalesforceLib.Salesforce, 'returns SalesforceLib.Salesforce object');

    var sf2 = (new Salesforce()).getObject();
    assert.ok(sf2 instanceof SalesforceLib.Salesforce, 'returns SalesforceLib.Salesforce object');

    assert.equal(sf1, sf2, 'getObject() returns a same object');
  });
});

/* eslint func-names: ["error", "never"] */
