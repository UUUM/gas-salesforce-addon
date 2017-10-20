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

/* eslint func-names: ["error", "never"] */
