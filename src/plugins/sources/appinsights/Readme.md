# Application Insights REST API datasource

Use the Application Insights REST API datasource to retrieve real time data from App Insights.

# Config
Set source to `app-insights`. Add the following proporties:

| Config property | Description |
|--------|-------------|
|appid|Your App ID|
|apikey|Your API key|
|method|Usually`'GET`|
|endpoint|The endpoint property must be one of the supported endpoints specified by the Application Insights REST API|
|parameters|Object of url parameters, as supported by `endpoint`|

### Endpoint
The endpoint property must be one of the supported endpoints specified by the Application Insights REST API:

* /metrics
* /metrics/metadata 
* /events
* /events/$metadata 
* /query
* /query/schema

[See the Application Insights REST API documentation for details.](https://dev.applicationinsights.io/reference)

## Example
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
