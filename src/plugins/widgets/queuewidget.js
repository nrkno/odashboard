var QueueWidget = function(config) {

  var widget = {
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    width: config.width,
    height: config.height,
    widgetType: config.widgetType,
    fieldType: config.fieldType,
    fieldName: config.fieldName,
    count: 0,
    'class': 'low'
  };

  widget.update = function(value) {

    if (value.messageCount !== undefined) {
      widget.count = value.messageCount;
    }
    else {
      widget.count = value;
    }

    // TODO: Make intervals configurable.
    if (value < 25) {
      widget.class = 'low';
    } else if (value < 100) {
      widget.class = 'low-mid';
    } else if (value < 500) {
      widget.class = 'mid';
    } else {
      widget.class = 'high';
    }
  };

  return widget;
};

module.exports = QueueWidget;
