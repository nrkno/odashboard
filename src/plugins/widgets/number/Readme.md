# Number widget.

The Number widget displays a number as-is. If it is given a value that is not a number, it will try to convert it to a number. If the conversion fails, the value will be 0. 

Use the *widgetType* 'number' to use the Number widget.

```
{
  plugin: 'generic',
  widgetType: 'number',
  datasourceId: 'MyDatasource',
  displayName: 'Something',
  fieldName: 'foo'
}
```

See also [widgets](../).
