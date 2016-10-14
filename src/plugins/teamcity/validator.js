var _ = require('lodash');
var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  assert(datasource.url != undefined,
    util.format('Missing url for TeamCity datasource with id = %s', datasource.id));
  assert(datasource.updateInterval != undefined,
    util.format('Missing updateInterval for TeamCity datasource with id = %s', datasource.id));
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
  assert(widget.id != undefined,
    util.format('Missing id for TeamCity widget with datasource id = %s', widget.id));
  assert(widget.name != undefined,
    util.format('Missing name for TeamCity widget with datasource id = %s', widget.name));
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
