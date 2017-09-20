function sfAuthCallback(request) {
  return (new Salesforce()).callback(request);
}

function sfAuthShow() {
  (new Salesforce()).show();
}


var Salesforce = function Salesforce() {
};

Salesforce.getObject = function getObject() {
  if (Salesforce.object) {
    return Salesforce.object;
  }

  var config = new ConfigApi();
  var version = config.get('version');
  var clientId = config.get('clientId');
  var clientSecret = config.get('clientSecret');
  Salesforce.object = new SalesforceLib.Salesforce(version, clientId, clientSecret);
  return Salesforce.object;
};

Salesforce.prototype.callback = function callback(request) {
  return this.getObject().callback(request);
};

Salesforce.prototype.getObject = function getObject() {
  return Salesforce.getObject();
};

Salesforce.prototype.show = function show() {
  var sf = this.getObject();
  sf.client.oauth2.setCallback('sfAuthCallback');
  SpreadsheetApp.getActive().show(sf.doGet());
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^sfAuth(Callback|Show)$" }] */
