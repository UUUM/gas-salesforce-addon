function sfAuthCallback(request) {
  return (new SFLib()).getOAuth2Client().callback(request);
}

function sfAuthShow() {
  (new SFLib()).show();
}


var SFLib = function SFLib() {
};

SFLib.prototype.getAPI = function getAPI() {
  if (this.api) {
    return this.api;
  }

  this.api = new SalesforceLib.API(this.getClient());
  return this.api;
};

SFLib.prototype.getClient = function getClient() {
  if (this.client) {
    return this.client;
  }

  this.client = new SalesforceLib.Client((new ConfigApi()).get('version'), this.getOAuth2Client());
  return this.client;
};

SFLib.prototype.getOAuth2Client = function getOAuth2Client() {
  if (this.oauth2client) {
    return this.oauth2client;
  }

  var config = new ConfigApi();
  this.oauth2client = new SalesforceLib.OAuth2Client(config.get('clientId'), config.get('clientSecret'));
  return this.oauth2client;
};

SFLib.prototype.show = function show() {
  SpreadsheetApp.getActive().show(this.getOAuth2Client().doGet());
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^sfAuth(Callback|Show)$" }] */
