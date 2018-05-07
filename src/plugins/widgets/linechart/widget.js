var _ = require('lodash');
var moment = require('moment');
var pluginHelper = require('../../plugin-helper');

var LineChartWidget = function (Chart, config) {

  var numValues = 0;

  var cid =  _.uniqueId('chart_');
  var widget = {
    plugin: 'generic',
    widgetType: 'linechart',
    chartId: cid,
    datasourceId: config.datasourceId,
    width: config.width,
    height: config.height,
    chart: null,
    fieldName: config.fieldName,
    chartLabel: config.options.chartLabel,
    timeSeriesLength: config.options.timeSeriesLength,
    yMin: config.options.yMin,
    yMax: config.options.yMax,
    chartOptions: config.options.chartOptions,
    datasetOptions: config.options.datasetOptions,
    borderColorGradientStops: config.options.borderColorGradientStops
  };

  function updateBorderGradient() {
    const borderColorGradientStops = widget.borderColorGradientStops;
    const chart = widget.chart;
    
    if(!borderColorGradientStops || !chart) {
      return;
    }
      
    // create gradient over chart area
    const area = chart.chartArea;
    const gradientStroke = chart.ctx.createLinearGradient(0, area.bottom, 0, area.top);
    // add defined color stops
    const length = borderColorGradientStops.length;
    borderColorGradientStops.forEach((color, idx) => {
      const stop = 1/(length-1)*idx;
      gradientStroke.addColorStop(stop, color);
    });

    chart.data.datasets[0].borderColor = gradientStroke;
  }

  widget.update = function(value) {
    if (widget.chart == null) {
      var newChart = initializeLineChart(value);
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

      // can only apply gradient when
      // chart area has already been calculated
      updateBorderGradient();

      widget.chart.update();
    }
  };

  function initializeLineChart(value) {
    var ctx = pluginHelper.get2Dcontext(widget.chartId);
    
    var inititalLabels = _.times(widget.timeSeriesLength-1, function() { return ''; });
    inititalLabels.push(getLabel());

    var inititalValues = _.times(widget.timeSeriesLength-1, function() { return 0; });
    inititalValues.push(value);

    var dataset = widget.getDataset(inititalValues);
    var chartOptions = widget.getChartOptions();

    var newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: inititalLabels,
        datasets: [dataset]
      },
      options: chartOptions
    });
    return newChart;
  }

  widget.getDataset = function(inititalValues) {

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

  widget.getChartOptions = function () {

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

  return widget;
};

module.exports = LineChartWidget;
