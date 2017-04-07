# JSON endpoint datasource.

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

See also [data sources](../).
