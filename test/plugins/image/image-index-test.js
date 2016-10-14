var assert = require('assert');
var ImagePlugin = require('../../../src/plugins/image/index');

describe('Image Plugin', function() {

  describe('createImageWidget', function() {
    it('should return valid widget', function() {

      var widgetConfig = {
        plugin: 'image',
        src: 'http://gfx.nrk.no/1Mm7ORnX03oot9LiCWFW8AUa6EB6XNteXjfB7JAL6D4A',
        width: 400,
        height: 250,
        updateInterval: 2000
      };

      var widget = ImagePlugin.createImageWidget(widgetConfig);
      assert(widget.plugin === 'image');
      assert(widget.width === widgetConfig.width);
      assert(widget.height === widgetConfig.height);
      assert(widget.src === widgetConfig.src);
      assert(widget.originalSource === widgetConfig.src);
    });
  });
});
