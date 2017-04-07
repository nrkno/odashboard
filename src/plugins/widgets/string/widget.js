var StringWidget = function(config) {

  var widget = {
    widgetType: config.widgetType,
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    value: '',
  };

  function getStringValue(value) {
    if (typeof value === 'string' || value instanceof String) {
      return value;
    }

    return JSON.stringify(value);
  }

  widget.update = function(value) {
    widget.value = getStringValue(value);
  };

  return widget;
};

module.exports = StringWidget;