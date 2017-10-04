testRunner.functions.push(function (test) {
  var config = {
    Opportunity: {
      from: 'Opportunity',
      fields: [
        'Id',
        'Name',
        'Account.Id',
        'Account.Name'
      ],
      limit: 10
    }
  };
  (new ConfigQuery()).callback(JSON.stringify(config));

  test('new Fetch()', function (assert) {
    var fetch = new Fetch();
    assert.ok(fetch instanceof Fetch, 'creates a Fetch object');
    assert.equal(fetch.column, 1, 'has a column property');
    assert.ok(fetch.hasHeader, 'has a hasHeader property');
    assert.equal(fetch.row, 1, 'has a row property');
  });

  test('Fetch.getConfig()', function (assert) {
    var fetch = new Fetch();

    var config1 = fetch.getConfig();
    assert.ok(Obj.isObject(config1), 'returns an object');

    var config2 = fetch.getConfig();
    assert.equal(config1, config2, 'returns a same object');
  });
});

/* eslint func-names: ["error", "never"] */
