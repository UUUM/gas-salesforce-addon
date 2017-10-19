var Menu = function Menu() {
};

Menu.setup = function setup() {
  if (SFLib.getInstance().getClient().hasAccess()) {
    Menu.setupAddon();
  } else {
    Menu.setupAuth();
  }
};

Menu.setupAddon = function setupAddon() {
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
};

Menu.setupAuth = function setMenuAuth() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addItem('Authenticate', 'sfAuthShow')
    .addToUi();
};
