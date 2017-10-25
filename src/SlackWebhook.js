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
  var payload = {
    link_names: 1,
    text: text
  };
  var option = Obj.merge(this.option, {
    method: 'post',
    payload: JSON.stringify(payload)
  });
  return UrlFetchApp.fetch(this.webhookUrl, option);
};
