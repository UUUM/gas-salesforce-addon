testRunner.functions.push(function (test) {
  var orgProperties = ConfigApi.prototype.properties;
  ConfigApi.prototype.properties = PropertiesService.getUserProperties();

  test('new ConfigApi()', function (assert) {
    var config = new ConfigApi();
    assert.ok(config instanceof ConfigApi, 'creates a ConfigApi object');
    assert.equal(config.keyPrefix, 'sfAddonApi', 'has a keyPrefix property');
  });

  test('ConfigApi.callback()', function (assert) {
    var config = new ConfigApi();
    assert.ok(config.callback('foo', 'bar', 'baz'), 'returns true');
    assert.equal(config.get('version'), 'foo', 'returns a version value');
    assert.equal(config.get('clientId'), 'bar', 'returns a clientId value');
    assert.equal(config.get('clientSecret'), 'baz', 'returns a clientSecret value');
  });

  ConfigApi.prototype.properties = orgProperties;
});

/* eslint func-names: ["error", "never"] */
