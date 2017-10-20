testRunner.functions.push(function (test) {
  var orgProperties = ConfigQuery.prototype.properties;
  ConfigQuery.prototype.properties = PropertiesService.getUserProperties();

  test('new ConfigQuery()', function (assert) {
    var config = new ConfigQuery();
    assert.ok(config instanceof ConfigQuery, 'creates a ConfigQuery object');
    assert.equal(config.keyPrefix, 'sfAddonQuery', 'has a keyPrefix property');
  });

  test('ConfigQuery.callback()', function (assert) {
    var config = new ConfigQuery();
    assert.ok(config.callback('{"foo": "bar"}'), 'returns true');
    assert.deepEqual(config.getJSON('json'), {foo: 'bar'}, 'returns a valid object');
  });

  ConfigQuery.prototype.properties = orgProperties;
});

/* eslint func-names: ["error", "never"] */
