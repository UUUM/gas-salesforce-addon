function configQueryCallback(config) {
  (new ConfigQuery()).callback(config);
}

function configQueryShow() {
  (new ConfigQuery()).show();
}


var ConfigQuery = function ConfigQuery() {
  Config.call(this);
  this.keyPrefix += 'Query';
};

ConfigQuery.prototype = Object.create(Config.prototype);
ConfigQuery.prototype.constructor = ConfigQuery;

ConfigQuery.prototype.callback = function callback(config) {
  this.set('config', this.validateConfig(config));
  return true;
};

ConfigQuery.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configQuery');
  template.config = this.get('config');

  var output = template.evaluate();
  output.setWidth(700);
  output.setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(output, 'Query Configuration');
};

ConfigQuery.prototype.validateConfig = function validateConfig(configJson) {
  var config = this.validateJson(configJson);
  if (!Obj.isObject(config)) {
    throw new Error('Query Configuration must be an object');
  }

  for (var key in config) {
    if (!config.hasOwnProperty(key)) {
      continue;
    }
    this.validateConfigValue(key, config[key]);
  }

  return configJson;
};

ConfigQuery.prototype.validateConfigValue = function validateConfigValue(key, config) {
  // SheetName
  if (!config.hasOwnProperty('SheetName')) {
    throw new Error('"' + key + '" does not have "SheetName" property');
  }
  if (!Obj.isString(config.SheetName) || config.SheetName.length < 1) {
    throw new Error('"' + key + '.SheetName" must be a String');
  }

  // FetchBuilderParams
  if (!config.hasOwnProperty('FetchBuilderParams')) {
    throw new Error('"' + key + '" does not have "FetchBuilderParams" property');
  }
  if (!Obj.isObject(config.FetchBuilderParams)) {
    throw new Error('"' + key + '.FetchBuilderParams" must be an Object');
  }
};

ConfigQuery.prototype.validateJson = function validateJson(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('JSON Syntax Error');
    }
    throw error;
  }
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(configQuery(Callback|Show))$" }] */
