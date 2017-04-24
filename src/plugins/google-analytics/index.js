var _ = require('lodash');

var GoogleAnalyticsPlugin = (function () {

  var module = {};

  module.createGAWidget = function(config) {
    return {
      plugin: 'google-analytics',
      datasourceId: config.datasourceId,
      displayName: config.displayName,
      dimensionValue: config.dimensionValue,
      url: config.url,
      width: config.width,
      height: config.height,
      value: 0
    };
  };

  function getValue (gaData, dimensionValue) {
    if (dimensionValue == undefined) {
      return gaData[0][0];
    } else {
      var field = _.find(gaData, function(x, i) { return x[0] == dimensionValue; });
      if (field) {
        return field[1];
      } else {
        console.log('Unable to find dimensionValue %s in gaData:', dimensionValue);
        console.log(gaData);
      }
    }
  }

  module.parseMsg = function(msg, widget) {
    try {
      var gaData = JSON.parse(msg);
      var value = getValue(gaData, widget.dimensionValue);
      widget.value = value;
    } catch (e) {
      console.log(e);
    }
  };

  function setupListener(widget, socket) {
    var listenEvent = widget.plugin + '.' + widget.datasourceId;
    console.log('listening for ' + listenEvent);
    socket.on(listenEvent, function (msg) {
      console.log('received ' + listenEvent);
      module.parseMsg(msg, widget);
    });
  }

  module.createWidget = function (config, socket) {
    var widget = this.createGAWidget(config);
    setupListener(widget, socket);
    return widget;
  };

  return module;

}());

module.exports = GoogleAnalyticsPlugin;
