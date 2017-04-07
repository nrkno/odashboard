# Data sources.

The generic Odashboard plugin can be used with a number of data sources out of the box, and it should be straightforward to write additional data sources. 

Currently, the plugin works with the following data sources:

* [JSON endpoint](jsonendpoint)
* [Azure Service Bus](azureservicebus)
* [Application Insights REST API](appinsights)

You need to specify the type of data source in the 'source' property, and to provide data source-specific information in the 'config' property.
