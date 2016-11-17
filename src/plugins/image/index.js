var pluginHelper = require('../plugin-helper');
var ImagePlugin = (function() {

  var module = {};

  module.createImageWidget = function (widget) {
    return {
      plugin: 'image',
      originalSource: widget.src,
      src: widget.src,
      width: widget.width,
      height: widget.height
    };
  };

  module.createWidget = function(config) {
    var widget = this.createImageWidget(config);
    if (config.updateInterval != -1) {
      setInterval(function() {
        var srcWithSalt = pluginHelper.addSaltToSrc(widget.originalSource);
        widget.src = srcWithSalt;
      }, config.updateInterval);
    }
    return widget;
  };

  return module;
}());

module.exports = ImagePlugin;
