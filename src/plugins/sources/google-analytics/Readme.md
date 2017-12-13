# Google Analytics Realtime datasource
A datasource used to retrieve realtime Google Analytics data. See [Realtime API doc](https://developers.google.com/analytics/devguides/reporting/realtime/v3/reference/) for reference.

# Datasource config
+Set source to `google-analytics`. Add the following config proporties:

| Fields        |Type| Description           | Optional  |
| ------------- |---|:-------------:| -----:|
| keyFile     |String| Name of key file placed in ./config folder |   no |
| viewId     |String| The id of the view |   no |
| metric     |String| An analytics metric. E.g., 'rt:activeUsers'. |   no |
| dimensions     |String| A comma-separated list of real-time dimensions. |  yes |
| filters     |String|A comma-separated list of dimension or metric filters to be applied to real-time data. E.g., 'rt:country==Norway'.|   yes |

### Metric
Metric represent the values that you're measuring. The most used are `rt:activeUsers` and `rt:totalEvents`. See the [GA doc](https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/) for a complete reference of all possible real-time metrics.

While the GA real-time API supports multiple metrics in one call, Odashboard only supports one.

### Dimension
Dimensions are the attributes of your events. Each event tracked in GA has a set of attributes which define it, like the location the event origined from or the device type. You can use `dimension` to drill down and look at specific segments of metrics. Unfortunatly [custom dimensions](https://support.google.com/analytics/answer/2709828?hl=en) is not supported for real-time data.

See the [GA doc](https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/) for a complete reference of all possible dimensions.

When you specify a dimension, each distinct value of the dimension will be returned. Let's say you specify `rt:deviceCategory` as dimension like this:

 ```
  {
    config: {
      keyFile: 'my-analytics-key-f40562323f65.json',
      viewId: 'ga:50133933',
      metric: 'rt:activeUsers',
      dimensions: 'rt:deviceCategory'
    }
  }
```
The datasource will then return this:

```
{
  'rt:activeUsers:DESKTOP' : '15000',
  'rt:activeUsers:MOBILE' : '25000',
  'rt:activeUsers:TABLET' : '5000'
}
```

### Filters
You can filter on both metrics and dimensions. A comma-separated list of dimension or metric filters to be applied to real-time data.

### Keyfile / Authorization
Add a valid keyfile to the odashvoard config-directory in order to authorize with the real-time api. If you don't hva a key file, follow the instructions below:

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

# Example 

An example datasource that returns active users:

```
  {
    id: 'ga',
    plugin: 'generic',
    source: 'google-analytics',
    updateInterval: 5000,
    timeout: 1500,
    config: {
      keyFile: 'my-analytics-key-g40242323f61.json',
      viewId: 'ga:50133933',
      metric: 'rt:activeUsers'
    }
  }
```

The datasource will return a JSON-object on this format:

```
{
  'rt:activeUsers' : '24990'
}
```

# How to use with generic widgets

The simplest GA datasource will return a JSON-object like this:

```
{
  rt:activeUsers: "24990"
}
```

With this you could show the number like this:

```
    {
      plugin: 'generic',
      widgetType: 'number',
      datasourceId: 'ga',
      displayName: 'Active users',
      fieldName: 'rt:activeUsers'
    }
```

or chart it like this:

```
    {
      plugin: 'generic',
      widgetType: 'linechart',
      datasourceId: 'ga',
      displayName: 'Active users',
      fieldName: 'rt:activeUsers',
      width: '420px',
      height: '210px',
      options: {
        chartLabel: 'Active users',
        timeSeriesLength: 30
      }
    }
```
# Examples
Some example configs to get you started.

## Total active users

Datasource:
```
{
  id: 'ga',
  plugin: 'generic',
  source: 'google-analytics',
  updateInterval: 3000,
  timeout: 1500,
  config: {
    keyFile: 'XXXX',
    viewId: 'ga:XXXXX',
    metric: 'rt:activeUsers'
  }
}
```

Widget:
```
{
  plugin: 'generic',
  widgetType: 'number',
  datasourceId: 'ga',
  displayName: 'Total active users',
  fieldName: 'rt:activeUsers'
}
```

## Active users on mobile

Datasource:
```
{
  id: 'ga',
  plugin: 'generic',
  source: 'google-analytics',
  updateInterval: 3000,
  timeout: 1500,
  config: {
    keyFile: 'XXXX',
    viewId: 'ga:XXXXX',
    metric: 'rt:activeUsers',
    dimensions: 'rt:deviceCategory'
  }
  
}
```

Widget:
```
{
  plugin: 'generic',
  widgetType: 'number',
  datasourceId: 'ga',
  displayName: 'Total mobile users',
  fieldName: 'rt:activeUsers:MOBILE'
}
```

Note: Because we added a dimension in the datasource we need to extend the field name. If we wanted to see desktop users we could do:

```
{
  plugin: 'generic',
  widgetType: 'number',
  datasourceId: 'ga',
  displayName: 'Total desktop users',
  fieldName: 'rt:activeUsers:DESKTOP'
}
```

## Events from France

Datasource:
```
{
  id: 'ga',
  plugin: 'generic',
  source: 'google-analytics',
  updateInterval: 3000,
  timeout: 1500,
  config: {
    keyFile: 'XXXX',
    viewId: 'ga:XXXXX',
    metric: 'rt:totalEvents',
    dimensions: 'rt:country',
    filters: 'rt:country==France'
  }
}
```

Widget:
```
{
  plugin: 'generic',
  widgetType: 'number',
  datasourceId: 'ga ',
  displayName: 'Total events from France',
  fieldName: 'rt:totalEvents:France'
}
```

## Multiple dimensions

It is possible to drill down into multiple dimensions, like 'desktop users from France':

Datasource:
```
{
  id: 'ga',
  plugin: 'generic',
  source: 'google-analytics',
  updateInterval: 3000,
  timeout: 1500,
  config: {
    keyFile: 'XXXX',
    viewId: 'ga:XXXXX',
    metric: 'rt:activeUsers',
    dimensions: 'rt:deviceCategory,rt:country'
  }
}
```

Set the fieldName in the same order as you specified the dimensions:

Widget:
```
{
  plugin: 'generic',
  widgetType: 'number',
  datasourceId: 'ga ',
  displayName: 'Desktop users from France',
  fieldName: 'rt:activeUsers:DESKTOP:France'
}
```
