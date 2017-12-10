var QueueWidget = function(config) {

  const defaultLowThreshold = 25;
  const defaultLowMidThreshold = 100;
  const defaultMidThreshold = 500;

  var widget = {
    plugin: config.plugin,
    datasourceId: config.datasourceId,
    displayName: config.displayName,
    widgetType: config.widgetType,
    fieldName: config.fieldName,
    count: 0,
    'class': 'low',
    thresholds: getThresholds(config),
    width: config.width,
    height: config.height
  };

  function getThresholds(config) {
    var thresholds = {};
    if (config.thresholds && config.thresholds.low) {
      thresholds.low = config.thresholds.low;
    } else {
      thresholds.low = defaultLowThreshold;
    }

    if (config.thresholds && config.thresholds.lowMid) {
      thresholds.lowMid = config.thresholds.lowMid;
    } else {
      thresholds.lowMid = defaultLowMidThreshold;
    }

    if (config.thresholds && config.thresholds.mid) {
      thresholds.mid = config.thresholds.mid;
    } else {
      thresholds.mid = defaultMidThreshold;
    }
    
    return thresholds;
  }

  function readCount(value) {
    if (value.messageCount !== undefined) {
      return value.messageCount;
    }

    return value;
  }

  function classify(value, thresholds) {
    if (value < thresholds.low) {
      return 'low';
    } else if (value < thresholds.lowMid) {
      return 'low-mid';
    } else if (value < thresholds.mid) {
      return 'mid';
    } else {
      return 'high';
    } 
  }

  widget.update = function(value) {
    var count = readCount(value);
    widget.count = count;
    widget.class = classify(count, widget.thresholds);
  }; 

  return widget;
};

module.exports = QueueWidget;
