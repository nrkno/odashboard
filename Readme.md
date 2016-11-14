![Example](public/img/odashboard-logo-alt-128x92.png?raw=true "Odashboard") Odashboard [![Build Status](https://travis-ci.org/nrkno/odashboard.svg?branch=master)](https://travis-ci.org/nrkno/odashboard)
===

A configurable dashboard with a simple plugin architecture. Written in Node.js with Express, Socket.io and Angular.

> npm install

> npm run test

> npm run build

> nodemon app.js

The application answers on port 3000.

How it may look:
![Example](public/img/screenshot01.PNG?raw=true "An example dashboard")

## Why another dashboard?

Odashboard origins from a hackathon at NRK. We wanted to display build information from TeamCity together with queue information from RabbitMQ on a big screen in our office. Instead of looking to existing open source dashboards like Dashing, we wanted to get some experience with Node.js, and thus Odashboard was born. At first it was a hard coded mess, but over time it evolved to the plugin oriented configurable application it is today. And then we thought other people might enjoy it as much as we do, so we open sourced it.

The strength of Odashboard is that you can get your dashboard up and running in minutes, and all you need to do is edit some config files. Try it out!

## How to initialize odashboard

To configure your dashboard you need to edit two files:

* In `config/clientconfig.js` you define your widgets and their properties.
* In `config/serverconfig.js` you define the datasources to your widgets.

Most widgets need a compatible datasource to run, but some (like the iframe-plugin) only need you to define a widget.

## Plugins
The current list of available plugins:

| Plugin | Description |
|--------|-------------|
|[Simple](src/plugins/simple)|Display strings, numbers, booleans and images from Json Rest API endpoints|
|[Chart](src/plugins/chart)|Draw charts from data in Json Rest API endpoints|
|[Image](src/plugins/image)|Show image from url|
|[IFrame](src/plugins/iframe)|Embed an external web resource in an iframe|
|[TeamCity](src/plugins/teamcity)|Display TeamCity build information|
|[RabbitMQ](src/plugins/rabbitmq)|Display number of message in a RabbitMQ queue |
|[Azure Service Bus](src/plugins/azure-servicebus)|Display number of messages on an Azure Service Bus topic subscription|

Each plugin is documented in [the plugin folder](src/plugins/)

### How to setup widgets
Widgets are defined in `config/clientconfig.js`. Each widget is defined as a json-object with the following fields:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| plugin      |String| The type of plugin, must correspond to one the available plugins | no |
| datasourceId     |String|The id of the datasource, must correspond to an available datasource|   no |
| url     |String|An url to where you should be taken if you click the widget| yes (default value: #) |
| width |String| The width of the widget (in px, % or em) | yes (default value: 20%) |
| height |String| The height of the widget (in px, % or em)| yes (default value: 100%) |

In addition each plugin may have it's own fields. Default values are defined in `widgetDefaults` in `config/appconfig.js`

This is an example config for a widget using the Simple-plugin:
```
var myWidget = {
    plugin: "simple"
    datasourceId: "myDataSource1",
    url: "http://moreinfoaboutmywidget.com",
    // Plugin specific fields
    displayName: "Look ma, a widget",
    fieldName: "field",
    fieldType: "boolean"
 }
```

#### Tabs and rows
To make the widget available you need to add it to a row in the dashboard. A row has an array of widgets. A row is defined like this:
```
var myFirstRow = {
    title: "My widgets",
    widgets: [myWidget, myOtherWidget]
}
```

The rows in turn need to be included in the dashboardConfig-object. The rows can be added in two different ways, depending on if you need multiple tabs (pages) in your dashboard or not.

If you only want one page, you can add the rows directly in the `rows`-field.
```
var dashboardConfig = {
    title: "My Dashboard",
    rows: [myRow, mySecondRow]
};
```

If you have so many widgets that you need multiple pages, define an array of row-arrays in the `tabs`-field:
```
var dashboardConfig = {
    title: "My Dashboard",
    tabs: [
      [myFirstRow, mySecondRow],
      [pageTwoRow, pageTwoSecondRow]
    ]
};
```

If both `tabs` and `rows` are present, `tabs` will be used.

### Setup datasources
Datasources are defined in `config/serverconfig.js`. Each datasource is defined as a json-object with the following fields:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| id      |String| The id of the datasource. Must be unique.  | no |
| plugin     |String|The type of plugin, must correspond to one the available plugins|   no |
| updateInterval |Number| How often update the dashboard in ms | no |
| timeout |Number|How long in ms before a request to the datasource should timeout| yes (default value: 1500)|
| auth |Object | What authentication the datasource should utilize in its web requests, see next section for details | yes (default value: undefined) |

A datasource has an id, a plugin, and an updateInterval. In addition each plugin will have it's own specific fields. In this example we use the Simple-plugin, which only has a url. Notice how the id corresponds to the datasourceId in our widget above.

```
{
    id: "myDataSource1",
    plugin: "simple",
    updateInterval: 6000,
    timeout: 2500,
    auth: undefined,

    // Plugin specific fields
    url: "http://myhost.com/myapi/test"
}

```

#### Datasources Authentication

Odashboard supports basic authentication, ntlm and header api keys. To use the authentication you must first define the auth object in the datasource.

For Basic autentication, set the type to `basic` and provide `username` and `password` in the options-object.

Basic auth example:
```
auth: {
  type: "basic",
  options: {
    username: 'user',
    password: 'password'
  }
}

```

For Api-keys, set the type to `apiKey`. In the options object you should provide your key in the `key` field. Because the field to provide API-keys vary from API to API, you must also provide what header field to put it under in the `headerName` field.

Api key example:
```
auth: {
  type: "apiKey",
  options: {
    key: 'mySecretKey',
    headerName: 'X-Api-Key'
  }
}

```

For NTML you must set the type to `ntlm`. In the options object you must provide `username`, `password`, `domain` and `workstation`. The NTLM auth is built using the [httpntlm package](https://www.npmjs.com/package/httpntlm).

NTML example:

```
auth: {
  type: "ntlm",
  options: {
    username: 'user',
    password: 'password',
    domain: 'WORKGROUP',
    workstation: 'MY-COMPUTER'
  }
}

```

# Create your own plugins

You can make your own plugins to odashboard. Loading of a plugin is convention based,
using the *name* as key. In order for the plugin to be loaded correctly you need to follow the naming convention strictly.

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
  setInterval(function() {
    var eventId = datasource.plugin + "." + datasource.id;

    // Here you refresh your data, and send it to the clients.

    io.emit(eventId, "My data")
  }, datasource.updateInterval);
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
