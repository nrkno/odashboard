var NumberWidget = function(config) {

  var widget = {
    widgetType: config.widgetType,
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    value: 0,
    trend: 'stable',
    width: config.width,
    height: config.height    
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

  function getNumber(value) {
    if (typeof value === 'number' || value instanceof Number) {
      return value;
    }
    
    return Number(value);
  }

  function getNumberValue(value) {
    var num = getNumber(value);
    if (isNaN(num)) {
      return 0;
    }

    return num;
  }

  widget.update = function(value) {
    var val = getNumberValue(value);
    widget.trend = getTrend(val);
    widget.value = val;
  };

  return widget;
};

module.exports = NumberWidget;