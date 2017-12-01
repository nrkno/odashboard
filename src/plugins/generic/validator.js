var _ = require('lodash');
var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  assert(datasource.source !== undefined,
    util.format('Missing source for generic datasource with id = %s', datasource.id));
  assert(datasource.config !== undefined,
    util.format('Missing config for generic datasource with id = %s', datasource.id));
}

function shouldHaveDatasourceId(widget) {
  assert(widget.datasourceId != undefined,
    util.format('DatasourceId not defined for datasource with id %s', widget.plugin));
}

function validateWidget(widget) {
  shouldHaveDatasourceId(widget);
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
