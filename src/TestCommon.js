function doGet(e) {
  return (new TestCommon()).createSalesforce().doGet(e);
}

function authCallback(request) {
  return (new TestCommon()).createSalesforce().callback(request);
}


var TestCommon = function TestCommon() {
  var properties = PropertiesService.getScriptProperties();

  this.apiVersion = properties.getProperty('apiVersion');
  this.apiClientId = properties.getProperty('apiClientId');
  this.apiClientSecret = properties.getProperty('apiClientSecret');
  this.spreadsheetId = properties.getProperty('spreadsheetId');
};

TestCommon.prototype.createSalesforce = function createSalesforce() {
  return new SalesforceLib.Salesforce(this.apiVersion, this.apiClientId, this.apiClientSecret);
};

TestCommon.prototype.getSpreadsheet = function getSpreadsheet() {
  return SpreadsheetApp.openById(this.spreadsheetId);
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(doGet|authCallback)$" }] */
