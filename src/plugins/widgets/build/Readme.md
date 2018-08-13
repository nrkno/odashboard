# Build widget

The Build widget is compatible with generic sources that supply odashboard build-messages. Currently only the teamcity-source. Jenkis source will soon be available. It displays build status.

You can also specify a small widget by defining `options.displayStyle: 'small'`.

Use *widgetType* 'build' to specify a Build widget, as below:

```
  {
    plugin: 'generic',
    widgetType: 'build',
    datasourceId: 'teamcity',
    name: 'build',
    id: 'NrkNoEtl_CorpusGenerator',
    options: {
      displayStyle: 'small'
    }
  }
```

See also [widgets](../).
