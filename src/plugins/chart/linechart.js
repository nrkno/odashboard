var _ = require('lodash');
var moment = require('moment');
var pluginHelper = require('../plugin-helper');

var LineChart = function (Chart) {
  var numValues = 0;

  var module = {};

  module.createLineChart = function(config) {
    return {
      plugin: 'chart',
      chartId: _.uniqueId('chart_'),
      datasourceId: config.datasourceId,
      width: config.width,
      height: config.height,
      chartType: config.chartType,
      chart: null,
      valueField: config.options.valueField,
      chartLabel: config.options.chartLabel,
      timeSeriesLength: config.options.timeSeriesLength,
      yMin: config.options.yMin,
      yMax: config.options.yMax,
      chartOptions: config.options.chartOptions,
      datasetOptions: config.options.datasetOptions
    };
  };

  module.updateLineChart = function(widget, chartMsg) {
    var value = pluginHelper.getValueFromJsonByName(chartMsg, widget.valueField);

    if (widget.chart == null) {
      var newChart = initializeLineChart(widget, value);
      widget.chart = newChart;
    } else {
      var labels = widget.chart.data.labels;
      labels.push(getLabel());

      var data = widget.chart.data.datasets[0].data;
      data.push(value);

      if (widget.timeSeriesLength < labels.length) {
        labels.shift();
        data.shift();
      }

      widget.chart.update();
    }
  };

  initializeLineChart = function(widget, value) {
    var canvas = document.getElementById(widget.chartId);
    var ctx = canvas.getContext('2d');

    var inititalLabels = _.times(widget.timeSeriesLength-1, function() { return ''; });
    inititalLabels.push(getLabel());

    var inititalValues = _.times(widget.timeSeriesLength-1, function() { return 0; });
    inititalValues.push(value);

    var dataset = module.getDataset(widget, inititalValues);
    var chartOptions = module.getChartOptions(widget);

    var newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: inititalLabels,
        datasets: [dataset]
      },
      options: chartOptions
    });
    return newChart;
  };

  module.getDataset = function (widget, inititalValues) {

    var defaultDatasetOptions = {
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: '#27ae60',
      pointRadius: 0
    };

    var dataset;
    if (widget.datasetOptions) {
      dataset = widget.datasetOptions;
    } else {
      dataset = _.cloneDeep(defaultDatasetOptions);
    }

    dataset.label = widget.chartLabel;
    dataset.data = inititalValues;
    return dataset;
  };

  module.getChartOptions = function (widget) {

    var defaultLineChartOptions = {
      title: {
        fontColor: '#ffffff'
      },
      legend: {
        labels: {
          fontColor: '#ffffff'
        }
      },
      animation: {
        duration: 0
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0
          }
        }]
      }
    };

    var chartOptions;

    if (widget.chartOptions) {
      chartOptions = widget.chartOptions;
    } else {
      chartOptions = _.cloneDeep(defaultLineChartOptions);
      if (widget.yMin) {
        chartOptions.scales.yAxes[0].ticks.min = widget.yMin;
      }

      if (widget.yMax) {
        chartOptions.scales.yAxes[0].ticks.max = widget.yMax;
      }
    }

    return chartOptions;
  };

  function getLabel() {
    if (numValues++ % 5 == 0) {
      return moment().format('hh:mm');
    } else {
      return '';
    }
  }

  return module;
};

module.exports = LineChart;
