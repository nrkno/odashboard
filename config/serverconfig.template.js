var datasources = [
  {
    id: '1',
    plugin: 'generic',
    source: 'json-endpoint',
    updateInterval: 1000,
    timeout: 1500,
    config: {
      url: 'http://localhost:3000/test'
    }
  },
  {
    id: 'mannen',
    plugin: 'simple',
    updateInterval: 10000,
    url: 'http://www.vondess.com/mannen/api',
    timeout: 1500
  }
];

var serverConfig = {
  datasources: datasources
};

module.exports = serverConfig;
