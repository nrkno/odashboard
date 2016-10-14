TeamCity plugin
====
The TeamCity plugin can create widgets that display build information from a build configuration in TeamCity. The plugin use Basic Auth to authenticate a user.

Datasource config
----

To configure a connection with a TeamCity-server you need to add a new datasource to the list of datasources in server.js.
```
{
    id: "teamcity_1",
    plugin: "teamcity",
    updateInterval: 5000,
    auth: {
      type: "basic",
      options: {
        username: "your-teamcity-username",
        password: "your-teamcity-password"
      }
    },
    url: "http://teamcityserver:8111/"
}
```

Client-side config
----
In the client-side config, add this as an object in row.widgets to create a TeamCity-widget.
```
{
    plugin: "teamcity",
    datasourceId: "teamcity_1", // Should match a TeamCity datasource defined in server.js
    id: "a-teamcity-build-id", // Build configuration id
    name: "Build" // Widget display name
}
```
