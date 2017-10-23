function onOpen() {
  Menu.setup();
}

function onInstall(e) {
  onOpen(e);
}

function triggerCheckAuth() {
  if (SFLib.getInstance().getClient().hasAccess()) {
    return true;
  }

  (new Notifier()).notify('@channel Salesforce refresh token was expired!!');
  return false;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(onInstall|triggerCheckAuth)$" }] */
