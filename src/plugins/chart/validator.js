var _ = require('lodash');
var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  assert(datasource.url != undefined, util.format('Missing url for chart datasource with id = %s', datasource.id));
}

function shouldHaveDatasourceId(widget) {
  assert(widget.datasourceId != undefined,
     util.format('DatasourceId not defined for datasource with id %s', widget.plugin));

  if (_.find(widget.datasourceId) == undefined) {
    console.log(util.format('Warning: Unknown datasource %s in client config', widget.datasourceId));
  }
}

function validateWidget(widget) {
  shouldHaveDatasourceId(widget);

  assert(widget.width != undefined,
    util.format('Missing width for LineChart widget with datasource id = %s', widget.datasourceId));

  assert(widget.height != undefined,
    util.format('Missing height for LineChart widget with datasource id = %s', widget.datasourceId));

  assert(widget.chartType != undefined,
    util.format('Missing chartType for LineChart widget with datasource id = %s', widget.datasourceId));

  if (widget.chartType === 'line') {
    validateLineChart(widget);
  } else if (widget.chartType === 'pie') {
    validatePieChart(widget);
  }
}

function validateLineChart(widget) {
  assert(widget.options.valueField != undefined,
    util.format('Missing valueField for Chart widget with datasource id = %s', widget.datasourceId));

  assert(widget.options.chartLabel != undefined,
    util.format('Missing chartLabel for Chart widget with datasource id = %s', widget.datasourceId));

  assert(widget.options.timeSeriesLength != undefined,
    util.format('Missing timeSeriesLength for Chart widget with datasource id = %s', widget.datasourceId));
}

function validatePieChart(widget) {
  assert(widget.options.valueField != undefined,
    util.format('Missing valueField for PieChart widget with datasource id = %s', widget.datasourceId));

  if (widget.options.labelField ===  undefined) {
    assert(widget.options.labels != undefined,
      util.format('Missing labelField/labels for PieChart widget with datasource id = %s', widget.datasourceId));
  } else if (widget.options.labels === undefined) {
    assert(widget.options.labelField != undefined,
      util.format('Missing labelField/labels for PieChart widget with datasource id = %s', widget.datasourceId));
  }
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
