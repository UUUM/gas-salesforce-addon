// test for Config()
testRunner.functions.push(function (test) {
  var config;
  var properties;

  function setup() {
    properties = PropertiesService.getUserProperties();
    config = (new Config()).setProperties(properties);
  }

  test('new Config()', function (assert) {
    config = new Config();
    assert.ok(config instanceof Config, 'creates a Config object');
    assert.equal(config.keyPrefix, 'sfAddon', 'has a keyPrefix property');
  });

  test('Config: CRUD', function (assert) {
    setup();

    // remove first
    assert.equal(config.remove('foo'), config, 'returns itself');
    assert.equal(config.get('foo'), null, 'returns null for an unset value');
    assert.equal(properties.getProperty('sfAddonFoo'), null, 'properties does not have a value');

    // set 'bar'
    assert.equal(config.set('foo', 'bar'), config, 'returns itself');
    assert.equal(config.get('foo'), 'bar', 'returns a valid value');
    assert.equal(properties.getProperty('sfAddonFoo'), 'bar', 'properties has a valid value');

    // set 'baz'
    assert.equal(config.set('foo', 'baz'), config, 'returns itself');
    assert.equal(config.get('foo'), 'baz', 'returns a valid value');
    assert.equal(properties.getProperty('sfAddonFoo'), 'baz', 'properties has a valid value');

    // remove again
    assert.equal(config.remove('foo'), config, 'returns itself');
    assert.equal(config.get('foo'), null, 'returns null for an unset value');
    assert.equal(properties.getProperty('sfAddonFoo'), null, 'properties does not have a value');
  });

  test('Config.getJSON()', function (assert) {
    setup();

    config.set('foo', '{"foo": "bar"}');
    assert.deepEqual(config.getJSON('foo'), {foo: 'bar'}, 'returns a valid object');
  });

  test('Config.getKey()', function (assert) {
    setup();

    assert.equal(config.getKey('foo'), 'sfAddonFoo', 'returns a valid key name');
  });
});


// test for ConfigApi()
testRunner.functions.push(function (test) {
  var config;
  var properties;

  function setup() {
    properties = PropertiesService.getUserProperties();
    config = (new ConfigApi()).setProperties(properties);
  }

  test('new ConfigApi()', function (assert) {
    config = new ConfigApi();
    assert.ok(config instanceof ConfigApi, 'creates a ConfigApi object');
    assert.equal(config.keyPrefix, 'sfAddonApi', 'has a keyPrefix property');
  });

  test('ConfigApi.callback()', function (assert) {
    setup();

    assert.ok(config.callback('foo', 'bar', 'baz'), 'returns true');
    assert.equal(config.get('version'), 'foo', 'returns a version value');
    assert.equal(config.get('clientId'), 'bar', 'returns a clientId value');
    assert.equal(config.get('clientSecret'), 'baz', 'returns a clientSecret value');
  });
});


// test for ConfigQuery()
testRunner.functions.push(function (test) {
  var config;
  var properties;

  function setup() {
    properties = PropertiesService.getUserProperties();
    config = (new ConfigQuery()).setProperties(properties);
  }

  test('new ConfigQuery()', function (assert) {
    config = new ConfigQuery();
    assert.ok(config instanceof ConfigQuery, 'creates a ConfigQuery object');
    assert.equal(config.keyPrefix, 'sfAddonQuery', 'has a keyPrefix property');
  });

  test('ConfigQuery.callback()', function (assert) {
    setup();

    assert.ok(config.callback('{"foo": "bar"}'), 'returns true');
    assert.deepEqual(config.getJSON('json'), {foo: 'bar'}, 'returns a valid object');
  });
});

/* eslint func-names: ["error", "never"] */
