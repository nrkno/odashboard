# Generic plugin

A flexible plugin for combining a datasource and a widget. Can be used to display a variety of values from a variety of sources. Obviously the data served by the datasource must be made to fit the data expected by the widget.

## Datasource config

The kind of datasource to use with the generic plugin is specified with the source property in the serverconfig. Configuration for the data source is given in the config property, and will vary depending on the particular data source. For instance, if the data source is a JSON endpoint, the config will contain the URL for the endpoint.


```
    plugin: 'generic',
    source: 'json-endpoint',
    config: {
      url: 'http://localhost:8080/endpoint/'
    }
```


## Widget config

The kind of widget to use with the generic plugin is specified with the widget property in the clientconfig. Any configuration for the widget is given in the config property, and may vary depending on the particular widget. 

The generic plugin currently supports these widgets:

* simple
* queue
* charts (line, pie)

In the widget config you need to specify the fieldType and the fieldName. The fieldType is one of the datatypes above. It describes how the data should be interpreted and viewed on the dashboard. The data contract between the server and the widget is a JSON object. The fieldName property is a selector that describes what node of the JSON object we will read data from. It is a whitespace separated string denoting how to traverse the JSON object returned from the url-endpoint defined in the datasource.
```
{
    plugin: "generic",
    datasourceId: "my-json-endpoint",
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
    plugin: "generic",
    widgetType: "simple",
    datasourceId: "server-status",
    displayName: "Number of requests",
    fieldName: "server detailedInfo requests numRequests",  
    fieldType: "number"
}
```

If we wanted to display the current health:

```
{
    plugin: "generic",
    widgetType: "simple",
    datasourceId: "server-status",
    displayName: "Healthy",
    fieldName: "server detailedInfo requests healthy",
    fieldType: "boolean"   
}
```
