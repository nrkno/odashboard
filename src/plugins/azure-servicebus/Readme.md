# Azure Service Bus plugin

Display the number of messages on an Azure Service Bus topic subscription.
Utilizes the rest api of Azure Service Bus.

## Datasource config

To configure a connection with the Azure Service Bus you need to add a new datasource to the list of datasources in server.js.
You need one datasource per topic-subscription combination.

```
{
  id: "azure1",
  plugin: "azure-servicebus",
  updateInterval: 5000,
  topic: "topic",
  subscription: "subscription",
  namespace: "namespace",
  sasKeyName: "keyName",
  sasKey: "yourKey"
}
```

The plugin will request an uri on the following format: `https://namespace.servicebus.windows.net/topic/subscription` using an auth token generated from sasKeyName and sasKey.

## Widget config

In the client-side config, add this as an object in row.widgets to create a Azure Service Bus-widget.

```
{
    plugin: "azure-servicebus",
    datasourceId: "azure1",
    displayName: "Programdatakø",
}
```
