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
  this.hasHeader = true;
};

Fetch.prototype.getConfig = function getConfig() {
  if (this.config) {
    return this.config;
  }

  this.config = (new ConfigQuery()).getJSON('config');
  return this.config;
};

Fetch.prototype.getQueryValues = function getQueryValues(config) {
  var values = [];
  var qb = (new SalesforceLib.QueryBuilder()).setupByParams(config.FetchBuilderParams);
  var fields = config.FetchBuilderParams.fields;

  var records = SFLib.getInstance().getAPI().query(qb.getQuery());
  if (records instanceof SalesforceLib.ResponseError) {
    throw records;
  }

  records.forEach(function f(record) {
    var value = [];
    for (var i = 0; i < fields.length; i++) {
      value.push(record.get(fields[i]));
    }
    values.push(value);
  });

  if (this.hasHeader && values.length > 0) {
    values.push(fields);
  }

  return values;
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
  var notifier = new Notifier();

  var values = this.getQueryValues(config);
  if (values.length < 1) {
    notifier.notify('@channel ' + config.SheetName + ' does not have any rows.');
    return this;
  }

  if (this.writeValues(config, values)) {
    notifier.notify(config.SheetName + ' was updated. (' + values.length + ' rows)');
  } else {
    notifier.notify('@channel ' + config.SheetName + ': Failed to write values.');
  }

  return this;
};

Fetch.prototype.writeValues = function writeValues(config, values) {
  var sheet = SpreadsheetUtil.createSheetByName(config.SheetName);
  if (!sheet) {
    return false;
  }

  sheet.clear();
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  return true;
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(fetchAll|triggerFetchAll)$" }] */
