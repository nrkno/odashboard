# Line Chart widget.

The Line Chart widget can be used to draw line charts for your data. The Line Chart widget is built with [ChartJs](http://www.chartjs.org/).

The widget config has the following mandatory fields:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| plugin      |String| Type of plugin, must be "generic" | no |
| widgetType  |String| Type of widget, must be "linechart" | no |
| datasourceId     |String|The id of the datasource|   no |
| width |String| The width of the widget (in px) | no |
| height |String| The height of the widget (in px)| no |
| options |Object| Line chart specific options | no |

The options object has the following fields:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| valueField     |String|Field in json from which datapoints are parsed from |   no |
| chartLabel     |String|Title for this chart|   no |
| timeSeriesLength     |Number|How many datapoints should be drawn in chart. The line chart will be a sliding window over `#timeSeriesLength` latest values  |   no |
| yMin     |Number|	User defined minimum number for the yAxes scale.  |  yes |
| yMax     |Number|	User defined maximum number for the yAxes scale.  | yes |
| chartOptions     |Object|A [ChartJs option](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options) object for all your special needs. Overwrites all default options.  |   yes |
| datasetOptions     |Object|A [ChartJs line dataset option object](http://www.chartjs.org/docs/#line-chart-dataset-structure) object for all your special needs. Overwrites all default options.   |   yes |

This is an example of widget config for a line chart:

```
{
    plugin: "generic",
    widgetType: "linechart",
    datasourceId: "myChartDatasource",
    width: "420px",
    height: "210px",
    options: {
      chartLabel: "My data",
      valueField: "number", // use whitespace
      timeSeriesLength: 30
    }
}
```

See also [widgets](../).
