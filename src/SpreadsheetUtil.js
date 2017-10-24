var SpreadsheetUtil = function SpreadsheetUtil() {
};

SpreadsheetUtil.createSheetByName = function createSheetByName(sheetName) {
  var ss = SpreadsheetUtil.getSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    return sheet;
  }
  return ss.insertSheet(sheetName);
};

SpreadsheetUtil.getSpreadsheet = function getSpreadsheet() {
  if (SpreadsheetUtil.ss) {
    return SpreadsheetUtil.ss;
  }

  if (SpreadsheetUtil.id) {
    SpreadsheetUtil.ss = SpreadsheetApp.openById(SpreadsheetUtil.id);
  } else {
    SpreadsheetUtil.ss = SpreadsheetApp.getActive();
  }
  return SpreadsheetUtil.ss;
};
