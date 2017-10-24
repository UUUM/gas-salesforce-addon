function doGet() {
  var oauth2client = (new TestCommon()).getSFLib().getOAuth2Client();
  oauth2client.setCallback('authCallback');
  return oauth2client.getAuthorizationHtml();
}

function authCallback(request) {
  return (new TestCommon()).getSFLib().getOAuth2Client().callback(request);
}


var TestCommon = function TestCommon() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var userProperties = PropertiesService.getUserProperties();
  Config.prototype.properties = userProperties;
  ConfigApi.prototype.properties = scriptProperties;
  ConfigQuery.prototype.properties = userProperties;
  ConfigSchedule.prototype.properties = userProperties;
  ConfigSlack.prototype.properties = userProperties;

  SpreadsheetUtil.id = scriptProperties.getProperty('spreadsheetId');

  // clear slack setting
  (new ConfigSlack()).remove('webhookUrl');
};

TestCommon.prototype.getFetch = function getFetch() {
  if (this.fetch) {
    return this.fetch;
  }

  this.fetch = new Fetch();
  return this.fetch;
};

TestCommon.prototype.getSFLib = function getSFLib() {
  return SFLib.getInstance();
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(doGet|authCallback)$" }] */
