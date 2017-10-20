var Config = function Config() {
  this.keyPrefix = 'sfAddon';

  if (!this.getProperties()) {
    this.setProperties(PropertiesService.getDocumentProperties());
  }
};

Config.prototype.get = function get(key) {
  return this.properties.getProperty(this.getKey(key));
};

Config.prototype.getJSON = function getJSON(key) {
  var value = this.get(key);
  return JSON.parse(value);
};

Config.prototype.getKey = function getKey(key) {
  return this.keyPrefix + key[0].toUpperCase() + key.substring(1);
};

Config.prototype.getProperties = function getProperties() {
  return this.properties;
};

Config.prototype.remove = function remove(key) {
  this.properties.deleteProperty(this.getKey(key));
  return this;
};

Config.prototype.set = function set(key, value) {
  this.properties.setProperty(this.getKey(key), value);
  return this;
};

Config.prototype.setProperties = function setProperties(properties) {
  this.properties = properties;
  return this;
};
