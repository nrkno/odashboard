var CheckmarkWidget = function(config) {

  var widget = {
    widgetType: config.widgetType,
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    value: undefined,
  };

  widget.update = function(value) {
    widget.value = value;
  };

  return widget;
};

module.exports = CheckmarkWidget;