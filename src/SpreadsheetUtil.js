var SpreadsheetUtil = function SpreadsheetUtil() {
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
