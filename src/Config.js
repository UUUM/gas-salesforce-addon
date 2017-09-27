function configApiCallback(version, clientId, clientSecret) {
  (new ConfigApi()).callback(version, clientId, clientSecret);
}

function configApiShow() {
  (new ConfigApi()).show();
}

function configQueryCallback(json) {
  (new ConfigQuery()).callback(json);
}

function configQueryShow() {
  (new ConfigQuery()).show();
}


var Config = function Config() {
  this.keyPrefix = 'sfAddon';
  this.setProperties(PropertiesService.getDocumentProperties());
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

Config.prototype.getProperties = function getProperties() {
  return this.properties;
};

Config.prototype.remove = function remove(key) {
  this.properties.deleteProperty(this.getKey(key));
  return this;
};

Config.prototype.set = function set(key, value) {
  this.properties.setProperty(this.getKey(key), value);
  return this;
};

Config.prototype.setProperties = function setProperties(properties) {
  this.properties = properties;
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
  return true;
};

ConfigApi.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configApi');
  template.version = this.get('version');
  template.clientId = this.get('clientId');
  template.clientSecret = this.get('clientSecret');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'API Configuration');
};


var ConfigQuery = function ConfigQuery() {
  Config.call(this);
  this.keyPrefix += 'Query';
};

ConfigQuery.prototype = Object.create(Config.prototype);
ConfigQuery.prototype.constructor = ConfigQuery;

ConfigQuery.prototype.callback = function callback(json) {
  this.set('json', json);
  return true;
};

ConfigQuery.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configQuery');
  template.json = this.get('json');

  var output = template.evaluate();
  output.setWidth(700);
  output.setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(output, 'Query Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(config(Api|Query)(Callback|Show))$" }] */
