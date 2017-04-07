# Checkmark widget.

The Checkmark widget expects a boolean value. It displays a green checkmark if the value is *true* and a red crossmark if it is *false* or *undefined*. It also displays a header, specifed in the *displayName* and a timestamp. 

Use *widgetType* 'checkmark' to specify a Checkmark widget, as below:

```
{
  plugin: 'generic',
  widgetType: 'checkmark',
  datasourceId: 'MyDatasource',
  displayName: 'Something',
  fieldName: 'foo'
}
```

See also [widgets](../).
