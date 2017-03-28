var SimpleWidget = function(config) {

  var widget = {
    plugin: 'simple',
    widgetType: 'simple',
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    fieldName: config.fieldName,
    fieldType: config.fieldType,
    url: config.url,
    width: config.width,
    height: config.height,
    value: 0,
    trend: 'stable'
  };

  function handleValueImage(value) {
    var salt = '&salt=' + new Date().getTime();
    widget.value = value + salt;
  }

  function handleValueNumber(value) {
    if (value == widget.value) {
      widget.trend = 'stable';
    } else if(value > widget.value) {
      widget.trend = 'increasing';
    } else if (value < widget.value) {
      widget.trend = 'decreasing';
    }
    widget.value = value;
  }

  function handleValueDefault(value) {
    widget.value = value;
  }

  widget.update = function(value) {
    
    if (widget.fieldType === 'image') {
      handleValueImage(value);
    } else if (widget.fieldType === 'number') {
      handleValueNumber(value);
    } else {
      handleValueDefault(value);
    }
  };

  return widget;
};

module.exports = SimpleWidget;