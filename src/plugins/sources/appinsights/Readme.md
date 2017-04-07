# Application Insights REST API datasource

To specify an Application Insights REST API datasource, use 'app-insights' for the *source* property in your server configuration. Use the *config* property to specify appid, apikey, endpoint, HTTP method and parameters as appropriate. 

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

See also [data sources](../).
