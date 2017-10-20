var SlackWebhook = function SlackWebhook(webhookUrl) {
  if (!Obj.isString(webhookUrl) || webhookUrl.length < 1) {
    throw new Error('webhookUrl must be specified');
  }
  this.webhookUrl = webhookUrl;

  this.option = {
    contentType: 'application/json',
    muteHttpExceptions: true
  };
};

SlackWebhook.prototype.send = function send(text) {
  var option = Obj.merge(this.option, {
    method: 'post',
    payload: JSON.stringify({ text: text })
  });
  return UrlFetchApp.fetch(this.webhookUrl, option);
};
