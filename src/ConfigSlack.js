function configSlackCallback(webhookUrl) {
  (new ConfigSlack()).callback(webhookUrl);
}

function configSlackShow() {
  (new ConfigSlack()).show();
}


var ConfigSlack = function ConfigSlack() {
  Config.call(this);
  this.keyPrefix += 'Slack';
};

ConfigSlack.prototype = Object.create(Config.prototype);
ConfigSlack.prototype.constructor = ConfigSlack;

ConfigSlack.prototype.callback = function callback(webhookUrl) {
  this.set('webhookUrl', webhookUrl);
  return true;
};

ConfigSlack.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configSlack');
  template.webhookUrl = this.get('webhookUrl');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'Slack Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(configSlack(Callback|Show))$" }] */

