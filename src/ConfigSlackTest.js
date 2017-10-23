testRunner.functions.push(function (test) {
  var orgProperties = ConfigSlack.prototype.properties;
  ConfigSlack.prototype.properties = PropertiesService.getUserProperties();

  test('new ConfigSlack()', function (assert) {
    var config = new ConfigSlack();
    assert.ok(config instanceof ConfigSlack, 'creates a ConfigSlack object');
    assert.equal(config.keyPrefix, 'sfAddonSlack', 'has a keyPrefix property');
  });

  test('ConfigSlack.callback()', function (assert) {
    var config = new ConfigSlack();
    assert.ok(config.callback('foo'), 'returns true');
    assert.equal(config.get('webhookUrl'), 'foo', 'returns a webhookUrl value');
  });

  // clear slack setting
  (new ConfigSlack()).remove('webhookUrl');

  ConfigSlack.prototype.properties = orgProperties;
});

/* eslint func-names: ["error", "never"] */
