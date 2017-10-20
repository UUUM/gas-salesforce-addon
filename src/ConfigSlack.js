function configSlackCallback(webhookUrl) {
  Logger.log('configSlackCallback');
  Logger.log(webhookUrl);
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
  Logger.log('callback');
  Logger.log(webhookUrl);
  this.set('webhookUrl', webhookUrl);
  Logger.log(this.get('webhookUrl'));
  return true;
};

ConfigSlack.prototype.show = function show() {
  Logger.log('show');
  Logger.log(this.get('webhookUrl'));
  var template = HtmlService.createTemplateFromFile('configSlack');
  template.webhookUrl = this.get('webhookUrl');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'Slack Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(configSlack(Callback|Show))$" }] */

