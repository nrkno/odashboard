var assert = require('assert');
var SimplePlugin = require('../../../src/plugins/simple/index');
var moment = require('moment');

function getTestWidget(fieldName, fieldType) {
  var testWidget = {
    plugin: 'simple',
    datasourceId: 'config.datasourceId',
    displayName: 'title',
    fieldName: fieldName,
    fieldType: fieldType,
    url: 'https://www.nrk.no',
    value: 0,
    trend: 'stable'
  };
  return testWidget;
}

describe('Simple Plugin', function() {

  describe('createSimple()', function() {
    it('should return valid simple', function() {

      var configWidget = {
        datasourceId: 'simple_datasource',
        displayName: 'my displayName',
        fieldName: 'a value',
        fieldType: 'number',
        url: 'https://www.nrk.no/'
      };

      var widget = SimplePlugin.createSimple(configWidget);

      assert(widget.plugin === 'simple');
      assert(widget.datasourceId === configWidget.datasourceId);
      assert(widget.displayName === configWidget.displayName);
      assert(widget.fieldName === configWidget.fieldName);
      assert(widget.fieldType === configWidget.fieldType);
      assert(widget.url === configWidget.url);
      assert(widget.value != undefined);
    });
  });

  describe('parseField()', function() {
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
      var parsedField = SimplePlugin.parsefield(exampleJson, outerField);
      assert(parsedField === 'hei');

      var numberField = 'inner goDeeper number';
      parsedField = SimplePlugin.parsefield(exampleJson, numberField);
      assert(parsedField === 100);

      var numberFieldTwo = 'inner goDeeper numberTwo';
      parsedField = SimplePlugin.parsefield(exampleJson, numberFieldTwo);
      assert(parsedField === 200);
    });

    it('should return undefined for unknown field', function() {

      var exampleJson = {
        outer: 'hei'
      };

      var unknownField = 'unknown';
      var parsedField = SimplePlugin.parsefield(exampleJson, unknownField);
      assert(parsedField === undefined);
    });
  });

  describe('parseMsg()', function() {
    it('should assign new value to number widget', function() {

      var exampleJsonMsg = {
        outer: 'hei',
        inner: {
          goDeeper: {
            number: 100,
            numberTwo: 200
          }
        }
      };

      var msg = JSON.stringify(exampleJsonMsg);
      var testWidget = getTestWidget('inner goDeeper number', 'number');
      SimplePlugin.parseMsg(msg, testWidget);

      assert(testWidget.value == exampleJsonMsg.inner.goDeeper.number);
    });

    it('should assign new value+salt to image widget', function() {

      var exampleJsonMsg = {
        imageValue: 'https://www.nrk.no/image.jpeg'
      };

      var msg = JSON.stringify(exampleJsonMsg);
      var testWidget = getTestWidget('imageValue', 'image');
      SimplePlugin.parseMsg(msg, testWidget);

      assert(testWidget.value.startsWith(exampleJsonMsg.imageValue+'&salt='));
    });

    it('should update widget timestamp', function() {

      var exampleJsonMsg = {
        imageValue: 'https://www.nrk.no/image.jpeg'
      };

      var msg = JSON.stringify(exampleJsonMsg);
      var testWidget = getTestWidget('imageValue', 'image');
      SimplePlugin.parseMsg(msg, testWidget);

      assert(testWidget.timestamp.startsWith(moment().format('dddd HH:mm')));
    });
  });
});
