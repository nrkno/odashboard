var StringWidget = function(config) {

  var widget = {
    plugin: 'generic',
    widgetType: 'string',
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    value: '',
    width: config.width,
    height: config.height    
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