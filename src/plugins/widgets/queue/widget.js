var QueueWidget = function(config) {

  var widget = {
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    widgetType: config.widgetType,
    fieldName: config.fieldName,
    count: 0,
    'class': 'low',
    width: config.width,
    height: config.height
  };

  function readCount(value) {
    if (value.messageCount !== undefined) {
      return value.messageCount;
    }

    return value;
  }

  function classify(value) {
    // TODO: Make value intervals configurable.
    if (value < 25) {
      return 'low';
    } else if (value < 100) {
      return 'low-mid';
    } else if (value < 500) {
      return 'mid';
    } else {
      return 'high';
    } 
  }

  widget.update = function(value) {
    var count = readCount(value);
    widget.count = count;
    widget.class = classify(count);
  }; 

  return widget;
};

module.exports = QueueWidget;
