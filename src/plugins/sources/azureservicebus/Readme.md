# Azure Service Bus datasource

Use the Azure Service Bus datasource to monitor the number of messages on a service bus subscription. 


## Config
Set source to `azure-servicebus`. Add the following proporties:

| Config property | Description |
|--------|-------------|
|namespace|Name of the service bus namespace|
|topic|Name of the topic|
|subscription|Name of the subscription|
|sasKeyName|Name of the sasKey|
|sasKey|Your key|


## Example 
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

See also [data sources](../).


