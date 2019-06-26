var _ = require('lodash');
var moment = require('moment');
var Chart = require('chart.js');

var StringWidget = require('../widgets/string/widget.js');
var NumberWidget = require('../widgets/number/widget.js');
var CheckmarkWidget = require('../widgets/checkmark/widget.js');
var TimestampWidget = require('../widgets/timestamp/widget.js');
var QueueWidget = require('../widgets/queue/widget.js');
var LineChartWidget = require('../widgets/linechart/widget.js');
var PieChartWidget = require('../widgets/piechart/widget.js');
var BuildWidget = require('../widgets/build/widget.js');

var GenericPlugin = (function () {

  var module = {};

  module.parseField = function (jsonNode, fieldName) {
    if (fieldName === undefined || fieldName === '') {
      return jsonNode;
    }

    var nodes = fieldName.split(' ');

    var reduced = _.reduce(nodes, function (memo, v, key) {
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
      var o = widget.transform(obj);
      var value = this.parseField(o, widget.fieldName);
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
  
  module.createWidgetInstance = function (config, chart) {
    if (config.widgetType === 'queue') {
      return QueueWidget(config);
    }

    if (config.widgetType === 'linechart') {
      return LineChartWidget(chart, config);
    }

    if (config.widgetType === 'piechart') {
      return PieChartWidget(chart, config);
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

    if (config.widgetType === 'build') {
      return BuildWidget(config);
    }

    return StringWidget(config);
  };

  function getTransform(transform) {
    if (typeof transform != 'undefined' && transform !== '') {
      return new Function('json', transform);
    }

    return _.identity;
  }

  module.createWidget = function (config, socket) {
    var widget = this.createWidgetInstance(config, Chart);
    console.log(`Creating generic widget of type '${widget.widgetType}' with datasource '${widget.datasourceId}'.`);
    widget.transform = getTransform(config.transform);
    setupListener(config, socket, widget);
    return widget;
  };

  return module;

}());

module.exports = GenericPlugin;
