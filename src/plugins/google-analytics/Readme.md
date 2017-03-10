# Google Analytics Plugin
Show realtime Google Analytics data. See [Realtime API doc](https://developers.google.com/analytics/devguides/reporting/realtime/v3/reference/) for reference.

## Datasource config

To configure a Google Analytics you need to add a new datasource to the list of datasources in serverconfig.js.

```
{
  id: 'ga',
  plugin: 'google-analytics',
  updateInterval: 20000,
  keyFile: 'my-analytics-key-f405678e1f65',
  viewId: 'ga:XXXXX',
  metric: 'rt:activeUsers',
  dimension: 'rt:eventAction',
  filters: 'rt:eventCategory==content-impressions'
}
```

Google Analytics plugin specific fields:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| keyFile     |String| Name of key file placed in ./config folder |   no |
| viewId     |String| The id of the view |   no |
| metric     |String| An analytics metrics. E.g., 'rt:activeUsers'. |   no |
| dimension     |String| A real-time dimension. |  yes |
| filters     |String|A comma-separated list of dimension or metric filters to be applied to real-time data. E.g., 'rt:country==Norway'.|   yes |

### Metric
Metrics represent the values that you're measuring. The most used are `rt:activeUsers` and `rt:totalEvents`. See the [GA doc](https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/) for a complete reference of all possible real-time metrics.

While the GA real-time API supports multiple metrics in one call, Odashboard only supports one.

### Dimension
Dimensions are the attributes of your events. Each event tracked in GA has a set of attributes which define it, like the location the event origined from or the device type. You can use `dimension` to drill down and look at specific segments of metrics. Unfortunatly [custom dimensions](https://support.google.com/analytics/answer/2709828?hl=en) is not supported for real-time data.

See the [GA doc](https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/) for a complete reference of all possible real-time metrics.

While the GA real-time API supports multiple dimensions in one call, Odashboard only supports one.

### Filters
You can filter on both metrics and dimensions. A comma-separated list of dimension or metric filters to be applied to real-time data.

### Keyfile / Authorization
Wondering how to get a valid key file? Do this:

#### Create service account and optain JSON key file
* Open [https://console.developers.google.com](https://console.developers.google.com), and select a project.
* Go to the [API Manager dashboard](https://console.cloud.google.com/apis/dashboard) and click on "Enable API".
* Select "Analytics API" located under "Other Popular APIs" and press "Enable".
* Select "Credentials" in the sidebar
* Press "Create credentials" and select "Service Account key" from the dropdown menu.
* Select "New service account", enter a name for it and select the role "Project → Service Account Actor".
* Remember the "Service account ID", it will be used in GA later.
* Set "Key type" to "JSON" and click "Create".
* Copy the JSON-key to the `./odashboard/config` folder.

#### Add service account as GA user
* Open Google Analytics and enter the Admin panel.
* Select "User Management", either at account- or property-level.
* Add Service account ID that you just created.


## Widget config

In the client-side config, add this as an object in row.widgets to create a Google Analytics-widget.

```
{
    plugin: 'google-analytics',
    datasourceId: 'ga',
    displayName: 'Programs started',
    dimensionValue: 'content-impression-play'
  }
```

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| plugin      |String| Type of plugin, must be "google-analytics" | no |
| datasourceId     |String|The id of the datasource, must correspond to an available chart datasource|   no |
| displayName     |String|Title to display on dashboard. |   no |
| dimensionValue     |String|A selector for a specific value in the dimension. Required if dimension is specified in the datasource.  |  yes |


# Examples
Some examples to get you started.

## Total active users

Datasource:
```
{
  id: 'ga',
  plugin: 'google-analytics',
  updateInterval: 20000,
  keyFile: 'XXXX',
  viewId: 'ga:XXXXX',
  metric: 'rt:activeUsers',
}
```

Widget:
```
{
  plugin: 'google-analytics',
  datasourceId: 'ga',
  displayName: 'Total active users'
}
  ```

Note: dimensionValue is optional in the widgetConfig as long as you don't specify a dimension in the datasource. 

## Active users on mobile

Datasource:
```
{
  id: 'ga',
  plugin: 'google-analytics',
  updateInterval: 20000,
  keyFile: 'XXXX',
  viewId: 'ga:XXXXX',
  metric: 'rt:totalEvents',
  dimension: 'rt:deviceCategory'
}
```

Widget:
```
{
  plugin: 'google-analytics',
  datasourceId: 'ga',
  displayName: 'Total mobile users',
  dimensionValue: 'MOBILE'
}
```

Note: Because we added a dimension in the datasource we need to specify a dimensionValue in the widget. This means we could make another widget if we wanted to see desktop-users:

```
{
  plugin: 'google-analytics',
  datasourceId: 'ga',
  displayName: 'Total mobile users',
  dimensionValue: 'DESKTOP'
}
```
## Events from France

Datasource:
```
{
  id: 'ga',
  plugin: 'google-analytics',
  updateInterval: 20000,
  keyFile: 'XXXX',
  viewId: 'ga:XXXXX',
  metric: 'rt:totalEvents',
  dimension: 'rt:country',
  filters: 'rt:country==France'
}
```

Widget:
```
{
  plugin: 'google-analytics',
  datasourceId: 'ga',
  displayName: 'Total events from France',
  dimensionValue: 'France'
}
```

Note: Because we added a dimension in the datasource we need to specify a dimensionValue in the widget. By adding a filter in the datasource we minimize data transffered, but the widget would also work without the filter.

