var assert = require('assert');
var _ = require('lodash');
var pluginHelper = require('../../src/plugins/plugin-helper');

describe('Plugin helper', function() {

  describe('addSaltToSrc', function() {
    it('should add unique salt to src for each call (for url without previous query parameters)', function() {
      var src = 'http://www.nrk.no/something';
      var srcWithSalt = pluginHelper.addSaltToSrc(src);

      assert(src !== srcWithSalt);
      assert(_.startsWith(srcWithSalt, src), 'srcWithSalt should start with src');
      assert(_.startsWith(srcWithSalt, src + '?salt='), 'srcWithSalt should start with src+salt');

      setTimeout(function() {
        var srcWithSalt2 = pluginHelper.addSaltToSrc(src);
        assert(srcWithSalt2 != srcWithSalt, 'salting two times should give different salts');
      },1);
    });

    it('should add unique salt to src for each call (for url with previous query parameters)', function() {
      var src = 'http://www.nrk.no/something?yes';
      var srcWithSalt = pluginHelper.addSaltToSrc(src);

      assert(src !== srcWithSalt);
      assert(_.startsWith(srcWithSalt, src), 'srcWithSalt should start with src');
      assert(_.includes(srcWithSalt, '&salt='), 'srcWithSalt should start with src');
    });
  });

  describe('getValueFromJsonByName', function () {
    it('should return value from parsed field', function() {

      var exampleJson = {
        outer: 'hei',
        inner: {
          goDeeper: {
            number: 100,
            numberTwo: 200
          }
        }
      };

      var outerField = 'outer';
      var parsedField = pluginHelper.getValueFromJsonByName(exampleJson, outerField);
      assert(parsedField === 'hei');

      var numberField = 'inner goDeeper number';
      parsedField = pluginHelper.getValueFromJsonByName(exampleJson, numberField);
      assert(parsedField === 100);

      var numberFieldTwo = 'inner goDeeper numberTwo';
      parsedField = pluginHelper.getValueFromJsonByName(exampleJson, numberFieldTwo);
      assert(parsedField === 200);
    });
  });

  describe('getValueFromJsonByNames', function () {
    it('should return values from parsed field', function() {

      var exampleJson = {
        outer: 'hei',
        inner: {
          goDeeper: {
            number: 100,
            numberTwo: 200
          }
        }
      };

      var fields = ['inner goDeeper number', 'inner goDeeper numberTwo'];
      parsedFields = pluginHelper.getValueFromJsonByNames(exampleJson, fields);
      assert(parsedFields.constructor === Array);
      assert(parsedFields[0] == 100);
      assert(parsedFields[1] === 200);
    });

    it('should be able to address elements in array', function() {
      var examplesJson = {
        test: ['anne', 'per', 'knut']
      };

      var field = 'test [2]';
      var value = pluginHelper.getValueFromJsonByNames(examplesJson, field);
      assert(value == 'knut');

      var examplesJson2 = [
        {
          test: 'hei sveis'
        }
      ];

      field = '[0] test';
      value = pluginHelper.getValueFromJsonByNames(examplesJson2, field);
      assert(value == 'hei sveis');
    });

    it('should return last element if given [-1]', function() {
      var examplesJson = {
        test: ['anne', 'per', 'knut', 'petter', 'alex']
      };

      var field = 'test [-1]';
      var value = pluginHelper.getValueFromJsonByNames(examplesJson, field);
      assert(value == 'alex');
    });
  });

  describe('subtractPixels', function() {
    it('should subtract pixels', function() {
      var result = pluginHelper.subtractPixels('320px', 10);
      assert(result == '310px');
      result = pluginHelper.subtractPixels('320px', 300);
      assert(result == '20px');
    });
  });
});
