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

  var client = new SalesforceLib.Client(version, clientId, clientSecret);
  Salesforce.object = new SalesforceLib.API(client);
  Salesforce.object.client.oauth2.setCallback('sfAuthCallback');
  return Salesforce.object;
};

Salesforce.prototype.callback = function callback(request) {
  return this.getObject().callback(request);
};

Salesforce.prototype.getObject = function getObject() {
  return Salesforce.getObject();
};

Salesforce.prototype.show = function show() {
  SpreadsheetApp.getActive().show(this.getObject().doGet());
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^sfAuth(Callback|Show)$" }] */
