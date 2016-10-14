var row1 = {
  title: 'MyRow',
  widgets: [
    {
      plugin: 'simple',
      datasourceId: 'simple1',
      displayName: 'A number on a dashboard',
      fieldName: 'number',
      fieldType: 'number'
    },
    {
      plugin: 'chart',
      datasourceId: 'chart1',
      chartType: 'line',
      width: '420px',
      height: '210px',
      options: {
        chartLabel: 'Numbers',
        valueField: 'number',
        timeSeriesLength: 30
      }
    },
    {
      plugin: 'simple',
      datasourceId: 'mannen',
      displayName: 'Har mannen falt?',
      fieldName: 'falt_ned',
      fieldType: 'boolean'
    }
  ]
};

var row2 = {
  title: 'This',
  widgets: [{
    plugin: 'iframe',
    datasourceId: '',
    displayName: 'title',
    src: 'http://dn.ht/picklecat/',
    width: 600,
    height: 400
  }]
};

var dashboardConfig = {
  title: 'Odashboard 1.0',
  rows: [row1, row2]
};

module.exports = dashboardConfig;
