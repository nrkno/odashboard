var assert = require('assert');
var AzurePlugin = require('../../../src/plugins/azure-servicebus/index');

function getTestWidget() {
  return {
    plugin: 'azure-servicebus',
    datasourceId: 'azure1',
    displayName: 'Queued messages',
    count: 0,
    'class': 'low'
  };
}
describe('Azure Plugin', function() {

  describe('createAzureServicebusWidget', function() {
    it('should return valid widget', function() {

      var widgetConfig = {
        plugin: 'azure-servicebus',
        datasourceId: 'azure1',
        displayName: 'Programdatakø',
      };

      var widget = AzurePlugin.createAzureServicebusWidget(widgetConfig);
      assert(widget.plugin === 'azure-servicebus');
      assert(widget.datasourceId === widgetConfig.datasourceId);
      assert(widget.displayName === widgetConfig.displayName);
      assert(widget.count != undefined);
      assert(widget.class != undefined);
    });
  });

  describe('parseMsg', function() {
    it('should set widget count', function() {
      var widget = getTestWidget();
      var msg = {
        messageCount: 9999
      };
      AzurePlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.count === msg.messageCount);
    });

    it('should set class low if messageCount is 1', function() {
      var widget = getTestWidget();
      var msg = {
        messageCount: 1
      };
      AzurePlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'low');
    });

    it('should set class low-mid if messageCount is 26', function() {
      var widget = getTestWidget();
      var msg = {
        messageCount: 26
      };
      AzurePlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'low-mid');
    });

    it('should set class mid if messageCount is 300', function() {
      var widget = getTestWidget();
      var msg = {
        messageCount: 300
      };
      AzurePlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'mid');
    });

    it('should set class high if messageCount is above 500', function() {
      var widget = getTestWidget();
      var msg = {
        messageCount: 501
      };
      AzurePlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'high');
    });
  });
});
