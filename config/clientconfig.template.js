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

var row3 = {
  title: 'This',
  widgets: [
    {
      plugin: 'simple',
      datasourceId: 'simple1',
      displayName: 'A big number on a dashboard',
      fieldName: 'bigNumber',
      fieldType: 'number'
    },
    {
      plugin: 'chart',
      datasourceId: 'chart1',
      chartType: 'pie',
      width: '320px',
      height: '320px',
      options: {
        displayName: 'Animals',
        valueField: 'piechart dataset',
        labelField: 'piechart labels'
      }
    }
  ]
};

var dashboardConfig = {
  title: 'Odashboard 1.0',
  tabs: [
    [row1, row2],
    [row3]
  ]
};

module.exports = dashboardConfig;
