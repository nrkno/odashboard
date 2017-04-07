# Azure Service Bus datasource

To specify a Azure Service Bus datasource, use 'azure-servicebus' for the 'source' property in your server configuration. In the 'config' property, you must include topic, subscription, and namespace, as well as the SAS key name and key. 

```
{
  id: 'MyAzureServiceBus',
  plugin: 'generic',
  updateInterval: 10000,
  timeout: 8000,
  source: 'azure-servicebus',
  config: {
    topic: 'topic',
    subscription: 'subscription',
    namespace: 'namespace',
    sasKeyName: 'keyName',
    sasKey: 'key'
  }
}
```

See also [data sources](../sources).
