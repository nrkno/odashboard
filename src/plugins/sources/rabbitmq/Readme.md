RabbitMQ datasource
====
The RabbitMQ datasource provides the message count from RabbitMq queues. The datasource use Basic Auth to authenticate a user.

## Datasource config
To configure a connection with a RabbitMQ-server you need to add a new datasource to the list of datasources in serverconfig.js. You need one datasource per queue.
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


