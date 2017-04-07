# Widgets.

The kind of widget to use with the [generic plugin](../generic) is specified with the *widgetType* property in the client config for the plugin. Any configuration for the widget is given in the *config* property, and may vary depending on the particular widget. If you don't specify the *widgetType* to use, the [String](string) widget is used by default.

The plugin currently supports these widgets:

* [Checkmark](checkmark)
* [String](string)
* [Number](number)
* [Timestamp](timestamp)
* [Image](image)
* [Queue](queue)
* [Pie chart](piechart)
* [Line chart](linechart)

The data contract between the server and the widget is a JSON object. By default, the JSON object will be passed as-is to the widget for display. You can use the *fieldName* property to select some property within the JSON structure. It is a whitespace separated string denoting how to traverse the JSON object to arrive at the desired property. You can also use the *transform* property to specify a function to apply to the JSON object, to map it to another JSON object. The function is applied before *fieldName* selection, so you could in principle do both.
