# Generic plugin

A flexible plugin for combining a generic datasource and a widget. It can be used to display a variety of values from a variety of sources. The data served by the datasource must be made to fit the data expected by the widget.

* Details about all datasources can be found [here](../sources).
* Details about all widgets  can be found [here](../widgets).

## Available widgets and sources
The generic plugin makes it possible to use a wide range of widgets with a set of different datasources. The availabe widgets are:

| Widget type | Description |
|-------------|-------------|
| [String](../widgets/string) | Show a string |
| [Number](../widgets/number) | Show a number |
| [Timestamp](../widgets/timestamp) | Show a timestamp | 
| [Checkmark](../widgets/checkmark) | Show a checkmark | 
| [Queue](../widgets/queue) | Show the numbers of messages on a queue (with color coded warning levels) |
| [Pie chart](../widgets/piechart) | Draw a pie chart |
| [Line chart](../widgets/linechart) | Draw a line chart |

The widgets can display data from the following datasources:

| Datasource type | Description |
|-------------|-------------|
| [JSON Endpoint](../sources/json-endpoint) | Returns JSON formatted data from an url |
| [Application insights](../sources/appinsights)| Returns data from app insights | 
| [Azure service bus](../soures/azureservicebus) | Returns number of messages on an Azure service bus topic |
| [Google analytics](../sources/google-analytics)| Returns real time data from Google Analytics| 
| [RabbitMQ](../sources/rabbitmq)| Returns number of messaages on a RabbitMq queue| 


## Datasource config

The kind of datasource to use with the generic plugin is specified with the source property in the serverconfig. Configuration for the data source is given in the config property, and will vary depending on the particular data source. For instance, if the data source is a JSON endpoint, the *config* will contain the URL for the endpoint.

```
  plugin: 'generic',
  source: 'json-endpoint',
  config: {
    url: 'http://localhost:8080/endpoint/'
  }
```



## Widget config

For all generic widgets you need to specify the kind of widget to use with the *widgetType* property in the clientconfig. The remaining fields are widget-specific.

```
  plugin: 'generic',
  widgetType: 'queue',
  displayName: 'Something',
  fieldName: 'foo'
```
