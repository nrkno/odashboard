# Data sources.

The [generic plugin](../generic) can be used with a number of data sources out of the box, and it should be straightforward to write additional data sources. 

Currently, the plugin works with the following data sources:

* [JSON endpoint](jsonendpoint)
* [Azure Service Bus](azureservicebus)
* [RabbitMQ](rabbitmq)
* [Google Analytics](google-analytics)
* [Application Insights REST API](appinsights)

## Config
For each generic datasource you need to specify the *source* property, and to provide data source-specific information in the *config* property. 

## JSON endpoint example

```
{
  id: 'MyJsonEndpoint',
  plugin: 'generic',
  updateInterval: 10000,
  timeout: 8000,
  source: 'json-endpoint',
  config: {
    url: 'http://localhost:8100/json/'
  }
}
```
