# Pie Chart widget.

The Pie Chart widget can be used to draw line charts for your data. The Line Chart widget is built with [ChartJs](http://www.chartjs.org/).

The widget config has the following mandatory fields:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| plugin      |String| Type of plugin, must be "generic" | no |
| widgetType  |String| Type of widget, must be "piechart" | no |
| datasourceId     |String|The id of the datasource|   no |
| width |String| The width of the widget (in px) | no |
| height |String| The height of the widget (in px)| no |
| options |Object| Pie chart specific options | no |

The options object has the following fields:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| valueField     |String|Field in json from which datapoints are parsed from. Can be a single string to extract an array from the json result, or an array of strings to refer to a group of different values in the json result.|   no |
| labelField     |String|Field in json from which labels are parsed from. Can be skipped if you define `labels` instead. |   yes |
| labels     |Array|Array of labels. Use this if the labels can not be parsed from the json result. If both `labelField` and `labels` is defined, `labels` will be used. |   yes |
| displayName     |String|Title for this chart|   no |
| chartOptions     |Object|A [ChartJs option](http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options) object for all your special needs. Overwrites all default options.  |   yes |
| datasetOptions     |Object|A [ChartJs line dataset option object](http://www.chartjs.org/docs/#doughnut-pie-chart-dataset-structure) object for all your special needs. Overwrites all default options.   |   yes |

This is an example of widget config for a pie chart which use an array of values and an array of labels from the json result:

```
{
  plugin: 'generic',
  widgetType: 'piechart',
  datasourceId: 'myChartDatasource',
  width: '320px',
  height: '320px',
  options: {
    displayName: 'Animal Frequency',
    valueField: 'info history animalFrequency',
    labelField: 'info history animalNames'
  }
}
```

This is an example of a widget config use extract a set of fields from the json result, and define labels directly:
```
{
  plugin: 'generic',
  widgetType: 'piechart',
  datasourceId: 'myChartDatasource',
  width: '320px',
  height: '320px',
  options: {
    displayName: 'Animal Frequency',
    valueField: [
      'info history elephant',
      'info history giraffe',
      'info history mouse',
    ],
    labels: ['Elephant', 'Giraffe', 'Mouse']
  }
}
```
