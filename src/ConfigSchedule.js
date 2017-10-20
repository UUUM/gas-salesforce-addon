function configScheduleCallback(schedule) {
  (new ConfigSchedule()).callback(schedule);
}

function configScheduleShow() {
  (new ConfigSchedule()).show();
}


var ConfigSchedule = function ConfigSchedule() {
  Config.call(this);
  this.keyPrefix += 'Schedule';
  this.triggerFunction = 'triggerFetchAll';
};

ConfigSchedule.prototype = Object.create(Config.prototype);
ConfigSchedule.prototype.constructor = ConfigSchedule;

ConfigSchedule.prototype.callback = function callback(schedule) {
  if (!this.setupTrigger(schedule)) {
    return false;
  }

  this.set('schedule', schedule);
  return true;
};

ConfigSchedule.prototype.createTrigger = function createTrigger(schedule) {
  var trigger = ScriptApp.newTrigger(this.triggerFunction).timeBased();
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
    return false;
  }
  trigger.create();
  return true;
};

ConfigSchedule.prototype.removeTrigger = function removeTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];

    if (trigger.getEventType() !== ScriptApp.EventType.CLOCK) {
      continue;
    }

    if (trigger.getHandlerFunction() !== this.triggerFunction) {
      continue;
    }

    if (trigger.getTriggerSourceId() !== SpreadsheetApp.getActive().getId()) {
      continue;
    }

    ScriptApp.deleteTrigger(trigger);
    return true;
  }

  return false;
};

ConfigSchedule.prototype.setupTrigger = function setupTrigger(schedule) {
  switch (schedule) {
  case 'none':
    return this.removeTrigger();
  case 'hourly':
  case 'daily':
  case 'weekly':
    return this.createTrigger(schedule);
  default:
    return false;
  }
};

ConfigSchedule.prototype.show = function show() {
  var template = HtmlService.createTemplateFromFile('configSchedule');
  template.schedule = this.get('schedule');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate(), 'Schedule Configuration');
};

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^(configSchedule(Callback|Show))$" }] */
