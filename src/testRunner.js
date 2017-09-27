function testRunner() {
  var test = new GasTap();

  var properties = PropertiesService.getUserProperties();
  Config.prototype.properties = properties;
  ConfigApi.prototype.properties = properties;
  ConfigQuery.prototype.properties = properties;

  var functions = testRunner.functions;
  for (var i = 0; i < functions.length; i++) {
    try {
      functions[i](test);
    } catch (error) {
      test('Exception occurred', function f(assert) {
        Logger.log(error);
        assert.fail(error);
      });
    }
  }

  test.finish();
}

testRunner.functions = [];
