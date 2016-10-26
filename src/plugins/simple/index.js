var _ = require('lodash');
var moment = require('moment');

var SimplePlugin = (function () {

  var module = {};

  module.parsefield = function (jsonNode, fieldName) {
    var nodes = fieldName.split(' ');

    var reduced = _.reduce(nodes, function (memo, v, key) {
      key;
      var m = memo[v];
      return m;
    }, jsonNode);

    return reduced;
  };

  module.createSimple = function(config) {
    return {
      plugin: 'simple',
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
  };

  function getFormattedDate() {
    var str = moment().format('dddd HH:mm:ss');
    return str;
  }

  module.parseMsg = function(msg, widget) {
    try {
      var simpleData = JSON.parse(msg);
      var value = this.parsefield(simpleData, widget.fieldName);
      if (widget.fieldType === 'image') {
        var salt = '&salt=' + new Date().getTime();
        widget.value = value + salt;
      } else if (widget.fieldType === 'number') {
        if (value == widget.value) {
          widget.trend = 'stable';
        } else if(value > widget.value) {
          widget.trend = 'increasing';
        } else if (value < widget.value) {
          widget.trend = 'decreasing';
        }
        widget.value = value;
      } else {
        widget.value = value;
      }
      widget.timestamp = getFormattedDate();
    } catch (e) {
      console.log(e);
      widget.value = undefined;
      widget.timestamp = getFormattedDate();
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
    var widget = this.createSimple(config);
    setupListener(widget, socket);
    return widget;
  };

  return module;

}());

module.exports = SimplePlugin;
