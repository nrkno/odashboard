# Azure Service Bus datasource

Use the Azure Service Bus datasource to monitor the number of messages on a service bus subscription or queue. 


## Config
Set source to `azure-servicebus`. Add the following properties:

| Config property | Description |
|--------|-------------|
|namespace|Name of the service bus namespace|
|sasKeyName|Name of the sasKey|
|sasKey|Your key|

Additionally, specify either the queue or the topic/subscription to read messages from:

##### Topic/subscription:

| Config property | Description |
|--------|-------------|
|topic|Name of the topic|
|subscription|Name of the subscription| 

##### Queue:
| Config property | Description |
|--------|-------------|
|queue|Name of the queue|


## Examples

##### Topic/subscription:
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

##### Queue:
```
{
  id: 'MyAzureServiceBus',
  plugin: 'generic',
  updateInterval: 10000,
  timeout: 8000,
  source: 'azure-servicebus',
  config: {
    queue: 'queue'
    namespace: 'namespace',
    sasKeyName: 'keyName',
    sasKey: 'key'
  }
}
```

See also [data sources](../).


