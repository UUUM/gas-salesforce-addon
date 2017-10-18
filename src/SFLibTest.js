testRunner.functions.push(function (test, common) {
  test('new SFLib()', function (assert) {
    var sflib = new SFLib();
    assert.ok(sflib instanceof SFLib, 'creates an SFLib object');
  });

  test('SFLib.getInstance()', function (assert) {
    var sflib1 = SFLib.getInstance();
    assert.ok(sflib1 instanceof SFLib, 'returns an SFLib object');

    var sflib2 = SFLib.getInstance();
    assert.equal(sflib1, sflib2, 'returns a same object');
  });

  test('SFLib.getAPI()', function (assert) {
    var sflib = common.getSFLib();

    var api = sflib.getAPI();
    assert.ok(api instanceof SalesforceLib.API, 'returns SalesforceLib.API object');
  });

  test('SFLib.getClient()', function (assert) {
    var sflib = common.getSFLib();

    var client = sflib.getClient();
    assert.ok(client instanceof SalesforceLib.Client, 'returns SalesforceLib.Client object');
  });

  test('SFLib.getOAuth2Client()', function (assert) {
    var sflib = common.getSFLib();

    var oauth2client = sflib.getOAuth2Client();
    assert.ok(oauth2client instanceof SalesforceLib.OAuth2Client, 'returns SalesforceLib.OAuth2Client object');
  });
});

/* eslint func-names: ["error", "never"] */
