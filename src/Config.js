function configApiCallback(version, clientId, clientSecret) {
  (new ConfigApi()).callback(version, clientId, clientSecret);
}

function configApiShow() {
  (new ConfigApi()).show();
}

function configSheetCallback(json) {
  (new ConfigSheet()).callback(json);
}

function configSheetShow() {
  (new ConfigSheet()).show();
}


var Config = function Config() {
  this.keyPrefix = 'sfAddon';
  this.properties = PropertiesService.getDocumentProperties();
};

Config.prototype.get = function get(key) {
  return this.properties.getProperty(this.getKey(key));
};

Config.prototype.getJSON = function getJSON(key) {
  var value = this.get(key);
  return JSON.parse(value);
};

Config.prototype.getKey = function getKey(key) {
  return this.keyPrefix + key[0].toUpperCase() + key.substring(1);
};

Config.prototype.set = function set(key, value) {
  this.properties.setProperty(this.getKey(key), value);
  return this;
};


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
};

ConfigApi.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configApi');
  template.version = this.get('version');
  template.clientId = this.get('clientId');
  template.clientSecret = this.get('clientSecret');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'API Configuration');
};


var ConfigSheet = function ConfigSheet() {
  Config.call(this);
  this.keyPrefix += 'Sheet';
};

ConfigSheet.prototype = Object.create(Config.prototype);
ConfigSheet.prototype.constructor = ConfigSheet;

ConfigSheet.prototype.callback = function callback(json) {
  this.set('json', json);
};

ConfigSheet.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configSheet');
  template.json = this.get('json');

  var output = template.evaluate();
  output.setWidth(700);
  output.setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(output, 'Sheet Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(config(Api|Sheet)(Callback|Show))$" }] */
