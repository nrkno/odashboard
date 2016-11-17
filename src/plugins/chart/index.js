var LineChart = require('./linechart');
var PieChart = require('./piechart');

var Chart = require('chart.js');
Chart.defaults.global.defaultFontColor = '#ffffff';

var lineChart = LineChart(Chart);
var pieChart = PieChart(Chart);

var ChartPlugin = (function () {

  var module = {};

  function parseMsg(msg, widget) {
    try {
      var chartMsg = JSON.parse(msg);
      if (widget.chartType === 'line') {
        lineChart.updateLineChart(widget, chartMsg);
      } else if (widget.chartType === 'pie') {
        pieChart.updatePieChart(widget, chartMsg);
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
    } else if (config.chartType === 'pie') {
      widget = pieChart.createPieChart(config);
    }
    setupListener(widget, socket);
    return widget;
  };

  return module;

}());

module.exports = ChartPlugin;
