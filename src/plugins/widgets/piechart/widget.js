var _ = require('lodash');
var moment = require('moment');
var pluginHelper = require('../../plugin-helper.js');

var PieChartWidget = function (Chart, config) {

  var numValues = 0;

  var cid =  _.uniqueId('chart_');
  var widget = {
    widgetType: config.widgetType,
    plugin: config.plugin,
    chartId: cid,
    datasourceId: config.datasourceId,
    width: config.width,
    height: config.height,
    canvasWidth: config.width,
    canvasHeight: pluginHelper.subtractPixels(config.height, 25), //subtract some pixels to allow room for title
    chartType: config.chartType,
    chart: null,
    fieldName: config.fieldName,
    displayName: config.options.displayName,
    valueField: config.options.valueField,
    labelField: config.options.labelField,
    labels: config.options.labels,
    chartOptions: config.options.chartOptions,
    datasetOptions: config.options.datasetOptions
  };

  widget.update = function(value) {

    var parsedValues = pluginHelper.getValueFromJsonByNames(value, widget.valueField);
    var parsedLabels = pluginHelper.getValueFromJsonByNames(value, widget.labelField);

    if (widget.chart == null) {
      var newChart = initializePieChart(parsedValues, parsedLabels);
      widget.chart = newChart;
    } else {
      var labels = getLabels(parsedLabels, widget.labels);

      _.forEach(_.range(parsedValues.length), function (i) {
        widget.chart.config.data.datasets[0].data[i] = parsedValues[i];
      });

      _.forEach(_.range(labels.length), function (i) {
        widget.chart.config.data.labels[i] = labels[i];
      });

      widget.chart.update();
    }
  };

  function initializePieChart(values, parsedLabels) {

    var canvas = document.getElementById(widget.chartId);
    var ctx = canvas.getContext('2d');

    var inititalValues = getValues(values);
    var initialLabels = getLabels(parsedLabels, widget.labels);
    var dataset = getDataset(inititalValues);
    var chartOptions = getChartOptions();

    var newChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: initialLabels,
        datasets: [dataset]
      },
      options: chartOptions
    });
    return newChart;
  }

  function getDataset(inititalValues) {

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
  }

  function getLabels(parsedLabels, widgetLabels) {
    if (widgetLabels) {
      return widgetLabels;
    } else if (parsedLabels) {
      return parsedLabels;
    } else {
      return [''];
    }
  }

  function getValues(values) {
    if (values) {
      return values;
    } else {
      return [0];
    }
  }

  function getChartOptions() {

    var defaultPieChartOptions = {};

    var chartOptions;

    if (widget.chartOptions) {
      chartOptions = widget.chartOptions;
    } else {
      chartOptions = _.cloneDeep(defaultPieChartOptions);
    }

    return chartOptions;
  }

  function getLabel() {
    if (numValues++ % 5 == 0) {
      return moment().format('hh:mm');
    } else {
      return '';
    }
  }

  return widget;
};

module.exports = PieChartWidget;
