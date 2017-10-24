function configScheduleCallback(schedule) {
  (new ConfigSchedule()).callback(schedule);
}

function configScheduleShow() {
  (new ConfigSchedule()).show();
}


var ConfigSchedule = function ConfigSchedule() {
  Config.call(this);
  this.keyPrefix += 'Schedule';

  if (!this.triggerFunction) {
    this.triggerFunction = 'triggerFetchAll';
  }
};

ConfigSchedule.prototype = Object.create(Config.prototype);
ConfigSchedule.prototype.constructor = ConfigSchedule;

ConfigSchedule.prototype.callback = function callback(schedule) {
  if (!this.setupClockTrigger(schedule)) {
    throw new Error('Failed to create a clock trigger');
  }

  this.set('schedule', schedule);
};

ConfigSchedule.prototype.createClockTrigger = function createClockTrigger(schedule) {
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
  return trigger.create();
};

ConfigSchedule.prototype.getClockTriggers = function getClockTriggers() {
  var timeTriggers = [];

  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];

    if (trigger.getEventType() !== ScriptApp.EventType.CLOCK) {
      continue;
    }

    if (trigger.getHandlerFunction() !== this.triggerFunction) {
      continue;
    }

    if (trigger.getTriggerSourceId() !== SpreadsheetUtil.getSpreadsheet().getId()) {
      continue;
    }

    timeTriggers.push(trigger);
  }

  return timeTriggers;
};

ConfigSchedule.prototype.removeClockTriggers = function removeClockTriggers() {
  var triggers = this.getClockTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
};

ConfigSchedule.prototype.setupClockTrigger = function setupClockTrigger(schedule) {
  switch (schedule) {
  case 'none':
    this.removeClockTriggers();
    return true;
  case 'hourly':
  case 'daily':
  case 'weekly':
    this.removeClockTriggers();
    return this.createClockTrigger(schedule);
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
