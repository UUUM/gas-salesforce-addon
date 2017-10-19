function onOpen() {
  Menu.setupAddon();
}

function onInstall(e) {
  onOpen(e);
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^onInstall$" }] */
