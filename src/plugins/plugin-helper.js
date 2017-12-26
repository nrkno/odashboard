var _ = require('lodash');


function addSaltToSrc (src) {
  var srcWithSalt;
  if (_.includes(src, '?')) {
    srcWithSalt = src + '&salt=' + new Date().getTime();
  } else {
    srcWithSalt = src + '?salt=' + new Date().getTime();
  }
  return srcWithSalt;
}

function getValueFromJsonByName (jsonNode, fieldName) {
  var nodes = fieldName.split(' ');
  var reduced = _.reduce(nodes, function (memo, v, key) {
    if (_.startsWith(v, '[')) {
      // Array indexing
      if (v == ['[-1]']) {
        // If index is -1, return last element in array
        v = memo.length - 1;
      } else {
        v = v.match(/(\d+)/g)[0];
      }
    }
    var m = memo[v];
    return m;
  }, jsonNode);
  return reduced;
}

function getValueFromJsonByNames (jsonNode, fieldNames) {
  if (fieldNames === undefined) return undefined;
  if (fieldNames.constructor === Array) {
    var fields = _.map(fieldNames, function (fieldName) {
      return getValueFromJsonByName(jsonNode, fieldName);
    });
    return fields;
  } else {
    var fieldName = fieldNames;
    return getValueFromJsonByName(jsonNode, fieldName);
  }
}

function subtractPixels(heightString, subtrahend) {
  var regEx = /\d+/g;
  var numAsString = heightString.match(regEx);
  var pixels = parseInt(numAsString) - subtrahend;
  return pixels + 'px';
}

function get2Dcontext(id) {
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext('2d');
  return ctx;
}

module.exports = {
  addSaltToSrc: addSaltToSrc,
  getValueFromJsonByName: getValueFromJsonByName,
  getValueFromJsonByNames: getValueFromJsonByNames,
  subtractPixels: subtractPixels,
  get2Dcontext: get2Dcontext
};
