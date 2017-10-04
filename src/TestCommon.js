function doGet(e) {
  (new TestCommon()).initialize();

  var sf = Salesforce.getObject();
  sf.client.oauth2.setCallback('authCallback');
  return sf.doGet(e);
}

function authCallback(request) {
  (new TestCommon()).initialize();
  return Salesforce.getObject().callback(request);
}


var TestCommon = function TestCommon() {
  this.initialize();
};

TestCommon.prototype.initialize = function getSpreadsheet() {
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
