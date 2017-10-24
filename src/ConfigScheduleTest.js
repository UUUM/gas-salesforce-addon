testRunner.functions.push(function (test) {
  var orgProperties = ConfigSchedule.prototype.properties;
  ConfigSchedule.prototype.properties = PropertiesService.getUserProperties();

  test('new ConfigSchedule()', function (assert) {
    var config = new ConfigSchedule();
    assert.ok(config instanceof ConfigSchedule, 'creates a ConfigSchedule object');
    assert.equal(config.keyPrefix, 'sfAddonSchedule', 'has a keyPrefix property');
  });

  test('ConfigSchedule.createClockTrigger()', function (assert) {
    var config = new ConfigSchedule();

    assert.notOk(config.createClockTrigger('none'));

    var trigger = config.createClockTrigger('hourly');
    assert.ok(Obj.isGASObject(trigger, 'Trigger'), 'returns a Trigger object');
    assert.equal(trigger.getEventType(), ScriptApp.EventType.CLOCK, 'is a clock trigger');
    assert.equal(trigger.getHandlerFunction(), config.triggerFunction, 'has a valid handler function');
    assert.equal(trigger.getTriggerSource(), ScriptApp.TriggerSource.CLOCK, 'is a clock trigger');
    ScriptApp.deleteTrigger(trigger);
  });

  ConfigSchedule.prototype.properties = orgProperties;
});

/* eslint func-names: ["error", "never"] */
