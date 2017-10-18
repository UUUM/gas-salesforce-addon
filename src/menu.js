function addMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addSubMenu(
      ui.createMenu('Configuration')
        .addItem('Query', 'configQueryShow')
        .addItem('Schedule', 'configScheduleShow')
        .addItem('API', 'configApiShow')
    )
    .addItem('Fetch All', 'fetchAll')
    .addItem('Authenticate', 'sfAuthShow')
    .addToUi();
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(addMenu)$" }] */
