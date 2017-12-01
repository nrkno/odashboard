var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  datasource;
  return;
}

function validateWidget(widget) {
  assert(widget.src != undefined,
    util.format('Missing src for iFrame widget'));

  assert(widget.width != undefined,
    util.format('Missing width for iFrame widget with src = %s', widget.src));

  assert(widget.height != undefined,
    util.format('Missing height for iFrame widget with src = %s', widget.src));
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
