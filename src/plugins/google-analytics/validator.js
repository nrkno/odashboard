var _ = require('lodash');
var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  assert(datasource.keyFile !== undefined,
    util.format('Missing keyFile for Google Analytics datasource with id = %s. Add your key file to ./config/ and reference in the datasource with keyFile: "keyname"', datasource.id));

  assert(datasource.viewId !== undefined,
    util.format('Missing viewId for Google Analytics datasource with id = %s.', datasource.id));    

  assert(datasource.metric !== undefined,
    util.format('Missing metric for Google Analytics datasource with id = %s.', datasource.id));   

  if (datasource.filters !== undefined) {
    assert(datasource.filters.startsWith('rt:'), 
      util.format('Illegal filters for Google Analytics datasource with id = %s. Must start with rt:', datasource.id));
  }

  if (datasource.dimension !== undefined) {
    assert(datasource.dimension.startsWith('rt:'),
      util.format('Illegal dimensions for Google Analytics datasource with id = %s. Must start rt:', datasource.id));
  }
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
    util.format('Missing displayName for Google Analytics widget with datasource id = %s', widget.datasourceId));        
}


var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
