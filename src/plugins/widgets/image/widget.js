var ImageWidget = function(config) {

  var widget = {
    widgetType: config.widgetType,
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    width: config.width,
    height: config.height,
    value: '',
  };

  widget.update = function(value) {
    var salt = '&salt=' + new Date().getTime();
    widget.value = value + salt;
  };

  return widget;
};

module.exports = ImageWidget;