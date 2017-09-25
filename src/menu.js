function addMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addSubMenu(
      ui.createMenu('Configuration')
        .addItem('Query', 'configQueryShow')
        .addItem('API', 'configApiShow')
    )
    .addItem('Fetch All', 'fetchAll')
    .addItem('Authenticate', 'sfAuthShow')
    .addItem('Schedule', 'schedule')
    .addToUi();
}

function schedule() {
  ScriptApp.newTrigger('fetchAll')
    .timeBased()
    .everyHours(1)
    .create();
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(addMenu|schedule)$" }] */
