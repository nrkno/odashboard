var CheckmarkWidget = function(config) {

  var widget = {
    plugin: 'generic',
    widgetType: 'checkmark',
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    value: false,
    width: config.width,
    height: config.height
  };

  widget.update = function(value) {
    widget.value = value;
  };

  return widget;
};

module.exports = CheckmarkWidget;