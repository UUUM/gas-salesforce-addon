function configApiCallback(version, clientId, clientSecret) {
  (new ConfigApi()).callback(version, clientId, clientSecret);
}

function configApiShow() {
  (new ConfigApi()).show();
}


var ConfigApi = function ConfigApi() {
  Config.call(this);
  this.keyPrefix += 'Api';
};

ConfigApi.prototype = Object.create(Config.prototype);
ConfigApi.prototype.constructor = ConfigApi;

ConfigApi.prototype.callback = function callback(version, clientId, clientSecret) {
  this.set('version', version);
  this.set('clientId', clientId);
  this.set('clientSecret', clientSecret);
  return true;
};

ConfigApi.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configApi');
  template.version = this.get('version');
  template.clientId = this.get('clientId');
  template.clientSecret = this.get('clientSecret');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'API Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(configApi(Callback|Show))$" }] */
