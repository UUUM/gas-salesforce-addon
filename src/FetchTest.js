testRunner.functions.push(function (test, common) {
  var config = {
    Opportunity: {
      SheetName: 'Opportunity',
      FetchBuilderParams: {
        from: 'Opportunity',
        fields: [
          'Id',
          'Name',
          'Account.Id',
          'Account.Name'
        ],
        limit: 10
      }
    }
  };
  (new ConfigQuery()).callback(JSON.stringify(config));

  test('new Fetch()', function (assert) {
    var fetch = new Fetch();
    assert.ok(fetch instanceof Fetch, 'creates a Fetch object');
    assert.ok(fetch.hasHeader, 'has a hasHeader property');
  });

  test('Fetch.getConfig()', function (assert) {
    var fetch = common.getFetch();

    var config1 = fetch.getConfig();
    assert.ok(Obj.isObject(config1), 'returns an object');

    var config2 = fetch.getConfig();
    assert.equal(config1, config2, 'returns a same object');
  });

  test('Fetch.queryByConfig()', function (assert) {
    var fetch = common.getFetch();
    assert.equal(fetch.queryByConfig(config.Opportunity), fetch, 'returns itself');
  });
});

/* eslint func-names: ["error", "never"] */
