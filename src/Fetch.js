function fetchAll() {
  return (new Fetch()).queryAll();
}


var Fetch = function Fetch() {
};

Fetch.prototype.getConfig = function getConfig() {
  if (this.config) {
    return this.config;
  }

  this.config = (new ConfigQuery()).getJSON('json');
  return this.config;
};

Fetch.prototype.query = function query(key) {
  this.queryByConfig(this.getConfig()[key]);
};

Fetch.prototype.queryAll = function queryAll() {
  var config = this.getConfig();
  Logger.log(config);
  for (var key in config) {
    if (!config.hasOwnProperty(key)) {
      continue;
    }

    this.queryByConfig(config[key]);
  }

  return this;
};

Fetch.prototype.queryByConfig = function queryByConfig(config) {
  var sf = Salesforce.getObject();
  var sheet = SpreadsheetApp.getActive().getSheetByName(config.SheetName);
  var qb = (new SalesforceLib.FetchBuilder()).setupByParams(config.FetchBuilderParams);
  (new Spreadsheet(sf, sheet, qb)).sync();
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^fetchAll$" }] */
