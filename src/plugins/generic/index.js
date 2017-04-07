var _ = require('lodash');
var moment = require('moment');

var DefaultWidget = require('../widgets/default/widget.js');
var NumberWidget = require('../widgets/number/widget.js');
var CheckmarkWidget = require('../widgets/checkmark/widget.js');
var TimestampWidget = require('../widgets/timestamp/widget.js');
var QueueWidget = require('../widgets/queue/widget.js');
var LineChartWidget = require('../widgets/linechart/widget.js');
var PieChartWidget = require('../widgets/piechart/widget.js');

var GenericPlugin = (function () {

  var module = {};

  module.parseField = function (jsonNode, fieldName) {
    if (fieldName === undefined || fieldName === '') {
      return jsonNode;
    }

    var nodes = fieldName.split(' ');

    var reduced = _.reduce(nodes, function (memo, v, key) {
      key;
      var m = memo[v];
      return m;
    }, jsonNode);

    return reduced;
  };

  function getFormattedDate() {
    var str = moment().format('dddd HH:mm:ss');
    return str;
  }

  module.parseMsg = function(msg, widget) {
    try {
      var obj = JSON.parse(msg);
      var value = this.parseField(obj, widget.fieldName);
      widget.update(value);
      widget.timestamp = getFormattedDate();
    } catch (e) {
      console.log('Failed to parse update message. Fieldname ' + widget.fieldName + '. Message ' + JSON.stringify(msg) + '. Error ' + JSON.stringify(e));
      widget.value = undefined;
      widget.timestamp = getFormattedDate();
    }
  };

  function setupListener(config, socket, widget) {
    var listenEvent = config.plugin + '.' + config.datasourceId;
    socket.on(listenEvent, function (msg) {
      module.parseMsg(msg, widget);
    });
  }
  
  function createWidgetInstance(config) {
    if (config.widgetType === 'queue') {
      return QueueWidget(config);
    }

    if (config.widgetType === 'chart') {
      if (config.chartType === 'line') {
        return LineChartWidget(Chart, config);
      }
      if (config.chartType === 'pie') {
        return PieChartWidget(Chart, config);
      } 
    }

    if (config.widgetType === 'checkmark') {
      return CheckmarkWidget(config);
    }

    if (config.widgetType === 'timestamp') {
      return TimestampWidget(config);
    }

    if (config.widgetType === 'number') {
      return NumberWidget(config);
    }

    return DefaultWidget(config);
  }

  module.createWidget = function (config, socket) {
    var widget = createWidgetInstance(config);
    setupListener(config, socket, widget);
    return widget;
  };

  return module;

}());

module.exports = GenericPlugin;
