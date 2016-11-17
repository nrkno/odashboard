var pluginHelper = require('../plugin-helper');
var IFramePlugin = (function () {

  var module = {};

  module.createIframeWidget = function(widget) {
    return {
      plugin: 'iframe',
      originalSource: widget.src,
      src: widget.src,
      width: widget.width,
      height: widget.height
    };
  };

  module.createWidget = function (config) {
    var widget = this.createIframeWidget(config);
    if (config.updateInterval != undefined && config.updateInterval != -1) {
      setInterval(function() {
        var srcWithSalt = pluginHelper.addSaltToSrc(widget.originalSource);
        widget.src = srcWithSalt;
      }, config.updateInterval);
    }
    console.log(widget);
    return widget;
  };

  return module;
}());

module.exports = IFramePlugin;
