# Generic plugin

A flexible plugin for combining a datasource and a widget. It can be used to display a variety of values from a variety of sources. Obviously the data served by the datasource must be made to fit the data expected by the widget.

## Datasource config

The kind of datasource to use with the generic plugin is specified with the source property in the serverconfig. Configuration for the data source is given in the config property, and will vary depending on the particular data source. For instance, if the data source is a JSON endpoint, the *config* will contain the URL for the endpoint.

```
    plugin: 'generic',
    source: 'json-endpoint',
    config: {
      url: 'http://localhost:8080/endpoint/'
    }
```

For details about data sources, see [data sources](../sources).

## Widget config

The kind of widget to use with the generic plugin is specified with the *widgetType* property in the clientconfig. Any configuration for the widget is given in the *config* property, and may vary depending on the particular widget.

```
    plugin: 'generic',
    widgetType: 'queue',
    displayName: 'Something',
    fieldName: 'foo'
```

For details about widgets, see [widgets](../widgets).
