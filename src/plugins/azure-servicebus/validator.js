var _ = require('lodash');
var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  assert(datasource.url != undefined, util.format('Missing url for simple datasource with id = ${datasource.id}', datasource.id));

  assert(widget.topic != undefined,
    util.format('Missing topic for Azure Service Bus widget with datasource id = %s', widget.datasourceId));
  assert(widget.subscription != undefined,
    util.format('Missing subscription for Azure Service Bus widget with datasource id = %s', widget.datasourceId));
}

function shouldHaveDatasourceId(widget) {
  assert(widget.datasourceId != undefined,
    util.format('DatasourceId not defined for datasource with id = %s', widget.plugin));

  if (_.find(widget.datasourceId) == undefined) {
    console.log(util.format('Warning: Unknown datasource %s in client config', widget.datasourceId));
  }
}

function validateWidget(widget) {
  shouldHaveDatasourceId(widget);

  assert(widget.displayName != undefined,
    util.format('Missing displayName for Azure Service Bus widget with datasource id = %s', widget.datasourceId));
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
