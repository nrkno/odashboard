var assert = require('assert');
var GAPlugin = require('../../../src/plugins/google-analytics/index');

function getTestWidget() {
  return {
    plugin: 'google-analytics',
    datasourceId: 'ga-1',
    displayName: 'Mobile users',
    dimensionValue: 'MOBILE',
    value: 0
  };
}

describe('Google Analytics Plugin', function() {

  describe('createGAWidget', function() {
    it('should return valid widget', function() {

      var widgetConfig = {
        plugin: 'google-analytics',
        datasourceId: 'ga-1',
        displayName: 'Total mobile users',
        dimensionValue: 'MOBILE'
      };

      var widget = GAPlugin.createGAWidget(widgetConfig);
      assert(widget.plugin === 'google-analytics');
      assert(widget.datasourceId === widgetConfig.datasourceId);
      assert(widget.displayName === widgetConfig.displayName);
      assert(widget.dimensionValue === widgetConfig.dimensionValue);
    });
  });

  describe('parseMsg', function() {

    it('should set value without dimensionValue (and message is from datasource without dimensions)', function() {
      var msgFromDatasourceWithoutDimensions = JSON.stringify([[90]]);

      var widget = getTestWidget();
      widget.dimensionValue = undefined;
      GAPlugin.parseMsg(msgFromDatasourceWithoutDimensions, widget);
      assert(widget.value === 90);
    });

    it('should set value if dimensionValue is set (and message is from dimension datasource)', function() {
      var msgFromDatasourceWithDimensions = JSON.stringify([['MOBILE', 20], ['TABLET', 30], ['DESKTOP', 40]]);

      var widget = getTestWidget();

      widget.dimensionValue = 'MOBILE';
      GAPlugin.parseMsg(msgFromDatasourceWithDimensions, widget);
      assert(widget.value === 20);

      widget.dimensionValue = 'TABLET';
      GAPlugin.parseMsg(msgFromDatasourceWithDimensions, widget);
      assert(widget.value === 30);

      widget.dimensionValue = 'DESKTOP';
      GAPlugin.parseMsg(msgFromDatasourceWithDimensions, widget);
      assert(widget.value === 40);            
    });
  });
});
