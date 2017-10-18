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

function configScheduleCallback(schedule) {
  (new ConfigSchedule()).callback(schedule);
}

function configScheduleShow() {
  (new ConfigSchedule()).show();
}


var Config = function Config() {
  this.keyPrefix = 'sfAddon';

  if (!this.getProperties()) {
    this.setProperties(PropertiesService.getDocumentProperties());
  }
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


var ConfigSchedule = function ConfigSchedule() {
  Config.call(this);
  this.keyPrefix += 'Schedule';
};

ConfigSchedule.prototype = Object.create(Config.prototype);
ConfigSchedule.prototype.constructor = ConfigSchedule;

ConfigSchedule.prototype.callback = function callback(schedule) {
  this.createTrigger(schedule);
  this.set('schedule', schedule);
  return true;
};

ConfigSchedule.prototype.createTrigger = function createTrigger(schedule) {
  var trigger = ScriptApp.newTrigger('fetchAll').timeBased();
  switch (schedule) {
  case 'hourly':
    trigger.everyHours(1);
    break;
  case 'daily':
    trigger.everyDays(1);
    break;
  case 'weekly':
    trigger.everyWeeks(1);
    break;
  default:
    return null;
  }
  return trigger.create();
};

ConfigSchedule.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configSchedule');
  template.schedule = this.get('schedule');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'Schedule Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(config(Api|Query|Schedule)(Callback|Show))$" }] */
