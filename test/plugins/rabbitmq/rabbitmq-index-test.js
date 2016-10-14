var assert = require('assert');
var RabbitMQPlugin = require('../../../src/plugins/rabbitmq/index');

function getTestWidget() {
  return {
    'plugin': 'rabbitmq',
    datasourceId: 'datasourceId',
    count: 0,
    'class': 'low'
  };
}
describe('RabbitMQ Plugin', function() {

  describe('createAzureServicebusWidget', function() {
    it('should return valid widget', function() {

      var widgetConfig = {
        plugin: 'rabbitmq',
        datasourceId: 'azure1',
        displayName: 'My Queue',
      };

      var widget = RabbitMQPlugin.createQueueWidget(widgetConfig);
      assert(widget.plugin === 'rabbitmq');
      assert(widget.datasourceId === widgetConfig.datasourceId);
      assert(widget.count != undefined);
      assert(widget.class != undefined);
    });
  });

  describe('parseMsg', function() {
    it('should set widget count', function() {
      var widget = getTestWidget();
      var msg = {
        messages: 9999
      };
      RabbitMQPlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.count === msg.messages);
    });

    it('should set class low if messages is 1', function() {
      var widget = getTestWidget();
      var msg = {
        messages: 1
      };
      RabbitMQPlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'low');
    });

    it('should set class low-mid if messages is 26', function() {
      var widget = getTestWidget();
      var msg = {
        messages: 26
      };
      RabbitMQPlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'low-mid');
    });

    it('should set class mid if messages is 300', function() {
      var widget = getTestWidget();
      var msg = {
        messages: 300
      };
      RabbitMQPlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'mid');
    });

    it('should set class high if messages is above 500', function() {
      var widget = getTestWidget();
      var msg = {
        messages: 501
      };
      RabbitMQPlugin.parseMsg(JSON.stringify(msg), widget);
      assert(widget.class === 'high');
    });
  });
});
