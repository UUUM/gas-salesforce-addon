function fetchAll() {
  if (!Menu.checkAuth()) {
    return;
  }
  (new Fetch()).queryAll();
}

function triggerFetchAll() {
  if (!triggerCheckAuth()) {
    return;
  }
  (new Fetch()).queryAll();
}


var Fetch = function Fetch() {
  this.row = 1;
  this.column = 1;
  this.hasHeader = true;
};

Fetch.prototype.getConfig = function getConfig() {
  if (this.config) {
    return this.config;
  }

  this.config = (new ConfigQuery()).getJSON('config');
  return this.config;
};

Fetch.prototype.query = function query(key) {
  this.queryByConfig(this.getConfig()[key]);
};

Fetch.prototype.queryAll = function queryAll() {
  var config = this.getConfig();
  for (var key in config) {
    if (!config.hasOwnProperty(key)) {
      continue;
    }

    this.queryByConfig(config[key]);
  }

  return this;
};

Fetch.prototype.queryByConfig = function queryByConfig(config) {
  var sheet = SpreadsheetUtil.createSheetByName(config.SheetName);
  var qb = (new SalesforceLib.QueryBuilder()).setupByParams(config.FetchBuilderParams);
  var fieldList = qb.fieldList;
  var fieldNum = fieldList.length;
  var row = this.row;
  var column = this.column;

  var records = SFLib.getInstance().getAPI().query(qb.getQuery());
  if (records instanceof SalesforceLib.ResponseError) {
    throw records;
  }

  if (this.hasHeader) {
    sheet.getRange(row, column, 1, fieldNum).setValues([fieldList]);
    row++;
  }

  records.forEach(function f(record) {
    var values = [];
    for (var i = 0; i < fieldNum; i++) {
      values[values.length] = record.get(fieldList[i]);
    }
    sheet.getRange(row, column, 1, fieldNum).setValues([values]);
    row++;
  });

  (new Notifier()).notify(config.SheetName + ' was updated. (' + row + ' rows)');

  return this;
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(fetchAll|triggerFetchAll)$" }] */
