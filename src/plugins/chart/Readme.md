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
* pie

The chart widget config has the following mandatory fields, common for all chart types:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| plugin      |String| Type of plugin, must be "chart" | no |
| datasourceId     |String|The id of the datasource, must correspond to an available chart datasource|   no |
| chartType     |String|Type of chart (line/pie) |   no |
| width |String| The width of the widget (in px) | no |
| height |String| The height of the widget (in px)| no |
| options |Object| Chart type specific options | no |

Base widget config for the Chart plugin:

```
{
    plugin: "chart",
    datasourceId: "myChartDatasource",
    chartType: "", // set to chart type
    width: "420px",
    height: "210px",
    options: {
      // chart type specific options
    }
}
```

### Line chart

The line chart options object has the following fields:

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
    plugin: "chart",
    datasourceId: "myChartDatasource",
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

### Pie chart

The pie chart options object has the following fields:

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
  plugin: 'chart',
  datasourceId: 'myChartDatasource',
  chartType: 'pie',
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
  plugin: 'chart',
  datasourceId: 'myChartDatasource',
  chartType: 'pie',
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
