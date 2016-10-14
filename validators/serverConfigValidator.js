var _ = require('lodash');
var assert = require('assert');
var util = require('util');
var serverconfig = require('../config/serverconfig');

function validateServerConfig() {
  console.log('Validating server config');
  assert(serverconfig.datasources != undefined, 'No datasources');

  _.each(serverconfig.datasources, function (datasource) {
    shouldHaveId(datasource);
    shouldHavePlugin(datasource);
    shouldHaveUpdateInterval(datasource);

    if (datasource.auth != undefined) {
      authValidator(datasource);
    }
  });
  console.log('Server config ok');
}

function shouldHaveId(datasource) {
  assert(datasource.id != undefined, util.format('Critical error. Id not defined for a datsource with type: %s', datasource.plugin));
}

function shouldHavePlugin(datasource) {
  assert(datasource.plugin != undefined, util.format('Plugin type not defined for datasource with id = %s', datasource.id));
}

function shouldHaveUpdateInterval(datasource) {
  assert(datasource.updateInterval != undefined, util.format('UpdateInterval not defined for datasource with id = %s', datasource.id));
}

function authValidator(datasource) {
  var auth = datasource.auth;
  assert(auth.type === 'basic' || auth.type === 'ntlm' || auth.type === 'apiKey', 'Unknown auth for datasource with id = %s', datasource.id);
  if(auth.type === 'basic') {
    assert(auth.options != undefined, util.format('Basic auth without options for datasource with id = %s', datasource.id));
    assert(auth.options.username != undefined, util.format('Basic auth without username for datasource with id = %s', datasource.id));
    assert(auth.options.password != undefined, util.format('Basic auth without password for datasource with id = %s', datasource.id));
  } else if (auth.type === '') {
    assert(auth.options != undefined);
    assert(auth.options.username != undefined);
    assert(auth.options.password != undefined);
    assert(auth.options.domain != undefined);
    assert(auth.options.workstation != undefined);
  } else if (auth.type === 'apiKey') {
    assert(auth.options != undefined, util.format('Api key without options for datasource with id = %s', datasource.id));
    assert(auth.options.key != undefined, util.format('Api key auth missing key for datasource with id = %s', datasource.id));
    assert(auth.options.headerName != undefined, util.format('Api key auth missing headerName for datasource with id = %s', datasource.id));
  }
}

var exports = module.exports = {};
exports.validateServerConfig = validateServerConfig;
