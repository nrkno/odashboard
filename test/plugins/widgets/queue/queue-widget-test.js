var assert = require('assert');
var QueueWidget = require('../../../../src/plugins/widgets/queue/widget.js');

var widgetConfig = {
  plugin: 'generic',
  widgetType: 'queue',
  datasourceId: '1',
  displayName: 'My queue',
  fieldName: 'foo'
};

var widgetThresholdConfig = {
  plugin: 'generic',
  widgetType: 'queue',
  datasourceId: '1',
  displayName: 'My queue',
  fieldName: 'foo',
  thresholds: {
    low: 100,
    lowMid: 200,
    mid: 300
  }
};

describe('QueueWidget', function() {

  describe('QueueWidget constructor', function() {
    it('should return valid widget given valid config', function() {

      var widget = new QueueWidget(widgetConfig);

      assert(widget.plugin === 'generic');
      assert(widget.widgetType === 'queue');
      assert(widget.datasourceId === widgetConfig.datasourceId);
      assert(widget.displayName === widgetConfig.displayName);
      assert(widget.thresholds != undefined);
      assert(widget.thresholds.low == 25);
      assert(widget.thresholds.lowMid == 100);
      assert(widget.thresholds.mid == 500);
      assert(widget.count != undefined);
      assert(widget.class != undefined);
    });

    it('should return valid widget given valid config #2', function() {
      
      var widget = new QueueWidget(widgetThresholdConfig);

      assert(widget.plugin === 'generic');
      assert(widget.widgetType === 'queue');
      assert(widget.datasourceId === widgetConfig.datasourceId);
      assert(widget.displayName === widgetConfig.displayName);
      assert(widget.thresholds != undefined);
      assert(widget.thresholds.low == 100);
      assert(widget.thresholds.lowMid == 200);
      assert(widget.thresholds.mid == 300);
      assert(widget.count != undefined);
      assert(widget.class != undefined);
    });    
  });

  describe('QueueWidget.update', function() {
    it('should set widget count on update', function() {
      var widget = new QueueWidget(widgetConfig);
      widget.update(100);
      assert(widget.count === 100);
    });

    it('should set correct class on update', function() {
      var widget = new QueueWidget(widgetConfig);
      widget.update(10);
      assert(widget.class === 'low');

      widget.update(77);
      assert(widget.class === 'low-mid');

      widget.update(101);
      assert(widget.class === 'mid');

      widget.update(1000);
      assert(widget.class === 'high');
    });
    

  });
});
