function sfAuthCallback(request) {
  return (new SFLib()).getOAuth2Client().callback(request);
}

function sfAuthReset() {
  (new SFLib()).getOAuth2Client().reset();
  SpreadsheetApp.getUi().alert('Logged out');
}

function sfAuthShow() {
  var html = SFLib.getInstance().getOAuth2Client().getAuthorizationHtml();
  SpreadsheetApp.getUi().showModalDialog(html, 'Authorization');
}

var Menu = function Menu() {
};

Menu.checkAuth = function checkAuth() {
  if (SFLib.getInstance().getClient().hasAccess()) {
    return true;
  }

  sfAuthShow();
  return false;
};

Menu.setup = function setup() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addSubMenu(
      ui.createMenu('Configuration')
        .addItem('Query', 'configQueryShow')
        .addItem('Schedule', 'configScheduleShow')
        .addItem('API', 'configApiShow')
        .addItem('Slack', 'configSlackShow')
    )
    .addItem('Fetch All', 'fetchAll')
    .addItem('Authenticate', 'sfAuthShow')
    .addItem('Logout', 'sfAuthReset')
    .addToUi();
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^sfAuth(Callback|Reset|Show)$" }] */
