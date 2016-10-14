RabbitMQ plugin
====
The RabbitMQ plugin can create widgets that display queue information from queues in RabbitMQ. The plugin use Basic Auth to authenticate a user.

Datasource config
----

To configure a connection with a RabbitMQ-server you need to add a new datasource to the list of datasources in server.js. You need one datasource per queue.
```
rabbitmq: {
    id: "rabbitmq_1",
    plugin: "rabbitmq",
    updateInterval: 5000, // Update frequency in ms
    auth: {
      type: "basic",
      options: {
        username: "rabbitmq-username",
        password: "rabbitmq-password"
      }
    },
    url: "http://rabbitserver:15672/",
    queueName: "Omnibus", // Rabbit MQ queue name
},
```


Client-side config
----
In the client-side config, add this as an object in row.widgets to create a RabbitMQ-widget.
```
{
    plugin: "rabbitmq",
    datasourceId: "rabbitmq_1",
    displayName: "Programbank" // Widget display name
},
```
