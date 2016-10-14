# Chart plugin

The chart plugin can be used to draw graphs with data from json endpoints. The chart plugin is built
with [ChartJs](http://www.chartjs.org/).

## Datasource config

A chart plugin datasource is an url. The url should address a json endpoint.

```
    healthcheck: {
        id: "myChartDatasource",
        plugin: "chart",
        updateInterval: 30000,
        auth: {
          type: "none"
        },
        url: "http://localhost:3000/test"
    },
```

## Widget config

The chart plugin currently supports the following chart types from ChartJs:
* line

This is an example of widget config for a line chart:

```
{
    plugin: "chart",
    datasourceId: "myChart",
    chartType: "line",
    width: "420px",
    height: "210px",
    options: {
      chartLabel: "My data",
      valueField: "number", // use whitespace
      timeSeriesLength: 30
    }
}
```

The chart widget config has the following mandatory fields, common for all chart types:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| plugin      |String| Type of plugin, must be "chart" | no |
| datasourceId     |String|The id of the datasource, must correspond to an available chart datasource|   no |
| chartType     |String|Type of chart (line) |   no |
| width |String| The width of the widget (in px, % or em) | no |
| height |String| The height of the widget (in px, % or em)| no |
| options |Object| Chart type specific options | no |

### Line chart options

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| valueField     |String|Field in json from which datapoints are parsed from |   no |
| chartLabel     |String|Title for this chart|   no |
| timeSeriesLength     |Number|How many datapoints should be drawn in chart. The line chart will be a sliding window over `#timeSeriesLength` latest values  |   no |
| yMin     |Number|	User defined minimum number for the yAxes scale.  |  yes |
| yMax     |Number|	User defined maximum number for the yAxes scale.  | yes |
| chartOptions     |Object|A [ChartJs option](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options) object for all your special needs. Overwrites all default options.  |   yes |
| datasetOptions     |Object|A [ChartJs line dataset option object](http://www.chartjs.org/docs/#line-chart-dataset-structure) object for all your special needs. Overwrites all default options.   |   yes |
