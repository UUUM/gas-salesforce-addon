function configApiShow() {
  var config = new Config();
  var template = HtmlService.createTemplateFromFile('configApi');
  template.version = config.get('apiVersion');
  template.clientId = config.get('apiClientId');
  template.clientSecret = config.get('apiClientSecret');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'API Configuration');
}

function configApiUpdate(version, clientId, clientSecret) {
  (new Config())
    .set('apiVersion', version)
    .set('apiClientId', clientId)
    .set('apiClientSecret', clientSecret);
  return true;
}

var Config = function Config() {
  this.keyPrefix = 'sfAddon';
  this.properties = PropertiesService.getDocumentProperties();
};

Config.prototype.get = function get(key) {
  return this.properties.getProperty(this.getKey(key));
};

Config.prototype.getKey = function getKey(key) {
  return this.keyPrefix + key[0].toUpperCase() + key.substring(1);
};

Config.prototype.set = function set(key, value) {
  this.properties.setProperty(this.getKey(key), value);
  return this;
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(config(Api)(Show|Update))$" }] */
