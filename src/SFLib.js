var SFLib = function SFLib() {
};

SFLib.getInstance = function getInstance() {
  if (this.object) {
    return this.object;
  }

  this.object = new SFLib();
  return this.object;
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
