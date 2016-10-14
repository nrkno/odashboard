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
    util.format('Missing width for Chart widget with datasource id = %s', widget.datasourceId));

  assert(widget.height != undefined,
    util.format('Missing height for Chart widget with datasource id = %s', widget.datasourceId));

  assert(widget.chartType != undefined,
    util.format('Missing chartType for Chart widget with datasource id = %s', widget.datasourceId));

  if (widget.chartType === 'line') {
    validateLineChart(widget);
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

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
