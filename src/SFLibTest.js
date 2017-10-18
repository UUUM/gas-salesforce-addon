testRunner.functions.push(function (test, common) {
  test('new SFLib()', function (assert) {
    var sflib = new SFLib();
    assert.ok(sflib instanceof SFLib, 'creates an SFLib object');
  });

  test('SFLib.getAPI()', function (assert) {
    var sflib = common.getSFLib();

    var api = sflib.getAPI();
    assert.ok(api instanceof SalesforceLib.API, 'returns SalesforceLib.API object');
  });
});

/* eslint func-names: ["error", "never"] */
