var _ = require('lodash');
var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  assert(datasource.url != undefined,
     util.format('Missing url for RabbitMq datasource with id = %s', datasource.id));
  assert(datasource.queueName != undefined,
    util.format('Missing queueName for RabbitMq datasource with id = %s', datasource.id));
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
  assert(widget.displayName != undefined,
     util.format('Missing displayName for RabbitMq widget with datasource id = %s', widget.datasourceId));
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
