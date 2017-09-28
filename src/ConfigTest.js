// test for Config()
testRunner.functions.push(function (test) {
  var orgProperties = Config.prototype.properties;
  Config.prototype.properties = PropertiesService.getUserProperties();

  test('new Config()', function (assert) {
    var config = new Config();
    assert.ok(config instanceof Config, 'creates a Config object');
    assert.equal(config.keyPrefix, 'sfAddon', 'has a keyPrefix property');
  });

  test('Config: CRUD', function (assert) {
    var config = new Config();

    // remove first
    assert.equal(config.remove('foo'), config, 'returns itself');
    assert.equal(config.get('foo'), null, 'returns null for an unset value');
    assert.equal(config.getProperties().getProperty('sfAddonFoo'), null, 'properties does not have a value');

    // set 'bar'
    assert.equal(config.set('foo', 'bar'), config, 'returns itself');
    assert.equal(config.get('foo'), 'bar', 'returns a valid value');
    assert.equal(config.getProperties().getProperty('sfAddonFoo'), 'bar', 'properties has a valid value');

    // set 'baz'
    assert.equal(config.set('foo', 'baz'), config, 'returns itself');
    assert.equal(config.get('foo'), 'baz', 'returns a valid value');
    assert.equal(config.getProperties().getProperty('sfAddonFoo'), 'baz', 'properties has a valid value');

    // remove again
    assert.equal(config.remove('foo'), config, 'returns itself');
    assert.equal(config.get('foo'), null, 'returns null for an unset value');
    assert.equal(config.getProperties().getProperty('sfAddonFoo'), null, 'properties does not have a value');
  });

  test('Config.getJSON()', function (assert) {
    var config = new Config();
    config.set('foo', '{"foo": "bar"}');
    assert.deepEqual(config.getJSON('foo'), {foo: 'bar'}, 'returns a valid object');
  });

  test('Config.getKey()', function (assert) {
    var config = new Config();
    assert.equal(config.getKey('foo'), 'sfAddonFoo', 'returns a valid key name');
  });

  Config.prototype.properties = orgProperties;
});


// test for ConfigApi()
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


// test for ConfigQuery()
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
