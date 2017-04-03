# Data sources.

The generic Odashboard plugin can be used with a number of data sources out of the box, and it should be straightforward to write additional data sources. 

Currently, the plugin works with the following data sources:

* JSON endpoint
* Azure Service Bus
* Application Insights REST API

You need to specify the type of data source in the 'source' property, and to provide data source-specific information in the 'config' property.

## JSON endpoint

To specify a JSON endpoint datasource, use 'json-endpoint' for the 'source' property in your server configuration. In the 'config' property, include the url to the JSON endpoint. 

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

## Azure Service Bus

To specify a Azure Service Bus datasource, use 'azure-servicebus' for the 'source' property in your server configuration. In the 'config' property, you must include topic, subscription, and namespace, as well as the SAS key name and key. 

```
{
  id: 'MyAzureServiceBus',
  plugin: 'generic',
  updateInterval: 10000,
  timeout: 8000,
  source: 'azure-servicebus',
  config: {
    topic: 'topic',
    subscription: 'subscription',
    namespace: 'namespace',
    sasKeyName: 'keyName',
    sasKey: 'key'
  }
}
```

## Application Insights REST API

To specify an Application Insights REST API datasource, use 'app-insights' for the 'source' property in your server configuration. Use the 'config' property to specify appid, apikey, endpoint, HTTP method and parameters as appropriate. 

The endpoint property must be one of the supported endpoints specified by the Application Insights REST API:

* /metrics
* /metrics/metadata 
* /events
* /events/$metadata 
* /query
* /query/schema

See the Application Insights REST API documentation for details.

```
{
  id: 'MyAppInsightsSource',
  plugin: 'generic',
  updateInterval: 10000,
  timeout: 10000,
  source: 'app-insights',
  config: {
    appid: 'appid',
    apikey: 'apikey',
    endpoint: '/query',
    method: 'GET',
    parameters: {
      'timespan': 'PT3H',
      'query': 'query'
    }
  }
}
```

The data source produces a JSON object similar to this:
```
{
  values: [
    { 
      col0: val00,
      col1: val01
    },
    { 
      col0: val10,
      col1: val11
    }
  ]
}
```
