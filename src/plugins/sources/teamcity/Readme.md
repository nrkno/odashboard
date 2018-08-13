TeamCity datasource
====
The TeamCity generic datasource provides build information from TeamCity build configurations. It is best paired with the "build" widget, to display the current status of a build.

The TeamCity plugin sends build-messages to the client for all builds that match the locator. 

## Config
Set source to 'teamcity'. Add the following config proporties:

| Config property | Description |
|--------|-------------|
|url|Url of TeamCity server|
|locator|extra filter parameters that are added to TeamCity requests. See 
[All build locator filters for TC10](https://confluence.jetbrains.com/display/TCD10/REST+API#RESTAPI-BuildLocator)|

## Example
```
  {
    id: 'teamcity',
    plugin: 'generic',
    source: 'teamcity',
    updateInterval: 5000,
    config: {
      url: 'http://teamcityserver:8111/',
      locators: {
          branch: 'default:any',
          agentName: 'smith'
      } 
    },
    auth: {
      type: 'basic',
      options: {
        username: 'teamcity-username',
        password: 'teamcity-password'
      }
    }    
  }
```