# JSON endpoint datasource.

Use a JSON endpoint to retrieve JSON-data from urls. 


## Config
Set source to `json-endpoint`

| Property | Description |
|--------|-------------|
|url|url of endpoint|


## Example 
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
