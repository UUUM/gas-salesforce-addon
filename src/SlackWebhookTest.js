testRunner.functions.push(function (test) {
  var webhookUrl = 'https://example.com';

  test('new SlackWebhook()', function (assert) {
    assert.throws(
      function () {
        return new SlackWebhook();
      },
      'throws an exception if webhookUrl was not a string'
    );

    var slack = new SlackWebhook(webhookUrl);
    assert.ok(slack instanceof SlackWebhook, 'creates a SlackWebhook object');
  });
});

/* eslint func-names: ["error", "never"] */
