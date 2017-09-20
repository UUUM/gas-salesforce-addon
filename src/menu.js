function addMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addSubMenu(
      ui.createMenu('Configuration')
        .addItem('sheet', 'menuConfigurationSheet')
        .addItem('schedule', 'menuConfigurationSchedule')
        .addItem('API', 'configApiShow')
    )
    .addItem('Authenticate', 'menuAuthenticate')
    .addToUi();
}

function menuAuthenticate() {
}

function menuConfigurationSchedule() {
}

function menuConfigurationSheet() {
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(addMenu|menu(Authenticate|Configuration(API|Schedule|Sheet)))$" }] */
