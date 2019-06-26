var AzureServiceBusPlugin = (function () {

  var module = {};

  module.createAzureServicebusWidget = function(config) {
    return {
      plugin: config.plugin,
      datasourceId: config.datasourceId,
      displayName: config.displayName,
      width: config.width,
      height: config.height,
      count: 0,
      'class': 'low'
    };
  };

  module.parseMsg = function (msg, widget) {
    var queueSize = JSON.parse(msg).messageCount;
    widget.count = queueSize;

    if (queueSize < 25) {
      widget.class = 'low';
    } else if (queueSize < 100) {
      widget.class = 'low-mid';
    } else if (queueSize < 500) {
      widget.class = 'mid';
    } else {
      widget.class = 'high';
    }
  };

  function setupListener(widget, socket) {
    var listenEvent = widget.plugin + '.' + widget.datasourceId;
    socket.on(listenEvent, function (msg) {
      module.parseMsg(msg, widget);
    });
  }

  module.createWidget = function (config, socket) {
    var widget = this.createAzureServicebusWidget(config);
    setupListener(widget, socket);
    return widget;
  };

  return module;

}());

module.exports = AzureServiceBusPlugin;
