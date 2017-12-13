RabbitMQ datasource
====
The RabbitMQ datasource provides the message count from RabbitMQ queues. The datasource use Basic Auth to authenticate a user.

## Config
Set source to `rabbitmq`. Add the following config proporties:

| Config property | Description |
|--------|-------------|
|url|Url of RabbitMQ server|
|queueName|Name of the queue to monitor|
|auth|Authorization params|

## Example

```
{
  id: 'rabbitmqsource',
  plugin: 'generic',
  source: 'rabbitmq',
  updateInterval: 5000,
  timeout: 5000,
  config: {
    auth: {
      type: "basic",
      options: {
        username: "rabbitmq-username",
        password: "rabbitmq-password"
      }
    },
    url: "http://rabbitserver:15672/",  
    queueName: "Omnibus"
  }
}
```
The data source produces a JSON object like this:

```
{
  queueName: "Omnibus,
  messageCount: 0
}
```

# What widget to use?
We recommend using the queue widget.
```
{
  plugin: 'generic',
  widgetType: 'queue',
  datasourceId: 'rabbitmqsource',
  displayName: 'My queue',
  fieldName: 'messageCount'
}
```


