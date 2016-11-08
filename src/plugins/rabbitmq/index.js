var RabbitMQPlugin = (function () {

  var module = {};

  module.createQueueWidget = function (config) {
    return {
      'plugin': 'rabbitmq',
      displayName : config.displayName,
      datasourceId: config.datasourceId,
      width: config.width,
      height: config.height,
      url: config.url,
      count: 0,
      'class': 'low'
    };
  };

  module.parseMsg = function (msg, widget) {
    var queueSize = JSON.parse(msg).messages;
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
    console.log('listening for ' + listenEvent);
    socket.on(listenEvent, function (msg) {
      module.parseMsg(msg, widget);
    });
  }

  module.createWidget = function (config, socket) {
    var widget = this.createQueueWidget(config);
    setupListener(widget, socket);
    return widget;
  };

  return module;

}());

module.exports = RabbitMQPlugin;
