function querySheetAll() {
  return (new Query()).queryAll();
}


var Query = function Query() {
};

Query.prototype.getConfig = function getConfig() {
  if (this.config) {
    return this.config;
  }

  this.config = (new ConfigQuery()).getJSON('json');
  return this.config;
};

Query.prototype.query = function query(key) {
  this.queryByConfig(this.getConfig()[key]);
};

Query.prototype.queryAll = function queryAll() {
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

Query.prototype.queryByConfig = function queryByConfig(config) {
  var sf = Salesforce.getObject();
  var sheet = SpreadsheetApp.getActive().getSheetByName(config.SheetName);
  var qb = (new SalesforceLib.QueryBuilder()).setupByParams(config.QueryBuilderParams);
  (new SalesforceLib.Spreadsheet(sf, sheet, qb)).sync();
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^querySheetAll$" }] */
