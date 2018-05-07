
# Plugins

| Plugin | Description |
|--------|-------------|
|[Generic](generic)|Generic plugin for combining data sources and widgets|
|[IFrame](iframe)|Embed an external web resource in an iframe|
|[TeamCity](teamcity)|Display TeamCity build information|

A plugin is a combination of a datasource and one or more widgets. A datasource is only compatible with widgets from the same plugin. The generic plugin has a lot of datasources and a lot of widgets that play well together. The TeamCity-plugin only have one datasource and one widget. The Iframe plugin is only a widget.

# Create your own plugins

*If you only need to support a new kind of data, implementing a [new generic datasource](sources) might be a better choice.*

Implementing a new plugin is easy. Loading of a plugin is convention based, using the *name* as key. In order for the plugin to be loaded correctly you need to follow the naming convention strictly.

Note: The plugin *name* needs to be included in the enabledPlugins array of `config/appconfig.js` to be loaded.

A plugin needs to consists of at least the following files:

```
src/plugins/name/index.js
src/plugins/name/public/name.html
src/plugins/name/public/name.css

```

`ìndex.js` is where you define the behavior of your client side widget. `name.html` defines
how to draw the widget to the dashboard with the style from `name.css`

The following files are optional, but strongly encouraged:

```
src/plugins/name/server.js
src/plugins/name/validator.js
```

`server.js` defines your serverbased logic. `validator.js` will be called on startup
to ensure all datasources and widgets related to your plugin are properly configured.

## Client side requirements
`index.js` must implement `createWidget`, which returns a widget. `createWidget` should also listen for socket.io events, and write the changes to the current widget.

This is a template for index.js for a plugin:

```

var PluginName = (function () {

    var module = {};

    function createNewPluginNameWidget(name, config) {
        return {
            plugin: "plugin-name",
            datasourceId: config.datasourceId,
            displayName: config.displayName,
            name: name,
            myValue: 0,
            someConfigValue: config.value
        };
    }

    function setupListener(widgetConfig, socket) {
       var listenEvent = widgetConfig.plugin + "." + widgetConfig.datasourceId;
       console.log("listening for " + listenEvent)
        socket.on(listenEvent, function (msg) {
          widget.myValue = msg;
        });
    };

    module.createWidget = function (widgetConfig, socket) {
        var widget = createNewPluginNameWidget(widgetConfig.displayName, widget);
        setupListener(widget, socket)
        return widget;
    };

    return module;

}());

module.exports = PluginName;

```

## Server side requirements
`server.js` must implement a function `initDatasource` which setups the event emiter for a datasource. The function should implement an interval using the `datasource.updateInterval`, get the updated data it needs, and emit it in an event.

This is a template server.js for a plugin:

```
var exports = module.exports = {};

function initDatasource(datasource, io) {
  function refresh() {
    var eventId = datasource.plugin + "." + datasource.id;

    // Here you refresh your data, and send it to the clients.

    io.emit(eventId, "My data")
  }
  // set interval and fetch initial data
  setInterval(refresh, datasource.updateInterval);
  refresh();
}

exports.name = "plugin-name";
exports.initDatasource = initDatasource;

```

There is a custom httpclient defined in httpclient.js which we encourage you to use for http requests. This supports Basic and NTLM authentication and also wraps a normal http request without authentication.

The client can be used from any server side plugin by using require like so:
```
httpclient = require('../../../httpclient');
httpclient.get(datasource, callback);
```

## Validator

Create a file named validator.js to validate datasources and widget related to your plugin.
The module needs to export two functions: `validateDatasource` and `validateWidget`. Both
will be called upon startup of the application for all datasources and widgets which
use your plugin.

In the two functions you should implement assertions to ensure all plugin specific fields are setup correctly.

This is an example validator:


```
const assert = require('assert');

function validateDatasource(datasource) {
  assert(datasource.url !== undefined, `Missing url for pluginName datasource with id = ${datasource.id}`)
}

function validateWidget(widget) {
  assert(widget.displayName !== undefined,
    `Missing displayName for pluginName widget with datasource id = ${widget.datasourceId}`)
  assert(widget.fieldName !== undefined,
    `Missing fieldName for pluginName widget with datasource id = ${widget.datasourceId}`)
  assert(widget.fieldType !== undefined,
    `Missing fieldType for pluginName widget with datasource id = ${widget.datasourceId}`)
}

var exports = module.exports = {};
exports.validateDatasource = validateDatasource;
exports.validateWidget = validateWidget;
```

# Deprecated plugins

The plugins below are still available, but we recommend you to use the [Generic plugin](generic) instead. 

| Plugin | Description |
|--------|-------------|
|[Azure Service Bus](azure-servicebus)|Display number of messages on an Azure Service Bus topic subscription|
|[Google Analytics](google-analytics)|Display real-time data from Google Analytics|
|[Simple](simple)|Display strings, numbers, booleans and images from Json Rest API endpoints|
|[Image](image)|Show image from url|
|[Chart](chart)|Draw charts from data in Json Rest API endpoints|
|[RabbitMQ](rabbitmq)|Display number of message in a RabbitMQ queue |
