var assert = require('assert');
var sinon = require('sinon');
var pluginHelper = require('../../../src/plugins/plugin-helper');
var PieChart = require('../../../src/plugins/chart/piechart');

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

describe('PieChart plugin', function() {
  var chartStub,
    instance,
    sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    instance = PieChart(function() {
      return chartStub;
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('createPieChart()', function() {
    it('should return valid pie chart widget', function() {

      var configWidget = {
        plugin: 'chart',
        datasourceId: 'myChartDatasource',
        chartType: 'pie',
        width: '320px',
        height: '320px',
        options: {
          displayName: 'Animal Frequency',
          valueField: 'info history animalFrequency',
          labelField: 'info history animalNames',
          chartOptions: {}
        }
      };
      var widget = instance.createPieChart(configWidget);

      assert(widget.plugin === 'chart');
      assert(widget.datasourceId === configWidget.datasourceId);
      assert(widget.width === configWidget.width);
      assert(widget.height === configWidget.height);
      assert(widget.canvasWidth === configWidget.width);
      assert(widget.canvasHeight === pluginHelper.subtractPixels(configWidget.width, 25));
      assert(widget.height === configWidget.height);
      assert(widget.chartType === configWidget.chartType);
      assert(widget.valueField === configWidget.options.valueField);
      assert(widget.labelField === configWidget.options.labelField);
      assert(widget.labels === configWidget.options.labels);
      assert(widget.chartOptions != undefined);
      assert(widget.datasetOptions == undefined);
    });
  });

  describe('getLabels', function () {

    it('should return widgetLabels if only widgetLabels ', function() {
      var widgetLabels = ['widget'];
      var labels = instance.getLabels(undefined, widgetLabels);
      assert(labels[0] == widgetLabels[0]);
    });

    it('should return pasredLabels if only parsedLabels ', function() {
      var parsedLabels = ['widget'];
      var labels = instance.getLabels(parsedLabels, undefined);
      assert(labels[0] == parsedLabels[0]);
    });

    it('should return empty labels if both args are undefined ', function() {

      var labels = instance.getLabels(undefined, undefined);
      assert(labels.constructor == Array);
      assert(labels.length == 1);
    });

    it('should return widgetLabels over parsedLabels ', function() {
      var parsedLabels = ['parsed'];
      var widgetLabels = ['widget'];

      var labels = instance.getLabels(parsedLabels, widgetLabels);
      assert(labels[0] == widgetLabels[0]);
    });
  });

  describe('getLabels', function () {
    it('should return widgetLabels if only widgetLabels ', function() {
      var widgetLabels = ['widget'];
      var labels = instance.getLabels(undefined, widgetLabels);
      assert(labels[0] == widgetLabels[0]);
    });

    it('should return pasredLabels if only parsedLabels ', function() {
      var parsedLabels = ['widget'];
      var labels = instance.getLabels(parsedLabels, undefined);
      assert(labels[0] == parsedLabels[0]);
    });

    it('should return empty labels if both args are undefined ', function() {

      var labels = instance.getLabels(undefined, undefined);
      assert(labels.constructor == Array);
      assert(labels.length == 1);
    });

    it('should return widgetLabels over parsedLabels ', function() {
      var parsedLabels = ['parsed'];
      var widgetLabels = ['widget'];

      var labels = instance.getLabels(parsedLabels, widgetLabels);
      assert(labels[0] == widgetLabels[0]);
    });
  });
});
