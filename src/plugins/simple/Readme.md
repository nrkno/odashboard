# Simple plugin

The standard plugin in Odashboard. Can be used to display simple values from http json endpoints.

## Datasource config

A simple plugin datasource is an url. The url should address a json endpoint.

```
    healthcheck: {
        id: "simple_1",
        plugin: "simple",
        updateInterval: 60000,
        auth: {
          type: "none"
        },
        url: "http://myserver/api/my/specific/endpoint"
    },
```


## Widget config

The simple plugin currently supports these datatypes:
* boolean
* number
* image
* string

In the widget config you need to specify the fieldType and the fieldName. The fieldType is one of the datatypes above. It describes how the data should be interpreted and viewed on the dashboard. The fieldName describes what node of the json-object we will read data from. It is a whitespace seperated string denoting how to traverse the json-object returned from the url-endpoint defined in the datasource.
```
{
    plugin: "simple",
    datasourceId: "simple_1",
    displayName: "Model up to date",
    fieldName: "path to fieldname ", // use whitespace
    fieldType: "boolean"

}
```

The reason for using whitespace "path to fieldname" instead of dots "path.to.fieldname" is that dot (.) is a perfectly valid character in the name of a node. For instance: "this.is.one.node this.is.the.second.node third fourth".

## Example

Let's say we have a datasource with id="server-status", and that it returns the following json-object.
```
{
    status: "OK",
    server: {
        hostname: "some-api.nrk.no",
        detailedInfo:
        {
            requests: {
                healthy: true,
                uptime: 523232,
                meanRequestResponseTime: 0.023,
                numRequests: 2253
            }           
        }
    }
}
```

If we wanted to display the current number of requests we would configure the widget like this:

```
{
    plugin: "simple",
    datasourceId: "server-status",
    displayName: "Number of requests",
    fieldName: "server detailedInfo requests numRequests",  
    fieldType: "number"
}
```

If we wanted to display the current health:

```
{
    plugin: "simple",
    datasourceId: "server-status",
    displayName: "Healthy",
    fieldName: "server detailedInfo requests healthy",
    fieldType: "boolean"   
}
```

### Timestamp
All the simple plugin types display a timestamp from when they were last updated.
