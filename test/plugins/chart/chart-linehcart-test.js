var assert = require('assert');
var sinon = require('sinon');

require('jsdom-global')();

var LineChart = require('../../../src/plugins/chart/linechart');
var Chart = require('chart.js');

function getTestWidget(valueField, label, chartOptions, datasetOptions) {
  return {
    plugin: 'chart',
    chartId: '1',
    datasourceId: 'datasourceId',
    width: '540px',
    height: '480px',
    chartType: 'line',
    chart: {},
    valueField: valueField,
    chartLabel: label,
    timeSeriesLength: 30,
    chartOptions: chartOptions,
    datasetOptions: datasetOptions
  };
}

describe('LineChart widget', function() {
  var chartStub,
    instance,
    sandbox;

  beforeEach(function() {
    sandbox = sinon.createSandbox();
    instance = LineChart(function () {
      return chartStub;
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('createLineChart()', function() {
    it('should return valid line chart widget', function() {

      var configWidget = {
        plugin: 'chart',
        datasourceId: 'myChart',
        chartType: 'line',
        width: '420px',
        height: '210px',
        options: {
          chartLabel: 'My data',
          valueField: 'number', // use whitespace
          timeSeriesLength: 30,
          yMin: 0,
          yMax: 0,
          chartOptions: {},
          datasetOptions: {}
        }
      };

      var widget = instance.createLineChart(configWidget);
      assert(widget.plugin === 'chart');
      assert(widget.datasourceId === configWidget.datasourceId);
      assert(widget.width === configWidget.width);
      assert(widget.height === configWidget.height);
      assert(widget.chartType === configWidget.chartType);
      assert(widget.valueField === configWidget.options.valueField);
      assert(widget.chartLabel === configWidget.options.chartLabel);
      assert(widget.timeSeriesLength === configWidget.options.timeSeriesLength);
      assert(widget.yMin === configWidget.options.yMin);
      assert(widget.yMax === configWidget.options.yMax);
      assert(widget.chartOptions != undefined);
      assert(widget.datasetOptions != undefined);
    });
  });

  describe('getDataset', function() {
    it('should return defaultDatasetOptions if no datasetOptions is given in widget', function() {
      var label = 'a label';
      var widget = getTestWidget('a field', label, undefined, undefined);
      var initialValues = [0, 1, 2];
      var dataset = instance.getDataset(widget, initialValues);

      assert(dataset.label === label);
      assert(dataset.pointRadius != undefined);
      assert(dataset.backgroundColor != undefined);
      assert(dataset.borderColor != undefined);
      assert(dataset.data == initialValues);
    });

    it('should return datasetOptions if given in widget', function() {
      var label = 'a label';
      var widget = getTestWidget('a field', label, undefined, {customSetting: 1});
      var initialValues = [0, 1, 5, 10];
      var dataset = instance.getDataset(widget, initialValues);
      assert(dataset.label === label);
      assert(dataset.customSetting === 1);

      assert(dataset.pointRadius == undefined);
      assert(dataset.backgroundColor == undefined);
      assert(dataset.borderColor == undefined);
      assert(dataset.data == initialValues);
    });
  });

  describe('getChartOptions', function() {
    it('should return defaultChartOptions if no chartOptions is given in widget', function() {
      var label = 'a label';
      var widget = getTestWidget('a field', label, undefined, undefined);
      var chartOptions = instance.getChartOptions(widget);

      assert(chartOptions.title != undefined);
      assert(chartOptions.legend != undefined);
      assert(chartOptions.animation != undefined);
      assert(chartOptions.scales != undefined);
    });

    it('should return chartOptions if given in widget', function() {
      var label = 'a label';
      var widget = getTestWidget('a field', label, {customSetting: 1}, undefined);
      var chartOptions = instance.getChartOptions(widget);

      assert(chartOptions.customSetting === 1);

      assert(chartOptions.title == undefined);
      assert(chartOptions.legend == undefined);
      assert(chartOptions.animation == undefined);
      assert(chartOptions.scales == undefined);
    });

    it('should return chartOptions with updated yMinx and yMax if given in widget', function() {
      var label = 'a label';
      var widget = getTestWidget('a field', label, undefined, undefined);
      widget.yMin = 100;
      widget.yMax = 500;

      var chartOptions = instance.getChartOptions(widget);
      assert(chartOptions.scales.yAxes[0].ticks.min === widget.yMin);
      assert(chartOptions.scales.yAxes[0].ticks.max === widget.yMax);

    });
  });

});
