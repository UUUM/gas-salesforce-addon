function addMenu() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addSubMenu(
      ui.createMenu('Configuration')
        .addItem('Query', 'configQueryShow')
        .addItem('API', 'configApiShow')
    )
    .addItem('Query All', 'querySheetAll')
    .addItem('Authenticate', 'sfAuthShow')
    .addToUi();
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(addMenu|menu(Authenticate|Configuration(API|Schedule|Sheet)))$" }] */
