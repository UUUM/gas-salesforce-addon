var Notifier = function Notifier() {
  var webhookUrl = (new ConfigSlack()).get('webhookUrl');
  if (webhookUrl) {
    this.slackWebhook = new SlackWebhook(webhookUrl);
  }
};

Notifier.prototype.notify = function notify(text) {
  if (this.slackWebhook) {
    this.slackWebhook.send(text);
  }
};
