var assert = require('assert');
var util = require('util');

function validateDatasource(datasource) {
  datasource;
  return;
}

function validateWidget(widget) {
  assert(widget.src !== undefined,
    'Missing src for Image widget');

  assert(widget.width !== undefined,
    util.format('Missing width for Image widget with src = %s', widget.src));

  assert(widget.height !== undefined,
    util.format('Missing height for Image widget with src = %s', widget.src));
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
