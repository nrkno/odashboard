var LineChart = require('./linechart');

var Chart = require('chart.js');
Chart.defaults.global.defaultFontColor = '#ffffff';

var lineChart = LineChart(Chart);

var ChartPlugin = (function () {

  var module = {};

  function parseMsg(msg, widget) {
    try {
      var chartMsg = JSON.parse(msg);
      if (widget.chartType === 'line') {
        lineChart.updateLineChart(widget, chartMsg);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function setupListener(widget, socket) {
    var listenEvent = widget.plugin + '.' + widget.datasourceId;
    console.log('listening for ' + listenEvent);
    socket.on(listenEvent, function (msg) {
      parseMsg(msg, widget);
    });
  }

  module.createWidget = function (config, socket) {
    var widget;
    if (config.chartType === 'line') {
      widget = lineChart.createLineChart(config);
    }
    setupListener(widget, socket);
    return widget;
  };

  return module;

}());

module.exports = ChartPlugin;
