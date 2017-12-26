var assert = require('assert');
var sinon = require('sinon');
var Chart = require('chart.js');
var _ = require('lodash');
var pluginHelper = require('../../../../src/plugins/plugin-helper.js');
var LineChartWidget = require('../../../../src/plugins/widgets/linechart/widget.js');

var widgetConfig = {
  plugin: 'generic',
  widgetType: 'linechart',
  datasourceId: 'myChartDatasource',
  width: '420px',
  height: '210px',
  fieldName: 'number',
  options: {
    chartLabel: 'My data',
    timeSeriesLength: 30
  }
};

describe('LineChart plugin', function() {
  var chartStub,
    instance,
    sandbox,
    stub;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  before(function() {
    stub = sinon.stub(pluginHelper, 'get2Dcontext').callsFake(function() {
      return {
        getContext: function() { return {};}
      };
    });
  });

  after(function () {
    stub.resetBehavior();
    sandbox.restore();
  });

  describe('Linechart constructor', function() {
    it('should return valid widget given valid config', function() {
      var widget = LineChartWidget(Chart, widgetConfig);      
      assert(widget.plugin === 'generic');
      assert(widget.widgetType === 'linechart');
      assert(widget.datasourceId === widgetConfig.datasourceId);
      assert(widget.displayName === widgetConfig.displayName);
      assert(widget.fieldName === widgetConfig.fieldName);
      assert(widget.timeSeriesLength === widgetConfig.options.timeSeriesLength);    
      assert(widget.width === widgetConfig.width);
      assert(widget.height === widgetConfig.height);    
      assert('chart' in widget);
    });
  });

  describe('getDataset', function() {
    it('should return defaultDatasetOptions if no datasetOptions is given in widget', function() {
      var widget = LineChartWidget(Chart, widgetConfig);
      var initialValues = [0, 1, 2];
      var dataset = widget.getDataset(initialValues);

      assert(dataset.label === widgetConfig.options.chartLabel);
      assert(dataset.pointRadius != undefined);
      assert(dataset.backgroundColor != undefined);
      assert(dataset.borderColor != undefined);
      assert(dataset.data == initialValues);
    });

    it('should return datasetOptions if given in widget', function() {
      var wc = _.cloneDeep(widgetConfig);
      wc.options.datasetOptions =  {customSetting: 1};
      var widget = LineChartWidget(Chart, wc);
      var initialValues = [0, 1, 5, 10];
      var dataset = widget.getDataset(initialValues);
      assert(dataset.label === wc.options.chartLabel);
      assert(dataset.customSetting === 1);

      assert(dataset.pointRadius == undefined);
      assert(dataset.backgroundColor == undefined);
      assert(dataset.borderColor == undefined);
      assert(dataset.data == initialValues);
    });
  });

  describe('getChartOptions', function() {
    it('should return defaultChartOptions if no chartOptions is given in widget', function() {
      var widget = LineChartWidget(Chart, widgetConfig);
      var chartOptions = widget.getChartOptions();

      assert(chartOptions.title != undefined);
      assert(chartOptions.legend != undefined);
      assert(chartOptions.animation != undefined);
      assert(chartOptions.scales != undefined);
    });

    it('should return chartOptions if given in widget', function() {
      var wc = _.cloneDeep(widgetConfig);
      wc.options.chartOptions = { customSetting: 1 };
      var widget = LineChartWidget(Chart, wc);
      var chartOptions = widget.getChartOptions();

      assert(chartOptions.customSetting === 1);

      assert(chartOptions.title == undefined);
      assert(chartOptions.legend == undefined);
      assert(chartOptions.animation == undefined);
      assert(chartOptions.scales == undefined);
    });

    it('should return chartOptions with updated yMinx and yMax if given in widget', function() {
      var widget = LineChartWidget(Chart, widgetConfig);
      widget.yMin = 100;
      widget.yMax = 500;

      var chartOptions = widget.getChartOptions();
      assert(chartOptions.scales.yAxes[0].ticks.min === widget.yMin);
      assert(chartOptions.scales.yAxes[0].ticks.max === widget.yMax);

    });
  });


});
