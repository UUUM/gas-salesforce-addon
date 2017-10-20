function configQueryCallback(json) {
  (new ConfigQuery()).callback(json);
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

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(configQuery(Callback|Show))$" }] */
