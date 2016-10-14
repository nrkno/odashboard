IFrame plugin
====
The iframe plugin can be used to display an iframe on the dashboard. The plugin does not require a datasource, and does not have server-side logic.


Client-side config
----

In the widget config you need to define the src, the width and the height of the iframe. You can set an updateInterval if you need the iframe to be refreshed, but if the iframe itself runs code that auto-refreshes the content you can set the interval to -1 to disable the odashboard-update.
```
{
    plugin: "iframe",
    datasourceId: "",
    src: "http://iframe.com/dir",
    width: 600,
    height: 200,
    updateInterval: -1
}
```
