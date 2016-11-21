var _ = require('lodash');
var moment = require('moment');
var pluginHelper = require('../plugin-helper');

var PieChart = function (Chart) {

  var module = {};

  module.createPieChart = function(config) {
    return {
      plugin: 'chart',
      chartId: _.uniqueId('chart_'),
      datasourceId: config.datasourceId,
      width: config.width,
      height: config.height,
      canvasWidth: config.width,
      canvasHeight: pluginHelper.subtractPixels(config.height, 25), //subtract some pixels to allow room for title
      chartType: 'pie',
      chart: null,
      displayName: config.options.displayName,
      valueField: config.options.valueField,
      labelField: config.options.labelField,
      labels: config.options.labels,
      chartOptions: config.options.chartOptions,
      datasetOptions: config.options.datasetOptions
    };
  };

  module.updatePieChart = function(widget, chartMsg) {
    var parsedValues = pluginHelper.getValueFromJsonByNames(chartMsg, widget.valueField);
    var parsedLabels = pluginHelper.getValueFromJsonByNames(chartMsg, widget.labelField);

    if (widget.chart == null) {
      var newChart = initializePieChart(widget, parsedValues, parsedLabels);
      widget.chart = newChart;
    } else {
      var labels = module.getLabels(parsedLabels, widget.labels);

      _.forEach(_.range(parsedValues.length), function (i) {
        widget.chart.config.data.datasets[0].data[i] = parsedValues[i];
      });

      _.forEach(_.range(labels.length), function (i) {
        widget.chart.config.data.labels[i] = labels[i];
      });

      widget.chart.update();
    }
  };

  initializePieChart = function(widget, values, parsedLabels) {
    var canvas = document.getElementById(widget.chartId);
    var ctx = canvas.getContext('2d');

    var inititalValues = module.getValues(values);
    var initialLabels = module.getLabels(parsedLabels, widget.labels);
    var dataset = module.getDataset(widget, inititalValues);
    var chartOptions = module.getChartOptions(widget);

    var newChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: initialLabels,
        datasets: [dataset]
      },
      options: chartOptions
    });
    return newChart;
  };

  module.getDataset = function (widget, inititalValues) {

    var defaultDatasetOptions = {
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB'
      ]
    };

    var dataset;
    if (widget.datasetOptions) {
      dataset = widget.datasetOptions;
    } else {
      dataset = _.cloneDeep(defaultDatasetOptions);
    }

    dataset.data = inititalValues;
    return dataset;
  };

  module.getLabels = function (parsedLabels, widgetLabels) {
    if (widgetLabels) {
      return widgetLabels;
    } else if (parsedLabels) {
      return parsedLabels;
    } else {
      return [''];
    }
  };

  module.getValues = function (values) {
    if (values) {
      return values;
    } else {
      return [0];
    }
  };

  module.getChartOptions = function (widget) {

    var defaultPieChartOptions = {};

    var chartOptions;

    if (widget.chartOptions) {
      chartOptions = widget.chartOptions;
    } else {
      chartOptions = _.cloneDeep(defaultPieChartOptions);
    }

    return chartOptions;
  };

  return module;
};

module.exports = PieChart;
