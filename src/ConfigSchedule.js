function configScheduleCallback(schedule) {
  (new ConfigSchedule()).callback(schedule);
}

function configScheduleShow() {
  (new ConfigSchedule()).show();
}


var ConfigSchedule = function ConfigSchedule() {
  Config.call(this);
  this.keyPrefix += 'Schedule';
};

ConfigSchedule.prototype = Object.create(Config.prototype);
ConfigSchedule.prototype.constructor = ConfigSchedule;

ConfigSchedule.prototype.callback = function callback(schedule) {
  this.createTrigger(schedule);
  this.set('schedule', schedule);
  return true;
};

ConfigSchedule.prototype.createTrigger = function createTrigger(schedule) {
  var trigger = ScriptApp.newTrigger('triggerFetchAll').timeBased();
  switch (schedule) {
  case 'hourly':
    trigger.everyHours(1);
    break;
  case 'daily':
    trigger.everyDays(1);
    break;
  case 'weekly':
    trigger.everyWeeks(1);
    break;
  default:
    return null;
  }
  return trigger.create();
};

ConfigSchedule.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configSchedule');
  template.schedule = this.get('schedule');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'Schedule Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(configSchedule(Callback|Show))$" }] */
