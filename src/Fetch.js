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

Fetch.prototype.getRowValues = function getRowValues(records, fieldList) {
  var rowValues = [];
  records.forEachNoFetch(function f(record) {
    var rowValue = [];
    for (var i = 0; i < fieldList.length; i++) {
      rowValue.push(record.get(fieldList[i]));
    }
    rowValues.push(rowValue);
  });
  return rowValues;
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

  for (;;) {
    var rowValues = this.getRowValues(records, fieldList);
    sheet.getRange(row, column, rowValues.length, fieldNum).setValues(rowValues);
    row += rowValues.length;

    if (!records.fetchNext()) {
      break;
    }
  }

  (new Notifier()).notify(config.SheetName + ' was updated. (' + row + ' rows)');

  return this;
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(fetchAll|triggerFetchAll)$" }] */
