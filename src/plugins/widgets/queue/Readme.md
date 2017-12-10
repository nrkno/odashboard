# Queue widget.

The Queue widget displays the number of messages on a message queue, along with a color describing state of the queue (low, low-mid, mid, high- number of messages).

Use the *widgetType* 'queue' to use the Queue widget.

```
{
  plugin: 'generic',
  widgetType: 'queue',
  datasourceId: 'MyDatasource',
  displayName: 'Something',
  fieldName: 'foo'
}
```

You can also adjust the thresholds for which the widget should report `low`, `low-mid`, `mid`, `high` number of messages. The standard values are:

* Low < 25
* Low-mid < 100
* Mid < 500
* High >= 500

You can change the thresholds by adding a threshold-property to the config:

```
{
  plugin: 'generic',
  widgetType: 'queue',
  datasourceId: 'MyDatasource',
  displayName: 'Something',
  fieldName: 'foo',
  thresholds: {
    low: 1000,
    lowMid: 2000,
    mid: 5000
  }
}
```

See also [widgets](../).
