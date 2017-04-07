# String widget.

The String widget displays a string as-is. If it is given a value that is not a string, it will convert it to a string representation.

Set *widgetType* to 'string' to use the String widget. It is also the default widget for the generic plugin, which means it will be used if you don't specify any *widgetType*.

```
{
  plugin: 'generic',
  widgetType: 'string',
  datasourceId: 'MyDatasource',
  displayName: 'Something',
  fieldName: 'foo'
}
```

See also [widgets](../).
