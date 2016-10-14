var assert = require('assert');
var IframePlugin = require('../../../src/plugins/iframe/index');

describe('IframePlugin Plugin', function() {

  describe('createIframePlugin', function() {
    it('should return valid widget', function() {

      var widgetConfig = {
        plugin: 'iframe',
        datasourceId: '',
        src: 'http://iframe.com/dir',
        width: 600,
        height: 200,
        updateInterval: -1
      };

      var widget = IframePlugin.createIframeWidget(widgetConfig);
      assert(widget.plugin === 'iframe');
      assert(widget.width === widgetConfig.width);
      assert(widget.height === widgetConfig.height);
      assert(widget.src === widgetConfig.src);
      assert(widget.originalSource === widgetConfig.src);
    });
  });
});
