function doGet(e) {
  return (new TestCommon()).createSalesforce().doGet(e);
}

function authCallback(request) {
  return (new TestCommon()).createSalesforce().callback(request);
}


var TestCommon = function TestCommon() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var userProperties = PropertiesService.getUserProperties();
  Config.prototype.properties = userProperties;
  ConfigApi.prototype.properties = scriptProperties;
  ConfigQuery.prototype.properties = userProperties;

  this.spreadsheetId = scriptProperties.getProperty('spreadsheetId');
};

TestCommon.prototype.getSpreadsheet = function getSpreadsheet() {
  if (this.ss) {
    return this.ss;
  }

  this.ss = SpreadsheetApp.openById(this.spreadsheetId);
  return this.ss;
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(doGet|authCallback)$" }] */
