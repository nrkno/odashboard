var widgetDefaults = {
  width: '20%',
  height: '100%'
};

var datasourceDefaults = {
  timeout: 1500
};

module.exports = {
  datasourceDefaults: datasourceDefaults,
  widgetDefaults: widgetDefaults,
  enabledPlugins: ['teamcity', 'rabbitmq', 'simple', 'iframe', 'azure-servicebus', 'image', 'chart', 'google-analytics', 'generic'],
  tabCycleInterval: 7000,
  tabCycleAutoStart: false
};
