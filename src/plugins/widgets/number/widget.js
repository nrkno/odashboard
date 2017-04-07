var NumberWidget = function(config) {

  var widget = {
    widgetType: config.widgetType,
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    value: 0,
    trend: 'stable'
  };

  function getTrend(value) {
    if (value == widget.value) {
      return 'stable';
    } else if(value > widget.value) {
      return 'increasing';
    } else if (value < widget.value) {
      return 'decreasing';
    }
  }

  widget.update = function(value) {
    widget.trend = getTrend(value);
    widget.value = value;
  };

  return widget;
};

module.exports = NumberWidget;