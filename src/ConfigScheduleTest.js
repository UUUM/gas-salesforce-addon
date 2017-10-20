testRunner.functions.push(function (test) {
  var orgProperties = ConfigSchedule.prototype.properties;
  ConfigSchedule.prototype.properties = PropertiesService.getUserProperties();

  test('new ConfigSchedule()', function (assert) {
    var config = new ConfigSchedule();
    assert.ok(config instanceof ConfigSchedule, 'creates a ConfigSchedule object');
    assert.equal(config.keyPrefix, 'sfAddonSchedule', 'has a keyPrefix property');
  });

  test('ConfigSchedule.callback()', function (assert) {
    var config = new ConfigSchedule();
    assert.ok(config.callback('foo'), 'returns true');
    assert.equal(config.get('schedule'), 'foo', 'returns a schedule value');
  });

  ConfigSchedule.prototype.properties = orgProperties;
});

/* eslint func-names: ["error", "never"] */
