var datasources = [
  {
    id: 'simple1',
    plugin: 'simple',
    updateInterval: 1000,
    url: 'http://localhost:3000/test',
    timeout: 1500

  },
  {
    id: 'mannen',
    plugin: 'simple',
    updateInterval: 10000,
    url: 'http://www.vondess.com/mannen/api',
    timeout: 1500
  },
  {
    id: 'chart1',
    plugin: 'chart',
    updateInterval: 1000,
    url: 'http://localhost:3000/test',
    timeout: 1500
  }
];

var serverConfig = {
  datasources: datasources
};

module.exports = serverConfig;
